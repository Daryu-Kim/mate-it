<template>
    <div class="bio-signup">
        <div>
            <div class="title-area">
                <p class="title">마지막으로, 사진을 올려주세요!<br />더 친근하게 느껴질 거예요! 📸</p>
                <ul class="desc-area">
                    <li>얼굴이 선명하게 나온 사진을 등록해 주세요.</li>
                    <li>타인이 포함되거나 본인이 아닌 사진은 사용할 수 없어요.</li>
                    <li>선글라스, 마스크 등 얼굴을 가리는 요소가 없는 사진을 권장해요.</li>
                    <li>지나치게 보정된 사진보다는 자연스러운 사진이 좋아요.</li>
                    <li>배경이 너무 어두운 사진은 피하고, 밝고 선명한 사진을 선택해 주세요.</li>
                    <li>누군가를 불쾌하게 만들 수 있는 부적절한 사진은 허용되지 않아요.</li>
                    <li>전신 사진을 추가하면 더 좋은 인상을 줄 수 있어요.</li>
                    <li>최대 5장의 사진을 업로드할 수 있어요. 다양한 모습을 보여주세요!</li>
                </ul>
            </div>
            <div class="input-area">
                <textarea maxlength="500" v-model="bio" placeholder="SNS, 연락처 등 개인정보 기재 시 영구정지 처리될 수 있습니다!
500자 내외로 입력해주세요"></textarea>
            </div>
        </div>
        <div>
            <button class="full-width-primary-btn" :disabled="!isFilled" @click="$emit('nextStep')">확인</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.bio-signup {
    padding: 36px 24px;
    padding-top: 64px;
    height: calc(100dvh - 16px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    >div {
        >.title-area {
            >.title {
                word-break: keep-all;
                font-weight: 700;
                font-size: 24px;
                text-align: start;
            }

            >.desc-area {
                margin-left: 24px;
                margin-top: 16px;

                >li {
                    font-size: 14px;
                    font-weight: 500;
                    text-align: start;
                    line-height: 24px;
                }
            }
        }

        >.input-area {
            margin-top: 24px;

            >textarea {
                width: 100%;
                height: 30dvh;
                font-weight: 700;
                padding: 16px;
                font-size: 16px;
                background-color: #efefef;
                border: none;
                border-radius: 8px;

                &:focus {
                    background-color: white;
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

const bio = ref('');
const isFilled = computed(() => bio.value.length > 0);

</script>
