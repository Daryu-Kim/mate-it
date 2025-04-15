<template>
    <div class="content">
        <ChatListContentMobile class="mobile" />
    </div>
</template>

<style lang="scss" scoped>
.content {
    flex: 1;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.content::-webkit-scrollbar {
    display: none;
}

@media (max-width: 767px) {
    .tablet,
    .desktop {
        display: none;
    }
}

/* 태블릿 화면: 768~1024px */
@media (min-width: 768px) and (max-width: 1023px) {
    .mobile,
    .desktop {
        display: none;
    }
}

/* 데스크탑 화면: 1025px 이상 */
@media (min-width: 1024px) {
    .mobile,
    .tablet {
        display: none;
    }
}
</style>

<script setup>
import ChatListContentMobile from "../mobile/ChatListContentMobile.vue";
</script>
