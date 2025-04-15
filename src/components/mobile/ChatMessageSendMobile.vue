<template>
    <div class="chat-message-send-area">
        <div class="input-area">
            <input type="text" v-model="message" />
            <button @click="onClickSendMessage">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="28px"
                    viewBox="0 -960 960 960"
                    width="28px"
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
                        d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"
                    />
                </svg>
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.chat-message-send-area {
    position: fixed;
    width: 100%;
    bottom: 48px;

    > .input-area {
        background-color: #efefef;
        width: 100%;
        height: 56px;
        box-shadow: 0 -4px 4px rgba($color: #000000, $alpha: 0.175);
        display: flex;
        align-items: center;
        padding: 8px 12px;
        gap: 12px;

        > input {
            width: 100%;
            height: 100%;
            padding: 8px;
            border: none;
            outline: none;
            border-radius: 8px;
            font-weight: 500;
            font-size: 14px;
        }
    }
}
</style>

<script setup lang="js">
import { supabase } from '@/lib/supabase';
import { ref, defineEmits } from 'vue';
import { useRoute } from 'vue-router';

const emit = defineEmits(['sendMessages']);
const message = ref('');
const route = useRoute();

const onClickSendMessage = async () => {
    try {
        const userSession = (await supabase.auth.getSession()).data.session.user;
        const userId = userSession ? userSession.id : null;

        const { error: sendError } = await supabase
            .from('user_chat_messages')
            .insert({
                chat_id: route.query.id,
                sender_id: userId,
                content: message.value,
            });
        if (sendError) throw sendError;

        message.value = '';

        emit('sendMessages');
    } catch (error) {
        console.error("채팅 업로드 실패: ", error);
    }
}
</script>
