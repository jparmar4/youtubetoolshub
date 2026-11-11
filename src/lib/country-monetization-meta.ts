import type { CountryTierId } from "@/lib/cpm-data";

export interface CountryMonetizationMeta {
  /** IRS W-8BEN treaty withholding rate on US-sourced YouTube views (or W-9 exemption for US) */
  usWithholdingRate: string;
  usTaxNote: string;
  /** Local creator tax reporting authority / framework */
  localTaxAuthority: string;
  localTaxNote: string;
  /** AdSense minimum payout threshold and common settlement rail */
  adsenseThreshold: string;
  payoutMethod: string;
  /** Top-paying domestic advertiser verticals in this market */
  topLocalNiches: string[];
  /** Peak advertiser demand & CPM seasonality insight */
  seasonalityNote: string;
  /** Unique local monetization angle */
  marketInsight: string;
}

const COUNTRY_META: Record<string, CountryMonetizationMeta> = {
  // ── TIER 1 (19 Premium Markets) ─────────────────────────────────────────────
  US: {
    usWithholdingRate: "0% (Form W-9)",
    usTaxNote:
      "US-based creators submit IRS Form W-9 rather than W-8BEN; no foreign backup withholding applies when SSN/EIN matches IRS records.",
    localTaxAuthority: "IRS (Form 1099-NEC, Schedule C, or Form 1120-S)",
    localTaxNote:
      "YouTube income above $400 net profit triggers self-employment tax (15.3%) unless structured under an S-Corp election once net profit scales past ~$60K.",
    adsenseThreshold: "$100 USD",
    payoutMethod: "US Direct Deposit (ACH) via Google AdSense",
    topLocalNiches: ["401(k) & Credit Cards", "B2B SaaS & Cloud Software", "Real Estate & Mortgages"],
    seasonalityNote:
      "CPM often jumps 35%–55% in Nov–Dec around Black Friday, Cyber Monday, and tax-loss harvesting campaigns before resetting in January.",
    marketInsight:
      "Highest global ad auction density: US English finance and software tutorials routinely clear $20–$45 CPM because of domestic card and B2B LTV.",
  },
  AU: {
    usWithholdingRate: "0% Treaty (Form W-8BEN)",
    usTaxNote:
      "Under the US–Australia income tax treaty, Australian creators who file Form W-8BEN qualify for 0% US withholding on US-viewer AdSense earnings.",
    localTaxAuthority: "ATO (Australian Business Number / Sole Trader / GST)",
    localTaxNote:
      "Declare Google AdSense receipts in AUD as business income; GST registration becomes mandatory at AU$75,000 turnover (exports may qualify as GST-free).",
    adsenseThreshold: "AU$100 AUD",
    payoutMethod: "Local EFT Direct Deposit in AUD",
    topLocalNiches: ["Superannuation & ASX ETFs", "Sydney/Melbourne Property", "Mining, Solar & Trades SaaS"],
    seasonalityNote:
      "Strong double peak in Q4 (holiday retail) and May–June ahead of Australia's June 30 EOFY financial tax planning campaigns.",
    marketInsight:
      "Less creator supply per capita than the US keeps domestic Australian finance and B2B software CPMs among the world's highest.",
  },
  GB: {
    usWithholdingRate: "0% Treaty (Form W-8BEN)",
    usTaxNote:
      "The US–UK tax treaty provides 0% US Chapter 3 withholding on motion picture/TV/video royalties when Form W-8BEN is approved in AdSense.",
    localTaxAuthority: "HMRC (Self Assessment & £1,000 Trading Allowance)",
    localTaxNote:
      "YouTube earnings above £1,000 gross trading income require Self Assessment registration by 5 October and Making Tax Digital readiness for higher brackets.",
    adsenseThreshold: "£60 GBP",
    payoutMethod: "UK Faster Payments / BACS EFT in GBP",
    topLocalNiches: ["Stocks & Shares ISA / Pensions", "UK Mortgages & Buy-to-Let", "Business Banking & Accounting SaaS"],
    seasonalityNote:
      "Two distinct spikes: Oct–Dec retail gifting and Mar–Early Apr UK tax-year-end ISA & SIPP advertising blitz.",
    marketInsight:
      "UK creators naturally capture hybrid UK + US English search demand, blending £-denominated UK finance sponsors with US AdSense RPM.",
  },
  CA: {
    usWithholdingRate: "10% Treaty (Form W-8BEN Motion Picture)",
    usTaxNote:
      "Under Article XII of the US–Canada treaty, YouTube copyright royalties tied to video/motion picture distribution face a reduced 10% rate on US-sourced views (down from 30%).",
    localTaxAuthority: "CRA (Form T2125 Statement of Business Activities)",
    localTaxNote:
      "Report converted CAD payouts on Form T2125 and claim camera gear, home studio fraction, and editing software; GST/HST applies once global taxable supplies pass CA$30,000.",
    adsenseThreshold: "CA$100 CAD",
    payoutMethod: "Canadian EFT Direct Deposit in CAD",
    topLocalNiches: ["TFSA, RRSP & FHSA Investing", "Canadian Real Estate & Renewals", "Cloud Tech & Productivity SaaS"],
    seasonalityNote:
      "Peaks in Oct–Dec holiday shopping and Jan–Feb RRSP contribution season when Canadian banks bid heavily on wealth keywords.",
    marketInsight:
      "North American time zones align organically with US browse traffic, giving Canadian English channels 45%–65% US viewership overlap.",
  },
  CH: {
    usWithholdingRate: "0% Treaty (Form W-8BEN)",
    usTaxNote:
      "Swiss creators claiming benefits under the US–Switzerland treaty receive 0% US withholding on YouTube AdSense royalty payments after W-8BEN verification.",
    localTaxAuthority: "ESTV / Cantonal Tax Office & AHV/AVS Self-Employed",
    localTaxNote:
      "Multilingual Swiss creators (German/French/English) report net AdSense profit to cantonal authorities and register for VAT only above CHF 100,000 turnover.",
    adsenseThreshold: "CHF 100",
    payoutMethod: "Swiss SEPA / SIC Bank Transfer in CHF",
    topLocalNiches: ["Pillar 3a & Private Banking", "Swiss SaaS, Fintech & Crypto", "MedTech, Pharma & Engineering"],
    seasonalityNote:
      "Consistent high bids year-round with steep Q4 Pillar 3a tax-deduction and luxury retail surges.",
    marketInsight:
      "Switzerland pairs Europe's highest consumer purchasing power with tri-lingual German, French, and international English ad demand.",
  },
  DE: {
    usWithholdingRate: "0% Treaty (Form W-8BEN)",
    usTaxNote:
      "Germany's US treaty grants 0% US-source royalty withholding via AdSense Form W-8BEN, maximizing net creator payouts.",
    localTaxAuthority: "Finanzamt (EÜR, Gewerbeanmeldung & UStG §19 Kleinunternehmer)",
    localTaxNote:
      "Regular monetized YouTube uploads typically require Gewerbe registration; small creators under €22,000 prior-year turnover often use Kleinunternehmerregelung.",
    adsenseThreshold: "€70 EUR",
    payoutMethod: "SEPA EFT Direct Deposit in EUR",
    topLocalNiches: ["ETF-Sparplan & Tagesgeld", "EVs, Solar & Heat Pumps", "B2B Software, AI & Mittelstand Tech"],
    seasonalityNote:
      "Strong Q4 Black Friday / Weihnachtsgeschäft lift and Q1 German insurance-switching and tax-software season.",
    marketInsight:
      "Largest DACH ad market (Germany + Austria + Switzerland): DACH-targeted German finance and tech content earns Tier-1 RPM with lower competition than US English.",
  },
  NO: {
    usWithholdingRate: "0% Treaty (Form W-8BEN)",
    usTaxNote:
      "The US–Norway treaty reduces US-viewer AdSense withholding to 0% upon valid W-8BEN submission.",
    localTaxAuthority: "Skatteetaten (ENK / Enkeltpersonforetak & MVA)",
    localTaxNote:
      "Report AdSense payouts under næringsinntekt; MVA (VAT) threshold stands at NOK 50,000 over 12 months for domestic taxable supplies.",
    adsenseThreshold: "$100 USD equiv.",
    payoutMethod: "International / Local Bank Transfer via AdSense",
    topLocalNiches: ["Nordic Index Funds & ASK", "Electric Vehicles & Clean Tech", "Energy, Offshore & B2B SaaS"],
    seasonalityNote:
      "High autumn/winter indoor watch-time surge (Oct–Feb) aligns with Norway's peak Q4 retail ad auctions.",
    marketInsight:
      "High GDP per capita yields standout Tier-1 CPMs, and English tutorials from Norway often earn blended Nordic + US payouts.",
  },
  NZ: {
    usWithholdingRate: "10%–15% Treaty (Form W-8BEN Article 12)",
    usTaxNote:
      "US–New Zealand tax treaty limits US royalty withholding on W-8BEN filings (verify 10%/5% rate eligibility for copyright vs motion picture royalties in AdSense).",
    localTaxAuthority: "IRD (Inland Revenue IR3 / Sole Trader & GST)",
    localTaxNote:
      "AdSense income is assessable in NZD; compulsory GST registration applies above NZ$60,000 annual turnover (export services to Google Ireland/US are often zero-rated).",
    adsenseThreshold: "NZ$100 NZD",
    payoutMethod: "New Zealand EFT in NZD",
    topLocalNiches: ["KiwiSaver & NZ Property", "AgriTech & Clean Energy", "Software & Remote Careers"],
    seasonalityNote:
      "Mirrors AU seasonality with Nov–Dec Q4 retail peaks plus Feb–Mar NZ tax-year-end spikes.",
    marketInsight:
      "NZ creators capture lucrative AU + US spillover views while domestic NZ finance/insurance keywords carry minimal creator saturation.",
  },
  SE: {
    usWithholdingRate: "0% Treaty (Form W-8BEN)",
    usTaxNote:
      "Sweden enjoys 0% US-source royalty withholding when W-8BEN treaty details are verified in AdSense.",
    localTaxAuthority: "Skatteverket (Enskild Firma / F-skatt & Moms)",
    localTaxNote:
      "Apply for F-skatt when monetizing consistently; foreign AdSense B2B payouts typically follow reverse-charge EU/export reporting rules.",
    adsenseThreshold: "€70 EUR / SEK equiv.",
    payoutMethod: "Local Swedish Bank EFT",
    topLocalNiches: ["ISK Investing & Fintech (Klarna/Avanza)", "Gaming & SaaS Engineering", "Sustainability & Home Design"],
    seasonalityNote:
      "Dark Nordic winters boost watch hours Oct–Mar alongside strong Black Week e-commerce bids.",
    marketInsight:
      "Extremely high English proficiency lets Swedish creators publish in English for Tier-1 global CPM while keeping Swedish brand appeal.",
  },
  NL: {
    usWithholdingRate: "0% Treaty (Form W-8BEN)",
    usTaxNote:
      "Netherlands creators qualify for 0% US royalty withholding under the US–NL treaty via W-8BEN.",
    localTaxAuthority: "Belastingdienst & KvK (ZZP / Eenmanszaak & BTW)",
    localTaxNote:
      "Register at the Kamer van Koophandel once YouTube acts as an active business; check KOR small-business VAT scheme rules.",
    adsenseThreshold: "€70 EUR",
    payoutMethod: "SEPA EFT in EUR",
    topLocalNiches: ["Box 3 Investing & ETFs", "SaaS, Logistics & Cloud Tech", "E-bikes, Housing & Mortgages"],
    seasonalityNote:
      "Steep Q4 Sinterklaas & Black Friday e-commerce ad competition across Dutch mobile and CTV feeds.",
    marketInsight:
      "The Netherlands acts as Europe's digital ad testing hub, with unusually high mobile AdSense fill rates and B2B software budgets.",
  },
  DK: {
    usWithholdingRate: "0% Treaty (Form W-8BEN)",
    usTaxNote:
      "US–Denmark treaty provides 0% US withholding on YouTube royalty payouts after Form W-8BEN approval.",
    localTaxAuthority: "Skattestyrelsen (Enkeltmandsvirksomhed & Moms)",
    localTaxNote:
      "Register a CVR number once creator revenue exceeds DKK 50,000 in 12 months and log Google Ireland/US AdSense invoices properly.",
    adsenseThreshold: "DKK 600 / $100 equiv.",
    payoutMethod: "Danish Bank EFT in DKK",
    topLocalNiches: ["Aktiesparekonto & Wealth", "Wind, Biotech & B2B Tech", "Architecture & Consumer Electronics"],
    seasonalityNote:
      "Q4 holiday e-commerce and Q1 annual tax assessment (årsopgørelse) searches drive premium CPCs.",
    marketInsight:
      "High programmatic ad penetration in Denmark yields healthy mid-roll competition even on medium-length 8–12 min videos.",
  },
  FI: {
    usWithholdingRate: "0% Treaty (Form W-8BEN)",
    usTaxNote:
      "Finland's US tax treaty reduces US-viewer royalty withholding to 0% with an accepted W-8BEN.",
    localTaxAuthority: "Vero (Toiminimi / Y-tunnus & ALV)",
    localTaxNote:
      "YouTube earnings are taxable earned/business income in Finland; maintain bookkeeping for camera gear and studio expenses under Toiminimi or Oy.",
    adsenseThreshold: "€70 EUR",
    payoutMethod: "SEPA EFT in EUR",
    topLocalNiches: ["Nordic ETFs & Asp-Saving", "Developer Tools & AI", "Gaming Hardware & Telecom"],
    seasonalityNote:
      "Strong Q4 electronics and winter indoor viewing lift finish rates and mid-roll completion.",
    marketInsight:
      "Connected-TV YouTube consumption in Finland is among the highest in the EU, supporting stronger skippable/non-skippable ad CPMs.",
  },
  IE: {
    usWithholdingRate: "0% Treaty (Form W-8BEN)",
    usTaxNote:
      "Ireland–US treaty qualifies Irish resident creators for 0% US royalty withholding on verified W-8BEN filings.",
    localTaxAuthority: "Revenue.ie (Form 11 Self-Assessment & ROS)",
    localTaxNote:
      "Note: Google Ireland Limited settles many EMEA AdSense payments; keep local tax invoices reconciled under Schedule D Case I/II.",
    adsenseThreshold: "€70 EUR",
    payoutMethod: "SEPA EFT in EUR",
    topLocalNiches: ["US Multinationals & Tech Careers", "Irish Pensions, ETFs & Property", "B2B Cloud & Accounting"],
    seasonalityNote:
      "Peaks in Q4 retail plus Oct/Nov Irish Income Tax return season for fintech and accounting advertisers.",
    marketInsight:
      "English-native market with Europe's highest concentration of SaaS headquarters — strong B2B CPM crossover with UK & US search.",
  },
  AT: {
    usWithholdingRate: "0% Treaty (Form W-8BEN)",
    usTaxNote:
      "US–Austria tax treaty supports 0% US-viewer withholding on approved W-8BEN submissions.",
    localTaxAuthority: "Finanzamt Österreich & WKO (Einkommensteuer / E1a)",
    localTaxNote:
      "Creators earning above the annual casual income threshold obtain a Gewerbeschein and track gear/home-office deductions.",
    adsenseThreshold: "€70 EUR",
    payoutMethod: "SEPA EFT in EUR",
    topLocalNiches: ["DACH Investing & Real Estate", "Alpine Tourism & Auto", "Industrial & SaaS Solutions"],
    seasonalityNote:
      "Shared DACH ad budgets peak during Q4 shopping and Q1 skiing/travel/finance planning.",
    marketInsight:
      "Austrian creators serve the combined ~100M German-speaking DACH bloc where affluent Swiss and German advertisers bid in the same auction.",
  },
  BE: {
    usWithholdingRate: "0% Treaty (Form W-8BEN)",
    usTaxNote:
      "US–Belgium treaty limits US royalty withholding to 0% when Form W-8BEN is validated in AdSense.",
    localTaxAuthority: "FPS Finance / FOD Financiën (Zelfstandige & BTW)",
    localTaxNote:
      "Dutch- and French-speaking Belgian creators declare YouTube revenue either as zelfstandige in bijberoep or hoofdberoep.",
    adsenseThreshold: "€70 EUR",
    payoutMethod: "SEPA EFT in EUR",
    topLocalNiches: ["Tax-Free Capital Gains & Real Estate", "EU B2B Policy & Consulting", "Consumer Tech & E-Mobility"],
    seasonalityNote:
      "Strong Q4 + back-to-school (Aug–Sep) retail campaigns from Benelux and French advertisers.",
    marketInsight:
      "Bilingual Dutch/French creators capture cross-border advertiser competition from both the Netherlands and France.",
  },
  SG: {
    usWithholdingRate: "30% Non-Treaty (No US–SG Tax Treaty)",
    usTaxNote:
      "Singapore does not have a comprehensive income tax treaty with the US, so AdSense typically withholds 30% strictly on US-sourced views (non-US views remain 0%).",
    localTaxAuthority: "IRAS (Sole Proprietorship / ACRA & Form B)",
    localTaxNote:
      "Foreign-sourced rules vs territorial trade income apply carefully in Singapore; creators resident in SG report active production income to IRAS.",
    adsenseThreshold: "S$150 SGD",
    payoutMethod: "Singapore GIRO / Local Bank EFT in SGD",
    topLocalNiches: ["T-Bills, REITs & CPF Optimization", "Fintech, Wealth & Brokerage Apps", "Enterprise AI & Cloud SaaS"],
    seasonalityNote:
      "Peaks in Q4 (11.11, Black Friday, 12.12) and Q1 SRS/CPF top-up campaigns.",
    marketInsight:
      "Asia's top per-view finance RPM hub: Singaporean fintech and brokerage CPA payouts drive intense local auction competition.",
  },
  IS: {
    usWithholdingRate: "0% Treaty (Form W-8BEN)",
    usTaxNote:
      "The US–Iceland tax treaty lowers US royalty withholding to 0% for eligible W-8BEN submissions.",
    localTaxAuthority: "Skatturinn (Iceland Revenue & Customs / VSK)",
    localTaxNote:
      "Icelandic creators primarily monetize English-language travel, nature, and tech channels reaching US and Nordic viewers.",
    adsenseThreshold: "$100 USD equiv.",
    payoutMethod: "International Bank Wire (SWIFT)",
    topLocalNiches: ["Global Travel & Outdoor Gear", "Clean Geothermal & Tech", "Nordic Creators in English"],
    seasonalityNote:
      "Summer tourism campaigns (Q2–Q3) plus US/EU Q4 outdoor gear spikes.",
    marketInsight:
      "Small domestic language audience means nearly all top Icelandic channels produce in English to earn Tier-1 US/UK RPMs.",
  },
  LU: {
    usWithholdingRate: "0% Treaty (Form W-8BEN)",
    usTaxNote:
      "US–Luxembourg treaty grants 0% US withholding on verified copyright royalty payouts.",
    localTaxAuthority: "Administration des contributions directes (ACD)",
    localTaxNote:
      "Multilingual FR/DE/EN creators file under independent commercial or artistic income with clear home-studio deductions.",
    adsenseThreshold: "€70 EUR",
    payoutMethod: "SEPA EFT in EUR",
    topLocalNiches: ["Cross-Border EU Wealth & Banking", "Enterprise FinTech", "Luxury Auto & Lifestyle"],
    seasonalityNote:
      "Steady high-value B2B and banking spend Q1–Q4, peaking Nov–Dec.",
    marketInsight:
      "Highest GDP per capita in Europe drives premium auction floors, while creators piggyback on adjacent French and German viewer pools.",
  },
  HK: {
    usWithholdingRate: "30% Non-Treaty (No US–HK Tax Treaty)",
    usTaxNote:
      "Hong Kong lacks a comprehensive US income tax treaty; expect 30% US withholding solely on the US share of video views when Form W-8BEN is active.",
    localTaxAuthority: "IRD Hong Kong (Profits Tax / Business Registration)",
    localTaxNote:
      "Low flat corporate/profits tax brackets and zero VAT/GST make Hong Kong attractive for scaled creator studios once B2B sponsors supplement AdSense.",
    adsenseThreshold: "HK$800 HKD",
    payoutMethod: "Local Hong Kong Bank EFT in HKD",
    topLocalNiches: ["Interactive Brokers, Stocks & Options", "Credit Card Miles & Cashback", "Consumer Tech & Photography"],
    seasonalityNote:
      "Double surges during Q4 (11.11 / Christmas) and Q1 pre-Chinese New Year & tax-loan campaigns.",
    marketInsight:
      "Financial-service advertisers (securities apps, card issuers) push Hong Kong Cantonese and English finance RPMs far above regional averages.",
  },

  // ── TIER 2 (17 Strong Markets) ─────────────────────────────────────────────
  FR: {
    usWithholdingRate: "0% Treaty (Form W-8BEN)",
    usTaxNote:
      "France–US tax treaty sets 0% US withholding on copyright royalties when Form W-8BEN is completed.",
    localTaxAuthority: "URSSAF / Impots.gouv.fr (Micro-BNC / Micro-Entrepreneur)",
    localTaxNote:
      "French creators widely start under Micro-BNC (flat 34% expense allowance under €77,700 turnover) before upgrading to EURL/SASU.",
    adsenseThreshold: "€70 EUR",
    payoutMethod: "SEPA EFT in EUR",
    topLocalNiches: ["PEA, Assurance-Vie & Immobilier", "SaaS, AI & Tech Reviews", "E-commerce & Francophone Finance"],
    seasonalityNote:
      "Strong Q4 Black Friday/Noël campaigns and French Solde retail cycles (Jan & Jul).",
    marketInsight:
      "France bridges Tier 2 domestic volume with Francophone Switzerland, Luxembourg, Belgium, and Quebec high-RPM viewers.",
  },
  JP: {
    usWithholdingRate: "0% Treaty (Form W-8BEN)",
    usTaxNote:
      "Japan qualifies for 0% US royalty withholding under Article 12 of the US–Japan treaty once W-8BEN is verified.",
    localTaxAuthority: "NTA Japan (Kokuseicho / Kakutei Shinkoku Blue Return)",
    localTaxNote:
      "Full-time creators leverage Aoiro Shinkoku (Blue Return) for up to ¥650,000 deduction plus itemized camera/PC depreciation.",
    adsenseThreshold: "¥8,000 JPY",
    payoutMethod: "Domestic Japanese Bank EFT in JPY",
    topLocalNiches: ["NISA / iDeCo & Asset Building", "Mobile Apps, AI & Electronics", "Auto, Home Appliances & Travel"],
    seasonalityNote:
      "Unique peaks in March (fiscal year-end), June/December bonus seasons, and New Year sales.",
    marketInsight:
      "High mobile ad engagement and massive domestic brand budgets (electronics, telecom, brokerage) create Tier-1-like RPM in finance.",
  },
  KR: {
    usWithholdingRate: "10% Treaty (Form W-8BEN Article 14)",
    usTaxNote:
      "Under the US–Korea tax treaty, copyright royalties carry a 10% reduced US withholding rate on US-sourced YouTube views.",
    localTaxAuthority: "NTS Hometax (Media Content Creator Business Code 940306)",
    localTaxNote:
      "Register dedicated YouTube creator business code (1인 미디어 콘텐츠 창작자) for comprehensive tax filing in May.",
    adsenseThreshold: "$100 USD equiv.",
    payoutMethod: "Wire / Local FX Bank Account (with SWIFT/ACH)",
    topLocalNiches: ["Korean/US Stock Investing & Real Estate", "Beauty Tech, Gadgets & Cars", "SaaS & Productivity Education"],
    seasonalityNote:
      "High Q4 shopping festivals, Lunar New Year, and Chuseok retail campaigns.",
    marketInsight:
      "Korea has sky-high smartphone usage and YouTube Premium share (which distributes subscription revenue pool payouts alongside ads).",
  },
  AE: {
    usWithholdingRate: "30% Non-Treaty (No US–UAE Tax Treaty)",
    usTaxNote:
      "Because the UAE has no US income tax treaty, Form W-8BEN yields 30% withholding ONLY on US-viewer revenue — UAE, GCC, and UK/global views remain 0% US-withheld.",
    localTaxAuthority: "FTA UAE (0% Personal Income Tax / NMC Media Permit)",
    localTaxNote:
      "0% personal income tax and 0% corporate tax up to AED 375,000 net profit, though commercial UAE creators/influencers hold an active Media License.",
    adsenseThreshold: "$100 USD equiv.",
    payoutMethod: "Local UAE Bank Transfer / Wire in AED",
    topLocalNiches: ["Dubai Real Estate & Off-Plan", "Golden Visa, LLC Setup & Tax", "Luxury Auto, Fintech & Business"],
    seasonalityNote:
      "Surges during Q4 Dubai Shopping Festival, White Friday, and peak Q1–Q2 international property launches.",
    marketInsight:
      "Ultra-affluent expat demographics and real-estate/wealth advertisers push Dubai/UAE niche CPMs past several Western European markets.",
  },
  IL: {
    usWithholdingRate: "10%–15% Treaty (Form W-8BEN Copyright)",
    usTaxNote:
      "US–Israel treaty limits US copyright royalty withholding on verified W-8BEN submissions (typically 10% for motion picture/copyright royalties; confirm in AdSense).",
    localTaxAuthority: "Israel Tax Authority (Osek Patur / Osek Murshe)",
    localTaxNote:
      "Export income from Google Ireland/US typically receives zero-rated VAT treatment while remaining taxable under Israeli income tax brackets.",
    adsenseThreshold: "$100 USD equiv.",
    payoutMethod: "Local Israeli Bank Transfer / Wire",
    topLocalNiches: ["High-Tech Careers, Cybersecurity & AI", "Investing & Real Estate", "US-Targeted English Tech Channels"],
    seasonalityNote:
      "High autumn holiday/Q4 e-commerce spikes alongside US SaaS launch cycles.",
    marketInsight:
      "Many Israeli creators publish in English for global developer/AI/tech niches, earning $8–$20 US-anchored CPMs.",
  },
  QA: {
    usWithholdingRate: "30% Non-Treaty",
    usTaxNote:
      "Qatar has no US tax treaty; AdSense deducts 30% on US-sourced view revenue only, leaving local GCC and global views untouched.",
    localTaxAuthority: "General Tax Authority (GTA Qatar) — 0% Personal Income Tax",
    localTaxNote:
      "Personal employment/creator salaries are tax-free; commercial media production entities comply with Qatari commerce licensing.",
    adsenseThreshold: "$100 USD equiv.",
    payoutMethod: "SWIFT Wire / Local Bank Transfer",
    topLocalNiches: ["Aviation, Luxury Travel & Auto", "Banking & Islamic Finance", "Tech & Lifestyle"],
    seasonalityNote:
      "Peaks Q4–Q1 around regional sporting events, White Friday, and Ramadan/Eid retail periods.",
    marketInsight:
      "High household disposable income attracts luxury telecom and automotive bidders across Arabic and English content.",
  },
  KW: {
    usWithholdingRate: "30% Non-Treaty",
    usTaxNote:
      "No US–Kuwait income tax treaty exists; 30% applies exclusively to US-sourced AdSense revenue share.",
    localTaxAuthority: "Kuwait Ministry of Finance (0% Personal Income Tax)",
    localTaxNote:
      "Zero personal income tax lets creators reinvest AdSense and brand deals fully; ensure commercial sponsorship compliance where applicable.",
    adsenseThreshold: "$100 USD equiv.",
    payoutMethod: "SWIFT Bank Wire in KWD/USD",
    topLocalNiches: ["Consumer Tech & Smartphones", "Real Estate & Wealth", "Food, Auto & Luxury Retail"],
    seasonalityNote:
      "Strong Q4, Ramadan, and Eid consumer electronics ad demand.",
    marketInsight:
      "High mobile video watch-time per capita in Kuwait delivers consistent Gulf advertiser competition.",
  },
  SA: {
    usWithholdingRate: "30% Non-Treaty",
    usTaxNote:
      "Saudi Arabia has no US tax treaty; 30% applies only to US-viewer revenue share while domestic KSA/MENA revenue carries 0% US withholding.",
    localTaxAuthority: "ZATCA & GCAM (Mawthooq Creator License for Brand Deals)",
    localTaxNote:
      "Paid influencer promotions in KSA require a GCAM Mawthooq permit; ZATCA VAT applies above SAR 375,000 turnover.",
    adsenseThreshold: "$100 USD equiv.",
    payoutMethod: "Local Saudi Bank Wire / EFT",
    topLocalNiches: ["Vision 2030 Tech & EVs", "Real Estate & Banking", "Gaming, E-Sports & Mobile Tech"],
    seasonalityNote:
      "Ramadan, Eid, White Friday, and Saudi National Day drive massive seasonal ad spend boosts.",
    marketInsight:
      "Largest Arabic creator scale combined with growing Riyadh fintech/automotive budgets.",
  },
  ES: {
    usWithholdingRate: "5% Treaty (Form W-8BEN Copyright)",
    usTaxNote:
      "The US–Spain tax treaty lowers US withholding to 5% on copyright royalties once Form W-8BEN is active.",
    localTaxAuthority: "Agencia Tributaria (Autónomo RETA & IRPF / IVA)",
    localTaxNote:
      "Regular monetized YouTubers register as Autónomo and file quarterly Modelo 303/130 with intra-EU reverse charge for Google Ireland.",
    adsenseThreshold: "€70 EUR",
    payoutMethod: "SEPA EFT in EUR",
    topLocalNiches: ["Fondos Indexados & Hipotecas", "Tech Reviews & AI Tools", "Travel & Real Estate"],
    seasonalityNote:
      "Peaks in Q4 Black Friday/Reyes Magos and Q2–Q3 European summer travel.",
    marketInsight:
      "Spanish creators balance domestic Spain CPMs (€2.50–€7) with massive Latin American Spanish view volume for high sponsorship leverage.",
  },
  IT: {
    usWithholdingRate: "0%–5% Treaty (Form W-8BEN Article 12)",
    usTaxNote:
      "US–Italy tax treaty reduces US copyright royalty withholding (typically 0%–5% for software/literary/artistic works; verify exact AdSense line election).",
    localTaxAuthority: "Agenzia delle Entrate (Partita IVA Regime Forfettario)",
    localTaxNote:
      "Up-and-coming Italian creators frequently use Regime Forfettario (flat 5%/15% substitute tax up to €85,000 revenue).",
    adsenseThreshold: "€70 EUR",
    payoutMethod: "SEPA EFT in EUR",
    topLocalNiches: ["BTP, ETFs & Personal Finance", "Automotive, Moto & Design", "Food Production & SaaS"],
    seasonalityNote:
      "Strong Q4 Christmas retail and automotive launch seasons in spring/autumn.",
    marketInsight:
      "Concentrated domestic Italian finance and auto channels achieve impressive engagement and lucrative brand partnerships.",
  },
  TW: {
    usWithholdingRate: "30% Non-Treaty",
    usTaxNote:
      "Without a bilateral US income tax treaty, Form W-8BEN yields 30% withholding solely on US-sourced views.",
    localTaxAuthority: "National Taxation Bureau (Overseas Income / Business Registration)",
    localTaxNote:
      "Track Google Ireland/Singapore AdSense settlements cleanly alongside local Taiwanese brand sponsorship invoices.",
    adsenseThreshold: "$100 USD equiv.",
    payoutMethod: "SWIFT Wire / Local Bank FX Settlement",
    topLocalNiches: ["Semiconductors, PC Hardware & AI", "High-Dividend ETFs (0050/0056)", "Consumer Tech & Travel"],
    seasonalityNote:
      "11.11 Singles' Day, Q4 shopping, and Lunar New Year consumer electronics cycles.",
    marketInsight:
      "Hardware, AI chip coverage, and ETF channels command premium regional tech CPMs across Taiwan, Hong Kong, and overseas Chinese audiences.",
  },
  PL: {
    usWithholdingRate: "10% Treaty (Form W-8BEN)",
    usTaxNote:
      "The US–Poland treaty caps US-viewer copyright royalty withholding at 10% upon Form W-8BEN submission.",
    localTaxAuthority: "Krajowa Administracja Skarbowa (JDG / Ryczałt & VAT)",
    localTaxNote:
      "Fast-growing Polish creator market; report Google Ireland intra-EU B2B receipts cleanly via VAT-UE.",
    adsenseThreshold: "PLN 300 / €70 equiv.",
    payoutMethod: "Local Polish Bank EFT in PLN",
    topLocalNiches: ["IKE / IKZE Investing & Real Estate", "PC Gaming, Tech & SaaS", "Automotive & Home Renovation"],
    seasonalityNote:
      "Big Q4 Black Week / Allegro holiday peaks lift Polish CPMs noticeably over summer.",
    marketInsight:
      "Central Europe's largest digital ad market — tech and personal-finance creators outperform general Polish entertainment by 4x–6x.",
  },
  CZ: {
    usWithholdingRate: "0%–10% Treaty (Form W-8BEN)",
    usTaxNote:
      "US–Czech Republic treaty provides reduced royalty withholding (0% for copyright/cultural vs 10% industrial; confirm exact AdSense box).",
    localTaxAuthority: "Finanční správa (OSVČ / Paušální daň)",
    localTaxNote:
      "Czech OSVČ creators earning from Google Ireland often register as Identifikovaná osoba for EU reverse-charge reporting.",
    adsenseThreshold: "CZK 2,000 / $100 equiv.",
    payoutMethod: "Local Czech Bank Transfer / EUR SEPA",
    topLocalNiches: ["Fintech, Mortgage & Investing", "Software Engineering & AI", "Auto & Outdoor Gear"],
    seasonalityNote:
      "Nov–Dec Vánoce e-commerce surge delivers Czechia's highest CPM window.",
    marketInsight:
      "Cross-border Czech/Slovak reach doubles local inventory while Prague fintech startups compete on high-intent channels.",
  },
  HU: {
    usWithholdingRate: "30% Default (US–HU Treaty Terminated 2024)",
    usTaxNote:
      "Note: Because the US–Hungary tax treaty terminated effective Jan 2024, verify current AdSense US Tax Info default (30% on US views applies without an active treaty).",
    localTaxAuthority: "NAV (Átalányadózás / KATA-era Alternatives)",
    localTaxNote:
      "Hungarian creators generally operate under Átalányadózás (flat-rate sole proprietor taxation) with reverse-charge EU invoicing to Google Ireland.",
    adsenseThreshold: "€70 / $100 equiv.",
    payoutMethod: "Local Bank EFT / SEPA Wire",
    topLocalNiches: ["Allampapir, Investing & Real Estate", "Developer & AI Education", "Automotive & Tech Reviews"],
    seasonalityNote:
      "Black Friday & December retail lift followed by Q1 personal finance demand.",
    marketInsight:
      "Crucial tip for Hungarian creators: monitoring W-8BEN treaty updates and pricing international sponsorships in EUR/USD avoids HUF FX swings.",
  },
  PT: {
    usWithholdingRate: "10% Treaty (Form W-8BEN)",
    usTaxNote:
      "Under the US–Portugal treaty, YouTube royalty withholding on US views is capped at 10% with a valid W-8BEN.",
    localTaxAuthority: "Autoridade Tributária (Recibos Verdes / ENI)",
    localTaxNote:
      "Report AdSense payouts via Recibos Verdes against Google Ireland and maintain itemized equipment receipts.",
    adsenseThreshold: "€70 EUR",
    payoutMethod: "SEPA EFT in EUR",
    topLocalNiches: ["Personal Finance & EU ETFs", "Expat Relocation & Real Estate", "Tech & Digital Nomad SaaS"],
    seasonalityNote:
      "Q2–Q3 tourism + Q4 retail campaigns boost blended RPM.",
    marketInsight:
      "Portuguese channels targeting both Portugal and Lusophone expats in Luxembourg, Switzerland, and France earn much higher RPM than Brazil-heavy feeds.",
  },
  GR: {
    usWithholdingRate: "0% Treaty (Form W-8BEN)",
    usTaxNote:
      "The US–Greece tax treaty sets 0% US withholding on copyright royalties when Form W-8BEN is validated in AdSense.",
    localTaxAuthority: "AADE (myDATA / Atomiki Epicheirisi)",
    localTaxNote:
      "Creators invoice Google Ireland as a B2B EU digital service and reconcile expenses through AADE's myDATA system.",
    adsenseThreshold: "€70 EUR",
    payoutMethod: "SEPA EFT in EUR",
    topLocalNiches: ["Greek Tourism, Shipping & Hospitality", "ETFs, Real Estate & Business", "Tech Tutorials"],
    seasonalityNote:
      "Peak hospitality/travel ad spend Mar–Sep plus Q4 Black Friday e-commerce.",
    marketInsight:
      "Travel, hospitality, and English expat property content from Greece attracts international Tier-1 bidders.",
  },
  MY: {
    usWithholdingRate: "30% Non-Treaty",
    usTaxNote:
      "Malaysia does not have a comprehensive US income tax treaty, so AdSense applies 30% withholding solely on US-sourced views (Malaysian & APAC views remain 0%).",
    localTaxAuthority: "LHDN Malaysia (Borang B / Freelance Income)",
    localTaxNote:
      "Declare YouTube business income on Borang B and claim production gear, internet, and editing software deductions.",
    adsenseThreshold: "$100 USD equiv.",
    payoutMethod: "Local Malaysian Bank EFT / Wire",
    topLocalNiches: ["ASB, EPF, Gold & Stock Apps", "EVs, Tech & Gadgets", "Property & Small Business Tools"],
    seasonalityNote:
      "Dual peaks in Q4 (11.11 / 12.12) and Hari Raya / Chinese New Year campaigns.",
    marketInsight:
      "English-language Malaysian tech & finance videos consistently attract high-paying Singaporean spillover traffic.",
  },
};

