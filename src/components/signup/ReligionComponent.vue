<template>
    <div class="religion-signup">
        <div>
            <div class="title-area">
                <p>종교가 있으신가요?<br />편하게 알려주세요! 🙏</p>
            </div>
            <div class="input-area">
                <ScrollPicker v-model="religion" :options="options" />
            </div>
        </div>
        <div>
            <button class="full-width-primary-btn" :disabled="!isFilled" @click="$emit('nextStep')">확인</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.religion-signup {
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

const religion = ref([]);
const isFilled = computed(() => religion.value);

const options = [
    [
        {
            "label": "무교",
            "value": "none"
        },
        {
            "label": "기독교",
            "value": "christian"
        },
        {
            "label": "천주교",
            "value": "catholic"
        },
        {
            "label": "불교",
            "value": "buddhist"
        },
        {
            "label": "이슬람교",
            "value": "muslim"
        },
        {
            "label": "힌두교",
            "value": "hindu"
        },
        {
            "label": "유대교",
            "value": "jewish"
        },
        {
            "label": "기타",
            "value": "other_religion"
        }
    ]
];
</script>