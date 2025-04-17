<template>
    <div class="content">
        <ProfileContentMobile class="mobile" />
        <ProfileMenuMobile v-if="!isMyProfile" class="mobile" />
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
import { useRoute } from "vue-router";
import ProfileContentMobile from "../mobile/ProfileContentMobile.vue";
import ProfileMenuMobile from "../mobile/ProfileMenuMobile.vue";
import { onMounted } from "vue";
import { supabase } from "@/lib/supabase";
import { ref } from "vue";

const route = useRoute();
const isMyProfile = ref(false);

const checkMyProfile = async () => {
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
        isMyProfile.value = currentUid === route.query.id;
    } catch (error) {
        console.error("프로필 체크 오류: ", error);
    }
};

onMounted(() => {
    checkMyProfile();
});
</script>
