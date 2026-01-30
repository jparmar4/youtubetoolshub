
export interface CountryCPM {
    code: string;
    name: string;
    slug: string;
    currency: string;
    flag: string;
    cpmRange: {
        min: number;
        max: number;
        avg: number;
    };
    rpmRange: {
        min: number;
        max: number;
        avg: number;
    };
}

export const countryCPMData: CountryCPM[] = [
    // Tier 1 (Highest RPM)
    {
        code: "US",
        name: "United States",
        slug: "usa",
        currency: "USD",
        flag: "🇺🇸",
        cpmRange: { min: 8.00, max: 25.00, avg: 14.50 },
        rpmRange: { min: 4.00, max: 15.00, avg: 8.50 }
    },
    {
        code: "AU",
        name: "Australia",
        slug: "australia",
        currency: "AUD",
        flag: "🇦🇺",
        cpmRange: { min: 7.50, max: 22.00, avg: 13.00 },
        rpmRange: { min: 3.50, max: 12.00, avg: 7.20 }
    },
    {
        code: "GB",
        name: "United Kingdom",
        slug: "uk",
        currency: "GBP",
        flag: "🇬🇧",
        cpmRange: { min: 6.00, max: 18.00, avg: 11.00 },
        rpmRange: { min: 3.00, max: 10.00, avg: 6.50 }
    },
    {
        code: "CA",
        name: "Canada",
        slug: "canada",
        currency: "CAD",
        flag: "🇨🇦",
        cpmRange: { min: 6.50, max: 20.00, avg: 12.00 },
        rpmRange: { min: 3.20, max: 11.00, avg: 7.00 }
    },
    {
        code: "DE",
        name: "Germany",
        slug: "germany",
        currency: "EUR",
        flag: "🇩🇪",
        cpmRange: { min: 5.50, max: 16.00, avg: 10.50 },
        rpmRange: { min: 2.80, max: 9.00, avg: 6.20 }
    },
    {
        code: "CH",
        name: "Switzerland",
        slug: "switzerland",
        currency: "CHF",
        flag: "🇨🇭",
        cpmRange: { min: 7.00, max: 21.00, avg: 13.50 },
        rpmRange: { min: 3.50, max: 12.00, avg: 7.80 }
    },
    {
        code: "NZ",
        name: "New Zealand",
        slug: "new-zealand",
        currency: "NZD",
        flag: "🇳🇿",
        cpmRange: { min: 6.00, max: 19.00, avg: 11.50 },
        rpmRange: { min: 3.00, max: 10.50, avg: 6.80 }
    },

    // Tier 2 (High/Mid)
    {
        code: "AE",
        name: "United Arab Emirates",
        slug: "uae",
        currency: "AED",
        flag: "🇦🇪",
        cpmRange: { min: 4.00, max: 12.00, avg: 7.50 },
        rpmRange: { min: 2.00, max: 6.50, avg: 4.00 }
    },
    {
        code: "FR",
        name: "France",
        slug: "france",
        currency: "EUR",
        flag: "🇫🇷",
        cpmRange: { min: 4.50, max: 14.00, avg: 8.50 },
        rpmRange: { min: 2.20, max: 7.50, avg: 4.80 }
    },
    {
        code: "JP",
        name: "Japan",
        slug: "japan",
        currency: "JPY",
        flag: "🇯🇵",
        cpmRange: { min: 3.50, max: 11.00, avg: 6.50 },
        rpmRange: { min: 1.80, max: 6.00, avg: 3.50 }
    },
    {
        code: "KR",
        name: "South Korea",
        slug: "south-korea",
        currency: "KRW",
        flag: "🇰🇷",
        cpmRange: { min: 3.50, max: 11.00, avg: 6.80 },
        rpmRange: { min: 1.80, max: 6.00, avg: 3.60 }
    },
    {
        code: "SE",
        name: "Sweden",
        slug: "sweden",
        currency: "SEK",
        flag: "🇸🇪",
        cpmRange: { min: 5.00, max: 15.00, avg: 9.50 },
        rpmRange: { min: 2.50, max: 8.00, avg: 5.20 }
    },
    {
        code: "NL",
        name: "Netherlands",
        slug: "netherlands",
        currency: "EUR",
        flag: "🇳🇱",
        cpmRange: { min: 5.00, max: 15.50, avg: 9.80 },
        rpmRange: { min: 2.60, max: 8.50, avg: 5.40 }
    },
    {
        code: "NO",
        name: "Norway",
        slug: "norway",
        currency: "NOK",
        flag: "🇳🇴",
        cpmRange: { min: 6.00, max: 18.00, avg: 11.00 },
        rpmRange: { min: 3.00, max: 10.00, avg: 6.00 }
    },

    // Tier 3 (Broad Interest)
    {
        code: "IN",
        name: "India",
        slug: "india",
        currency: "INR",
        flag: "🇮🇳",
        cpmRange: { min: 0.50, max: 3.00, avg: 1.50 },
        rpmRange: { min: 0.20, max: 1.50, avg: 0.80 }
    },
    {
        code: "BR",
        name: "Brazil",
        slug: "brazil",
        currency: "BRL",
        flag: "🇧🇷",
        cpmRange: { min: 1.00, max: 4.00, avg: 2.20 },
        rpmRange: { min: 0.50, max: 2.00, avg: 1.10 }
    },
    {
        code: "PH",
        name: "Philippines",
        slug: "philippines",
        currency: "PHP",
        flag: "🇵🇭",
        cpmRange: { min: 0.80, max: 3.50, avg: 2.00 },
        rpmRange: { min: 0.40, max: 1.80, avg: 1.00 }
    }
];

export const getCountryBySlug = (slug: string) => {
    return countryCPMData.find(c => c.slug === slug);
};
