import "server-only";

import { db } from "@/lib/db";

/**
 * A subscription grants access until the end of the paid period, even after
 * cancellation: Razorpay fires `subscription.cancelled` when auto-renew is
 * turned off, but the user has already paid through `end_date`. Revoking
 * access the moment `status` flips would take days the user paid for.
 * (Constant list, safe to inline.)
 */
const GRANTING_STATUSES_SQL = `('active', 'cancelled', 'halted')`;

export async function hasActiveSubscription(email: string): Promise<boolean> {
  try {
    const { rows } = await db.sql`
      SELECT end_date
      FROM subscriptions
      WHERE user_email = ${email}
        AND status IN ${GRANTING_STATUSES_SQL}
        AND end_date > NOW()
      LIMIT 1
    `;
    const endDate = rows[0]?.end_date ? new Date(rows[0].end_date) : null;
    return Boolean(endDate && endDate > new Date());
  } catch (error) {
    console.error("[Subscription] Error checking subscription status (defaulting to free):", error);
    return false;
  }
}
