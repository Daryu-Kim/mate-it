<template>
    <div class="body-type-signup">
        <div>
            <div class="title-area">
                <p>체형을 고를 수 있어요!<br />어떤 스타일이신가요? 💪</p>
            </div>
            <div class="input-area">
                <ScrollPicker v-model="body_type" :options="options" />
            </div>
        </div>
        <div>
            <button class="full-width-primary-btn" :disabled="!isFilled" @click="nextStep">확인</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.body-type-signup {
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

const body_type = ref([]);
const isFilled = computed(() => body_type.value);

const emit = defineEmits();

const options = [
    [
        {
            label: '마른', // label에 "cm" 추가
            value: 'slim', // value를 string으로 변환
        },
        {
            label: '슬림탄탄', // label에 "cm" 추가
            value: 'fit', // value를 string으로 변환
        },
        {
            label: '평균적인 체형', // label에 "cm" 추가
            value: 'average', // value를 string으로 변환
        },
        {
            label: '살짝 통통한', // label에 "cm" 추가
            value: 'soft', // value를 string으로 변환
        },
        {
            label: '볼륨감 있는', // label에 "cm" 추가
            value: 'curvy', // value를 string으로 변환
        },
        {
            label: '건강한 체형', // label에 "cm" 추가
            value: 'solid', // value를 string으로 변환
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
        .update({ body_type: body_type.value[0] }) // 생일 업데이트
        .eq('id', userId); // UID로 조건 설정

    if (error) {
        console.error('데이터 업데이트 오류:', error);
    } else {
        emit('nextStep'); // 이벤트 호출
    }
}
</script>