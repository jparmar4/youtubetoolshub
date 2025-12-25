
import { sql } from '@vercel/postgres';

export const db = sql;

// Helper to ensure tables exist (optional, can be run once or on each start if lightweight)
export async function ensureTablesExist() {
    try {
        await sql`
      CREATE TABLE IF NOT EXISTS history_items (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_email TEXT NOT NULL,
        tool_slug TEXT NOT NULL,
        content JSONB NOT NULL,
        type TEXT DEFAULT 'other',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP WITH TIME ZONE
      );
    `;

        await sql`
      CREATE TABLE IF NOT EXISTS user_usage (
        user_email TEXT PRIMARY KEY,
        date DATE NOT NULL,
        usage_data JSONB DEFAULT '{}'::jsonb
      );
    `;

        await sql`
      CREATE TABLE IF NOT EXISTS subscriptions (
         user_email TEXT PRIMARY KEY,
         plan TEXT NOT NULL,
         status TEXT NOT NULL,
         start_date TIMESTAMP WITH TIME ZONE,
         end_date TIMESTAMP WITH TIME ZONE,
         payment_id TEXT
      );
    `;
        console.log("Tables ensured.");
    } catch (error) {
        console.error("Error ensuring tables:", error);
    }
}
