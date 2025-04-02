<template>
    <div class="bio-signup">
        <div>
            <div class="title-area">
                <p class="title">현재 관리자가 심사 진행 중입니다!<br />승인되면 알림을 보내드릴게요! 🔔</p>
            </div>
            <div class="input-area">
                <div class="image gradient-border" :style="{ backgroundImage: `url(${currentImage})` }"></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.bio-signup {
    padding: 36px 24px;
    padding-top: 64px;
    height: calc(100dvh - 16px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    >div {
        >.title-area {
            >.title {
                word-break: keep-all;
                font-weight: 700;
                font-size: 24px;
                text-align: start;
            }
        }

        >.input-area {
            margin-top: 64px;

            >.image {
                width: 240px;
                aspect-ratio: 1 / 1;
                border-radius: 50%;
                position: relative;
                box-shadow: 0 0 0 2px transparent;
                background-clip: padding-box;
                -webkit-background-clip: padding-box;
                margin: 0 auto;
                transition: background-image 1s ease-in-out;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center center;

                &::before {
                    content: '';
                    position: absolute;
                    top: -4px;
                    left: -4px;
                    right: -4px;
                    bottom: -4px;
                    background-image: linear-gradient(45deg, #2af598 0%, #009efd 100%);
                    border-radius: 50%;
                    z-index: -1;
                }
            }
        }
    }
}
</style>

<script setup lang="js">
import { supabase } from '@/lib/supabase';
import { ref, onMounted } from 'vue';
const images = ref([]);

const currentImageIndex = ref(0);
const currentImage = ref('');

const fetchUserAvatars = async () => {
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession(); // 현재 세션 정보 가져오기

        if (sessionError || !session || !session.user) {
            console.error('세션 정보가 유효하지 않습니다.');
            return; // 세션 정보가 없으면 함수 종료
        }

        const user = session.user;
        const userId = user.id; // UID 가져오기

        const { data, error } = await supabase
            .from('users')
            .select('avatar_main, avatar_sub')
            .eq('id', userId)
            .single();

        if (error) throw error;

        // avatar_main과 avatar_sub 필드에서 URL을 가져와 images 배열에 추가
        if (Array.isArray(data.avatar_main)) {
            images.value.push(...data.avatar_main);
        }
        if (Array.isArray(data.avatar_sub)) {
            images.value.push(...data.avatar_sub);
        }

        // 첫 번째 이미지 설정
        if (images.value.length > 0) {
            currentImage.value = images.value[currentImageIndex.value];
        }
        console.log(data)
    } catch (error) {
        console.error('사용자 아바타를 불러오는 중 오류 발생:', error);
    }
};

const changeImage = () => {
    if (images.value.length > 0) {
        currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length;
        currentImage.value = images.value[currentImageIndex.value];
    }
};

onMounted(() => {
    fetchUserAvatars(); // 컴포넌트가 마운트될 때 사용자 아바타를 불러옴
    setInterval(changeImage, 2000); // 2초마다 이미지 변경
});
</script>
