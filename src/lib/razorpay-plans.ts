/**
 * Single source of truth for Razorpay plan IDs and their canonical DB names.
 * Previously three routes re-declared these (with two different plan
 * vocabularies: "monthly"/"yearly" vs "pro-monthly"/"pro-yearly") and the
 * webhook guessed the plan by substring-matching an ID — both drift hazards.
 */

export const RAZORPAY_PLAN_IDS = {
  monthly: "plan_RoHllplN8oKLO6",
  yearly: "plan_RoHnfy0vCII0Gq",
} as const;

export type RazorpayPlanKey = keyof typeof RAZORPAY_PLAN_IDS;

/** Canonical `subscriptions.plan` values written to MySQL. */
export type CanonicalPlanName = "pro-monthly" | "pro-yearly";

/** Map a Razorpay plan_id to its canonical DB name; null when unknown. */
export function planIdToCanonical(
  planId: string | undefined | null,
): CanonicalPlanName | null {
  if (planId === RAZORPAY_PLAN_IDS.yearly) return "pro-yearly";
  if (planId === RAZORPAY_PLAN_IDS.monthly) return "pro-monthly";
  return null;
}
