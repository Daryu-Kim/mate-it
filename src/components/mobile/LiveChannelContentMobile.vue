<template>
    <div class="content">
        <div class="title-area">
            <div class="text-area">
                <p class="title">라이브 방송</p>
                <p class="desc">
                    여러 사람들과 이야기하며 실시간으로 소통해보세요!
                </p>
            </div>
        </div>
        <div class="filter-area">
            <button
                :class="{ active: selectedLiveType === '' }"
                @click="onClickFilterBtn('')"
            >
                전체
            </button>
            <button
                :class="{ active: selectedLiveType === 'audio' }"
                @click="onClickFilterBtn('audio')"
            >
                오디오 방송
            </button>
            <button
                :class="{ active: selectedLiveType === 'video' }"
                @click="onClickFilterBtn('video')"
            >
                비디오 방송
            </button>
        </div>
        <div class="live-area">
            <router-link
                :to="`/viewer?id=${item.stream_id}`"
                class="card"
                v-for="(item, index) in data"
                :key="index"
            >
                <div class="img-area">
                    <div class="chip-area">
                        <p v-if="item.stream_type === 'audio'" class="choice">
                            오디오
                        </p>
                        <p v-else class="choice">비디오</p>
                    </div>
                </div>
                <p class="live-title">{{ item.title }}</p>
                <p class="live-user">{{ item.username }}</p>
                <div class="live-status-area">
                    <p>
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="16px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#434343"
                            >
                                <path
                                    d="M32.59-147.8v-120.61q0-36.23 18.74-66.59 18.74-30.37 49.8-46.35 62.72-31.24 127.66-46.98 64.95-15.74 131.93-15.74 67.43 0 132.39 15.62 64.96 15.62 127.19 46.86 31.06 15.95 49.81 46.25 18.74 30.3 18.74 66.91v120.63H32.59Zm739.85 0v-127.9q0-44.95-24.27-86.65-24.26-41.69-69.97-74.28 48.37 6.48 91.45 20.62 43.09 14.14 81.13 34.42 36.96 20 56.8 47.21 19.83 27.2 19.83 59.4v127.18H772.44ZM360.72-484.07q-67.92 0-115.99-48.07-48.08-48.08-48.08-115.99t48.08-115.99q48.07-48.08 115.99-48.08 67.91 0 115.99 48.08 48.07 48.08 48.07 115.99t-48.07 115.99q-48.08 48.07-115.99 48.07Zm411.72-164.06q0 67.67-48.19 115.87-48.18 48.19-115.84 48.19-11.28 0-28.04-2.61-16.76-2.62-28.72-6.1 27.48-32.48 42.1-72.4 14.62-39.92 14.62-82.92 0-42.99-14.62-82.94-14.62-39.96-42.1-72.44 14.24-5.24 28.24-6.98 14-1.74 28.37-1.74 67.72 0 115.95 48.2 48.23 48.19 48.23 115.87ZM123.59-238.8h474.26v-28.42q0-10.77-5.5-19.58-5.5-8.81-14.5-13.7-52.57-26.04-106.85-39.3-54.28-13.27-110.28-13.27-55.52 0-110.29 13.27-54.76 13.26-106.84 39.3-9 4.89-14.5 13.7-5.5 8.81-5.5 19.58v28.42Zm237.09-332.68q31.6 0 54.15-22.5 22.54-22.51 22.54-54.11 0-31.61-22.51-54.15-22.5-22.54-54.1-22.54-31.61 0-54.15 22.5-22.54 22.51-22.54 54.11 0 31.6 22.5 54.15 22.51 22.54 54.11 22.54Zm.04 332.68Zm0-409.33Z"
                                />
                            </svg>
                        </span>
                        {{ item.viewer_count }}
                    </p>
                    <p>
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="16px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#434343"
                            >
                                <path
                                    d="m479.76-109-63.5-57.02Q314.3-257.74 247.71-324.46q-66.6-66.71-105.72-119.81-39.12-53.1-54.74-97.82Q71.63-586.8 71.63-634q0-97.58 65.33-162.97 65.33-65.4 162.8-65.4 51.75 0 98.51 21.04 46.77 21.05 81.49 59.85 34.72-38.8 81.49-59.85 46.77-21.04 98.51-21.04 97.68 0 163.14 65.4 65.47 65.39 65.47 162.97 0 46.96-15.5 91.67-15.5 44.72-54.74 97.7-39.24 52.98-105.96 119.81-66.71 66.84-168.91 158.8L479.76-109Zm0-122.59q95.52-86 157.16-146.9 61.65-60.9 97.29-106.04 35.64-45.14 49.4-80.08 13.76-34.94 13.76-69.38 0-59.05-39.28-98.22-39.29-39.16-98.21-39.16-46.16 0-85.68 26.5-39.53 26.5-54.53 67.5h-79.58q-14.89-41-54.59-67.5t-85.67-26.5q-58.7 0-97.83 39.16-39.13 39.17-39.13 98.21 0 34.7 13.87 69.9 13.86 35.2 49.52 80.31 35.65 45.12 97.06 105.9 61.4 60.78 156.44 146.3Zm.48-269.89Z"
                                />
                            </svg>
                        </span>
                        {{ item.donations }}
                    </p>
                </div>
                <div class="tag-area">
                    <p>#{{ item.topic }}</p>
                </div>
            </router-link>
        </div>

        <button class="floating-btn" @click="selectLive()">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="white"
            >
                <path
                    d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"
                />
            </svg>
            <p>방송 시작하기</p>
        </button>
        <BroadcasterSelectDialog v-model="isOpenedSelectLive" />
    </div>
