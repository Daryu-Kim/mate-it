<template>
    <div class="job-signup">
        <div>
            <div class="title-area">
                <p>지금 하시는 일은 뭔가요?<br />멋진 직업이 궁금해요! 💼</p>
            </div>
            <div class="input-area">
                <ScrollPicker v-model="job" :options="options" />
            </div>
        </div>
        <div>
            <button class="full-width-primary-btn" :disabled="!isFilled" @click="nextStep">확인</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.job-signup {
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

const job = ref([]);
const isFilled = computed(() => job.value);

const emit = defineEmits();

const options = [
    [
        {
            "label": "학생",
            "value": "student"
        },
        {
            "label": "회사원",
            "value": "office_worker"
        },
        {
            "label": "프리랜서",
            "value": "freelancer"
        },
        {
            "label": "사업가",
            "value": "entrepreneur"
        },
        {
            "label": "공무원",
            "value": "public_servant"
        },
        {
            "label": "엔지니어 / 개발자",
            "value": "engineer"
        },
        {
            "label": "디자이너",
            "value": "designer"
        },
        {
            "label": "의료계 종사자",
            "value": "healthcare_worker"
        },
        {
            "label": "예술가 / 크리에이터",
            "value": "artist"
        },
        {
            "label": "교사 / 교수",
            "value": "teacher"
        },
        {
            "label": "서비스업",
            "value": "service_industry"
        },
        {
            "label": "금융 / 법률직",
            "value": "finance_legal"
        },
        {
            "label": "연구원",
            "value": "researcher"
        },
        {
            "label": "운동선수 / 트레이너",
            "value": "athlete_trainer"
        },
        {
            "label": "무직",
            "value": "unemployed"
        },
        {
            "label": "기타",
            "value": "other_job"
        }
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
        .update({ job: job.value[0] }) // 생일 업데이트
        .eq('id', userId); // UID로 조건 설정

    if (error) {
        console.error('데이터 업데이트 오류:', error);
    } else {
        emit('nextStep'); // 이벤트 호출
    }
}
</script>