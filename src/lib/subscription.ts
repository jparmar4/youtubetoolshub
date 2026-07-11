import "server-only";

import { db } from "@/lib/db";

export async function hasActiveSubscription(email: string): Promise<boolean> {
  const { rows } = await db.sql`
    SELECT end_date
    FROM subscriptions
    WHERE user_email = ${email} AND status = 'active'
    LIMIT 1
  `;
  const endDate = rows[0]?.end_date ? new Date(rows[0].end_date) : null;
  return Boolean(endDate && endDate > new Date());
}
