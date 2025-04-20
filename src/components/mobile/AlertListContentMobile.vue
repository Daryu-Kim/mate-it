<template>
    <div class="content">
        <div class="title-area">
            <div class="text-area">
                <p class="title">알림</p>
                <p class="desc">누군가가 당신에게 관심을 보였을까요?</p>
            </div>
        </div>
        <div class="alert-area" v-if="data.length > 0">
            <button
                v-for="(item, index) in data"
                :key="index"
                @click="onClickAlertMessage(item)"
            >
                <div class="info-area">
                    <div class="content-area">
                        <p class="last-content">
                            {{ item.content }}
                        </p>
                    </div>
                </div>
                <div class="time-area">
                    <p class="timestamp">
                        {{ formatTimestamp(item.created_at) }}
                    </p>
                    <p v-if="!item.read_status" class="not-read">N</p>
                </div>
            </button>
        </div>
        <div class="not-found-area" v-else>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="64px"
                viewBox="0 -960 960 960"
                width="64px"
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
                    d="M440-440h80v-200h-80v200Zm40 120q17 0 28.5-11.5T520-360q0-17-11.5-28.5T480-400q-17 0-28.5 11.5T440-360q0 17 11.5 28.5T480-320ZM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"
                />
            </svg>
            <p class="title">도착한 알림이 없어요!</p>
            <p class="desc">
                아직 관심을 보인 사람이 없어요.<br />괜찮아요, 곧 좋은 소식이
                있을거에요!
            </p>
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

        > button {
            width: fit-content;
            padding: 8px 24px;
            border-radius: 100rem;
            height: fit-content;
            font-size: 18px;
            font-weight: 700;
        }
    }

    > .alert-area {
        display: flex;
        flex-direction: column;
        gap: 16px;

        > button {
            box-shadow: 2px 2px 4px rgba($color: #000000, $alpha: 0.35);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            text-decoration: none;
            gap: 16px;
            padding: 8px 16px;

            > .info-area {
                display: flex;
                align-items: center;
                gap: 10px;
                flex: 1;
                height: 48px;

                > .content-area {
                    text-align: start;

                    > .last-content {
                        margin-top: 2px;
                        font-weight: 500;
                        font-size: 14px;
                        color: black;
                        word-break: keep-all;
                    }
                }
            }

            > .time-area {
                display: flex;
                flex-direction: column;
                align-items: end;

                > .timestamp {
                    font-size: 12px;
                    color: grey;
                    font-weight: 500;
                }

                > .not-read {
                    margin-top: 2px;
                    border-radius: 100rem;
                    font-size: 10px;
                    font-weight: 700;
                    color: white;
                    background-color: #fd3725;
                    width: fit-content;
                    padding: 2px 6px;
                }
            }
        }
    }

    > .not-found-area {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        word-break: keep-all;
        margin-top: 48px;

        > .title {
            margin-top: 24px;
            font-size: 24px;
            font-weight: 900;
        }

        > .desc {
            margin-top: 12px;
            font-weight: 500;
            font-size: 16px;
        }
    }
}
</style>

<script setup lang="js">
import { supabase } from '@/lib/supabase';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const data = ref([]);
const router = useRouter();

const onClickAlertMessage = async (item) => {
    try {
        const { error: updateError } = await supabase
            .from('notifications')
            .upsert({
                notification_id: item.notification_id,
                user_id: item.user_id,
                read_status: true,
            });
        if (updateError) throw updateError;

        router.push(item.route);
    } catch (error) {
        console.error("알림 이동 실패: ", error);
    }
}

const loadNotifications = async () => {
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session) {
            console.error('세션을 가져올 수 없습니다:', sessionError?.message);
            return null;
        }
        const currentUid = session.user.id;

        const { data: alertData, error: alertError } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', currentUid)

        if (alertError) throw alertError;

        alertData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        data.value = alertData;
    } catch (error) {
        console.error('알림 데이터 가져오기 실패', error);
    }
}

const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();

    console.log(date)

    // 당일
    if (date.toDateString() === now.toDateString()) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? '오후' : '오전';
        const formattedHours = hours % 12 || 12; // 12시간 형식으로 변환
        return `${period} ${formattedHours}:${minutes.toString().padStart(2, '0')}`;
    }

    // 어제
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
        return '어제';
    }

    // 같은 연도이고 어제보다 이전
    if (date.getFullYear() === now.getFullYear()) {
        return `${date.getMonth() + 1}월 ${date.getDate()}일`;
    }

    // 연도가 다를 경우
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
}

onMounted(() => {
    loadNotifications();
});
</script>
