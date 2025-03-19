<template>
    <div class="header">
        <MainHeaderDesktop class="desktop" />
        <MainHeaderMobile class="mobile" />
    </div>
</template>

<style lang="scss" scoped>
@media (max-width: 767px) {
  .tablet, .desktop {
    display: none;
  }
}

/* 태블릿 화면: 768~1024px */
@media (min-width: 768px) and (max-width: 1023px) {
  .mobile, .desktop {
    display: none;
  }
}

/* 데스크탑 화면: 1025px 이상 */
@media (min-width: 1024px) {
  .mobile, .tablet {
    display: none;
  }
}
</style>

<script setup>
import MainHeaderMobile from '@/components/mobile/MainHeaderMobile.vue';
import MainHeaderDesktop from '../desktop/MainHeaderDesktop.vue';
</script>