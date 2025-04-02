<template>
    <div class="looking-for-signup">
        <div>
            <div class="title-area">
                <p>어떤 인연을 찾고 계신가요?<br />편하게 알려주세요! 😊</p>
            </div>
            <div class="input-area">
                <ScrollPicker v-model="looking_for" :options="options" />
            </div>
        </div>
        <div>
            <button class="full-width-primary-btn" :disabled="!isFilled" @click="nextStep">확인</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.looking-for-signup {
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

const looking_for = ref([]);
const isFilled = computed(() => looking_for.value);

const emit = defineEmits();

const options = [
    [
        {
            "label": "잘 맞는 친구 찾는 중!",
            "value": "finding_friend"
        },
        {
            "label": "친구도, 연애도 OK.",
            "value": "friend_or_dating"
        },
        {
            "label": "진지한 연애 원해요.",
            "value": "serious_relationship"
        },
        {
            "label": "아직 고민 중!",
            "value": "not_sure_yet"
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
        .update({ looking_for: looking_for.value[0] }) // 생일 업데이트
        .eq('id', userId); // UID로 조건 설정

    if (error) {
        console.error('데이터 업데이트 오류:', error);
    } else {
        emit('nextStep'); // 이벤트 호출
    }
}
</script>