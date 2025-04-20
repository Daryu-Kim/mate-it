<template>
    <div class="content">
        <div class="title-area">
            <div class="text-area">
                <p class="title">채팅방</p>
                <p class="desc">매칭된 사람들과 채팅을 진행해보세요!</p>
            </div>
        </div>
        <div class="filter-area">
            <div class="tab-menu">
                <input type="radio" name="menu" id="menu-2" class="tab-button d-none" v-model="selectedTab"
                    value="person" checked></input>
                <label for="menu-2">1:1 채팅</label>
                <input type="radio" name="menu" id="menu-3" class="tab-button d-none" v-model="selectedTab"
                    value="group"></input>
                <label for="menu-3">모임 채팅</label>
            </div>

            <div class="tab-content">
                <div class="chat-area" v-if="selectedTab === 'person'">
                    <router-link :to="`/chat?id=${item.chat_id}`" v-for="(item, index) in personDatas" :key="index">
                        <div class="info-area">
                            <div class="user-image-area" :style="`background-image: url('${item.avatar_main}');`"></div>
                            <div class="content-area">
                                <p class="user-name">{{ item.username }}</p>
                                <p class="last-content">
                                    {{ item.lastMessageContent }}
                                </p>
                            </div>
                        </div>
                        <div class="time-area">
                            <p class="timestamp">
                                {{
                                    item.lastMessageTimestamp ? formatTimestamp(item.lastMessageTimestamp) :
                                        formatTimestamp(item.created_at)
                                }}
                            </p>
                            <p v-if="item.notReadMessages > 0" class="not-read">
                                {{ item.notReadMessages }}
                            </p>
                        </div>
                    </router-link>
                </div>
                <div class="chat-area" v-if="selectedTab === 'group'">
                    <router-link :to="`/group-chat?id=${item.event_id}`" v-for="(item, index) in groupDatas"
                        :key="index">
                        <div class="info-area">
                            <div class="user-image-area" :style="`background-image: url('${item.avatar_main}');`"></div>
                            <div class="content-area">
                                <p class="user-name">{{ item.title }}</p>
                                <p class="last-content">
                                    {{ item.lastMessageContent }}
                                </p>
                            </div>
                        </div>
                        <div class="time-area">
                            <p class="timestamp">
                                {{
                                    item.lastMessageTimestamp ? formatTimestamp(item.lastMessageTimestamp) :
                                        formatTimestamp(item.created_at)
                                }}
                            </p>
                            <p v-if="item.notReadMessages > 0" class="not-read">
                                {{ item.notReadMessages }}
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
                        height: 48px;

                        >.user-image-area {
                            width: 42px;
                            height: 42px;
                            aspect-ratio: 1 / 1;
                            background-position: center center;
                            background-size: cover;
                            background-repeat: no-repeat;
                            border-radius: 8px;
                        }

                        >.content-area {
                            text-align: start;

                            >.user-name {
                                font-weight: 700;
                                font-size: 14px;
                                color: black;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                width: 128px;
                            }

                            >.last-content {
                                margin-top: 2px;
                                font-weight: 500;
                                color: grey;
                                font-size: 12px;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                width: 128px;
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

                        >.not-read {
                            margin-top: 2px;
                            border-radius: 100rem;
                            font-size: 10px;
                            font-weight: 700;
                            color: white;
                            background-color: #fd3725;
                            width: fit-content;
                            padding: 2px 6px;
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

const personDatas = ref([]);
const groupDatas = ref([]);
const selectedTab = ref('person');

const loadGroupChats = async () => {
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session) {
            console.error('세션을 가져올 수 없습니다:', sessionError?.message);
            return null;
        }
        const currentUid = session.user.id;

        const { data: groupData, error: groupError } = await supabase
            .from('events')
            .select('*')
            .contains('participants', [currentUid])
        if (groupError) throw groupError;

        for (const chat of groupData) {
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('avatar_main')
                .eq('id', chat.user_id)
                .single();
            if (userError) throw userError;

            chat.avatar_main = userData.avatar_main[0];

            const { data: messagesDatas, error: messagesError } = await supabase
                .from('event_chat_messages')
                .select('*')
                .eq('event_id', chat.event_id)
                .order('timestamp', { ascending: false })
            if (messagesError) throw messagesError;

            chat.lastMessageContent = messagesDatas.length > 0 ? messagesDatas[0].content : "새로운 대화를 시작해보세요!";
            chat.lastMessageTimestamp = messagesDatas.length > 0 ? messagesDatas[0].timestamp : "";
            chat.notReadMessages = messagesDatas.filter(message =>
                message.user_id !== currentUid && !message.isReaded
            ).length;
            chat.filter = "group";
        }

        groupData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        groupDatas.value = groupData;
    } catch (error) {
        console.error("그룹 채팅 데이터 가져오기 실패: ", error);
    }
}

const loadPersonChats = async () => {
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session) {
            console.error('세션을 가져올 수 없습니다:', sessionError?.message);
            return null;
        }
        const currentUid = session.user.id;

        const { data: chatData1, error: chatError1 } = await supabase
            .from('user_chat')
            .select('*')
            .eq('user_id_1', currentUid)

        if (chatError1) throw chatError1;

        const { data: chatData2, error: chatError2 } = await supabase
            .from('user_chat')
            .select('*')
            .eq('user_id_2', currentUid)

        if (chatError2) throw chatError2;

        const combinedChatData = [...chatData1, ...chatData2];

        for (const chat of combinedChatData) {
            const otherUserId = chat.user_id_1 === currentUid ? chat.user_id_2 : chat.user_id_1;

            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('username, avatar_main')
                .eq('id', otherUserId)
                .single();
            if (userError) throw userError;

            chat.username = userData.username;
            chat.avatar_main = userData.avatar_main[0];

            const { data: messagesDatas, error: messagesError } = await supabase
                .from('user_chat_messages')
                .select('*')
                .eq('chat_id', chat.chat_id)
                .order('timestamp', { ascending: false })
            if (messagesError) throw messagesError;

            chat.lastMessageContent = messagesDatas.length > 0 ? messagesDatas[0].content : "새로운 대화를 시작해보세요!";
            chat.lastMessageTimestamp = messagesDatas.length > 0 ? messagesDatas[0].timestamp : "";
            chat.notReadMessages = messagesDatas.filter(message =>
                message.sender_id !== currentUid && !message.isReaded
            ).length;
            chat.filter = "person";
        }

        combinedChatData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        console.log(combinedChatData)

        personDatas.value = combinedChatData;
    } catch (error) {
        console.error('개인 대화 데이터 가져오기 실패: ', error);
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
    await loadPersonChats();
    await loadGroupChats();
});
</script>
