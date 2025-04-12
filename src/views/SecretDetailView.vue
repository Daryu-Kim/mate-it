<template>
    <div class="secret-detail">
        <MainHeader />
        <SecretDetailContent />
        <BottomNavigationBar />
    </div>
</template>

<style lang="scss" scoped>
.secret-detail {
    display: flex;
    flex-direction: column;
    height: 100dvh;
}
</style>

<script setup>
import BottomNavigationBar from '@/components/template/BottomNavigationBar.vue';
import MainHeader from '@/components/template/MainHeader.vue';
import SecretDetailContent from '@/components/template/SecretDetailContent.vue';
</script>