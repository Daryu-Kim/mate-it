<template>
    <div class="friend-search">
        <MainHeader />
        <FriendSearchContent />
        <BottomNavigationBar />
    </div>
</template>

<style lang="scss" scoped>
.friend-search {
    display: flex;
    flex-direction: column;
    height: 100dvh;
}
</style>

<script setup lang="js">
import BottomNavigationBar from "@/components/template/BottomNavigationBar.vue";
import FriendSearchContent from "@/components/template/FriendSearchContent.vue";
import MainHeader from "@/components/template/MainHeader.vue";
</script>
