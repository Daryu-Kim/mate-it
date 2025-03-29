<template>
    <div class="nickname-signup">
        <div>
            <div class="title-area">
                <p>닉네임을 정해주세요!<br />당신을 표현할 멋진 이름! ✨</p>
            </div>
            <div class="input-area">
                <input type="text" maxlength="10" v-model="nickname" placeholder="10자 내외로 입력해주세요" />
            </div>
        </div>
        <div>
            <button class="full-width-primary-btn" :disabled="!isFilled" @click="$emit('nextStep')">확인</button>
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
import { ref, computed } from 'vue';

const nickname = ref([]);
const isFilled = computed(() => nickname.value.length > 0);

</script>
