<template>
    <div class="content">
        <div class="title-area">
            <div class="text-area">
                <p class="title">채팅방</p>
                <p class="desc">매칭된 사람들과 채팅을 진행해보세요!</p>
            </div>
        </div>
        <div class="chat-area">
            <router-link
                :to="`/chat?id=${item.chat_id}`"
                v-for="(item, index) in data"
                :key="index"
            >
                <div class="info-area">
                    <div
                        class="user-image-area"
                        :style="`background-image: url('${item.avatar_main}');`"
                    ></div>
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
                            item.lastMessageTimestamp ??
                            formatTimestamp(item.lastMessageTimestamp)
                        }}
                    </p>
                    <p v-if="item.notReadMessages > 0" class="not-read">
                        {{ item.notReadMessages }}
                    </p>
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

    > .chat-area {
        display: flex;
        flex-direction: column;
        gap: 16px;

        > a {
            box-shadow: 2px 2px 4px rgba($color: #000000, $alpha: 0.35);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            text-decoration: none;
            gap: 16px;
            padding: 8px 16px;

            > .info-area {
                display: flex;
                align-items: center;
                gap: 10px;
                flex: 1;
                height: 48px;

                > .user-image-area {
                    width: 42px;
                    height: 42px;
                    aspect-ratio: 1 / 1;
                    background-position: center center;
                    background-size: cover;
                    background-repeat: no-repeat;
                    border-radius: 8px;
                }

                > .content-area {
                    text-align: start;

                    > .user-name {
                        font-weight: 700;
                        font-size: 14px;
                        color: black;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        width: 128px;
                    }

                    > .last-content {
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

            > .time-area {
                display: flex;
                flex-direction: column;
                align-items: end;

                > .timestamp {
                    font-size: 12px;
                    color: grey;
                    font-weight: 500;
                }

                > .not-read {
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
</style>

<script setup lang="js">
import { supabase } from '@/lib/supabase';
import { onMounted, ref } from 'vue';

const data = ref([]);

const loadChats = async () => {
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
        }

        combinedChatData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        console.log(combinedChatData)

        data.value = combinedChatData;
    } catch (error) {
        console.error('사용자 데이터 가져오기 실패', error);
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

onMounted(() => {
    loadChats();
});
</script>
