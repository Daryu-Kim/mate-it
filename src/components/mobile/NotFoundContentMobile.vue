<template>
    <div class="content">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="64px"
            viewBox="0 -960 960 960"
            width="64px"
            fill="#000000"
        >
            <defs>
                <linearGradient
                    id="gradient1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        style="stop-color: #2af598; stop-opacity: 1"
                    />
                    <stop
                        offset="100%"
                        style="stop-color: #009efd; stop-opacity: 1"
                    />
                </linearGradient>
            </defs>
            <path
                :fill="'url(#gradient1)'"
                d="M440-520h80v-200h-80v200Zm40 160q17 0 28.5-11.5T520-400q0-17-11.5-28.5T480-440q-17 0-28.5 11.5T440-400q0 17 11.5 28.5T480-360Zm0 174q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"
            />
        </svg>
        <p class="title">어머, 길을 잃으셨네요!</p>
        <p class="desc">
            찾고 계신 페이지가 없어요.<br />괜찮아요, 저희가 홈으로
            안내해드릴게요.
        </p>
        <button @click="$router.push('/')" class="gradient-background">
            홈으로 이동하기
        </button>
    </div>
</template>

<style lang="scss" scoped>
.content {
    margin: 0 auto;
    margin-top: 60px;
    padding: 0 36px;
    height: calc(100vh - 48px - 60px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    word-break: keep-all;

    > .title {
        margin-top: 24px;
        font-size: 24px;
        font-weight: 900;
    }

    > .desc {
        margin-top: 12px;
        font-weight: 500;
        font-size: 16px;
    }

    > button {
        width: 100%;
        margin-top: 24px;
        border-radius: 8px;
        font-weight: 700;
        font-size: 14px;
        height: 42px;
    }
}
</style>
