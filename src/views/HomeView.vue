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
import { onMounted, ref } from 'vue';
import { getCurrentSession } from '@/lib/supabase';

const isLoggedIn = ref(false);

onMounted(async () => {
  const session = await getCurrentSession();
  if (session) {
    isLoggedIn.value = false;
  } else {
    isLoggedIn.value = true;
  }
})
</script>
