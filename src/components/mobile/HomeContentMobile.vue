<template>
    <div class="content">
        <div class="title-area">
            <div class="text-area">
                <p class="title">오늘의 인연</p>
                <p class="desc">
                    매일 오전 9시에 새로운 인연 6명을 소개시켜 드립니다!
                </p>
            </div>
        </div>
        <div class="card-area" v-if="data.length > 0">
            <router-link
                :to="`/profile?id=${item.id}`"
                v-for="(item, index) in data"
                :key="index"
            >
                <div class="img"></div>
                <div class="desc-area">
                    <p class="gradient-font desc">
                        {{
                            item.locationScore === 2
                                ? "같은 동네 친구"
                                : item.locationScore === 1
                                ? "같은 도시 친구"
                                : "무작위 추천 친구"
                        }}
                    </p>
                    <p class="name">{{ item.username }}</p>
                    <p class="age">{{ calculateAge(item.birthdate) }} 세</p>
                </div>
            </router-link>
        </div>
        <div class="not-found-area" v-else>
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
                    d="M480-420q-68 0-123.5 38.5T276-280h408q-25-63-80.5-101.5T480-420Zm-168-60 44-42 42 42 42-42-42-42 42-44-42-42-42 42-44-42-42 42 42 44-42 42 42 42Zm250 0 42-42 44 42 42-42-42-42 42-44-42-42-44 42-42-42-42 42 42 44-42 42 42 42ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z"
                />
            </svg>
            <p class="title">오늘은 새로운 인연이 없네요!</p>
            <p class="desc">
                오늘은 새로운 인연이 존재하지 않아요.<br />괜찮아요, 곧 새로운
                친구로 추천해드릴게요!
            </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.content {
    margin: 0 auto;
    margin-top: 60px;
    padding: 0 36px;
    padding-bottom: 64px;

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

        > button {
            width: fit-content;
            padding: 8px 24px;
            border-radius: 100rem;
            height: fit-content;
            font-size: 18px;
            font-weight: 700;
        }
    }

    > .card-area {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        row-gap: 24px;
        column-gap: 16px;

        > a {
            box-shadow: 2px 2px 4px rgba($color: #000000, $alpha: 0.35);
            border-radius: 8px;
            aspect-ratio: 1 / 1.5;
            display: flex;
            flex-direction: column;
            text-decoration: none;

            > .img {
                border-radius: 8px 8px 0 0;
                background-image: url("https://picsum.photos/300");
                width: 100%;
                aspect-ratio: 1 / 1;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: cover;
            }

            > .desc-area {
                display: flex;
                flex-direction: column;
                justify-content: center;
                flex: 1;

                > .desc {
                    font-weight: 700;
                    font-size: 12px;
                }

                > .name {
                    font-weight: 700;
                    font-size: 16px;
                    margin-top: 4px;
                    color: #000000;
                }

                > .age {
                    font-weight: 500;
                    font-size: 14px;
                    color: grey;
                }
            }
        }
    }

    > .not-found-area {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        word-break: keep-all;
        margin-top: 48px;

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
    }
}
</style>

<script setup lang="js">
import { calculateAge, createMatchCards, supabase } from '@/lib/supabase';
import { onMounted, ref } from 'vue';

const data = ref([]);

const loadMatchCards = async () => {
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session) {
            console.error('세션을 가져올 수 없습니다:', sessionError?.message);
            return null;
        }
        const currentUid = session.user.id;

        const { data: matchedCards, error: matchedError } = await supabase
            .from('user_matches')
            .select('*')
            .eq('user_id', currentUid)
            .gte('created_at', new Date().toISOString().split('T')[0])
            .lte('created_at', new Date().toISOString().split('T')[0] + 'T23:59:59.999Z')

        if (matchedError) throw matchedError;

        if (!matchedCards || matchedCards.length === 0) {
            await createMatchCards();
        }

        const { data: newMatchedCards, error: newMatchedError } = await supabase
            .from('user_matches')
            .select('*')
            .eq('user_id', currentUid)
            .gte('created_at', new Date().toISOString().split('T')[0])
            .lte('created_at', new Date().toISOString().split('T')[0] + 'T23:59:59.999Z')

        if (newMatchedError) throw newMatchedError;

        const { data: matchedUsers, error: usersError } = await supabase
            .from('users')
            .select('id, username, avatar_main, birthdate')
            .in('id', newMatchedCards.map(card => card.match_id));

        if (usersError) throw usersError;

        const usersWithLocationScore = matchedUsers.map(user => {
            const matchedCard = newMatchedCards.find(card => card.match_id === user.id);
            return {
                ...user,
                location_score: matchedCard?.location_score || 0
            };
        });

        // 위치 점수에 따라 정렬 (높은 점수 순)
        const sortedUsers = usersWithLocationScore.sort((a, b) => b.location_score - a.location_score);
        data.value = sortedUsers;
    } catch (error) {
        console.error('사용자 데이터 가져오기 실패', error);
    }
}

onMounted(() => {
    loadMatchCards();
});
</script>
