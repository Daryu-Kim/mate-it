import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VUE_APP_SUPABASE_URL
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)

export async function getCurrentSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
        console.error("세션 가져오기 에러: ", error);
        return null;
    }
    return session;
}

export async function loginWithSocialAccount(provider) {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
    });
    if (error) {
        return null;
    }
    return data;
}