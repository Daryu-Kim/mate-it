<template>
    <div class="secret-detail-send-area">
        <input
            type="text"
            placeholder="SNS, 연락처, 게임 ID 공유 시 정지됩니다."
        />
        <button>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
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
                    d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"
                />
            </svg>
        </button>
    </div>
</template>

<style lang="scss" scoped>
.secret-detail-send-area {
    position: fixed;
    bottom: 48px;
    background-color: #efefef;
    width: 100%;
    height: 48px;
    box-shadow: 0 -4px 4px rgba($color: #000000, $alpha: 0.175);
    display: flex;
    align-items: center;
    padding: 8px 12px;
    gap: 12px;

    > input {
        width: 100%;
        height: 100%;
        padding: 8px;
        border: none;
        outline: none;
        border-radius: 8px;
        font-weight: 500;
        font-size: 12px;
    }

    > button {
    }
}
</style>
