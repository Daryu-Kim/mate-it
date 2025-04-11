<template>
    <div class="content">
        <div class="title-area">
            <div class="text-area">
                <p class="title">비밀방</p>
                <p class="desc">익명의 게시물을 통해 사람들과 소통해보세요!</p>
            </div>
        </div>
        <div class="filter-area">
            <button class="active">전체</button>
            <button>HOT</button>
            <button>M</button>
            <button>포토</button>
            <button>일상</button>
            <button>찾아요</button>
            <button>고민</button>
            <button>셀소</button>
            <button>질문</button>
        </div>
        <div class="notice-area"></div>
        <div class="card-area">
            <button class="card" v-for="(item, index) in 10" :key="index">
                <div class="img-area"></div>
                <div class="user-area gradient-background">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                            fill="black">
                            <path
                                d="M807.41-809.09v251h-91v-95.34L566.26-504.28q18.52 28 27.92 59.38 9.41 31.38 9.41 64.9 0 94.15-65.68 159.83-65.67 65.67-159.82 65.67-94.16 0-159.83-65.67-65.67-65.68-65.67-159.83t65.67-159.83q65.67-65.67 159.83-65.67 32.76 0 64.52 9.14 31.76 9.14 58.76 28.43l150.15-150.16h-95.11v-91h251ZM378.09-514.5q-55.85 0-95.18 39.33-39.32 39.32-39.32 95.17t39.32 95.17q39.33 39.33 95.18 39.33 55.84 0 95.17-39.33 39.33-39.32 39.33-95.17t-39.33-95.17q-39.33-39.33-95.17-39.33Z" />
                        </svg>
                    </span>
                    <span class="d-none">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                            fill="black">
                            <path
                                d="M434.5-111.15v-80h-80V-280h80v-79.7q-79.24-15.67-129.62-78.01-50.38-62.33-50.38-143.81 0-93.5 66.11-158.74Q386.72-805.5 480-805.5q93.28 0 159.39 65.24 66.11 65.24 66.11 158.74 0 81.48-50.38 143.81-50.38 62.34-129.62 78.01v79.7h80v88.85h-80v80h-91ZM480-445.5q55.85 0 95.17-39.33Q614.5-524.15 614.5-580t-39.33-95.17Q535.85-714.5 480-714.5t-95.17 39.33Q345.5-635.85 345.5-580t39.33 95.17Q424.15-445.5 480-445.5Z" />
                        </svg>
                    </span>
                    <div class="desc-area">
                        <p>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960"
                                    width="16px" fill="black">
                                    <path
                                        d="M714.02-106.13H272.59v-529.09L549-911.63l56.29 53.78q7.88 7.52 12.98 20.72 5.1 13.2 5.1 25.63v11.37l-43.28 164.91h254.89q36.06 0 63.53 27.47t27.47 63.53v65.42q0 7.58-2 16.24-2 8.67-4.48 15.91L798.07-160.59q-10.2 22.87-34.19 38.67-23.99 15.79-49.86 15.79Zm-354.02-91h354.02L834.5-478.8v-65.42H468.28l51.13-208.28L360-593.09v395.96Zm0-395.96V-197.13v-395.96Zm-87.41-42.13v91H160v347.09h112.59v91H69v-529.09h203.59Z" />
                                </svg>
                            </span>
                            <span>0</span>
                        </p>
                        <p>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960"
                                    width="16px" fill="black">
                                    <path
                                        d="M480-71.87 369.41-236.41H162.87q-37.78 0-64.39-26.61t-26.61-64.39v-469.72q0-37.78 26.61-64.39t64.39-26.61h634.26q37.78 0 64.39 26.61t26.61 64.39v469.72q0 37.78-26.61 64.39t-64.39 26.61H590.35L480-71.87Zm0-163.37 61.85-91.93h255.52v-470.2H162.63v470.2h255.52L480-235.24Zm0-327.15Z" />
                                </svg>
                            </span>
                            <span>0</span>
                        </p>
                        <p>00분 전</p>
                    </div>
                </div>
            </button>
        </div>

        <router-link to="" class="floating-btn">
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#ffffff">
                <path
                    d="M202.63-202.87h57.24l374.74-374.74-56.76-57-375.22 375.22v56.52Zm-90.76 91v-185.3l527.52-526.76q12.48-11.72 27.7-17.96 15.21-6.24 31.93-6.24 16.48 0 32.2 6.24 15.71 6.24 27.67 18.72l65.28 65.56q12.48 11.72 18.34 27.56 5.86 15.83 5.86 31.79 0 16.72-5.86 32.05-5.86 15.34-18.34 27.82L297.65-111.87H111.87Zm642.87-586.39-56.24-56.48 56.24 56.48Zm-148.89 92.41-28-28.76 56.76 57-28.76-28.24Z" />
            </svg>
            <p>글쓰기</p>
        </router-link>
    </div>
</template>

<style lang="scss" scoped>
.content {
    margin: 0 auto;
    margin-top: 60px;
    padding: 0 36px;
    padding-bottom: 64px;
    position: relative;

    >.title-area {
        padding: 48px 0;
        text-align: left;
        display: flex;
        align-items: center;
        justify-content: space-between;

        >.text-area {
            >p.title {
                font-size: 28px;
                font-weight: 900;
            }

            >p.desc {
                font-size: 14px;
                font-weight: 500;
                color: #606060;
                margin-top: 6px;
            }
        }
    }

    >.filter-area {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;

        >button {
            border-radius: 8px;
            background-color: #efefef;
            color: grey;
            padding: 6px 12px;
            font-size: 14px;

            &.active {
                color: white;
                background-color: black;
                font-weight: 700;
            }
        }
    }

    >.card-area {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        margin-top: 24px;

        >.card {
            display: flex;
            flex-direction: column;
            aspect-ratio: 1.25 / 1;
            position: relative;
            border-radius: 8px;
            box-shadow: 0 0 0 2px transparent;

            >.img-area {
                background-image: url('https://picsum.photos/600');
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                border-radius: 8px;
                filter: brightness(0.5);
            }

            >.user-area {
                display: flex;
                align-items: center;
                justify-content: space-between;
                z-index: 1;
                position: absolute;
                bottom: 0;
                width: 100%;
                padding: 8px 16px;
                // background-color: rgba($color: #000000, $alpha: 0.75);
                border-radius: 0 0 8px 8px;

                >.desc-area {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: black;
                    font-size: 12px;

                    >p {
                        display: flex;
                        align-items: center;
                        gap: 2px;

                        >span {
                            height: 16px;
                        }
                    }
                }
            }
        }
    }

    .floating-btn {
        border-radius: 100rem;
        position: fixed;
        bottom: 72px;
        right: 24px;
        padding: 12px 16px;
        background-color: black;
        display: flex;
        align-items: center;
        color: white;
        gap: 4px;
        text-decoration: none;
        font-weight: 700;
        font-size: 14px;
        padding-right: 20px;
        z-index: 100;
    }
}
</style>