<template>
    <div class="profile-menu-area">
        <div
            v-if="
                !data ||
                (data.status === 'pending' &&
                    data.creater_id !== route.query.id) ||
                data.status === 'rejected'
            "
        >
            <button
                class="gradient-background"
                :disabled="data && data.status === 'pending'"
                @click="onClickPendingFriend"
            >
                {{
                    data && data.status === "pending"
                        ? "승인 대기중"
                        : "친구 요청하기"
                }}
            </button>
        </div>
        <div v-if="data && data.status === 'accepted'">
            <button class="reject" @click="onClickDeleteFriend">
                친구 삭제하기
            </button>
            <button class="border" @click="onClickMessage">메시지</button>
        </div>
        <div
            v-if="
                data &&
                data.status === 'pending' &&
                data.creater_id === route.query.id
            "
        >
            <!-- status가 pending인데 본인이 보낸게 아닐때 -->
            <button class="gradient-background" @click="onClickAcceptFriend">
                친구 수락하기
            </button>
            <button class="reject" @click="onClickRejectFriend">
                친구 거절하기
            </button>
        </div>
        <button @click="onClickLikeBtn()">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
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
                    :fill="isLiked && isLiked ? 'url(#gradient1)' : '#000000'"
                    d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z"
                />
            </svg>
        </button>
    </div>
</template>

