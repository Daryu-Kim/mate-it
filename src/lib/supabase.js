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
    'username', 'birthdate', 'gender', 'address', 'height', 'body_type',
    'education', 'job', 'religion', 'drinking', 'smoking', 'mbti',
    'personality', 'interests', 'fav_music', 'fav_movie',
    'ideal_type', 'looking_for', 'bio', 'avatar_main', 'is_verified'
];

export async function loginWithSocialAccount(provider) {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider
    });

    if (error) {
        console.error('소셜 로그인 실패:', error.message);
        return null;
    }
}

export async function checkUserData() {
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session) {
            console.error('세션을 가져올 수 없습니다:', sessionError?.message);
            return null;
        }

        const { user } = session;
        
        // 1. 사용자 프로필 확인
        const { data: userProfile, error: usersError } = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single();

        if (usersError || !userProfile) {
            await createNewUser(user);
            return;
        }

        // 3. 필수 필드 검증
        const missingField = requiredFields.find(field => !userProfile[field]);
        if (missingField) {
            router.push(`/signup?step=${requiredFields.indexOf(missingField) + 1}`);
            return;
        }

    } catch (error) {
        console.error('사용자 데이터 확인 중 오류 발생:', error);
        return null;
    }
}

// 새 사용자 생성 및 위치 정보 저장을 위한 별도 함수
async function createNewUser(user) {
    try {
        const { error: insertError } = await supabase
            .from('users')
            .insert([{ id: user.id, email: user.email }]);

        if (insertError) {
            throw new Error(`사용자 생성 실패: ${insertError.message}`);
        }

        router.push('/signup');
    } catch (error) {
        console.error('새 사용자 생성 중 오류 발생:', error);
        throw error;
    }
}

export async function createMatchCards() {
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session) {
            console.error('세션을 가져올 수 없습니다:', sessionError?.message);
            return null;
        }
        const currentUid = session.user.id;

        const { data: currentUser, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', currentUid)
            .single();
        if (userError) throw userError;

        const currentUserAge = calculateAge(currentUser.birthdate);
        const minAge = currentUserAge - 5;
        const maxAge = currentUserAge + 5;
        const targetGender = currentUser.gender === 'male' ? 'female' : 'male';
        const currentAddress = currentUser.address;

        const { data: filteredUsers, error: filteredError } = await supabase
            .from('users')
            .select('*')
            .not('id', 'eq', currentUid)
            .eq('gender', targetGender);

        if (filteredError) throw filteredError;

        const ageFilteredUsers = filteredUsers.filter(user => {
            const userAge = calculateAge(user.birthdate);
            return userAge >= minAge && userAge <= maxAge;
        });

        // 위치 기반 필터링
        const locationFilteredUsers = ageFilteredUsers.map(user => {
            const userAddress = user.address;
            let location_score = 0;
            console.log(currentAddress, userAddress)

            // 첫 번째 주소(시/도)가 같은 경우
            if (currentAddress[0] === userAddress[0]) {
                location_score++;
            }

            // 두 번째 주소(시/군/구)가 같은 경우
            if (currentAddress[1] === userAddress[1]) {
                location_score++;
            }

            return {
                ...user,
                location_score: location_score
            };
        });

        // 위치 점수에 따라 정렬 (높은 점수 순)
        const sortedUsers = locationFilteredUsers.sort((a, b) => b.location_score - a.location_score);

        // 각 점수별로 그룹화
        const groupedUsers = {
            2: sortedUsers.filter(user => user.location_score === 2),
            1: sortedUsers.filter(user => user.location_score === 1),
            0: sortedUsers.filter(user => user.location_score === 0)
        };

        // 각 그룹에서 무작위로 4명 선택 (location_score 순서 유지)
        const selectedUsers = [];
        for (const score of [2, 1, 0]) {
            const group = groupedUsers[score];
            const shuffled = [...group].sort(() => Math.random() - 0.5);
            selectedUsers.push(...shuffled.slice(0, 4));
        }
        
        const { error: insertError } = await supabase
            .from('user_matches')
            .insert(
                selectedUsers.map(user => ({
                    user_id: currentUid,
                    match_id: user.id,
                    location_score: user.location_score
                }))
            );

        if (insertError) {
            throw new Error(`매치 카드 생성 실패: ${insertError.message}`)
        }
    } catch (error) {
        console.error('사용자 데이터 가져오기 실패', error);
    }
}

export function calculateAge(birthdate) {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}