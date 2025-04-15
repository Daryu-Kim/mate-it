<template>
    <div class="content">
        <ChatMessageContentMobile class="mobile" :messages="messages" />
        <ChatMessageSendMobile class="mobile" @sendMessages="loadChats" />
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
import ChatMessageContentMobile from "../mobile/ChatMessageContentMobile.vue";
import ChatMessageSendMobile from "../mobile/ChatMessageSendMobile.vue";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { supabase } from "@/lib/supabase";

const messages = ref([]);
const route = useRoute();

const loadChats = async () => {
    try {
        const { data: messageDatas, error: messagesError } = await supabase
            .from("user_chat_messages")
            .select("*")
            .eq("chat_id", route.query.id)
            .order("timestamp", { ascending: true });
        if (messagesError) throw messagesError;

        for (const message of messageDatas) {
            // const otherUserId = message.sender_id === currentUid ? chat.user_id_2 : chat.user_id_1;
            const { data: userData, error: userError } = await supabase
                .from("users")
                .select("username, avatar_main")
                .eq("id", message.sender_id)
                .single();
            if (userError) throw userError;

            message.username = userData.username;
            message.avatar_main = userData.avatar_main[0];
        }

        messages.value = messageDatas;
        console.log(messages);
    } catch (error) {
        console.error("채팅 가져오기 실패", error);
    }
};

onMounted(() => {
    loadChats();
});
</script>
