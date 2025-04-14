<template>
    <div class="content">
        <div class="title-area">
            <div class="text-area">
                <p class="title">비밀방</p>
                <p class="desc">익명의 게시물을 통해 사람들과 소통해보세요!</p>
            </div>
        </div>
        <div class="filter-area">
            <button
                :class="{ active: activeFilter === '' }"
                @click="onClickFilterBtn('')"
            >
                전체
            </button>
            <button
                :class="{ active: activeFilter === 'CONCERNS' }"
                @click="onClickFilterBtn('CONCERNS')"
            >
                고민
            </button>
            <button
                :class="{ active: activeFilter === 'QUESTIONS' }"
                @click="onClickFilterBtn('QUESTIONS')"
            >
                질문
            </button>
            <button
                :class="{ active: activeFilter === 'LOOKING_FOR' }"
                @click="onClickFilterBtn('LOOKING_FOR')"
            >
                찾아요
            </button>
            <button
                :class="{ active: activeFilter === 'ADVICE' }"
                @click="onClickFilterBtn('ADVICE')"
            >
                조언
            </button>
            <button
                :class="{ active: activeFilter === 'STORIES' }"
                @click="onClickFilterBtn('STORIES')"
            >
                이야기
            </button>
            <button
                :class="{ active: activeFilter === 'COMMUNICATION' }"
                @click="onClickFilterBtn('COMMUNICATION')"
            >
                소통
            </button>
            <button
                :class="{ active: activeFilter === 'EMOTIONS' }"
                @click="onClickFilterBtn('EMOTIONS')"
            >
                감정
            </button>
            <button
                :class="{ active: activeFilter === 'HOBBIES' }"
                @click="onClickFilterBtn('HOBBIES')"
            >
                취미
            </button>
            <button
                :class="{ active: activeFilter === 'RELATIONSHIPS' }"
                @click="onClickFilterBtn('RELATIONSHIPS')"
            >
                연애
            </button>
            <button
                :class="{ active: activeFilter === 'DAILY_LIFE' }"
                @click="onClickFilterBtn('DAILY_LIFE')"
            >
                일상
            </button>
            <button
                :class="{ active: activeFilter === 'INFORMATION' }"
                @click="onClickFilterBtn('INFORMATION')"
            >
                정보
            </button>
            <button
                :class="{ active: activeFilter === 'RECOMMENDATIONS' }"
                @click="onClickFilterBtn('RECOMMENDATIONS')"
            >
                추천
            </button>
            <button
                :class="{ active: activeFilter === 'EVENTS' }"
                @click="onClickFilterBtn('EVENTS')"
            >
                이벤트
            </button>
            <button
                :class="{ active: activeFilter === 'SELF_IMPROVEMENT' }"
                @click="onClickFilterBtn('SELF_IMPROVEMENT')"
            >
                자기계발
            </button>
        </div>
        <div class="notice-area"></div>
        <div class="card-area">
            <router-link
                :to="`/secret-detail?id=${item.post_id}`"
                class="card"
                v-for="(item, index) in data"
                :key="index"
            >
                <div class="img-area">
                    <div>
                        <div>{{ item.title }}</div>
                    </div>
                </div>
                <div class="user-area gradient-background">
                    <div>
                        <p>
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="12px"
                                    viewBox="0 -960 960 960"
                                    width="12px"
                                    fill="black"
                                >
                                    <path
                                        d="M714.02-106.13H272.59v-529.09L549-911.63l56.29 53.78q7.88 7.52 12.98 20.72 5.1 13.2 5.1 25.63v11.37l-43.28 164.91h254.89q36.06 0 63.53 27.47t27.47 63.53v65.42q0 7.58-2 16.24-2 8.67-4.48 15.91L798.07-160.59q-10.2 22.87-34.19 38.67-23.99 15.79-49.86 15.79Zm-354.02-91h354.02L834.5-478.8v-65.42H468.28l51.13-208.28L360-593.09v395.96Zm0-395.96V-197.13v-395.96Zm-87.41-42.13v91H160v347.09h112.59v91H69v-529.09h203.59Z"
                                    />
                                </svg>
                            </span>
                            <span>{{ formatNumber(item.like_count) }}</span>
                        </p>
                        <p>
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="12px"
                                    viewBox="0 -960 960 960"
                                    width="12px"
                                    fill="black"
                                >
                                    <path
                                        d="M480-71.87 369.41-236.41H162.87q-37.78 0-64.39-26.61t-26.61-64.39v-469.72q0-37.78 26.61-64.39t64.39-26.61h634.26q37.78 0 64.39 26.61t26.61 64.39v469.72q0 37.78-26.61 64.39t-64.39 26.61H590.35L480-71.87Zm0-163.37 61.85-91.93h255.52v-470.2H162.63v470.2h255.52L480-235.24Zm0-327.15Z"
                                    />
                                </svg>
                            </span>
                            <span>{{ formatNumber(item.comment_count) }}</span>
                        </p>
                    </div>
                    <div>
                        <p>{{ formatTime(item.created_at) }}</p>
                    </div>
                </div>
            </router-link>
        </div>

        <router-link to="/secret-add" class="floating-btn">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#ffffff"
            >
                <path
                    d="M202.63-202.87h57.24l374.74-374.74-56.76-57-375.22 375.22v56.52Zm-90.76 91v-185.3l527.52-526.76q12.48-11.72 27.7-17.96 15.21-6.24 31.93-6.24 16.48 0 32.2 6.24 15.71 6.24 27.67 18.72l65.28 65.56q12.48 11.72 18.34 27.56 5.86 15.83 5.86 31.79 0 16.72-5.86 32.05-5.86 15.34-18.34 27.82L297.65-111.87H111.87Zm642.87-586.39-56.24-56.48 56.24 56.48Zm-148.89 92.41-28-28.76 56.76 57-28.76-28.24Z"
                />
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

    > .title-area {
        padding: 48px 0;
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

    > .card-area {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        margin-top: 24px;

        > .card {
            display: flex;
            flex-direction: column;
            aspect-ratio: 1.25 / 1;
            position: relative;
            border-radius: 8px;
            box-shadow: 0 0 0 2px transparent;
            text-decoration: none;

            > .img-area {
                height: calc(100% - 32px);
                border-radius: 8px 8px 0 0;
                background-image: url("https://picsum.photos/600");

                > div {
                    width: 100%;
                    height: 100%;
                    padding: 12px;
                    color: white;
                    border-radius: 8px 8px 0 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: rgba($color: #000000, $alpha: 0.75);

                    > div {
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        -webkit-line-clamp: 3;
                        font-size: 14px;

                        &:hover {
                            filter: none;
                        }
                    }
                }
            }

            > .user-area {
                display: flex;
                align-items: center;
                justify-content: space-between;
                z-index: 1;
                position: absolute;
                font-weight: 700;
                bottom: 0;
                height: 32px;
                width: 100%;
                padding: 8px 16px;
                border-radius: 0 0 8px 8px;

                > div {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: black;
                    font-size: 10px;

                    > p {
                        display: flex;
                        align-items: center;
                        gap: 2px;

                        > span {
                            height: 12px;
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

<script setup lang="js">
import { supabase } from '@/lib/supabase';
import { onMounted, ref } from 'vue';

const data = ref([]);
const activeFilter = ref('');

const fetchSecrets = async (filter) => {
    try {
        const query = supabase.from('secret_board').select('*');

        // filter가 비어있지 않으면 eq()를 추가합니다.
        const { data: secretDatas, error: secretError } = filter
            ? await query.eq('category', filter) // filter가 있을 때
            : await query; // filter가 없을 때
        if (secretError) throw secretError;

        const postIds = secretDatas.map(item => item.post_id);

        const { data: commentDatas, error: commentError } = await supabase
            .from('secret_board_comments')
            .select('post_id')
            .in('post_id', postIds);
        if (commentError) throw commentError;

        const { data: likeDatas, error: likeError } = await supabase
            .from('secret_board_likes')
            .select('post_id')
            .in('post_id', postIds);
        if (likeError) throw likeError;

        const updatedSecretDatas = secretDatas.map(secret => {
            const commentCount = commentDatas.filter(comment => comment.post_id === secret.post_id).length;
            const likeCount = likeDatas.filter(like => like.post_id === secret.post_id).length;
            return {
                ...secret,
                comment_count: commentCount,
                like_count: likeCount
            };
        });

        updatedSecretDatas.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        data.value = updatedSecretDatas;
    } catch (error) {
        console.error("게시글 불러오기 실패: ", error)
    }
}

const formatTime = (date) => {
    const now = new Date();
    const createdAt = new Date(date);
    const seconds = Math.floor((now - createdAt) / 1000);

    if (seconds < 60) return `${seconds}초 전`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}분 전`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}시간 전`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}일 전`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks}주 전`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}개월 전`;
    const years = Math.floor(days / 365);
    return `${years}년 전`;
}

const formatNumber = (number) => {
    if (number >= 10000) {
        return (number / 1000000).toFixed(1) + 'M'; // 1M 단위
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K'; // 1K 단위
    }
    return number; // 1000 미만은 그대로 반환
}

const onClickFilterBtn = (filter) => {
    activeFilter.value = filter;
    fetchSecrets(filter);
}

onMounted(() => {
    fetchSecrets();
})
</script>