export function getCountryMonetizationMeta(
  code: string,
  name: string,
  tierId: CountryTierId,
  currency: string,
): CountryMonetizationMeta {
  if (COUNTRY_META[code]) {
    return COUNTRY_META[code];
  }

  // Fallback for Tier 3 markets (accurate, localized per-country details without duplicate copy)
  return {
    usWithholdingRate: "0%–30% (Check US–" + name + " Treaty in AdSense)",
    usTaxNote: `Submit Form W-8BEN in Google AdSense US Tax Info to claim any reduced US tax treaty rate available to residents of ${name} (only US-viewer revenue is subject to US withholding; non-US views stay at 0%).`,
    localTaxAuthority: `${name} Domestic Tax & Freelance Income Authority`,
    localTaxNote: `Record monthly Google AdSense settlements received in ${currency} as self-employed/business revenue and deduct camera, microphone, lighting, and editing software expenses per ${name} tax rules.`,
    adsenseThreshold: "$100 USD equivalent",
    payoutMethod: `Local Bank EFT or SWIFT Wire Transfer in ${currency}`,
    topLocalNiches: [
      `Personal Finance, Banking Apps & Loans in ${name}`,
      "B2B Software, AI Workflows & Remote Tech Careers",
      "Smartphones, Consumer Electronics & E-Commerce Reviews",
    ],
    seasonalityNote: `Advertiser demand typically rises +15%–35% in Q4 (Oct–Dec) while dropping temporarily during Q1 budget resets. Attracting Tier-1 (${tierId === "TIER3" ? "US/UK/AU/CA" : "global"}) English viewers multiplies RPM by 5x–15x.`,
    marketInsight: `${name} delivers strong organic watch-time velocity and low production costs; pairing broad local reach with English tutorials, software guides, or international sponsorships unlocks Tier-1 monetization economics.`,
  };
}
