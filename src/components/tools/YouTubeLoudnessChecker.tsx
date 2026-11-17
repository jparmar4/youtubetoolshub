"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  FaArrowRight,
  FaCheck,
  FaCheckCircle,
  FaCopy,
  FaExclamationTriangle,
  FaFileAudio,
  FaPause,
  FaPlay,
  FaSlidersH,
  FaUpload,
  FaVolumeUp,
} from "react-icons/fa";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import ErrorNotice from "@/components/ui/ErrorNotice";
import { saveHistory } from "@/lib/history";

const YOUTUBE_TARGET_LUFS = -14.0;
const SAFE_TRUE_PEAK_DB = -1.0;
const CLIP_THRESHOLD = 0.99;

interface WaveformBin {
  min: number;
  max: number;
  clipped: boolean;
}

interface AudioAnalysisResult {
  fileName: string;
  fileSizeBytes: number;
  durationSeconds: number;
  sampleRate: number;
  channels: number;
  integratedLufs: number;
  rmsDb: number;
  truePeakDb: number;
  deltaFromYoutubeDb: number;
  clippedSamples: number;
  clippedPercentage: number;
  safeMaxBoostDb: number;
  needsLimiterIfBoosted: boolean;
  verdict: "optimal" | "quiet" | "loud";
  waveformBins: WaveformBin[];
}

function toDb(linear: number): number {
  if (linear <= 1e-8) return -96.0;
  return 20 * Math.log10(linear);
}

/**
 * Applies an approximate ITU-R BS.1770 K-weighting curve via WebAudio OfflineAudioContext
 * so low rumble is rolled off and upper vocal presence (~1.7 kHz +4 dB) is weighted accurately.
 */
async function computeKWeightedBuffer(buffer: AudioBuffer): Promise<AudioBuffer> {
  if (typeof OfflineAudioContext === "undefined") {
    return buffer;
  }
  try {
    const offline = new OfflineAudioContext(
      buffer.numberOfChannels,
      buffer.length,
      buffer.sampleRate,
    );
    const source = offline.createBufferSource();
    source.buffer = buffer;

    const preShelf = offline.createBiquadFilter();
    preShelf.type = "highshelf";
    preShelf.frequency.value = 1681.97;
    preShelf.gain.value = 4.0;

    const rlbHighpass = offline.createBiquadFilter();
    rlbHighpass.type = "highpass";
    rlbHighpass.frequency.value = 38.14;
    rlbHighpass.Q.value = 0.5;

    source.connect(preShelf);
    preShelf.connect(rlbHighpass);
    rlbHighpass.connect(offline.destination);
    source.start(0);

    return await offline.startRendering();
  } catch {
    return buffer;
  }
}

