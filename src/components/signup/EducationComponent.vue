<template>
    <div class="education-signup">
        <div>
            <div class="title-area">
                <p>학력이 어떻게 되시나요?<br />어떤 길을 걸어오셨나요? 🎓</p>
            </div>
            <div class="input-area">
                <ScrollPicker v-model="education" :options="options" />
            </div>
        </div>
        <div>
            <button class="full-width-primary-btn" :disabled="!isFilled" @click="$emit('nextStep')">확인</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.education-signup {
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

const education = ref([]);
const isFilled = computed(() => education.value);

const options = [
    [
        {
            label: '고등학교 졸업', // label에 "cm" 추가
            value: 'high_school', // value를 string으로 변환
        },
        {
            label: '대학교 재학 중', // label에 "cm" 추가
            value: 'bachelor_in_progress', // value를 string으로 변환
        },
        {
            label: '대학교 졸업', // label에 "cm" 추가
            value: 'bachelor_degree', // value를 string으로 변환
        },
        {
            label: '석사 과정 중', // label에 "cm" 추가
            value: 'master_in_progress', // value를 string으로 변환
        },
        {
            label: '석사 졸업', // label에 "cm" 추가
            value: 'master_degree', // value를 string으로 변환
        },
        {
            label: '박사 과정 중', // label에 "cm" 추가
            value: 'phd_in_progress', // value를 string으로 변환
        },
        {
            label: '박사 졸업', // label에 "cm" 추가
            value: 'phd_degree', // value를 string으로 변환
        },
        {
            label: '검정고시', // label에 "cm" 추가
            value: 'ged', // value를 string으로 변환
        },
        {
            label: '기타', // label에 "cm" 추가
            value: 'other', // value를 string으로 변환
        },
    ]
];
</script>