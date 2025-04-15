<template>
    <div class="content">
        <div class="title-area">
            <div class="text-area">
                <p class="title">채팅방</p>
                <p class="desc">매칭된 사람들과 채팅을 진행해보세요!</p>
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
    }
}
</style>

<script setup lang="js">
import { supabase } from '@/lib/supabase';
import { onMounted, ref } from 'vue';

const data = ref([]);
const currentUserId = ref('');

const loadUserData = async () => {
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session) {
            console.error('세션을 가져올 수 없습니다:', sessionError?.message);
            return null;
        }
        const currentUid = session.user.id;

        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', currentUid)
            .single()

        if (userError) throw userError;

        data.value = userData;
        currentUserId.value = currentUid;
    } catch (error) {
        console.error('사용자 데이터 가져오기 실패', error);
    }
}

onMounted(() => {
    loadUserData();
});
</script>
