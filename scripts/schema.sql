-- ==============================================================================
-- YouTube Tools Hub - Hostinger MySQL Database Schema
-- Database: u393706093_yuvi
-- ==============================================================================

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

CREATE TABLE IF NOT EXISTS user_usage (
    user_email VARCHAR(255) PRIMARY KEY,
    date DATE NOT NULL,
    usage_data JSON NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS subscriptions (
    user_email VARCHAR(255) PRIMARY KEY,
    plan VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    start_date TIMESTAMP NULL,
    end_date TIMESTAMP NULL,
    payment_id VARCHAR(100) NULL,
    INDEX idx_sub_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    email VARCHAR(255) PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    source VARCHAR(255) DEFAULT 'website'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
