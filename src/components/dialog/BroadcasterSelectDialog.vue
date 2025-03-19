<template>
  <div v-if="isVisible" class="dialog-overlay" @click.self="close">
    <div class="dialog-content">
      <div class="title-area">
        <p class="title">라이브 방송 유형 선택</p>
        <p class="desc">방송 특징에 맞게 유형을 선택해보세요!</p>
      </div>
      <div class="select-area">
        <router-link to="/ready-audio-broadcaster">
          <svg xmlns=" http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000">
            <path
              d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" />
          </svg>
          <div>
            <p class="title">오디오 방송</p>
            <p class="desc">마이크만으로 사람들과 소통해보세요!</p>
          </div>
        </router-link>
        <router-link to="/ready-video-broadcaster">
          <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000">
            <path
              d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z" />
          </svg>
          <div>
            <p class="title">비디오 방송</p>
            <p class="desc">카메라를 이용하여 사람들과 폭넓게 소통해보세요!</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const isVisible = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  isVisible.value = newValue;
});

const close = () => {
  isVisible.value = false;
  emit('update:modelValue', false);
};
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  >.dialog-content {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 480px;
    height: fit-content;
    max-height: 640px;
    padding: 24px;

    >.title-area {
      >.title {
        font-weight: 700;
        font-size: 24px;
      }

      >.desc {
        font-weight: 500;
        margin-top: 6px;
      }
    }

    >.select-area {
      display: flex;
      align-items: center;
      margin-top: 24px;
      gap: 16px;

      >a {
        flex: 1;
        border-radius: 8px;
        aspect-ratio: 1 / 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 4px solid black;
        background-color: white;
        color: black;
        text-decoration: none;
        flex-direction: column;
        padding: 16px;

        >div {
          margin-top: 8px;
          transition: all 50ms;

          * {
            transition: none;
            word-break: keep-all;
          }

          >.title {
            font-weight: 700;
            font-size: 18px;
          }

          >.desc {
            font-weight: 500;
            font-size: 14px;
            margin-top: 4px;
          }
        }

        &:hover {
          background-color: black;
          color: white;

          >svg {
            fill: white;
          }
        }
      }
    }
  }
}
</style>