<template>
    <div class="birthdate-signup">
        <div>
            <div class="title-area">
                <p>당신의 생일을 알려주세요.</p>
            </div>
            <input type="date" v-model="birth" :max="maxDate" />
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

        >input[type=date] {
            width: 100%;
            margin-top: 24px;
            padding: 8px 16px;
            font-weight: 700;
            font-size: 16px;
        }

        >button {
            font-weight: 700;
            font-size: 16px;
        }
    }
}
</style>

<script setup lang="js">
import { computed, onMounted, ref } from 'vue';

const birth = ref("");

const maxDate = computed(() => {
    const today = new Date();
    const maxYear = today.getFullYear() - 15;
    return `${maxYear}-12-31`;
})
const isFilled = computed(() => birth.value)
</script>