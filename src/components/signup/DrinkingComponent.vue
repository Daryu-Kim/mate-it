<template>
    <div class="drinking-signup">
        <div>
            <div class="title-area">
                <p>술 한잔 즐기시나요?<br />아니면 깔끔한 스타일? 🍷🚫</p>
            </div>
            <div class="input-area">
                <ScrollPicker v-model="drinking" :options="options" />
            </div>
        </div>
        <div>
            <button class="full-width-primary-btn" :disabled="!isFilled" @click="$emit('nextStep')">확인</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.drinking-signup {
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

const drinking = ref([]);
const isFilled = computed(() => drinking.value);

const options = [
    [
        {
            "label": "전혀 안 마심",
            "value": "never"
        },
        {
            "label": "가끔 기분 낼 때만",
            "value": "occasionally"
        },
        {
            "label": "사교적으로 즐김",
            "value": "social_drinker"
        },
        {
            "label": "자주 마심",
            "value": "frequent_drinker"
        }
    ]
];
</script>