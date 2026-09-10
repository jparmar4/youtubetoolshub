/** Strict decimal input: reject partial parses, negatives and non-finite values. */
export function parseCalculatorInput(value: string): number {
    const text = value.trim();
    if (!text) return 0;
    if (!/^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(text)) return NaN;
    const number = Number(text.replace(/,/g, ""));
    return Number.isFinite(number) && number <= 1e12 ? number : NaN;
}
