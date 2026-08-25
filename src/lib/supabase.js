import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rwlnmawflgsssfzxnbki.supabase.co";

const supabaseAnonKey = "sb_publishable_FZgVH2yYpaOrqmX81dmRxQ_AKPFHhx8";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);