<template>
    <div class="secret">
        <MainHeader />
        <SecretAddContent />
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
import BottomNavigationBar from "@/components/template/BottomNavigationBar.vue";
import MainHeader from "@/components/template/MainHeader.vue";
import SecretAddContent from "@/components/template/SecretAddContent.vue";
</script>
