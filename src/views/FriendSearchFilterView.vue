<template>
    <div class="friend-search-filter">
        <MainHeader />
        <FriendSearchFilterContent />
        <BottomNavigationBar />
    </div>
</template>

<style lang="scss" scoped>
.friend-search-filter {
    display: flex;
    flex-direction: column;
    height: 100dvh;
}
</style>

<script setup lang="js">
import BottomNavigationBar from "@/components/template/BottomNavigationBar.vue";
import FriendSearchFilterContent from "@/components/template/FriendSearchFilterContent.vue";
import MainHeader from "@/components/template/MainHeader.vue";
</script>
