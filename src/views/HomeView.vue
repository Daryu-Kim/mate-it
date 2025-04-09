<template>
  <div class="home">
    <MainHeader />
    <HomeContent />
    <LoginDialog v-model="isLoggedIn" />
    <BottomNavigationBar />
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100dvh;
}
</style>

<script setup>
import MainHeader from '@/components/template/MainHeader.vue';
import LoginDialog from '@/components/dialog/LoginDialog.vue';
import { onMounted, ref } from 'vue';
import { checkUserData, getCurrentSession } from '@/lib/supabase';
import BottomNavigationBar from '@/components/template/BottomNavigationBar.vue';
import HomeContent from '@/components/template/HomeContent.vue';

const isLoggedIn = ref(false);

onMounted(async () => {
  const session = await getCurrentSession();
  if (session) {
    isLoggedIn.value = false;
    await checkUserData();
  } else {
    isLoggedIn.value = true;
  }
})
</script>
