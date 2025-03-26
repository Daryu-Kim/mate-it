<template>
    <div class="height-signup">
        <div>
            <div class="title-area">
                <p>당신의 키를 알려주세요.</p>
            </div>
            <div class="input-area">
                <ScrollPicker v-model="height" :options="options" />
            </div>
        </div>
        <div>
            <button class="full-width-primary-btn" :disabled="!isFilled" @click="$emit('nextStep')">확인</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.height-signup {
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

const height = ref([]);
const isFilled = computed(() => height.value);

const options =
    [Array.from({ length: 61 }, (_, index) => {
        const heightValue = index + 140; // 140부터 200까지의 값 생성
        return {
            label: `${heightValue} cm`, // label에 "cm" 추가
            value: heightValue.toString(), // value를 string으로 변환
        };
    })];
</script>