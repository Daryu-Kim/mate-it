<template>
    <div class="smoking-signup">
        <div>
            <div class="title-area">
                <p>흡연은 하시나요?<br />아니면 거리 두는 편인가요? 🚬❌</p>
            </div>
            <div class="input-area">
                <ScrollPicker v-model="smoking" :options="options" />
            </div>
        </div>
        <div>
            <button class="full-width-primary-btn" :disabled="!isFilled" @click="nextStep">확인</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.smoking-signup {
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

const smoking = ref([]);
const isFilled = computed(() => smoking.value);

const emit = defineEmits();

const options = [
    [
        {
            "label": "비흡연자",
            "value": "non_smoker"
        },
        {
            "label": "가끔 피움",
            "value": "occasionally"
        },
        {
            "label": "자주 피움",
            "value": "frequent_smoker"
        },
        {
            "label": "전자담배만 피움",
            "value": "only_vaping"
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
        .update({ smoking: smoking.value[0] }) // 생일 업데이트
        .eq('id', userId); // UID로 조건 설정

    if (error) {
        console.error('데이터 업데이트 오류:', error);
    } else {
        emit('nextStep'); // 이벤트 호출
    }
}
</script>