<template>
    <div class="gender-signup">
        <div>
            <div class="title-area">
                <p>성별을 선택해주세요!<br />뭐든 자신 있게! 😉</p>
            </div>
            <div class="input-area">
                <ScrollPicker v-model="gender" :options="options" />
            </div>
        </div>
        <div>
            <button class="full-width-primary-btn" :disabled="!isFilled" @click="$emit('nextStep')">확인</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.gender-signup {
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
import { computed, ref } from 'vue';
import ScrollPicker from 'vue3-scroll-picker';

const gender = ref([]);
const isFilled = computed(() => gender.value);

const options = [
    [{
        label: '남성', // label에 "cm" 추가
        value: 'male', // value를 string으로 변환
    },
    {
        label: '여성', // label에 "cm" 추가
        value: 'female', // value를 string으로 변환
    }]
];
</script>