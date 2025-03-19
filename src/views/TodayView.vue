<template>
    <div class="today">
        <MainHeader />
        <div class="content">
            <div class="title-area">
                <div class="text-area">
                    <p class="title">오늘의 인연</p>
                    <p class="desc">오늘의 인연이 될 10명의 친구들을 만나보세요!</p>
                </div>
            </div>
            <div class="card-area">
                
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.content {
    margin: 0 auto;
    margin-top: 60px;
    padding: 0 72px;
    padding-bottom: 64px;
    max-width: 1280px;
    
    > .title-area {
        padding: 48px 0 64px 0;
        text-align: left;
        display: flex;
        align-items: center;
        justify-content: space-between;

        > .text-area {
            > p.title {
                font-size: 32px;
                font-weight: 900;
            }

            > p.desc {
                font-size: 16px;
                font-weight: 500;
                color: #606060;
                margin-top: 6px;
            }
        }

        > button {
            width: fit-content;
            padding: 8px 24px;
            border-radius: 100rem;
            height: fit-content;
            font-size: 18px;
            font-weight: 700;
        }
    }
}
</style>

<script setup>
import MainHeader from '@/components/template/MainHeader.vue';

</script>