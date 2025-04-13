<template>
    <div class="secret-detail-send-area">
        <div class="reply-area" v-if="replyCommentId">
            <p>
                {{ generateNickname($route.query.id, replyCommentId.user_id) }}
                님에게 대댓글 작성 중...
            </p>
            <button @click="replyCommentId = null">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                >
                    <path
                        d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
                    />
                </svg>
            </button>
        </div>
        <div class="input-area">
            <input
                type="text"
                placeholder="SNS, 연락처, 게임 ID 공유 시 정지됩니다."
                v-model="message"
            />
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
.secret-detail-send-area {
    position: fixed;
    width: 100%;
    bottom: 48px;

    > .reply-area {
        background-color: #efefef;
        width: 100%;
        height: 42px;
        box-shadow: 0 -4px 4px rgba($color: #000000, $alpha: 0.175);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 16px;
        gap: 12px;

        > p {
            font-size: 12px;
            font-weight: 700;
        }
    }

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
import { ref, watch, defineProps, defineEmits } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps(['replyCommentId']);
const emit = defineEmits(['sendComment']);
const message = ref('');
const replyCommentId = ref(null);
const route = useRoute();

watch(() => props.replyCommentId, (newId) => {
    replyCommentId.value = newId;
})

const onClickSendMessage = async () => {
    try {
        const userSession = (await supabase.auth.getSession()).data.session.user;
        const userId = userSession ? userSession.id : null;

        const { error: sendError } = await supabase
            .from('secret_board_comments')
            .insert({
                post_id: route.query.id,
                user_id: userId,
                content: message.value,
                parent_comment_id: replyCommentId.value ? replyCommentId.value.comment_id : null,
            });
        if (sendError) throw sendError;

        message.value = '';
        replyCommentId.value = null;

        emit('sendComment');
    } catch (error) {
        console.error("댓글 업로드 실패: ", error);
    }
}

const generateNickname = (postId, userId) => {
    const combined = `${postId}-${userId}`;
    const hash = Array.from(combined).reduce((acc, char) => {
        return acc + char.charCodeAt(0);
    }, 0);

    // 6자리 숫자 생성
    const nicknameNumber = String(hash % 1000000).padStart(6, '0'); // 6자리로 맞추기
    return `메이트${nicknameNumber}`; // 닉네임 형식
}
</script>
