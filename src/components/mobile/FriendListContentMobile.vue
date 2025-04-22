<template>
    <div class="content">
        <div class="title-area">
            <div class="text-area">
                <p class="title">친구 리스트</p>
                <p class="desc">친해진 사람들 리스트를 확인해보세요!</p>
            </div>
        </div>
        <div class="filter-area">
            <div class="tab-menu">
                <input type="radio" name="menu" id="menu-2" class="tab-button d-none" v-model="selectedTab"
                    value="accept" checked />
                <label for="menu-2">내 친구</label>
                <input type="radio" name="menu" id="menu-3" class="tab-button d-none" v-model="selectedTab"
                    value="request" />
                <label for="menu-3">친구 요청</label>
            </div>

            <div class="tab-content">
                <div class="chat-area" v-if="selectedTab === 'accept'">
                    <router-link :to="`/profile?id=${item.follow_id_1 === currentUserId ? item.follow_id_2 : item.follow_id_1}`" v-for="(item, index) in myFriendDatas" :key="index">
                        <div class="info-area">
                            <div class="user-image-area" :style="`background-image: url('${item.avatar_main}');`"></div>
                            <div class="content-area">
                                <p class="user-name">{{ item.username }}</p>
                                <button class="gradient-background">
                                    프로필 보러가기
                                </button>
                            </div>
                        </div>
                    </router-link>
                </div>
                <div class="chat-area" v-if="selectedTab === 'request'">
                    <router-link :to="`/profile?id=${item.follow_id_1 === currentUserId ? item.follow_id_2 : item.follow_id_1}`" v-for="(item, index) in requestFriendDatas" :key="index">
                        <div class="info-area">
                            <div class="user-image-area" :style="`background-image: url('${item.avatar_main}');`"></div>
                            <div class="content-area">
                                <p class="user-name">{{ item.username }}</p>
                                <button class="gradient-background">
                                    프로필 보러가기
                                </button>
                            </div>
                        </div>
                        <div class="time-area">
                            <p class="timestamp">
                                {{
                                    item.lastMessageTimestamp ? formatTimestamp(item.lastMessageTimestamp) :
                                        formatTimestamp(item.created_at)
                                }}
                            </p>
                        </div>
                    </router-link>
                </div>
            </div>
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

    >.filter-area {
        display: flex;
        flex-direction: column;
        gap: 8px;

        >.tab-menu {
            display: flex;
            align-items: center;
            gap: 8px;

            >label {
                border-radius: 8px;
                padding: 8px 12px;
                font-weight: 500;
                font-size: 14px;
                background-color: #efefef;
                color: #999;
                cursor: pointer;
            }

            >input:checked+label {
                background-color: black;
                color: white;
                font-weight: 700;
            }
        }

        >.tab-content {
            overflow-y: auto;

            &::-webkit-scrollbar {
                background: transparent;
                width: 8px;
            }

            &::-webkit-scrollbar-thumb {
                background: rgba($color: #fff, $alpha: 0.5); // 스크롤바 바의 색상 및 투명도 설정
                border-radius: 100rem; // 스크롤바 바의 모서리를 둥글게 설정
            }

            >.chat-area {
                display: flex;
                flex-direction: column;
                gap: 16px;
                width: 100%;
                margin-top: 24px;

                >a {
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    text-decoration: none;
                    gap: 16px;

                    >.info-area {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        flex: 1;

                        >.user-image-area {
                            width: 56px;
                            height: 56px;
                            aspect-ratio: 1 / 1;
                            background-position: center center;
                            background-size: cover;
                            background-repeat: no-repeat;
                            border-radius: 8px;
                        }

                        >.content-area {
                            text-align: start;
                            flex: 1;

                            >.user-name {
                                font-weight: 700;
                                font-size: 14px;
                                color: black;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                width: 128px;
                            }

                            > button {
                                border-radius: 8px;
                                width: 100%;
                                font-size: 12px;
                                padding: 8px 12px;
                                font-weight: 700;
                                margin-top: 6px;
                            }
                        }
                    }

                    >.time-area {
                        display: flex;
                        flex-direction: column;
                        align-items: end;

                        >.timestamp {
                            font-size: 12px;
                            color: grey;
                            font-weight: 500;
                        }
                    }
                }
            }
        }
    }
}
</style>

<script setup lang="js">
import { supabase } from '@/lib/supabase';
import { onMounted, ref } from 'vue';

const myFriendDatas = ref([]);
const requestFriendDatas = ref([]);
const selectedTab = ref('accept');
const currentUserId = ref('');

const loadMyFriendList = async () => {
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session) {
            console.error('세션을 가져올 수 없습니다:', sessionError?.message);
            return null;
        }
        const currentUid = session.user.id;

        const { data: friendData, error: friendError } = await supabase
            .from('user_follow')
            .select('*')
            .or(`follow_id_1.eq.${currentUid},follow_id_2.eq.${currentUid}`)
            .eq('status', 'accepted');
        if (friendError) throw friendError;

        for (const friend of friendData) {
            const otherUserId = friend.follow_id_1 === currentUid ? friend.follow_id_2 : friend.follow_id_1;

            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('username, avatar_main')
                .eq('id', otherUserId)
                .single();
            if (userError) throw userError;

            friend.username = userData.username;
            friend.avatar_main = userData.avatar_main[0];
        }

        currentUserId.value = currentUid;
        myFriendDatas.value = friendData;
    } catch (error) {
        console.error('내 친구 데이터 가져오기 실패: ', error);
    }
}

const loadRequestFriendList = async () => {
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session) {
            console.error('세션을 가져올 수 없습니다:', sessionError?.message);
            return null;
        }
        const currentUid = session.user.id;

        const { data: friendData, error: friendError } = await supabase
            .from('user_follow')
            .select('*')
            .or(`follow_id_1.eq.${currentUid},follow_id_2.eq.${currentUid}`)
            .eq('creater_id', currentUid)
            .eq('status', 'request');
        if (friendError) throw friendError;

        for (const friend of friendData) {
            const otherUserId = friend.follow_id_1 === currentUid ? friend.follow_id_2 : friend.follow_id_1;

            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('username, avatar_main')
                .eq('id', otherUserId)
                .single();
            if (userError) throw userError;

            friend.username = userData.username;
            friend.avatar_main = userData.avatar_main[0];
        }

        requestFriendDatas.value = friendData;
    } catch (error) {
        console.error('내 친구 데이터 가져오기 실패: ', error);
    }
}

const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();

    // 당일
    if (date.toDateString() === now.toDateString()) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? '오후' : '오전';
        const formattedHours = hours % 12 || 12; // 12시간 형식으로 변환
        return `${period} ${formattedHours}:${minutes.toString().padStart(2, '0')}`;
    }

    // 어제
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
        return '어제';
    }

    // 같은 연도이고 어제보다 이전
    if (date.getFullYear() === now.getFullYear()) {
        return `${date.getMonth() + 1}월 ${date.getDate()}일`;
    }

    // 연도가 다를 경우
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
}

onMounted(async () => {
    await loadMyFriendList();
    await loadRequestFriendList();
});
</script>
