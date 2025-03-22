<template>
  <router-view />
  <SpeedInsights />
</template>

<script setup>
import { SpeedInsights } from "@vercel/speed-insights/vue"
</script>

<style lang="scss">
@font-face {
  font-family: 'MoveSans-Bold';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2405-2@1.0/MoveSans-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'SUITE', sans-serif;
  transition: all 200ms ease-in-out;
}

button {
  border: none;
  outline: none;
  background: none;
  cursor: pointer;

  &:hover {
    filter: brightness(0.975);
  }
}

.full-width-primary-btn {
  border-radius: 8px;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #2af598 0%, #009efd 100%);

  &:disabled {
    background: none;
    border: 1.5px solid #cdcdcd;
    cursor: not-allowed;
  }
}

.full-width-outline-btn {
  border-radius: 8px;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(230, 230, 230);
  background-color: #fff;
}

.circle-btn {
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(230, 230, 230);
  background-color: #fff;
}

.logo-font {
  font-family: 'MoveSans-Bold';
  font-weight: 700;
  background: linear-gradient(45deg, #2af598 0%, #009efd 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gradient-font {
  background: linear-gradient(45deg, #2af598 0%, #009efd 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gradient-background {
  background: linear-gradient(45deg, #2af598 0%, #009efd 100%);
}

.gradient-border {
  position: relative;
  border-radius: 8px;

  box-shadow: 0 0 0 2px transparent;
  background-image: linear-gradient(45deg, #2af598 0%, #009efd 100%);
  background-clip: padding-box;
  -webkit-background-clip: padding-box;
}

.gradient-border::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background-image: linear-gradient(45deg, #2af598 0%, #009efd 100%);
  border-radius: 8px;
  z-index: -1;
}

.d-none {
  display: none;
}
</style>