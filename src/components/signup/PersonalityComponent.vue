<template>
    <div class="personality-signup">
        <div>
            <div class="title-area">
                <p>나를 한마디로 표현하면?<br />성격을 소개해주세요! 😆</p>
            </div>
            <div class="input-area">
                <div v-for="(item, index) in options" :key="index">
                    <input v-model="personality" :id="`personality-${index}`" type="checkbox" name="personality"
                        :value="item.value" class="d-none" />
                    <label :for="`personality-${index}`">{{ item.label }}</label>
                </div>
            </div>
        </div>
        <div>
            <button class="full-width-primary-btn" :disabled="!isFilled" @click="$emit('nextStep')">확인</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.personality-signup {
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
            padding: 8px 0;
            max-height: 70dvh;
            height: fit-content;
            overflow-y: scroll;
            display: flex;
            flex-wrap: wrap;
            align-items: start;
            gap: 8px;
            row-gap: 20px;

            >div {
                >label {
                    cursor: pointer;
                    border: 1.5px solid #434343;
                    padding: 4px 12px;
                    border-radius: 100rem;
                    font-weight: 500;
                    font-size: 16px;
                    background-color: #fff;
                }

                >input:checked+label {
                    background: linear-gradient(45deg, #2af598 0%, #009efd 100%);
                    border-color: transparent;
                    font-weight: 700;
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
import { ref, computed } from 'vue';

const personality = ref([]);
const isFilled = computed(() => personality.value.length > 0);

const options = [
    { "label": "활발한", "value": "active" },
    { "label": "차분한", "value": "calm" },
    { "label": "낙천적인", "value": "optimistic" },
    { "label": "내성적인", "value": "introverted" },
    { "label": "외향적인", "value": "extroverted" },
    { "label": "상냥한", "value": "kind" },
    { "label": "고집 센", "value": "stubborn" },
    { "label": "개방적인", "value": "open_minded" },
    { "label": "조용한", "value": "quiet" },
    { "label": "유머러스한", "value": "humorous" },
    { "label": "호기심 많은", "value": "curious" },
    { "label": "성실한", "value": "diligent" },
    { "label": "이해심 있는", "value": "understanding" },
    { "label": "감정적인", "value": "emotional" },
    { "label": "이성적인", "value": "rational" },
    { "label": "자유로운", "value": "free_spirited" },
    { "label": "책임감 있는", "value": "responsible" },
    { "label": "배려 깊은", "value": "considerate" },
    { "label": "조직적인", "value": "organized" },
    { "label": "사교적인", "value": "sociable" },
    { "label": "지적인", "value": "intellectual" },
    { "label": "자기주장이 강한", "value": "assertive" },
    { "label": "편안한", "value": "easygoing" },
    { "label": "열정적인", "value": "passionate" },
    { "label": "도전적인", "value": "challenging" },
    { "label": "충동적인", "value": "impulsive" },
    { "label": "진지한", "value": "serious" },
    { "label": "친절한", "value": "gentle" },
    { "label": "사려 깊은", "value": "thoughtful" },
    { "label": "창의적인", "value": "creative" },
    { "label": "자기 반성적인", "value": "self_reflective" },
    { "label": "겸손한", "value": "humble" },
    { "label": "충실한", "value": "loyal" },
    { "label": "이해가 빠른", "value": "quick_learner" },
    { "label": "불안한", "value": "anxious" },
    { "label": "자기 중심적인", "value": "self_centered" },
    { "label": "활기찬", "value": "energetic" },
    { "label": "주도적인", "value": "leadership" },
    { "label": "정직한", "value": "honest" },
    { "label": "호탕한", "value": "outgoing" },
    { "label": "창의적", "value": "innovative" },
    { "label": "신뢰할 수 있는", "value": "trustworthy" },
    { "label": "진정성 있는", "value": "genuine" },
    { "label": "책임감 있는", "value": "accountable" }
];

</script>
