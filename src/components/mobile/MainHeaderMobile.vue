<template>
    <header>
        <div class="logo-area">
            <img src="@/assets/logo.png" />
        </div>
        <div class="quick-area">

        </div>
    </header>
</template>

<style lang="scss" scoped>
header {
    width: 100%;
    height: 60px;
    background-color: red;
    top: 0;
    position: fixed;
    padding: 8px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div.logo-area {
        height: 100%;
        > img {
            height: 100%;
        }
    }

    > div.quick-area {
        height: 100%;
        
    }
}
</style>