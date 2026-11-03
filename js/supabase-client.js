
const SG_SUPABASE_URL = "https://tfujlakclyehkykcpbdf.supabase.co";
const SG_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_P4TBnmpMtiOyIHjm2OUKIQ_Zc-go-NP";

window.sgSupabaseClient = window.supabase.createClient(
    SG_SUPABASE_URL,
    SG_SUPABASE_PUBLISHABLE_KEY
);
