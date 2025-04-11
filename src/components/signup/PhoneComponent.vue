<template>
    <div class="phone-signup">
        <div>
            <div class="title-area">
                <p>매칭 알림을 보내드릴게요!<br />휴대폰 번호를 입력해주세요!📱</p>
            </div>
            <div class="input-area">
                <input type="text" maxlength="11" v-model="phone" @keypress="allowOnlyNumbers"
                    placeholder="ex) 01012345678" inputmode="numeric" pattern="[0-9]*">
            </div>
        </div>
        <div>
            <button class="full-width-primary-btn" :disabled="!isFilled" @click="nextStep">확인</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.phone-signup {
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

const phone = ref(''); // formattedPhone을 ref로 변경
const isFilled = computed(() => /^010\d{8}$/.test(phone.value)); // 형식 검증

const allowOnlyNumbers = (event) => {
    const char = String.fromCharCode(event.which);
    if (!/[0-9]/.test(char)) {
        event.preventDefault(); // 숫자가 아닌 경우 입력 방지
    }
}

const nextStep = async () => {
    // Supabase 클라이언트 가져오기
    const { data: { session }, error: sessionError } = await supabase.auth.getSession(); // 현재 세션 정보 가져오기

    if (sessionError || !session || !session.user) {
        console.error('세션 정보가 유효하지 않습니다.');
        return; // 세션 정보가 없으면 함수 종료
    }

    const userId = session.user.id; // UID 가져오기

    const { error } = await supabase
        .from('users')
        .update({ phone: phone.value }) // 전화번호 업데이트
        .eq('id', userId); // UID로 조건 설정

    if (error) {
        console.error('데이터 업데이트 오류:', error);
    } else {
        emit('nextStep'); // 이벤트 호출
    }
}

</script>
