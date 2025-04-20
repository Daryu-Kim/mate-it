<template>
    <div class="chat-list">
        <MainHeader />
        <AlertListContent />
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
import AlertListContent from "@/components/template/AlertListContent.vue";
import BottomNavigationBar from "@/components/template/BottomNavigationBar.vue";
import MainHeader from "@/components/template/MainHeader.vue";
</script>