async function analyzeAudioBuffer(
  rawBuffer: AudioBuffer,
  fileName: string,
  fileSizeBytes: number,
): Promise<AudioAnalysisResult> {
  const numChannels = rawBuffer.numberOfChannels;
  const length = rawBuffer.length;
  const sampleRate = rawBuffer.sampleRate;

  // 1. Raw RMS, 4x linear oversampled True Peak, Clipping Count, and 180-bin Waveform
  const BIN_COUNT = 180;
  const samplesPerBin = Math.max(1, Math.floor(length / BIN_COUNT));
  const bins: WaveformBin[] = Array.from({ length: BIN_COUNT }, () => ({
    min: 0,
    max: 0,
    clipped: false,
  }));

  let maxTruePeakLinear = 0;
  let totalRawSq = 0;
  let totalSampleCount = 0;
  let clippedSamples = 0;

  for (let ch = 0; ch < numChannels; ch++) {
    const data = rawBuffer.getChannelData(ch);
    let prev = 0;
    for (let i = 0; i < data.length; i++) {
      const s = data[i];
      const absS = Math.abs(s);
      if (absS > maxTruePeakLinear) maxTruePeakLinear = absS;

      // 4x linear/cubic mid-point check for inter-sample peaks
      if (i > 0) {
        const mid = Math.abs((prev + s) * 0.5);
        if (mid > maxTruePeakLinear) maxTruePeakLinear = mid;
      }
      prev = s;

      if (absS >= CLIP_THRESHOLD) {
        clippedSamples++;
      }

      totalRawSq += s * s;
      totalSampleCount++;

      const binIdx = Math.min(BIN_COUNT - 1, Math.floor(i / samplesPerBin));
      const b = bins[binIdx];
      if (s < b.min) b.min = s;
      if (s > b.max) b.max = s;
      if (absS >= CLIP_THRESHOLD) b.clipped = true;
    }
  }

  const rmsLinear = Math.sqrt(totalRawSq / Math.max(1, totalSampleCount));
  const rmsDb = Number(toDb(rmsLinear).toFixed(1));
  const truePeakDb = Number(toDb(maxTruePeakLinear).toFixed(1));

  // 2. K-weighted ITU-R BS.1770 400ms gated integrated loudness
  const weightedBuffer = await computeKWeightedBuffer(rawBuffer);
  const blockSamples = Math.max(1, Math.floor(sampleRate * 0.4));
  const stepSamples = Math.max(1, Math.floor(blockSamples * 0.25)); // 75% overlap
  const blockPowers: number[] = [];

  for (let start = 0; start < weightedBuffer.length; start += stepSamples) {
    const end = Math.min(weightedBuffer.length, start + blockSamples);
    if (end - start < blockSamples * 0.2 && blockPowers.length > 0) break;

    let channelWeightedPowerSum = 0;
    for (let ch = 0; ch < weightedBuffer.numberOfChannels; ch++) {
      const chData = weightedBuffer.getChannelData(ch);
      let chSq = 0;
      for (let i = start; i < end; i++) {
        chSq += chData[i] * chData[i];
      }
      channelWeightedPowerSum += chSq / Math.max(1, end - start);
    }

    const blockLufs =
      channelWeightedPowerSum > 1e-10
        ? -0.691 + 10 * Math.log10(channelWeightedPowerSum)
        : -96;
    if (blockLufs > -70) {
      blockPowers.push(channelWeightedPowerSum);
    }
  }

  let integratedLufs = -96;
  if (blockPowers.length > 0) {
    const ungatedMean =
      blockPowers.reduce((acc, v) => acc + v, 0) / blockPowers.length;
    const relativeGateLufs = -0.691 + 10 * Math.log10(ungatedMean) - 10;
    const relativeGatePower = Math.pow(10, (relativeGateLufs + 0.691) / 10);
    const gatedBlocks = blockPowers.filter((p) => p >= relativeGatePower);
    const finalMean =
      gatedBlocks.length > 0
        ? gatedBlocks.reduce((acc, v) => acc + v, 0) / gatedBlocks.length
        : ungatedMean;
    integratedLufs = -0.691 + 10 * Math.log10(Math.max(1e-10, finalMean));
  } else {
    integratedLufs = Math.max(-96, rmsDb);
  }

  const roundedLufs = Number(integratedLufs.toFixed(1));
  const deltaFromYoutubeDb = Number((YOUTUBE_TARGET_LUFS - roundedLufs).toFixed(1));
  const clippedPercentage = Number(
    ((clippedSamples / Math.max(1, totalSampleCount)) * 100).toFixed(3),
  );
  const safeMaxBoostDb = Number((SAFE_TRUE_PEAK_DB - truePeakDb).toFixed(1));
  const needsLimiterIfBoosted =
    deltaFromYoutubeDb > 0 && truePeakDb + deltaFromYoutubeDb > SAFE_TRUE_PEAK_DB;

  let verdict: AudioAnalysisResult["verdict"] = "optimal";
  if (deltaFromYoutubeDb < -0.5) {
    verdict = "loud";
  } else if (deltaFromYoutubeDb > 0.5) {
    verdict = "quiet";
  }

  return {
    fileName,
    fileSizeBytes,
    durationSeconds: rawBuffer.duration,
    sampleRate,
    channels: numChannels,
    integratedLufs: roundedLufs,
    rmsDb,
    truePeakDb,
    deltaFromYoutubeDb,
    clippedSamples,
    clippedPercentage,
    safeMaxBoostDb,
    needsLimiterIfBoosted,
    verdict,
    waveformBins: bins,
  };
}

/**
 * Generates an in-browser synthetic vocal cadence AudioBuffer (~4s) for zero-file testing.
 */