</template>

<style lang="scss" scoped>
.content {
    margin: 0 auto;
    margin-top: 60px;
    padding: 0 36px;
    padding-bottom: 64px;
    position: relative;

    > .title-area {
        padding: 48px 0 24px;
        text-align: left;
        display: flex;
        align-items: center;
        justify-content: space-between;

        > .text-area {
            > p.title {
                font-size: 28px;
                font-weight: 900;
            }

            > p.desc {
                font-size: 14px;
                font-weight: 500;
                color: #606060;
                margin-top: 6px;
            }
        }
    }

    > .filter-area {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;

        > button {
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

    > .live-area {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        margin-top: 24px;
        gap: 24px;

        > .card {
            text-align: left;
            cursor: pointer;
            text-decoration: none;

            > .img-area {
                aspect-ratio: 1.5 / 1;
                background-image: url("https://picsum.photos/600");
                border-radius: 8px;
                background-size: cover;
                background-position: center center;

                > .chip-area {
                    display: flex;
                    align-items: center;
                    padding: 8px;

                    > p {
                        padding: 2px 8px;
                        border-radius: 100rem;
                        font-size: 12px;
                        color: white;
                        font-weight: 700;
                        width: fit-content;
                    }

                    .choice {
                        background-color: orangered;
                    }
                }
            }

            > .live-title {
                margin-top: 8px;
                font-weight: 700;
                color: black;
            }

            > .live-user {
                margin-top: 2px;
                font-weight: 500;
                color: #606060;
                font-size: 14px;
            }

            > .live-status-area {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-top: 4px;

                > p {
                    display: flex;
                    align-items: center;
                    color: #606060;
                    font-size: 12px;
                    line-height: 12px;

                    > span {
                        > svg {
                            fill: #606060;
                        }
                    }
                }
            }

            > .tag-area {
                display: flex;
                align-items: center;
                column-gap: 8px;
                row-gap: 4px;
                margin-top: 4px;
                flex-wrap: wrap;

                > p {
                    border-radius: 100rem;
                    padding: 2px 8px;
                    background-color: #ececec;
                    font-size: 12px;
                    color: black;
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

<script setup lang="js">
import { ref, onMounted } from "vue";
import { supabase } from "@/lib/supabase";
import BroadcasterSelectDialog from "@/components/dialog/BroadcasterSelectDialog.vue";

const data = ref([]);
const selectedLiveType = ref('');
const isOpenedSelectLive = ref(false);
const selectLive = () => {
    isOpenedSelectLive.value = true;
};

const onClickFilterBtn = (filter) => {
    selectedLiveType.value = filter;
    fetchLives(filter);
}

const fetchLives = async (filter) => {
    try {
        const query = supabase.from('live_streams').select('*');

        // filter가 비어있지 않으면 eq()를 추가합니다.
        const { data: secretDatas, error: secretError } = filter
            ? await query.eq('stream_type', filter) // filter가 있을 때
            : await query; // filter가 없을 때
        if (secretError) throw secretError;

        const updatedSecretDatas = await Promise.all(secretDatas.map(async secret => {
            // user_id로 username을 가져옵니다.
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('username')
                .eq('id', secret.user_id)
                .single();

            if (userError) {
                console.error(userError);
                return { ...secret, username: null }; // 오류 발생 시 username을 null로 설정
            }

            return {
                ...secret,
                username: userData.username, // username 추가
                score: (secret.viewer_count || 0) + (secret.total_views || 0) + (secret.donations || 0) // 점수 계산
            };
        }));

        // 점수 기준으로 정렬하고, 점수가 같을 경우 created_at 기준으로 정렬합니다.
        updatedSecretDatas.sort((a, b) => {
            if (b.score === a.score) {
                return new Date(b.created_at) - new Date(a.created_at); // created_at 기준 정렬
            }
            return b.score - a.score; // 점수 기준 정렬
        });

        data.value = updatedSecretDatas;
    } catch (error) {
        console.error("게시글 불러오기 실패: ", error)
    }
}

onMounted(() => {
    fetchLives();
})
</script>
