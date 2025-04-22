<template>
    <div class="friend-list">
        <MainHeader />
        <FriendListContent />
        <BottomNavigationBar />
    </div>
</template>

<style lang="scss" scoped>
.friend-list {
    display: flex;
    flex-direction: column;
    height: 100dvh;
}
</style>

<script setup>
import BottomNavigationBar from "@/components/template/BottomNavigationBar.vue";
import FriendListContent from "@/components/template/FriendListContent.vue";
import MainHeader from "@/components/template/MainHeader.vue";
</script>
