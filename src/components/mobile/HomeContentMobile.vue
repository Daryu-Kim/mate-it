<template>
    <div class="content">
        <div class="title-area">
            <div class="text-area">
                <p class="title">오늘의 인연</p>
                <p class="desc">매일 오전 9시에 새로운 인연 12명을 소개시켜 드립니다!</p>
            </div>
        </div>
        <div class="card-area">
            <router-link :to="`/profile?id=${item.id}`" v-for="(item, index) in data" :key="index">
                <div class="img"></div>
                <div class="desc-area">
                    <p class="gradient-font desc">
                        {{ item.locationScore === 2 ? '같은 동네 친구' :
                            item.locationScore === 1 ? '같은 도시 친구' :
                                '무작위 추천 친구' }}
                    </p>
                    <p class="name">{{ item.username }}</p>
                    <p class="age">{{ calculateAge(item.birthdate) }} 세</p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.content {
    margin: 0 auto;
    margin-top: 60px;
    padding: 0 36px;
    padding-bottom: 64px;

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

        >button {
            width: fit-content;
            padding: 8px 24px;
            border-radius: 100rem;
            height: fit-content;
            font-size: 18px;
            font-weight: 700;
        }
    }

    >.card-area {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        row-gap: 24px;
        column-gap: 16px;

        >a {
            box-shadow: 2px 2px 4px rgba($color: #000000, $alpha: 0.35);
            border-radius: 8px;
            aspect-ratio: 1 / 1.5;
            display: flex;
            flex-direction: column;
            text-decoration: none;

            >.img {
                border-radius: 8px 8px 0 0;
                background-image: url('https://picsum.photos/300');
                width: 100%;
                aspect-ratio: 1 / 1;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: cover;
            }

            >.desc-area {
                display: flex;
                flex-direction: column;
                justify-content: center;
                flex: 1;

                >.desc {
                    font-weight: 700;
                    font-size: 12px;
                }

                >.name {
                    font-weight: 700;
                    font-size: 16px;
                    margin-top: 4px;
                    color: #000000;
                }

                >.age {
                    font-weight: 500;
                    font-size: 14px;
                    color: grey;
                }
            }
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