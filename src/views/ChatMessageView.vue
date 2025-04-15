<template>
    <div class="chat-message">
        <MainHeader />
        <ChatMessageContent />
        <BottomNavigationBar />
    </div>
</template>

<style lang="scss" scoped>
.chat-message {
    display: flex;
    flex-direction: column;
    height: 100dvh;
}
</style>

<script setup>
import BottomNavigationBar from "@/components/template/BottomNavigationBar.vue";
import ChatMessageContent from "@/components/template/ChatMessageContent.vue";
import MainHeader from "@/components/template/MainHeader.vue";
</script>
