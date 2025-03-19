<template>
  <div class="home">
    <MainHeader />
    <div class="content">
      hi
    </div>
    <LoginDialog v-model="isLoggedIn" />
  </div>
</template>

<script setup>
import MainHeader from '@/components/template/MainHeader.vue';
import LoginDialog from '@/components/dialog/LoginDialog.vue';
import { ref } from 'vue';

const isLoggedIn = ref(true);
</script>
