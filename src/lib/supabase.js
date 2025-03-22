import router from '@/router';
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

// 필수 입력 필드 목록
const requiredFields = [
    'birthdate', 'gender', 'avatar_main', 'bio', 'height', 'body_type',
    'education', 'job', 'religion', 'drinking', 'smoking', 'mbti',
    'personality', 'interests', 'fav_music', 'fav_movie',
    'looking_for', 'ideal_type'
];

export async function loginWithSocialAccount(provider) {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
    });

    if (error) {
        console.error('소셜 로그인 실패:', error.message);
        return null;
    }

    // 로그인 후 세션 가져오기
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !sessionData.session) {
        console.error('세션을 가져올 수 없습니다:', sessionError?.message);
        return null;
    }

    const user = sessionData.session.user;
    const userId = user.id;

    // `users` 테이블에서 사용자 정보 조회
    const { data: userProfile, error: usersError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

    if (usersError || !userProfile) {
        // (C) 데이터가 없으면 새 계정 생성 후 회원가입 페이지로 이동
        await supabase.from('users').insert([{ id: userId, email: user.email }]);
        await supabase.from('user_status').insert([{ user_id: userId }]);
        router.push('/signup');
        return;
    }

    // (B) 필수 필드 개별 체크 후 해당 페이지로 리디렉션
    for (const field of requiredFields) {
        if (!userProfile[field.key]) {
            router.push(field.path);
            return;
        }
    }

    // (A) 모든 필수 정보가 입력되었으면 홈으로 이동
    router.push('/home');
}