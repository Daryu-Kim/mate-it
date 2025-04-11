<template>
    <div class="secret">
        <MainHeader />
        <SecretContent />
        <BottomNavigationBar />
    </div>
</template>

<style lang="scss" scoped>
.secret {
    display: flex;
    flex-direction: column;
    height: 100dvh;
}
</style>

<script setup>
import BottomNavigationBar from '@/components/template/BottomNavigationBar.vue';
import MainHeader from '@/components/template/MainHeader.vue';
import SecretContent from '@/components/template/SecretContent.vue';

</script>