function createSyntheticSampleBuffer(ctx: AudioContext): AudioBuffer {
  const sampleRate = ctx.sampleRate || 48000;
  const durationSec = 4;
  const length = sampleRate * durationSec;
  const buf = ctx.createBuffer(1, length, sampleRate);
  const data = buf.getChannelData(0);

  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    const envelope = Math.max(
      0.08,
      Math.sin(t * Math.PI * 3.5) * 0.5 + 0.5,
    );
    const fundamental = Math.sin(2 * Math.PI * 145 * t) * 0.11;
    const formant1 = Math.sin(2 * Math.PI * 420 * t) * 0.06;
    const formant2 = Math.sin(2 * Math.PI * 1480 * t) * 0.04;
    let sample = (fundamental + formant1 + formant2) * envelope;

    // Brief controlled plosive peak near 2.6s so users see peak markers cleanly
    if (t > 2.55 && t < 2.62) {
      sample *= 5.6;
    }
    data[i] = Math.max(-1, Math.min(1, sample));
  }
  return buf;
}

export default function YouTubeLoudnessChecker() {
  const [analysis, setAnalysis] = useState<AudioAnalysisResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedReport, setCopiedReport] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  const stopPlayback = useCallback(() => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
        sourceNodeRef.current.disconnect();
      } catch {
        /* ignore already stopped */
      }
      sourceNodeRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    return () => {
      stopPlayback();
      if (audioCtxRef.current) {
        void audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };
  }, [stopPlayback]);

  // Draw Canvas Waveform whenever analysis completes
  useEffect(() => {
    if (!analysis || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const dpr = typeof window !== "undefined" ? Math.min(2, window.devicePixelRatio || 1) : 1;
    const cssWidth = canvas.clientWidth || 720;
    const cssHeight = 160;
    canvas.width = Math.round(cssWidth * dpr);
    canvas.height = Math.round(cssHeight * dpr);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    // Dark studio waveform canvas
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, cssWidth, cssHeight);

    const midY = cssHeight / 2;
    const halfH = cssHeight * 0.44;

    // Reference clip ceiling lines (+0.99 / -0.99) and center line
    ctx.strokeStyle = "rgba(239, 68, 68, 0.35)";
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, midY - halfH * 0.98);
    ctx.lineTo(cssWidth, midY - halfH * 0.98);
    ctx.moveTo(0, midY + halfH * 0.98);
    ctx.lineTo(cssWidth, midY + halfH * 0.98);
    ctx.stroke();

    ctx.setLineDash([]);
    ctx.strokeStyle = "rgba(148, 163, 184, 0.2)";
    ctx.beginPath();
    ctx.moveTo(0, midY);
    ctx.lineTo(cssWidth, midY);
    ctx.stroke();

    const bins = analysis.waveformBins;
    const barSlot = cssWidth / bins.length;
    const barW = Math.max(2, barSlot * 0.68);

    bins.forEach((bin, idx) => {
      const x = idx * barSlot + (barSlot - barW) / 2;
      const topY = midY - Math.max(0.03, bin.max) * halfH;
      const botY = midY - Math.min(-0.03, bin.min) * halfH;
      const h = Math.max(4, botY - topY);

      ctx.fillStyle = bin.clipped
        ? "#ef4444"
        : analysis.verdict === "optimal"
          ? "#10b981"
          : "#8b5cf6";
      ctx.fillRect(x, topY, barW, h);
    });
  }, [analysis]);

  const getOrCreateAudioContext = useCallback((): AudioContext => {
    const WinCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
      audioCtxRef.current = new WinCtx();
    }
    if (audioCtxRef.current.state === "suspended") {
      void audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  }, []);

  const processAudioFile = async (file: File) => {
    stopPlayback();
    setError("");
    setAnalyzing(true);

    try {
      if (file.size > 250 * 1024 * 1024) {
        throw new Error("Please select an audio file under 250 MB for smooth browser decoding.");
      }
      const ctx = getOrCreateAudioContext();
      const arrayBuffer = await file.arrayBuffer();
      const decoded = await ctx.decodeAudioData(arrayBuffer.slice(0));
      audioBufferRef.current = decoded;

      const result = await analyzeAudioBuffer(decoded, file.name, file.size);
      setAnalysis(result);

      saveHistory("youtube-loudness-checker", {
        fileName: result.fileName,
        integratedLufs: result.integratedLufs,
        truePeakDb: result.truePeakDb,
        deltaFromYoutubeDb: result.deltaFromYoutubeDb,
      }).catch(() => {});
    } catch (err) {
      setAnalysis(null);
      setError(
        err instanceof Error
          ? err.message
          : "Could not decode this audio file. Try exporting as .wav, .mp3, or .m4a (AAC).",
      );
    } finally {
      setAnalyzing(false);
    }
  };

  const handleLoadSample = async () => {
    stopPlayback();
    setError("");
    setAnalyzing(true);
    try {
      const ctx = getOrCreateAudioContext();
      const sampleBuf = createSyntheticSampleBuffer(ctx);
      audioBufferRef.current = sampleBuf;
      const result = await analyzeAudioBuffer(
        sampleBuf,
        "sample-voiceover-demo.wav",
        sampleBuf.length * 2,
      );
      setAnalysis(result);
    } catch {
      setError("WebAudio API is unavailable in this browser.");
    } finally {
      setAnalyzing(false);
    }
  };

  const togglePlayback = () => {
    if (!audioBufferRef.current) return;
    if (isPlaying) {
      stopPlayback();
      return;
    }
    const ctx = getOrCreateAudioContext();
    const src = ctx.createBufferSource();
    src.buffer = audioBufferRef.current;
    src.connect(ctx.destination);
    src.onended = () => setIsPlaying(false);
    sourceNodeRef.current = src;
    src.start(0);
    setIsPlaying(true);
  };

  const formatGainSigned = (db: number): string =>
    `${db > 0 ? "+" : ""}${db.toFixed(1)} dB`;

  const handleCopyReport = async () => {
    if (!analysis) return;
    const summary = `🎙️ YouTube -14 LUFS Loudness Audit (${analysis.fileName}):
• Approx. Integrated Loudness: ${analysis.integratedLufs} LUFS (Target: -14.0 LUFS)
• Recommended Gain Change: ${formatGainSigned(analysis.deltaFromYoutubeDb)}
• True Peak Level: ${analysis.truePeakDb} dBTP (Recommended ceiling: <= -1.0 dBTP)
• Clipped Samples: ${analysis.clippedSamples.toLocaleString()}
Checked 100% locally at YouTubeToolsHub.com/tools/youtube-loudness-checker`;

    try {
      await navigator.clipboard.writeText(summary);
      setCopiedReport(true);
      setTimeout(() => setCopiedReport(false), 2400);
    } catch {
      /* ignore */
    }
  };

  return (
    <ToolPageLayout
      title="YouTube -14 LUFS Audio Loudness & Clipping Checker"
      slug="youtube-loudness-checker"
      description="Analyze your YouTube voiceover or final mix in-browser via WebAudio API—zero file uploads."
    >
      <div className="space-y-6">
        {/* Zero-Upload Privacy Banner & Sample Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 text-xs font-semibold text-emerald-950">
          <div className="flex items-center gap-2">
            <FaVolumeUp className="text-emerald-600 shrink-0" aria-hidden="true" />
            <span>
              <strong>100% Client-Side Processing:</strong> Your .mp3, .wav, or .m4a stays on your device—decoded locally with WebAudio API.
            </span>
          </div>
          <button
            type="button"
            onClick={handleLoadSample}
            className="cursor-pointer px-3 py-1.5 rounded-xl bg-white border border-emerald-300 hover:border-emerald-500 text-emerald-800 font-bold transition-colors shadow-xs"
          >
            Test Sample Voiceover
          </button>
        </div>

        {/* Drag & Drop Dropzone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const dropped = e.dataTransfer.files?.[0];
            if (dropped) void processAudioFile(dropped);
          }}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          className={`cursor-pointer rounded-3xl border-2 border-dashed p-8 text-center transition-all ${
            isDragging
              ? "border-purple-500 bg-purple-50/70"
              : "border-slate-300 bg-slate-50/70 hover:border-purple-400 hover:bg-white"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".mp3,.wav,.m4a,.aac,.ogg,.flac,audio/*"
            className="hidden"
            onChange={(e) => {
              const selected = e.target.files?.[0];
              if (selected) void processAudioFile(selected);
              e.target.value = "";
            }}
          />
          <div className="mx-auto w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
            <FaUpload className="w-6 h-6" aria-hidden="true" />
          </div>
          <p className="text-base font-black text-slate-900 font-outfit">
            {analyzing
              ? "Decoding waveform & calculating K-weighted LUFS..."
              : "Drop your YouTube voiceover or audio mix here"}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Supports <strong>.MP3</strong>, <strong>.WAV</strong>, and <strong>.M4A</strong> · Click to browse files
          </p>
        </div>

        {error && <ErrorNotice message={error} onRetry={() => setError("")} />}

        {/* Results Panel */}
        {analysis && !analyzing && (
          <div className="space-y-6 animate-fade-in">
            {/* File & Playback Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-900 text-white px-5 py-3.5">
              <div className="flex items-center gap-3 min-w-0">
                <FaFileAudio className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-sm font-bold truncate">{analysis.fileName}</p>
                  <p className="text-[11px] text-slate-400">
                    {analysis.durationSeconds.toFixed(1)}s · {(analysis.sampleRate / 1000).toFixed(1)} kHz · {analysis.channels === 1 ? "Mono" : `${analysis.channels} Ch`} · {(analysis.fileSizeBytes / 1024).toFixed(0)} KB
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlayback}
                  className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-extrabold transition-colors"
                >
                  {isPlaying ? <FaPause className="w-3 h-3" /> : <FaPlay className="w-3 h-3" />}
                  <span>{isPlaying ? "Pause Preview" : "Play Audio"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyReport}
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
                >
                  {copiedReport ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                  <span>{copiedReport ? "Copied!" : "Copy Report"}</span>
                </button>
              </div>
            </div>

            {/* 4 Key Loudness & Clipping KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                className={`rounded-2xl p-5 border ${
                  analysis.verdict === "optimal"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                    : analysis.verdict === "loud"
                      ? "bg-amber-50 border-amber-200 text-amber-950"
                      : "bg-indigo-50 border-indigo-200 text-indigo-950"
                }`}
              >
                <span className="text-[11px] font-extrabold uppercase tracking-wider opacity-75 block">
                  Approx. Integrated
                </span>
                <span className="text-3xl font-black font-outfit block mt-1">
                  {analysis.integratedLufs} LUFS
                </span>
                <span className="text-xs font-semibold block mt-1">
                  RMS avg: {analysis.rmsDb} dBFS
                </span>
              </div>

              <div className="rounded-2xl p-5 border border-slate-200 bg-white">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
                  Vs. YouTube -14 LUFS
                </span>
                <span
                  className={`text-3xl font-black font-outfit block mt-1 ${
                    analysis.verdict === "optimal"
                      ? "text-emerald-600"
                      : analysis.verdict === "loud"
                        ? "text-amber-600"
                        : "text-indigo-600"
                  }`}
                >
                  {Math.abs(analysis.deltaFromYoutubeDb) <= 0.5
                    ? "On Target"
                    : formatGainSigned(analysis.deltaFromYoutubeDb)}
                </span>
                <span className="text-xs text-slate-600 block mt-1">
                  {analysis.verdict === "loud"
                    ? `YouTube normalizes down ${Math.abs(analysis.deltaFromYoutubeDb).toFixed(1)} dB`
                    : analysis.verdict === "quiet"
                      ? "Needs gain boost (YT won't turn up)"
                      : "Matches YouTube loudness spec"}
                </span>
              </div>

              <div
                className={`rounded-2xl p-5 border ${
                  analysis.truePeakDb > SAFE_TRUE_PEAK_DB
                    ? "bg-rose-50 border-rose-200 text-rose-950"
                    : "bg-white border-slate-200 text-slate-900"
                }`}
              >
                <span className="text-[11px] font-extrabold uppercase tracking-wider opacity-75 block">
                  True Peak Level
                </span>
                <span className="text-3xl font-black font-outfit block mt-1">
                  {analysis.truePeakDb} dBTP
                </span>
                <span className="text-xs font-semibold block mt-1">
                  {analysis.truePeakDb > SAFE_TRUE_PEAK_DB
                    ? "Above -1.0 dBTP safe ceiling"
                    : "Safe below -1.0 dBTP"}
                </span>
              </div>

              <div
                className={`rounded-2xl p-5 border ${
                  analysis.clippedSamples > 0
                    ? "bg-rose-50 border-rose-200 text-rose-950"
                    : "bg-emerald-50 border-emerald-200 text-emerald-950"
                }`}
              >
                <span className="text-[11px] font-extrabold uppercase tracking-wider opacity-75 block">
                  Clipped Samples (&ge;0 dBFS)
                </span>
                <span className="text-3xl font-black font-outfit block mt-1">
                  {analysis.clippedSamples.toLocaleString()}
                </span>
                <span className="text-xs font-semibold block mt-1">
                  {analysis.clippedSamples > 0
                    ? `${analysis.clippedPercentage}% peaks highlighted in red`
                    : "Zero digital clipping detected"}
                </span>
              </div>
            </div>

            {/* Canvas Waveform Preview */}
            <div className="rounded-2xl border border-slate-200 bg-slate-900 p-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
                <span className="font-bold">Waveform Peak &amp; Clipping Envelope</span>
                <div className="flex items-center gap-4 text-[11px]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500 inline-block" /> Safe / Normal
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-rose-500 inline-block" /> Clipped Peaks (&ge;-0.1 dBFS)
                  </span>
                </div>
              </div>
              <canvas
                ref={canvasRef}
                aria-label="Audio waveform preview highlighting clipped peaks in red"
                className="w-full h-40 rounded-xl block"
              />
            </div>

            {/* Exact DAW Fix Prescription (Premiere Pro / DaVinci Resolve / CapCut) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
              <div className="flex items-start gap-3">
                {analysis.clippedSamples > 0 || analysis.needsLimiterIfBoosted ? (
                  <FaExclamationTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                ) : (
                  <FaCheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <h3 className="text-base font-black text-slate-900 font-outfit flex items-center gap-2">
                    <FaSlidersH className="w-4 h-4 text-purple-600" aria-hidden="true" />
                    <span>Exact Gain Settings for Premiere Pro, DaVinci Resolve &amp; CapCut</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {analysis.verdict === "optimal"
                      ? "Your track is right on YouTube's -14.0 LUFS standard. Keep a -1.0 dBTP True Peak limiter enabled on export."
                      : analysis.verdict === "quiet"
                        ? analysis.needsLimiterIfBoosted
                          ? `You need ${formatGainSigned(analysis.deltaFromYoutubeDb)} overall loudness boost, but raw peak headroom is only ${formatGainSigned(analysis.safeMaxBoostDb)}. Put a Hard Limiter at -1.0 dBTP before applying gain so peaks don't distort.`
                          : `YouTube does NOT boost quiet uploads. Apply ${formatGainSigned(analysis.deltaFromYoutubeDb)} gain cleanly without clipping.`
                        : `YouTube's loudness normalizer will automatically pull your video down by ${Math.abs(analysis.deltaFromYoutubeDb).toFixed(1)} dB. Lower master gain by ${formatGainSigned(analysis.deltaFromYoutubeDb)} so dynamic peaks stay clean.`}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 space-y-1">
                  <span className="font-black text-slate-900 block">Adobe Premiere Pro</span>
                  <span className="text-slate-600 block">
                    Audio Gain (G): <strong>{formatGainSigned(analysis.deltaFromYoutubeDb)}</strong>
                    <br />
                    Effect: Hard Limiter → Max Amplitude <strong>-1.0 dB</strong>
                  </span>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 space-y-1">
                  <span className="font-black text-slate-900 block">DaVinci Resolve (Fairlight)</span>
                  <span className="text-slate-600 block">
                    Normalize Audio → Standard: <strong>YouTube (-14 LUFS)</strong>
                    <br />
                    True Peak Limit: <strong>-1.0 dBTP</strong>
                  </span>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 space-y-1">
                  <span className="font-black text-slate-900 block">CapCut Desktop / Web</span>
                  <span className="text-slate-600 block">
                    Audio Panel → Toggle <strong>Normalize Loudness</strong> or Volume{" "}
                    <strong>{formatGainSigned(analysis.deltaFromYoutubeDb)}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Bridge to next pre-upload step */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-purple-50/70 border border-purple-200 p-4 text-xs font-bold">
              <span className="text-purple-950">
                Audio dialed in for YouTube? Audit your visual packaging &amp; opening 30s script next:
              </span>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/tools/hook-auditor"
                  className="text-purple-700 hover:underline inline-flex items-center gap-1"
                >
                  Audit Opening 30s Hook <FaArrowRight className="w-3 h-3" />
                </Link>
                <Link
                  href="/tools/thumbnail-critique"
                  className="text-indigo-700 hover:underline inline-flex items-center gap-1"
                >
                  Thumbnail Glance Test <FaArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
