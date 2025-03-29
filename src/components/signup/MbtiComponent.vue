<template>
    <div class="mbti-signup">
        <div>
            <div class="title-area">
                <p>혹시 MBTI가 뭔가요?<br />성격을 살짝 엿볼 수 있게요! 🔮</p>
            </div>
            <div class="input-area">
                <div>
                    <input type="radio" v-model="ei" name="ei" value="E" />
                    <p>E (외향)</p>
                    <hr />
                    <p>I (내향)</p>
                    <input type="radio" v-model="ei" name="ei" value="I" />
                </div>
                <div>
                    <input type="radio" v-model="sn" name="sn" value="S" />
                    <p>S (감각)</p>
                    <hr />
                    <p>N (직관)</p>
                    <input type="radio" v-model="sn" name="sn" value="N" />
                </div>
                <div>
                    <input type="radio" v-model="tf" name="tf" value="T" />
                    <p>T (사고)</p>
                    <hr />
                    <p>F (감정)</p>
                    <input type="radio" v-model="tf" name="tf" value="F" />
                </div>
                <div>
                    <input type="radio" v-model="jp" name="jp" value="J" />
                    <p>J (판단)</p>
                    <hr />
                    <p>P (인식)</p>
                    <input type="radio" v-model="jp" name="jp" value="P" />
                </div>
            </div>
        </div>
        <div>
            <button class="full-width-primary-btn" :disabled="!isFilled" @click="$emit('nextStep')">확인</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.mbti-signup {
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
            display: flex;
            flex-direction: column;
            align-items: center;

            >div {
                width: 280px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 8px;

                >p {
                    font-weight: 500;
                }

                >hr {
                    width: 72px;
                    border-width: 2px;
                }

                &:not(:last-child) {
                    margin-bottom: 16px;
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
import { computed, ref } from 'vue';

const ei = ref('');
const sn = ref('');
const tf = ref('');
const jp = ref('');
const isFilled = computed(() => ei.value && sn.value && tf.value && jp.value);
</script>