<template>
    <div class="nickname-signup">
        <div>
            <div class="title-area">
                <p>닉네임을 정해주세요!<br />당신을 표현할 멋진 이름! ✨</p>
            </div>
            <div class="input-area">
                <input type="text" maxlength="10" v-model="nickname" placeholder="최소 2글자, 10자 내외로 입력해주세요" />
            </div>
        </div>
        <div>
            <button class="full-width-primary-btn" :disabled="!isFilled" @click="nextStep">확인</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.nickname-signup {
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

            >input {
                width: 100%;
                font-weight: 700;
                padding: 16px;
                font-size: 16px;
                background-color: #efefef;
                border: none;
                border-radius: 8px;

                &:focus {
                    background-color: white;
                }

            }
        }

        >button {
            font-weight: 700;
            font-size: 16px;
        }
    }
}
</style>

<script setup lang="js">
import { ref, computed, defineEmits } from 'vue';
import { supabase } from '../../lib/supabase';

const emit = defineEmits(); // 이벤트 정의

const nickname = ref('');
const isFilled = computed(() => nickname.value.length >= 2);

const nextStep = async () => {
    // Supabase 클라이언트 가져오기
    const { data: { session }, error: sessionError } = await supabase.auth.getSession(); // 현재 세션 정보 가져오기

    if (sessionError || !session || !session.user) {
        console.error('세션 정보가 유효하지 않습니다.');
        return; // 세션 정보가 없으면 함수 종료
    }

    alert(session.user.id)

    const userId = session.user.id; // UID 가져오기

    const { error } = await supabase
        .from('users')
        .update({ username: nickname.value }) // 닉네임 업데이트
        .eq('id', userId); // UID로 조건 설정

    alert(error)

    if (error) {
        console.error('데이터 업데이트 오류:', error);
    } else {
        emit('nextStep'); // 이벤트 호출
    }
}

</script>
