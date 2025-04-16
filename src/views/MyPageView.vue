<template>
    <div class="mypage">
        <MainHeader />
        <MyPageContent />
        <BottomNavigationBar />
    </div>
</template>

<style lang="scss" scoped>
.mypage {
    display: flex;
    flex-direction: column;
    height: 100dvh;
}
</style>

<script setup>
import BottomNavigationBar from "@/components/template/BottomNavigationBar.vue";
import MainHeader from "@/components/template/MainHeader.vue";
import MyPageContent from "@/components/template/MyPageContent.vue";
</script>
