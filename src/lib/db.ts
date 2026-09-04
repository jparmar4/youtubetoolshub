import mysql, { RowDataPacket } from "mysql2/promise";

let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
    if (!pool) {
        const host = process.env.MYSQL_HOST || process.env.DB_HOST || "localhost";
        const user = process.env.MYSQL_USER || process.env.DB_USER || "u393706093_yuvraj";
        const password = process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || "Yuvraj@382017";
        const database = process.env.MYSQL_DATABASE || process.env.DB_NAME || "u393706093_yuvi";
        const port = Number(process.env.MYSQL_PORT || process.env.DB_PORT || 3306);
        const connectionUrl = process.env.MYSQL_URL || process.env.DATABASE_URL;

        if (connectionUrl && connectionUrl.startsWith("mysql://")) {
            pool = mysql.createPool(connectionUrl);
        } else {
            pool = mysql.createPool({
                host,
                user,
                password,
                database,
                port,
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0,
                enableKeepAlive: true,
                connectTimeout: 10000,
            });
        }

        // Auto-recover if Hostinger drops idle connection
        const underlyingPool = (pool as unknown as { pool?: { on?: (event: string, fn: (err: { code?: string }) => void) => void } })?.pool;
        if (underlyingPool?.on) {
            underlyingPool.on("error", (err) => {
                console.error("MySQL connection pool error:", err);
                if (err?.code === "PROTOCOL_CONNECTION_LOST" || err?.code === "ECONNRESET") {
                    pool = null;
                }
            });
        }
    }
    return pool;
}

export interface DbRow {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export async function sql<T = DbRow>(
    strings: TemplateStringsArray,
    ...values: unknown[]
): Promise<{ rows: T[] }> {
    if (!tablesEnsured) {
        await ensureTablesExist().catch(() => {});
    }

    let queryText = "";
    const params: unknown[] = [];

    for (let i = 0; i < strings.length; i++) {
        queryText += strings[i];
        if (i < values.length) {
            queryText += "?";
            params.push(values[i]);
        }
    }

    const currentPool = getPool();
    const [result] = await currentPool.query<RowDataPacket[]>(queryText, params);
    return { rows: Array.isArray(result) ? (result as unknown as T[]) : [] };
}

export const db = {
    sql,
    query: async <T = DbRow>(
        queryText: string,
        params: unknown[] = []
    ): Promise<{ rows: T[] }> => {
        if (!tablesEnsured) {
            await ensureTablesExist().catch(() => {});
        }
        const currentPool = getPool();
        const [result] = await currentPool.query<RowDataPacket[]>(queryText, params);
        return { rows: Array.isArray(result) ? (result as unknown as T[]) : [] };
    },
    getPool,
};

let tablesEnsured = false;
let tablesPromise: Promise<void> | null = null;

// Helper to ensure MySQL tables exist
export async function ensureTablesExist() {
    if (tablesEnsured) return;
    if (tablesPromise) return tablesPromise;

    tablesPromise = (async () => {
        try {
            const currentPool = getPool();

            await currentPool.query(`
                CREATE TABLE IF NOT EXISTS history_items (
                    id VARCHAR(36) PRIMARY KEY,
                    user_email VARCHAR(255) NOT NULL,
                    tool_slug VARCHAR(100) NOT NULL,
                    content JSON NOT NULL,
                    type VARCHAR(50) DEFAULT 'other',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    expires_at TIMESTAMP NULL,
                    INDEX idx_history_user_email (user_email),
                    INDEX idx_history_expires_at (expires_at)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
            `);

            await currentPool.query(`
                CREATE TABLE IF NOT EXISTS user_usage (
                    user_email VARCHAR(255) PRIMARY KEY,
                    date DATE NOT NULL,
                    usage_data JSON NULL
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
            `);

            await currentPool.query(`
                CREATE TABLE IF NOT EXISTS subscriptions (
                    user_email VARCHAR(255) PRIMARY KEY,
                    plan VARCHAR(50) NOT NULL,
                    status VARCHAR(50) NOT NULL,
                    start_date TIMESTAMP NULL,
                    end_date TIMESTAMP NULL,
                    payment_id VARCHAR(100) NULL,
                    INDEX idx_sub_status (status)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
            `);

            await currentPool.query(`
                CREATE TABLE IF NOT EXISTS newsletter_subscribers (
                    email VARCHAR(255) PRIMARY KEY,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    source VARCHAR(255) DEFAULT 'website'
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
            `);

            tablesEnsured = true;
            console.log("[Database] MySQL tables verified and initialized.");
        } catch (error) {
            console.error("[Database] Error initializing MySQL tables:", error);
        } finally {
            tablesPromise = null;
        }
    })();

    return tablesPromise;
}
