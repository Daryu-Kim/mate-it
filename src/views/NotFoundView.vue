<template>
    <div class="not-found">
        <MainHeader />
        <NotFoundContent />
        <BottomNavigationBar />
    </div>
</template>

<style lang="scss" scoped>
.not-found {
    display: flex;
    flex-direction: column;
    height: 100dvh;
}
</style>

<script setup>
import BottomNavigationBar from "@/components/template/BottomNavigationBar.vue";
import MainHeader from "@/components/template/MainHeader.vue";
import NotFoundContent from "@/components/template/NotFoundContent.vue";
</script>
