export interface CountryCPM {
    code: string;
    name: string;
    slug: string;
    currency: string;
    flag: string;
    cpmRange: { min: number; max: number; avg: number };
    rpmRange: { min: number; max: number; avg: number };
}

export const countryCPMData: CountryCPM[] = [
    // Tier 1 — Premium markets (highest advertiser spend)
    { code: "US", name: "United States",    slug: "usa",          currency: "USD", flag: "🇺🇸", cpmRange: { min: 8.00, max: 25.00, avg: 14.50 }, rpmRange: { min: 4.00, max: 15.00, avg: 8.50 } },
    { code: "AU", name: "Australia",        slug: "australia",    currency: "AUD", flag: "🇦🇺", cpmRange: { min: 7.50, max: 22.00, avg: 13.00 }, rpmRange: { min: 3.50, max: 12.00, avg: 7.20 } },
    { code: "GB", name: "United Kingdom",   slug: "uk",           currency: "GBP", flag: "🇬🇧", cpmRange: { min: 6.00, max: 18.00, avg: 11.00 }, rpmRange: { min: 3.00, max: 10.00, avg: 6.50 } },
    { code: "CA", name: "Canada",           slug: "canada",       currency: "CAD", flag: "🇨🇦", cpmRange: { min: 6.50, max: 20.00, avg: 12.00 }, rpmRange: { min: 3.20, max: 11.00, avg: 7.00 } },
    { code: "CH", name: "Switzerland",      slug: "switzerland",  currency: "CHF", flag: "🇨🇭", cpmRange: { min: 7.00, max: 21.00, avg: 13.50 }, rpmRange: { min: 3.50, max: 12.00, avg: 7.80 } },
    { code: "DE", name: "Germany",          slug: "germany",      currency: "EUR", flag: "🇩🇪", cpmRange: { min: 5.50, max: 16.00, avg: 10.50 }, rpmRange: { min: 2.80, max: 9.00,  avg: 6.20 } },
    { code: "NO", name: "Norway",           slug: "norway",       currency: "NOK", flag: "🇳🇴", cpmRange: { min: 6.00, max: 18.00, avg: 11.00 }, rpmRange: { min: 3.00, max: 10.00, avg: 6.00 } },
    { code: "NZ", name: "New Zealand",      slug: "new-zealand",  currency: "NZD", flag: "🇳🇿", cpmRange: { min: 6.00, max: 19.00, avg: 11.50 }, rpmRange: { min: 3.00, max: 10.50, avg: 6.80 } },
    { code: "SE", name: "Sweden",           slug: "sweden",       currency: "SEK", flag: "🇸🇪", cpmRange: { min: 5.00, max: 15.00, avg: 9.50 },  rpmRange: { min: 2.50, max: 8.00,  avg: 5.20 } },
    { code: "NL", name: "Netherlands",      slug: "netherlands",  currency: "EUR", flag: "🇳🇱", cpmRange: { min: 5.00, max: 15.50, avg: 9.80 },  rpmRange: { min: 2.60, max: 8.50,  avg: 5.40 } },
    { code: "DK", name: "Denmark",          slug: "denmark",      currency: "DKK", flag: "🇩🇰", cpmRange: { min: 5.50, max: 16.00, avg: 10.00 }, rpmRange: { min: 2.70, max: 9.00,  avg: 6.00 } },
    { code: "FI", name: "Finland",          slug: "finland",      currency: "EUR", flag: "🇫🇮", cpmRange: { min: 5.00, max: 14.00, avg: 8.50 },  rpmRange: { min: 2.50, max: 7.50,  avg: 5.00 } },
    { code: "IE", name: "Ireland",          slug: "ireland",      currency: "EUR", flag: "🇮🇪", cpmRange: { min: 5.00, max: 15.00, avg: 9.00 },  rpmRange: { min: 2.50, max: 8.00,  avg: 5.50 } },
    { code: "AT", name: "Austria",          slug: "austria",      currency: "EUR", flag: "🇦🇹", cpmRange: { min: 5.00, max: 15.00, avg: 9.00 },  rpmRange: { min: 2.50, max: 8.00,  avg: 5.50 } },
    { code: "BE", name: "Belgium",          slug: "belgium",      currency: "EUR", flag: "🇧🇪", cpmRange: { min: 5.00, max: 15.00, avg: 9.00 },  rpmRange: { min: 2.50, max: 8.00,  avg: 5.50 } },
    { code: "SG", name: "Singapore",        slug: "singapore",    currency: "SGD", flag: "🇸🇬", cpmRange: { min: 4.00, max: 12.00, avg: 7.00 },  rpmRange: { min: 2.00, max: 6.50,  avg: 4.00 } },
    { code: "IS", name: "Iceland",          slug: "iceland",      currency: "ISK", flag: "🇮🇸", cpmRange: { min: 4.50, max: 13.00, avg: 7.50 },  rpmRange: { min: 2.20, max: 7.00,  avg: 4.00 } },
    { code: "LU", name: "Luxembourg",       slug: "luxembourg",   currency: "EUR", flag: "🇱🇺", cpmRange: { min: 6.00, max: 17.00, avg: 10.00 }, rpmRange: { min: 3.00, max: 9.00,  avg: 6.00 } },
    { code: "HK", name: "Hong Kong",        slug: "hong-kong",    currency: "HKD", flag: "🇭🇰", cpmRange: { min: 3.50, max: 10.00, avg: 6.00 },  rpmRange: { min: 1.70, max: 5.50,  avg: 3.20 } },

    // Tier 2 — Solid markets (competitive CPM)
    { code: "FR", name: "France",           slug: "france",       currency: "EUR", flag: "🇫🇷", cpmRange: { min: 4.50, max: 14.00, avg: 8.50 },  rpmRange: { min: 2.20, max: 7.50,  avg: 4.80 } },
    { code: "JP", name: "Japan",            slug: "japan",        currency: "JPY", flag: "🇯🇵", cpmRange: { min: 3.50, max: 11.00, avg: 6.50 },  rpmRange: { min: 1.80, max: 6.00,  avg: 3.50 } },
    { code: "KR", name: "South Korea",      slug: "south-korea",  currency: "KRW", flag: "🇰🇷", cpmRange: { min: 3.50, max: 11.00, avg: 6.80 },  rpmRange: { min: 1.80, max: 6.00,  avg: 3.60 } },
    { code: "AE", name: "United Arab Emirates", slug: "uae",      currency: "AED", flag: "🇦🇪", cpmRange: { min: 4.00, max: 12.00, avg: 7.50 },  rpmRange: { min: 2.00, max: 6.50,  avg: 4.00 } },
    { code: "IL", name: "Israel",           slug: "israel",       currency: "ILS", flag: "🇮🇱", cpmRange: { min: 3.00, max: 9.00,  avg: 5.50 },  rpmRange: { min: 1.50, max: 4.50,  avg: 2.80 } },
    { code: "QA", name: "Qatar",            slug: "qatar",        currency: "QAR", flag: "🇶🇦", cpmRange: { min: 3.00, max: 9.00,  avg: 5.50 },  rpmRange: { min: 1.50, max: 4.50,  avg: 2.80 } },
    { code: "KW", name: "Kuwait",           slug: "kuwait",       currency: "KWD", flag: "🇰🇼", cpmRange: { min: 3.00, max: 9.00,  avg: 5.50 },  rpmRange: { min: 1.50, max: 4.50,  avg: 2.80 } },
    { code: "SA", name: "Saudi Arabia",     slug: "saudi-arabia", currency: "SAR", flag: "🇸🇦", cpmRange: { min: 2.50, max: 8.00,  avg: 4.50 },  rpmRange: { min: 1.20, max: 4.00,  avg: 2.20 } },
    { code: "ES", name: "Spain",            slug: "spain",        currency: "EUR", flag: "🇪🇸", cpmRange: { min: 2.50, max: 8.00,  avg: 4.50 },  rpmRange: { min: 1.20, max: 4.00,  avg: 2.50 } },
    { code: "IT", name: "Italy",            slug: "italy",        currency: "EUR", flag: "🇮🇹", cpmRange: { min: 2.50, max: 8.50,  avg: 4.80 },  rpmRange: { min: 1.20, max: 4.50,  avg: 2.60 } },
    { code: "TW", name: "Taiwan",           slug: "taiwan",       currency: "TWD", flag: "🇹🇼", cpmRange: { min: 2.00, max: 6.00,  avg: 3.50 },  rpmRange: { min: 1.00, max: 3.00,  avg: 1.80 } },
    { code: "PL", name: "Poland",           slug: "poland",       currency: "PLN", flag: "🇵🇱", cpmRange: { min: 1.50, max: 5.00,  avg: 3.00 },  rpmRange: { min: 0.70, max: 2.50,  avg: 1.50 } },
    { code: "CZ", name: "Czech Republic",   slug: "czech-republic", currency: "CZK", flag: "🇨🇿", cpmRange: { min: 1.80, max: 5.50, avg: 3.20 },  rpmRange: { min: 0.90, max: 2.80,  avg: 1.60 } },
    { code: "HU", name: "Hungary",          slug: "hungary",      currency: "HUF", flag: "🇭🇺", cpmRange: { min: 1.50, max: 4.50,  avg: 2.80 },  rpmRange: { min: 0.70, max: 2.20,  avg: 1.40 } },
    { code: "PT", name: "Portugal",         slug: "portugal",     currency: "EUR", flag: "🇵🇹", cpmRange: { min: 1.50, max: 5.00,  avg: 2.80 },  rpmRange: { min: 0.70, max: 2.50,  avg: 1.40 } },
    { code: "GR", name: "Greece",           slug: "greece",       currency: "EUR", flag: "🇬🇷", cpmRange: { min: 1.50, max: 4.50,  avg: 2.50 },  rpmRange: { min: 0.70, max: 2.20,  avg: 1.30 } },
    { code: "MY", name: "Malaysia",         slug: "malaysia",     currency: "MYR", flag: "🇲🇾", cpmRange: { min: 1.50, max: 4.50,  avg: 2.50 },  rpmRange: { min: 0.70, max: 2.20,  avg: 1.30 } },

    // Tier 3 — Emerging markets (high volume, lower CPM)
    { code: "BR", name: "Brazil",           slug: "brazil",       currency: "BRL", flag: "🇧🇷", cpmRange: { min: 1.00, max: 4.00,  avg: 2.20 },  rpmRange: { min: 0.50, max: 2.00,  avg: 1.10 } },
    { code: "MX", name: "Mexico",           slug: "mexico",       currency: "MXN", flag: "🇲🇽", cpmRange: { min: 1.00, max: 3.50,  avg: 2.00 },  rpmRange: { min: 0.50, max: 1.80,  avg: 1.00 } },
    { code: "PH", name: "Philippines",      slug: "philippines",  currency: "PHP", flag: "🇵🇭", cpmRange: { min: 0.80, max: 3.50,  avg: 2.00 },  rpmRange: { min: 0.40, max: 1.80,  avg: 1.00 } },
    { code: "CL", name: "Chile",            slug: "chile",        currency: "CLP", flag: "🇨🇱", cpmRange: { min: 0.80, max: 2.50,  avg: 1.50 },  rpmRange: { min: 0.40, max: 1.20,  avg: 0.80 } },
    { code: "ZA", name: "South Africa",     slug: "south-africa", currency: "ZAR", flag: "🇿🇦", cpmRange: { min: 0.80, max: 2.50,  avg: 1.50 },  rpmRange: { min: 0.40, max: 1.20,  avg: 0.70 } },
    { code: "TH", name: "Thailand",         slug: "thailand",     currency: "THB", flag: "🇹🇭", cpmRange: { min: 0.70, max: 2.50,  avg: 1.50 },  rpmRange: { min: 0.30, max: 1.20,  avg: 0.70 } },
    { code: "IN", name: "India",            slug: "india",        currency: "INR", flag: "🇮🇳", cpmRange: { min: 0.50, max: 3.00,  avg: 1.50 },  rpmRange: { min: 0.20, max: 1.50,  avg: 0.80 } },
    { code: "AR", name: "Argentina",        slug: "argentina",    currency: "ARS", flag: "🇦🇷", cpmRange: { min: 0.50, max: 2.00,  avg: 1.20 },  rpmRange: { min: 0.20, max: 1.00,  avg: 0.60 } },
    { code: "CO", name: "Colombia",         slug: "colombia",     currency: "COP", flag: "🇨🇴", cpmRange: { min: 0.50, max: 2.00,  avg: 1.20 },  rpmRange: { min: 0.20, max: 1.00,  avg: 0.60 } },
    { code: "ID", name: "Indonesia",        slug: "indonesia",    currency: "IDR", flag: "🇮🇩", cpmRange: { min: 0.50, max: 2.00,  avg: 1.00 },  rpmRange: { min: 0.20, max: 1.00,  avg: 0.50 } },
    { code: "VN", name: "Vietnam",          slug: "vietnam",      currency: "VND", flag: "🇻🇳", cpmRange: { min: 0.50, max: 2.00,  avg: 1.00 },  rpmRange: { min: 0.20, max: 1.00,  avg: 0.50 } },
    { code: "TR", name: "Turkey",           slug: "turkey",       currency: "TRY", flag: "🇹🇷", cpmRange: { min: 0.50, max: 2.00,  avg: 1.00 },  rpmRange: { min: 0.20, max: 1.00,  avg: 0.50 } },
    { code: "EG", name: "Egypt",            slug: "egypt",        currency: "EGP", flag: "🇪🇬", cpmRange: { min: 0.30, max: 1.50,  avg: 0.80 },  rpmRange: { min: 0.10, max: 0.70,  avg: 0.40 } },
    { code: "NG", name: "Nigeria",          slug: "nigeria",      currency: "NGN", flag: "🇳🇬", cpmRange: { min: 0.20, max: 1.00,  avg: 0.50 },  rpmRange: { min: 0.10, max: 0.50,  avg: 0.20 } },
    { code: "PK", name: "Pakistan",         slug: "pakistan",     currency: "PKR", flag: "🇵🇰", cpmRange: { min: 0.20, max: 1.00,  avg: 0.50 },  rpmRange: { min: 0.10, max: 0.50,  avg: 0.20 } },
    { code: "BD", name: "Bangladesh",       slug: "bangladesh",   currency: "BDT", flag: "🇧🇩", cpmRange: { min: 0.20, max: 0.80,  avg: 0.40 },  rpmRange: { min: 0.10, max: 0.40,  avg: 0.20 } },
];

