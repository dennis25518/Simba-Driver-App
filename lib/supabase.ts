import { createClient } from "@supabase/supabase-js";

// Replace these with your actual Supabase credentials
const SUPABASE_URL = "https://cmsqvcqddnefquxzchxy.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_-gvIarUYmwzVVMv2jQiotQ_IM2PVtKg";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
