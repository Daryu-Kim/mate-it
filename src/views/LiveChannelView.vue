<template>
    <div class="live-channel">
        <MainHeader />
        <LiveChannelContent />
        <BottomNavigationBar />
    </div>
</template>

<style lang="scss" scoped>
.live-channel {
    display: flex;
    flex-direction: column;
    height: 100dvh;
}
</style>

<script setup lang="js">
import BottomNavigationBar from "@/components/template/BottomNavigationBar.vue";
import LiveChannelContent from "@/components/template/LiveChannelContent.vue";
import MainHeader from "@/components/template/MainHeader.vue";
</script>
