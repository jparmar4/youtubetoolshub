/**
 * Hidden/clipped “voice FAQ” copy was keyword stuffing (cloaking-like).
 * Do not render off-screen Q&A. Visible FAQs + JSON-LD on the real page
 * are the only AEO signals we keep.
 */

interface VoiceSearchOptimizationProps {
  question: string;
  answer: string;
  context?: string;
}

/** No-op: never emit hidden text. */
export function VoiceSearchAnswer(_props: VoiceSearchOptimizationProps) {
  return null;
}

export const voiceSearchFAQs: {
  question: string;
  answer: string;
  shortAnswer: string;
}[] = [];

export default function VoiceSearchOptimization() {
  return null;
}