export interface NicheCPM {
    niche: string;
    avgCPM: { min: number; max: number; avg: number };
    topCountryCPM: { country: string; min: number; max: number };
    notes: string;
}

// Industry estimates based on aggregated creator reports and advertising benchmarks.
// Actual rates vary by audience geography, content type, and seasonality.
export const nicheCPMData: NicheCPM[] = [
    { niche: "Personal Finance & Investing",  avgCPM: { min: 12, max: 45, avg: 22 }, topCountryCPM: { country: "United States", min: 20, max: 50 }, notes: "Highest-paying niche. Mortgage, insurance, and investment ads drive premium CPMs." },
    { niche: "Business & Entrepreneurship",   avgCPM: { min: 10, max: 35, avg: 18 }, topCountryCPM: { country: "United States", min: 15, max: 40 }, notes: "SaaS and B2B advertisers pay top dollar for business-minded audiences." },
    { niche: "Digital Marketing & SEO",       avgCPM: { min: 8,  max: 22, avg: 14 }, topCountryCPM: { country: "United States", min: 12, max: 28 }, notes: "Agency and SaaS tool advertisers target marketing audiences heavily." },
    { niche: "Technology & Software Reviews", avgCPM: { min: 8,  max: 20, avg: 13 }, topCountryCPM: { country: "United States", min: 12, max: 25 }, notes: "Tech product ads and affiliate content drive solid CPMs year-round." },
    { niche: "YouTube Creator Tools & Tips",  avgCPM: { min: 5,  max: 18, avg: 10 }, topCountryCPM: { country: "United States", min: 8,  max: 22 }, notes: "SaaS and creator economy tools drive competitive CPMs." },
    { niche: "Education & Online Learning",   avgCPM: { min: 4,  max: 14, avg: 8  }, topCountryCPM: { country: "United States", min: 6,  max: 18 }, notes: "Online course and e-learning platform advertisers. Strong US audience premium." },
    { niche: "Health & Fitness",              avgCPM: { min: 4,  max: 12, avg: 7  }, topCountryCPM: { country: "United States", min: 6,  max: 15 }, notes: "Supplement and fitness equipment brands. Peaks in Q1 (New Year resolutions)." },
    { niche: "Travel & Lifestyle",            avgCPM: { min: 3,  max: 10, avg: 6  }, topCountryCPM: { country: "United States", min: 5,  max: 14 }, notes: "Hotel, airline, and credit card advertisers. Peaks in summer (Q2/Q3)." },
    { niche: "Beauty & Fashion",              avgCPM: { min: 3,  max: 10, avg: 5  }, topCountryCPM: { country: "United States", min: 4,  max: 12 }, notes: "Cosmetics and fashion brand ads. Strong female audience premium." },
    { niche: "Food & Cooking",                avgCPM: { min: 3,  max: 8,  avg: 5  }, topCountryCPM: { country: "United States", min: 4,  max: 10 }, notes: "Grocery and kitchen appliance brands. Good volume, moderate CPM." },
    { niche: "Gaming",                        avgCPM: { min: 1,  max: 6,  avg: 3  }, topCountryCPM: { country: "United States", min: 2,  max: 8  }, notes: "Young demographic = lower advertiser bids. Energy drinks and peripherals dominate." },
    { niche: "Entertainment & Comedy",        avgCPM: { min: 1,  max: 5,  avg: 2  }, topCountryCPM: { country: "United States", min: 2,  max: 6  }, notes: "Broad appeal but low advertiser specificity leads to lower CPMs." },
];

// Tier classifications for CPM data tables
export const TIERS = {
    TIER1: {
        label: "Tier 1",
        description: "Premium markets — highest advertiser spend",
        countries: ["US", "AU", "GB", "CA", "CH", "DE", "NO", "NZ", "SE", "NL", "DK", "FI", "IE", "AT", "BE", "SG", "IS", "LU", "HK"],
    },
    TIER2: {
        label: "Tier 2",
        description: "Strong markets — solid CPM rates",
        countries: ["FR", "JP", "KR", "AE", "IL", "QA", "KW", "SA", "ES", "IT", "TW", "PL", "CZ", "HU", "PT", "GR", "MY"],
    },
    TIER3: {
        label: "Tier 3",
        description: "Emerging markets — high volume, lower CPM",
        countries: ["BR", "MX", "PH", "CL", "ZA", "TH", "IN", "AR", "CO", "ID", "VN", "TR", "EG", "NG", "PK", "BD"],
    },
};

export const getCountryBySlug = (slug: string) => {
    return countryCPMData.find(c => c.slug === slug);
};
