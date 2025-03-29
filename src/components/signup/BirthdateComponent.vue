<template>
    <div class="birthdate-signup">
        <div>
            <div class="title-area">
                <p>언제 태어나셨나요?<br />생일을 알려주세요! 🎂</p>
            </div>
            <div class="input-area">
                <ScrollPicker v-model="selections" :options="options" />
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
            padding: 8px 16px;
        }

        >button {
            font-weight: 700;
            font-size: 16px;
        }
    }
}
</style>

<script setup lang="js">
import { ref, computed, watch } from 'vue';
import ScrollPicker from 'vue3-scroll-picker';

const currentYear = new Date().getFullYear();
const startYear = currentYear - 39; // 39세
const endYear = currentYear - 16; // 16세

const selections = ref([]);
const isFilled = computed(() => selections.value);

const dayOptions = computed(() => {
    const selectedYear = selections.value[0]; // 선택된 연도
    const selectedMonth = selections.value[1]; // 선택된 월

    if (selectedYear && selectedMonth) {
        const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate(); // 해당 월의 일 수 계산
        return Array.from({ length: daysInMonth }, (_, index) => {
            const day = index + 1; // 1부터 해당 월의 일 수까지 생성
            return {
                label: `${day}일`, // 일 label
                value: day.toString(), // 일 value
            };
        });
    }
    return []; // 연도와 월이 선택되지 않은 경우 빈 배열 반환
});

const options = ref([
    Array.from({ length: endYear - startYear + 1 }, (_, index) => {
        const year = startYear + index; // 연도 생성
        return {
            label: `${year.toString()}년`,
            value: year.toString(), // 연도 value
        };
    }),
    Array.from({ length: 12 }, (_, index) => {
        const month = index + 1; // 1부터 12까지의 월 생성
        return {
            label: `${month.toString()}월`,
            value: month.toString(), // 월 value
        };
    }),
    [] // 초기값을 빈 배열로 설정
]);

// options 배열에서 일 수를 동적으로 업데이트
watch(selections, (newSelections) => {
    if (newSelections[0] && newSelections[1]) {
        options.value[2] = dayOptions.value.length > 0 ? dayOptions.value : []; // 일 수 업데이트
    }
});

</script>
