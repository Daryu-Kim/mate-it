<template>
    <div class="looking-for-signup">
        <div>
            <div class="title-area">
                <p>어떤 인연을 찾고 계신가요?<br />편하게 알려주세요! 😊</p>
            </div>
            <div class="input-area">
                <ScrollPicker v-model="looking_for" :options="options" />
            </div>
        </div>
        <div>
            <button class="full-width-primary-btn" :disabled="!isFilled" @click="$emit('nextStep')">확인</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.looking-for-signup {
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

const looking_for = ref([]);
const isFilled = computed(() => looking_for.value);

const options = [
    [
        {
            "label": "잘 맞는 친구 찾는 중!",
            "value": "finding_friend"
        },
        {
            "label": "친구도, 연애도 OK.",
            "value": "friend_or_dating"
        },
        {
            "label": "진지한 연애 원해요.",
            "value": "serious_relationship"
        },
        {
            "label": "아직 고민 중!",
            "value": "not_sure_yet"
        }
    ]
];
</script>