<style lang="scss" scoped>
.profile-menu-area {
    position: fixed;
    width: 100%;
    bottom: 48px;
    background-color: #efefef;
    height: 56px;
    box-shadow: 0 -4px 4px rgba($color: #000000, $alpha: 0.175);
    display: flex;
    align-items: center;
    padding: 8px 16px;
    gap: 12px;

    > div {
        height: 100%;
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;

        > button {
            flex: 1;
            height: 100%;
            font-weight: 700;
            border-radius: 8px;

            &.reject {
                background-color: red;
                color: white;
            }

            &.border {
                border: 1px solid grey;
            }
        }
    }
}
</style>

<script setup lang="js">
import { supabase } from '@/lib/supabase';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const isLiked = ref(false);
const data = ref(null);

const onClickMessage = async () => {
    try {
        const userSession = (await supabase.auth.getSession()).data.session.user;
        const userId = userSession ? userSession.id : null;

        const { data: chatData1, error: chatError1 } = await supabase
            .from('user_chat')
            .select('*')
            .or(`user_id_1.eq.${userId},user_id_2.eq.${route.query.id}`)

        if (chatError1) throw chatError1;

        const { data: chatData2, error: chatError2 } = await supabase
            .from('user_chat')
            .select('*')
            .or(`user_id_1.eq.${route.query.id},user_id_2.eq.${userId}`)

        if (chatError2) throw chatError2;

        if (chatData1.length > 0) {
            router.push(`/chat?id=${chatData1[0].chat_id}`)
        } else if (chatData2.length > 0) {
            router.push(`/chat?id=${chatData2[0].chat_id}`)
        }

    } catch (error) {
        console.error("채팅창 이동 실패: ", error);
    }
}

const onClickAcceptFriend = async () => {
    try {
        const userSession = (await supabase.auth.getSession()).data.session.user;
        const userId = userSession ? userSession.id : null;

        const { data: followData1, error: followError1 } = await supabase
            .from('user_follow')
            .select('*')
            .or(`follow_id_1.eq.${userId},follow_id_2.eq.${route.query.id}`)

        if (followError1) throw followError1;

        const { data: followData2, error: followError2 } = await supabase
            .from('user_follow')
            .select('*')
            .or(`follow_id_1.eq.${route.query.id},follow_id_2.eq.${userId}`)

        if (followError2) throw followError2;

        if (followData1.length > 0) {
            const { error: followError } = await supabase
                .from('user_follow')
                .upsert({
                    follow_id_1: userId,
                    follow_id_2: route.query.id,
                    status: 'accepted',
                })

            if (followError) throw followError;
        } else if (followData2.length > 0) {
            const { error: followError } = await supabase
                .from('user_follow')
                .upsert({
                    follow_id_1: route.query.id,
                    follow_id_2: userId,
                    status: 'accepted',
                })

            if (followError) throw followError;
        }

        const { error: chatError } = await supabase
            .from('user_chat')
            .insert({
                user_id_1: userId,
                user_id_2: route.query.id
            });
        if (chatError) throw chatError;

        alert("친구 요청을 수락했습니다!");
        window.location.reload();
    } catch (error) {
        console.error("친구 수락 실패: ", error);
    }
}

const onClickRejectFriend = async () => {
    try {
        const userSession = (await supabase.auth.getSession()).data.session.user;
        const userId = userSession ? userSession.id : null;

        const { data: followData1, error: followError1 } = await supabase
            .from('user_follow')
            .select('*')
            .or(`follow_id_1.eq.${userId},follow_id_2.eq.${route.query.id}`)

        if (followError1) throw followError1;

        const { data: followData2, error: followError2 } = await supabase
            .from('user_follow')
            .select('*')
            .or(`follow_id_1.eq.${route.query.id},follow_id_2.eq.${userId}`)

        if (followError2) throw followError2;

        if (followData1.length > 0) {
            const { error: followError } = await supabase
                .from('user_follow')
                .upsert({
                    follow_id_1: userId,
                    follow_id_2: route.query.id,
                    status: 'rejected',
                })

            if (followError) throw followError;
        } else if (followData2.length > 0) {
            const { error: followError } = await supabase
                .from('user_follow')
                .upsert({
                    follow_id_1: route.query.id,
                    follow_id_2: userId,
                    status: 'rejected',
                })

            if (followError) throw followError;
        }

        alert("친구 요청을 거절했습니다!");
        window.location.reload();
    } catch (error) {
        console.error("친구 거절 실패: ", error);
    }
}

const onClickDeleteFriend = async () => {
    try {
        const userSession = (await supabase.auth.getSession()).data.session.user;
        const userId = userSession ? userSession.id : null;

        const { error: followError1 } = await supabase
            .from('user_follow')
            .delete()
            .or(`follow_id_1.eq.${userId},follow_id_2.eq.${route.query.id}`)

        if (followError1) throw followError1;

        // currentUserId가 follow_id_2에 있을 때의 데이터 조회
        const { error: followError2 } = await supabase
            .from('user_follow')
            .delete()
            .or(`follow_id_1.eq.${route.query.id},follow_id_2.eq.${userId}`)

        if (followError2) throw followError2;

        const { error: chatError1 } = await supabase
            .from('user_chat')
            .delete()
            .or(`user_id_1.eq.${userId},user_id_2.eq.${route.query.id}`)

        if (chatError1) throw chatError1;

        // currentUserId가 follow_id_2에 있을 때의 데이터 조회
        const { error: chatError2 } = await supabase
            .from('user_chat')
            .delete()
            .or(`user_id_1.eq.${route.query.id},user_id_2.eq.${userId}`)

        if (chatError2) throw chatError2;

        alert("친구를 삭제했습니다!");
        window.location.reload();

    } catch (error) {
        console.error("친구 삭제 실패: ", error);
    }
}

const onClickPendingFriend = async () => {
    try {
        const userSession = (await supabase.auth.getSession()).data.session.user;
        const userId = userSession ? userSession.id : null;

        // 하트 차감 필요

        const { data: followData1, error: followError1 } = await supabase
            .from('user_follow')
            .select('*')
            .or(`follow_id_1.eq.${userId},follow_id_2.eq.${route.query.id}`)

        if (followError1) throw followError1;

        const { data: followData2, error: followError2 } = await supabase
            .from('user_follow')
            .select('*')
            .or(`follow_id_1.eq.${route.query.id},follow_id_2.eq.${userId}`)

        if (followError2) throw followError2;

        if (followData1.length === 0 && followData2.length === 0) {
            // 데이터 없을때
            const { error: followError } = await supabase
                .from('user_follow')
                .insert({
                    follow_id_1: userId,
                    follow_id_2: route.query.id,
                    status: 'pending',
                    creater_id: userId
                })
            if (followError) throw followError;
        } else if (followData1.length > 0) {
            const { error: followError } = await supabase
                .from('user_follow')
                .upsert({
                    follow_id_1: userId,
                    follow_id_2: route.query.id,
                    status: 'pending',
                    creater_id: userId
                })

            if (followError) throw followError;
        } else if (followData2.length > 0) {
            const { error: followError } = await supabase
                .from('user_follow')
                .upsert({
                    follow_id_1: route.query.id,
                    follow_id_2: userId,
                    status: 'pending',
                    creater_id: userId
                })

            if (followError) throw followError;
        }

        alert("친구 요청을 보냈습니다!");
        window.location.reload();
    } catch (error) {
        console.error("친구 요청 실패: ", error);
    }
}

const fetchUserData = async () => {
    try {
        const userSession = (await supabase.auth.getSession()).data.session.user;
        const userId = userSession ? userSession.id : null;

        const { data: followData1, error: followError1 } = await supabase
            .from('user_follow')
            .select('*')
            .or(`follow_id_1.eq.${userId},follow_id_2.eq.${route.query.id}`)

        if (followError1) throw followError1;

        // currentUserId가 follow_id_2에 있을 때의 데이터 조회
        const { data: followData2, error: followError2 } = await supabase
            .from('user_follow')
            .select('*')
            .or(`follow_id_1.eq.${route.query.id},follow_id_2.eq.${userId}`)

        if (followError2) throw followError2;

        const { data: likeData, error: likeError } = await supabase
            .from('user_likes')
            .select('*')
            .eq('target_user_id', route.query.id);
        if (likeError) throw likeError;

        isLiked.value = likeData.some(like => like.user_id === userId);
        data.value = followData1[0] === undefined ? followData2[0] === undefined ? null : followData2[0] : followData1[0];
        console.log(data.value)
    } catch (error) {
        console.error("유저 정보 불러오기 실패: ", error);
    }
}

const onClickLikeBtn = async () => {
    try {
        const userSession = (await supabase.auth.getSession()).data.session.user;
        const userId = userSession ? userSession.id : null;

        if (isLiked.value) {
            const { error: likeError } = await supabase
                .from('user_likes')
                .delete()
                .eq('target_user_id', route.query.id) // post_id 조건 추가
                .eq('user_id', userId); // user_id 조건 추가
            if (likeError) throw likeError;
        } else {
            // 좋아요 추가
            const { error: likeError } = await supabase
                .from('user_likes')
                .insert([{ target_user_id: route.query.id, user_id: userId }]); // 데이터 추가
            if (likeError) throw likeError;
        }

        isLiked.value = !isLiked.value;
        window.location.reload();
    } catch (error) {
        console.error("좋아요 누르기 실패: ", error);
    }
}

onMounted(() => {
    fetchUserData();
});
</script>
