<template>
    <div class="ideal-type-signup">
        <div>
            <div class="title-area">
                <p>이상형이 있다면?<br />어떤 분이 끌리시나요? 💕</p>
            </div>
            <div class="input-area">
                <div v-for="(item, index) in options" :key="index">
                    <input v-model="ideal" :id="`ideal-${index}`" type="checkbox" name="ideal" :value="item.value"
                        class="d-none" />
                    <label :for="`ideal-${index}`">{{ item.label }}</label>
                </div>
            </div>
        </div>
        <div>
            <button class="full-width-primary-btn" :disabled="!isFilled" @click="$emit('nextStep')">확인</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.ideal-type-signup {
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

const ideal = ref([]);
const isFilled = computed(() => ideal.value.length > 0);

const options = [
    { "label": "성격이 비슷한 사람", "value": "similar_personality" },
    { "label": "매사에 적극적인 사람", "value": "proactive" },
    { "label": "스포츠를 좋아하는 사람", "value": "sports_lover" },
    { "label": "감성적인 사람", "value": "emotional_person" },
    { "label": "유머 감각이 있는 사람", "value": "humorous_person" },
    { "label": "성실한 사람", "value": "diligent_person" },
    { "label": "자기계발에 열심인 사람", "value": "self_improvement" },
    { "label": "모험을 좋아하는 사람", "value": "adventurous_person" },
    { "label": "자유로운 성격의 사람", "value": "free_spirited_person" },
    { "label": "책을 좋아하는 사람", "value": "book_lover" },
    { "label": "친절한 사람", "value": "kind_person" },
    { "label": "연애에 진지한 사람", "value": "serious_about_relationship" },
    { "label": "다정한 사람", "value": "affectionate_person" },
    { "label": "매력적인 외모의 사람", "value": "attractive_appearance" },
    { "label": "도전적인 사람", "value": "challenging_person" },
    { "label": "충실한 사람", "value": "faithful_person" },
    { "label": "솔직한 사람", "value": "honest_person" },
    { "label": "상냥한 사람", "value": "gentle_person" },
    { "label": "조용한 사람", "value": "quiet_person" },
    { "label": "동기 부여가 되는 사람", "value": "motivating_person" },
    { "label": "열정적인 사람", "value": "passionate_person" },
    { "label": "긍정적인 사람", "value": "positive_person" },
    { "label": "소통을 잘하는 사람", "value": "good_communicator" },
    { "label": "자기 표현을 잘하는 사람", "value": "self_expressive_person" },
    { "label": "이해심 많은 사람", "value": "empathetic_person" },
    { "label": "창의적인 사람", "value": "creative_person" },
    { "label": "끈기 있는 사람", "value": "persistent_person" },
    { "label": "타인을 배려하는 사람", "value": "considerate_person" },
    { "label": "자기 주장이 강한 사람", "value": "assertive_person" },
    { "label": "모든 일을 맡아서 할 수 있는 사람", "value": "take_charge_person" },
    { "label": "재미있는 사람", "value": "funny_person" },
    { "label": "친구를 쉽게 사귀는 사람", "value": "easy_to_make_friends" },
    { "label": "사려 깊은 사람", "value": "thoughtful_person" },
    { "label": "계획적인 사람", "value": "organized_person" },
    { "label": "논리적인 사람", "value": "logical_person" }
];

</script>
