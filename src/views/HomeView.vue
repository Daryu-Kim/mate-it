<template>
  <div class="home">
    <MainHeader />
    <div>
      hi
    </div>
  </div>
</template>

<script setup>
// @ is an alias to /src
import MainHeader from '@/components/template/MainHeader.vue'
import { onMounted } from 'vue'

onMounted(() => {
  console.log(this.$isMobile())
});
</script>
