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
            <button class="full-width-primary-btn" :disabled="!isFilled" @click="$emit('nextStep')">확인</button>
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
import { computed, ref } from 'vue';
import ScrollPicker from 'vue3-scroll-picker';

const smoking = ref([]);
const isFilled = computed(() => smoking.value);

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
</script>