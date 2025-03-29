<template>
    <div class="bio-signup">
        <div>
            <div class="title-area">
                <p>거의 완료되었어요!<br />자기소개를 자유롭게 적어주세요! 📝</p>
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
            >p {
                word-break: keep-all;
                font-weight: 700;
                font-size: 24px;
                text-align: start;
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
