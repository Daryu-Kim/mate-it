<template>
    <div class="education-signup">
        <div>
            <div class="title-area">
                <p>학력이 어떻게 되시나요?<br />어떤 길을 걸어오셨나요? 🎓</p>
            </div>
            <div class="input-area">
                <ScrollPicker v-model="education" :options="options" />
            </div>
        </div>
        <div>
            <button class="full-width-primary-btn" :disabled="!isFilled" @click="nextStep">확인</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.education-signup {
    padding: 36px 24px;
    padding-top: 64px;
    height: calc(100dvh - 16px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    >div {
        >.title-area {
            >p {
                word-break: keep-all;
                font-weight: 700;
                font-size: 24px;
                text-align: start;
            }
        }

        >.input-area {
            margin-top: 24px;
        }

        >button {
            font-weight: 700;
            font-size: 16px;
        }
    }
}
</style>

<script setup lang="js">
import { supabase } from '@/lib/supabase';
import { computed, ref, defineEmits } from 'vue';
import ScrollPicker from 'vue3-scroll-picker';

const education = ref([]);
const isFilled = computed(() => education.value);

const emit = defineEmits();

const options = [
    [
        {
            label: '고등학교 졸업', // label에 "cm" 추가
            value: 'high_school', // value를 string으로 변환
        },
        {
            label: '대학교 재학 중', // label에 "cm" 추가
            value: 'bachelor_in_progress', // value를 string으로 변환
        },
        {
            label: '대학교 졸업', // label에 "cm" 추가
            value: 'bachelor_degree', // value를 string으로 변환
        },
        {
            label: '석사 과정 중', // label에 "cm" 추가
            value: 'master_in_progress', // value를 string으로 변환
        },
        {
            label: '석사 졸업', // label에 "cm" 추가
            value: 'master_degree', // value를 string으로 변환
        },
        {
            label: '박사 과정 중', // label에 "cm" 추가
            value: 'phd_in_progress', // value를 string으로 변환
        },
        {
            label: '박사 졸업', // label에 "cm" 추가
            value: 'phd_degree', // value를 string으로 변환
        },
        {
            label: '검정고시', // label에 "cm" 추가
            value: 'ged', // value를 string으로 변환
        },
        {
            label: '기타', // label에 "cm" 추가
            value: 'other', // value를 string으로 변환
        },
    ]
];

const nextStep = async () => {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession(); // 현재 세션 정보 가져오기

    if (sessionError || !session || !session.user) {
        console.error('세션 정보가 유효하지 않습니다.');
        return; // 세션 정보가 없으면 함수 종료
    }

    const userId = session.user.id; // UID 가져오기

    const { error } = await supabase
        .from('users')
        .update({ education: education.value[0] }) // 생일 업데이트
        .eq('id', userId); // UID로 조건 설정

    if (error) {
        console.error('데이터 업데이트 오류:', error);
    } else {
        emit('nextStep'); // 이벤트 호출
    }
}
</script>