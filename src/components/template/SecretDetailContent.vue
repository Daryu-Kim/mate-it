<template>
    <div class="content">
        <SecretDetailContentMobile
            class="mobile"
            @reply="setReplyCommentId"
            :comments="comments"
            @reloadComment="fetchCommentsWithGender"
        />
        <SecretDetailSendMobile
            class="mobile"
            :replyCommentId="replyCommentId"
            @sendComment="fetchCommentsWithGender"
        />
    </div>
</template>

<style lang="scss" scoped>
.content {
    flex: 1;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.content::-webkit-scrollbar {
    display: none;
}

@media (max-width: 767px) {
    .tablet,
    .desktop {
        display: none;
    }
}

/* 태블릿 화면: 768~1024px */
@media (min-width: 768px) and (max-width: 1023px) {
    .mobile,
    .desktop {
        display: none;
    }
}

/* 데스크탑 화면: 1025px 이상 */
@media (min-width: 1024px) {
    .mobile,
    .tablet {
        display: none;
    }
}
</style>

<script setup>
import SecretDetailContentMobile from "../mobile/SecretDetailContentMobile.vue";
import SecretDetailSendMobile from "../mobile/SecretDetailSendMobile.vue";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { supabase } from "@/lib/supabase";

const replyCommentId = ref(null);
const comments = ref([]);
const route = useRoute();

const setReplyCommentId = (commentId, userId) => {
    replyCommentId.value = {
        comment_id: commentId,
        user_id: userId,
    };
};

const fetchCommentsWithGender = async () => {
    try {
        const { data: commentsData, error: commentError } = await supabase
            .from("secret_board_comments")
            .select("*")
            .eq("post_id", route.query.id);
        if (commentError) throw commentError;

        // 각 댓글의 user_id를 통해 성별 정보를 가져옴
        const commentsWithGender = await Promise.all(
            commentsData
                .sort((a, b) => new Date(a.created_at) - new Date(b.created_at)) // created_at 기준으로 과거순 정렬
                .map(async (comment) => {
                    const { data: userData, error: userError } = await supabase
                        .from("users")
                        .select("gender")
                        .eq("id", comment.user_id)
                        .single();
                    if (userError) throw userError;

                    return {
                        ...comment,
                        gender: userData.gender, // 성별 정보를 추가
                    };
                })
        );

        comments.value = commentsWithGender; // 댓글 목록 업데이트
    } catch (error) {
        console.error("댓글 불러오기 실패: ", error);
    }
};

onMounted(() => {
    fetchCommentsWithGender();
});
</script>
