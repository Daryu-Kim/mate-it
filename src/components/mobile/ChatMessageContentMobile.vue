<template>
    <div class="content">
        <div class="message-area" v-if="messages.length > 0">
            <div
                v-for="(item, index) in messages"
                :key="index"
                :class="item.sender_id === currentUserId ? 'self' : ''"
            >
                <div
                    class="profile-image"
                    :style="`background-image: url('${item.avatar_main}');`"
                ></div>
                <div class="content-area">
                    <p class="name">{{ item.username }}</p>
                    <p class="message">{{ item.content }}</p>
                    <div v-if="item.sender_id === currentUserId">
                        <p>
                            {{ item.isReaded ? "읽음" : "읽지 않음" }}
                        </p>
                        <p>
                            {{ formatTimestamp(item.timestamp) }}
                        </p>
                    </div>
                    <div v-else>
                        <p>
                            {{ formatTimestamp(item.timestamp) }}
                        </p>
                        <p>
                            {{ item.isReaded ? "읽음" : "읽지 않음" }}
                        </p>
                    </div>
                </div>
            </div>
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
                    d="M480-260q68 0 123.5-38.5T684-400H276q25 63 80.5 101.5T480-260ZM312-520l44-42 42 42 42-42-84-86-86 86 42 42Zm250 0 42-42 44 42 42-42-86-86-84 86 42 42ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z"
                />
            </svg>
            <p class="title">새로운 대화를 시작해보세요!</p>
            <p class="desc">
                친구가 되어 채팅방이 개설되었어요!<br />
                먼저 가벼운 인사부터 건네보는 것은 어떨까요?
            </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.content {
    margin: 0 auto;
    margin-top: 60px;
    padding: 24px 36px;
    padding-bottom: 64px;

    > .message-area {
        text-align: start;
        font-weight: 500;
        font-size: 12px;
        line-height: 1.5;
        display: flex;
        flex-direction: column;
        gap: 16px;

        > div {
            display: flex;
            height: fit-content;
            gap: 8px;

            > .profile-image {
                width: 36px;
                height: 36px;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                border-radius: 50%;
            }

            > .content-area {
                display: flex;
                flex-direction: column;

                > div {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-top: 2px;
                    font-size: 10px;
                }

                > .name {
                    font-weight: 700;
                }

                > .message {
                    padding: 6px 8px;
                    border-radius: 8px;
                    background-color: black;
                    color: white;
                    margin-top: 4px;
                    width: fit-content;
                }
            }

            &.self {
                align-self: flex-end;

                .profile-image {
                    display: none;
                }

                > .content-area {
                    align-items: end;
                    > .name {
                        display: none;
                    }

                    > .message {
                        background-color: yellow;
                        color: black;
                    }

                    > div {
                        justify-content: end;
                    }
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
        margin-top: 96px;

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
import { supabase } from '@/lib/supabase';
import { onMounted, ref, defineProps } from 'vue';

const props = defineProps(['messages'])
const currentUserId = ref('');

const loadUserId = async () => {
    try {
        const {
            data: { session },
            error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError || !session) {
            console.error("세션을 가져올 수 없습니다:", sessionError?.message);
            return null;
        }
        const currentUid = session.user.id;
        currentUserId.value = currentUid;
    } catch (error) {
        console.error("유저 불러오기 실패: ", error)
    }
}

const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}. ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

onMounted(() => {
    loadUserId();
})
</script>
