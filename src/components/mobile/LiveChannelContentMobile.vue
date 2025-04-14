<template>
    <div class="content">
        <div class="title-area">
            <div class="text-area">
                <p class="title">라이브 방송</p>
                <p class="desc">
                    여러 사람들과 이야기하며 실시간으로 소통해보세요!
                </p>
            </div>
        </div>

        <button class="floating-btn" @click="selectLive()">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="white"
            >
                <path
                    d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"
                />
            </svg>
            <p>방송 시작하기</p>
        </button>
        <BroadcasterSelectDialog v-model="isOpenedSelectLive" />
    </div>
</template>

<style lang="scss" scoped>
.content {
    margin: 0 auto;
    margin-top: 60px;
    padding: 0 36px;
    padding-bottom: 64px;
    position: relative;

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

    .floating-btn {
        border-radius: 100rem;
        position: fixed;
        bottom: 72px;
        right: 24px;
        padding: 12px 16px;
        background-color: black;
        display: flex;
        align-items: center;
        color: white;
        gap: 4px;
        text-decoration: none;
        font-weight: 700;
        font-size: 14px;
        padding-right: 20px;
        z-index: 100;
    }
}
</style>

<script setup lang="js">
import { ref } from "vue";
import BroadcasterSelectDialog from "@/components/dialog/BroadcasterSelectDialog.vue";

const isOpenedSelectLive = ref(false);
const selectLive = () => {
    isOpenedSelectLive.value = true;
};
</script>
