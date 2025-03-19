<template>
    <header>
        <div class="logo-area">
            <router-link to="/" class="logo-font logo">FLOW</router-link>
        </div>
        <div class="quick-area">

        </div>
    </header>
</template>

<style lang="scss" scoped>
header {
    width: 100%;
    height: 60px;
    background-color: white;
    top: 0;
    position: fixed;
    padding: 8px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 8px rgba($color: #000000, $alpha: 0.35);

    >div.logo-area {
        height: 100%;
        font-size: 24px;
        line-height: 44px;
    }

    >div.quick-area {
        height: 100%;

    }
}
</style>