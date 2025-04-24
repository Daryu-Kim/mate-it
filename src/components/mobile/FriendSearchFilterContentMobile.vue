<template>
    <div class="content">
        <div class="title-area">
            <div class="text-area">
                <p class="title">친구 검색 조건</p>
                <p class="desc">
                    만나고 싶은 친구는 어떤 유형의 친구인가요?
                </p>
            </div>
        </div>
        <div class="filter-area">
            <p class="title">👋 환영합니다!</p>
            <div></div>
        </div>
        <button @click="onClickSearchStart" class="gradient-background">
            <p class="title">나한테 맞는 친구 찾기</p>
            <p class="desc">하트 5개 차감</p>
        </button>
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

    > .filter-area {
        > p {
            text-align: start;
            font-weight: 700;
            font-size: 14px;
        }

    }

    > button {
        margin-top: 24px;
        border-radius: 8px;
        height: 48px;
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: center;

        > .title {
            font-weight: 700;
            font-size: 14px;
        }

        > .desc {
            font-weight: 500;
            font-size: 12px;
        }
    }
}
</style>

<script setup lang="js">
import { ref } from "vue";
import { supabase } from "@/lib/supabase";
import { useRouter } from "vue-router";

const router = useRouter();

const options = [
    {
        options: [
            {
                label: '남성', // label에 "cm" 추가
                value: 'male', // value를 string으로 변환
            },
            {
                label: '여성', // label에 "cm" 추가
                value: 'female', // value를 string으로 변환
            }
        ]
    }
]

const onClickSearchStart = async () => {
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session) {
            console.error('세션을 가져올 수 없습니다:', sessionError?.message);
            return null;
        }
        const currentUid = session.user.id;

        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('heart')
            .eq('id', currentUid)
            .single();
        if (userError) throw userError;

        if (userData.heart < 5) {
            alert("하트가 모자랍니다!\n하트를 충전 후 다시 진행해주세요!");
            return false;
        }

        const { error: updateError } = await supabase
            .from('users')
            .eq('id', currentUid)
            .update({
                heart: userData.heart - 5
            });
        if (updateError) throw updateError;

        router.push('/friend-search-filter');
    } catch (error) {
        console.error("친구 검색 시작 실패: ", error);
    }
}
</script>
