import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    process.env.VUE_APP_PROJECT_URL,
    process.env.VUE_APP_ANON_KEY
)