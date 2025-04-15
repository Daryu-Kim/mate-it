<template>
    <div class="chat-list">
        <MainHeader />
        <ChatListContent />
        <BottomNavigationBar />
    </div>
</template>

<style lang="scss" scoped>
.chat-list {
    display: flex;
    flex-direction: column;
    height: 100dvh;
}
</style>

<script setup>
import BottomNavigationBar from "@/components/template/BottomNavigationBar.vue";
import ChatListContent from "@/components/template/ChatListContent.vue";
import MainHeader from "@/components/template/MainHeader.vue";
</script>
