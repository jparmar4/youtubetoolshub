
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://iqptjztvmntdmtkfdbbd.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_aqhDiR0dec6EKcQOXx8png_W9eIb-g5";

if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase credentials missing. History feature will not work.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
