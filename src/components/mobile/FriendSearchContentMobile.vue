<template>
    <div class="content">
        <div class="title-area">
            <div class="text-area">
                <p class="title">친구 검색</p>
                <p class="desc">
                    나에게 맞는 친구를 찾아보세요!
                </p>
            </div>
        </div>
        <div class="description-area">
            <p class="title">👋 환영합니다!</p>
            <p class="desc">
                여기는 당신과 잘 맞는 친구를 찾아주는 공간이에요. 성격, 취미, 관심사를 바탕으로 대화가 잘 통하는 사람과 연결해드려요. 새로운 인연이 기다리고 있어요—지금 만나볼까요? 😊
            </p>

            <p class="title">🎯 지금 바로 시작해보세요!</p>
            <p class="desc">
                마음이 통하는 친구는 생각보다 가까이에 있어요. 아래 버튼을 눌러 당신만의 특별한 인연을 만나보세요! 💫
            </p>
        </div>
        <button class="gradient-background">
            <p class="title">친구 찾으러 가기</p>
            <p class="desc">하트 5개 차감</p>
        </button>
    </div>
</template>

<style lang="scss" scoped>
.content {
    margin: 0 auto;
    margin-top: 60px;
    padding: 0 36px;
    padding-bottom: 64px;
    position: relative;
    min-height: calc(100vh - 48px - 60px);
    display: flex;
    flex-direction: column;

    > .title-area {
        padding: 48px 0;
        text-align: left;
        display: flex;
        align-items: center;
        justify-content: space-between;

        > .text-area {
            > p.title {
                font-size: 28px;
                font-weight: 900;
            }

            > p.desc {
                font-size: 14px;
                font-weight: 500;
                color: #606060;
                margin-top: 6px;
            }
        }
    }

    > .description-area {
        > .desc {
            text-align: start;
            word-break: keep-all;
            font-size: 14px;
        }

        > .title {
            text-align: start;
            font-size: 18px;
            padding-bottom: 8px;
            font-weight: 700;

            &:not(:first-child) {
                margin-top: 24px;
            }
        }
    }

    > button {
        margin-top: auto;
        border-radius: 8px;
        height: 56px;

        > .title {
            font-weight: 700;
            font-size: 16px;
        }

        > .desc {
            font-weight: 500;
            font-size: 12px;
            margin-top: 2px;
        }
    }
}
</style>

<script setup lang="js">
import { ref } from "vue";
import { supabase } from "@/lib/supabase";
</script>
