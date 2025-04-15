<template>
    <div class="content">
        <div class="message-area">
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
