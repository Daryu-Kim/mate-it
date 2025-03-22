<template>
    <div class="birthdate-signup">
        <div>
            <div class="title-area">
                <p>당신의 성별을 알려주세요.</p>
            </div>
            <div class="gender-area">
                <input id="male" name="gender" type="radio" value="male" class="d-none" v-model="gender" />
                <label for="male">
                    <svg xmlns="http://www.w3.org/2000/svg" height="64px" viewBox="0 -960 960 960" width="64px"
                        fill="black">
                        <path
                            d="M800-800v240h-80v-103L561-505q19 28 29 59.5t10 65.5q0 92-64 156t-156 64q-92 0-156-64t-64-156q0-92 64-156t156-64q33 0 65 9.5t59 29.5l159-159H560v-80h240ZM380-520q-58 0-99 41t-41 99q0 58 41 99t99 41q58 0 99-41t41-99q0-58-41-99t-99-41Z" />
                    </svg>
                    <p>남성</p>
                </label>
                <input id="female" name="gender" type="radio" value="female" class="d-none" v-model="gender" />
                <label for="female">
                    <svg xmlns="http://www.w3.org/2000/svg" height="64px" viewBox="0 -960 960 960" width="64px"
                        fill="black">
                        <path
                            d="M440-120v-80h-80v-80h80v-84q-79-14-129.5-75.5T260-582q0-91 64.5-154.5T480-800q91 0 155.5 63.5T700-582q0 81-50.5 142.5T520-364v84h80v80h-80v80h-80Zm40-320q58 0 99-41t41-99q0-58-41-99t-99-41q-58 0-99 41t-41 99q0 58 41 99t99 41Z" />
                    </svg>
                    <p>여성</p>
                </label>
            </div>
        </div>
        <div>
            <button class="full-width-primary-btn" :disabled="!isFilled" @click="$emit('nextStep')">확인</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.birthdate-signup {
    padding: 36px 24px;
    padding-top: 64px;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    >div {
        >.title-area {
            >p {
                word-break: keep-all;
                font-weight: 700;
                font-size: 28px;
                text-align: start;
            }
        }

        >.gender-area {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-top: 24px;

            >label {
                flex: 1;
                aspect-ratio: 1 / 1;
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: center;
                border: 2px solid black;
                cursor: pointer;
                border-radius: 8px;

                >p {
                    font-weight: 700;
                    margin-top: 8px;
                    font-size: 24px;
                }
            }

            input:checked+label {
                background-color: black;

                >p {
                    color: white;
                }

                >svg {
                    fill: white;
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
import { computed, ref } from 'vue';

const gender = ref("");
const isFilled = computed(() => gender.value)
</script>