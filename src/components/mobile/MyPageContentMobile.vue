<template>
    <div class="content">
        <div class="title-area">
            <div class="text-area">
                <p class="title">프로필</p>
                <p class="desc">자신의 프로필을 더욱 꾸며보세요!</p>
            </div>
        </div>
        <div class="content-area">
            <div class="profile-area">
                <div class="profile-detail-area">
                    <div
                        class="user-image-area"
                        :style="`background-image: url('${
                            data.avatar_main && data.avatar_main[0]
                        }');`"
                    ></div>
                    <div class="info-area">
                        <p class="name">{{ data.username }}</p>
                        <div>
                            <p>
                                친구 <span>{{ friendCount }}</span>
                            </p>
                            <p>
                                좋아요 <span>{{ likeCount }}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="button-area">
                    <router-link :to="`/profile?id=${data.id}`" class="preview">
                        프로필 미리보기
                    </router-link>
                    <router-link
                        to="/profile-edit"
                        class="edit gradient-background"
                    >
                        프로필 수정
                    </router-link>
                </div>
            </div>
            <div class="heart-area">
                <div class="heart-amount-area">
                    <p class="title">보유 하트</p>
                    <p class="amount">{{ data.heart }}</p>
                </div>
                <div class="button-area">
                    <button class="charge gradient-background">
                        하트 충전하기
                    </button>
                    <button class="share">친구에게 공유하기</button>
                </div>
            </div>
            <router-link to="/notice-list">
                <p>공지 & 안내</p>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                >
                    <path
                        d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"
                    />
                </svg>
            </router-link>
            <router-link to="/settings">
                <p>설정</p>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                >
                    <path
                        d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"
                    />
                </svg>
            </router-link>
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

    > .content-area {
        display: flex;
        flex-direction: column;
        gap: 16px;

        > div,
        a {
            background-color: #efefef;
            padding: 12px;
            border-radius: 8px;
        }

        > .profile-area {
            > .profile-detail-area {
                display: flex;
                align-items: center;
                gap: 16px;

                > .user-image-area {
                    width: 64px;
                    height: 64px;
                    aspect-ratio: 1 / 1;
                    border-radius: 50%;
                    background-position: center center;
                    background-repeat: no-repeat;
                    background-size: cover;
                }

                > .info-area {
                    text-align: start;

                    > .name {
                        font-weight: 700;
                    }

                    > div {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        margin-top: 4px;
                        > p {
                            font-weight: 500;
                            font-size: 12px;

                            > span {
                                font-weight: 700;
                                font-size: 14px;
                                margin-left: 2px;
                            }
                        }
                    }
                }
            }

            > .button-area {
                margin-top: 16px;
                display: flex;
                align-items: center;
                gap: 8px;

                > a {
                    flex: 1;
                    font-weight: 700;
                    text-decoration: none;
                    font-size: 12px;
                    border-radius: 8px;
                    padding: 10px 0;

                    &.preview {
                        background-color: #cdcdcd;
                        color: #666;
                    }

                    &.edit {
                        color: black;
                    }
                }
            }
        }

        > .heart-area {
            display: flex;
            align-items: center;
            gap: 16px;

            > .heart-amount-area {
                padding: 12px;
                background-color: #cdcdcd;
                border-radius: 8px;
                width: 84px;
                aspect-ratio: 1 / 1;
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: center;

                > .title {
                    font-size: 14px;
                    font-weight: 500;
                }

                > .amount {
                    margin-top: 4px;
                    font-size: 16px;
                    font-weight: 700;
                }
            }

            > .button-area {
                flex: 1;
                height: 100%;
                display: flex;
                flex-direction: column;
                gap: 8px;

                > button {
                    height: 38px;
                    border-radius: 8px;
                    width: 100%;
                    font-weight: 700;
                    font-size: 12px;

                    &.share {
                        background-color: #cdcdcd;
                    }
                }
            }
        }

        > a {
            display: flex;
            align-items: center;
            justify-content: space-between;
            text-decoration: none;
            color: black;
            font-weight: 500;
            font-size: 12px;
            padding: 12px 16px;
        }
    }
}
</style>

<script setup lang="js">
import { supabase } from '@/lib/supabase';
import { onMounted, ref } from 'vue';

const data = ref([]);
const currentUserId = ref('');
const friendCount = ref(0);
const likeCount = ref(0);

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

        const { data: friendData, error: friendError } = await supabase
            .from('user_follow')
            .select('*')
            .or(`follow_id_1.eq.${currentUid},follow_id_2.eq.${currentUid}`)
            .eq('status', 'accepted');
        if (friendError) throw friendError;

        const { data: likeData, error: likeError } = await supabase
            .from('user_likes')
            .select('*')
            .eq('target_user_id', currentUid)
        if (likeError) throw likeError;

        data.value = userData;
        currentUserId.value = currentUid;
        friendCount.value = friendData.length > 0 ? friendData.length : 0;
        likeCount.value = likeData.length > 0 ? likeData.length : 0;
    } catch (error) {
        console.error('사용자 데이터 가져오기 실패', error);
    }
}

onMounted(() => {
    loadUserData();
});
</script>
