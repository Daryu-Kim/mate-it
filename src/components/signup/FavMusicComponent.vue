<template>
    <div class="fav-music-signup">
        <div>
            <div class="title-area">
                <p>요즘 꽂힌 음악은?<br />플레이리스트 공유해 주세요! 🎶</p>
            </div>
            <div class="input-area">
                <div>
                    <input type="text" v-model="track_name" placeholder="노래 제목을 입력해주세요."
                        @keyup.enter="searchTrackName" />
                    <button @click="searchTrackName">
                        <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px"
                            fill="#000000">
                            <path
                                d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="select-area">
                <div v-for="(item, index) in track_list" :key="index">
                    <input v-model="track_selected" :id="`track-${index}`" type="radio" name="track" :value="item" />
                    <label :for="`track-${index}`">
                        <div class="info-area">
                            <p class="name">{{ item.name }}</p>
                            <p class="artist">{{ item.artists[0].name }}</p>
                        </div>
                        <div class="image-area" :style="{ backgroundImage: `url(${item.album.images[1].url})` }"></div>
                    </label>
                </div>
            </div>
        </div>
        <div>
            <button class="full-width-primary-btn" :disabled="!isFilled" @click="nextStep">확인</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.fav-music-signup {
    padding: 36px 24px;
    padding-top: 64px;
    height: calc(100dvh - 16px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    >div {
        >.title-area {
            >p {
                word-break: keep-all;
                font-weight: 700;
                font-size: 24px;
                text-align: start;
            }
        }

        >.input-area {
            margin-top: 24px;
            padding: 12px 16px;
            border-radius: 8px;
            border: 1px solid #cdcdcd;

            >div {
                display: flex;
                align-items: center;

                >input {
                    flex: 1;
                    outline: none;
                    border: none;
                    font-size: 16px;
                    font-weight: 500;
                }

                >button {}
            }
        }

        >.select-area {
            overflow-y: scroll;
            height: fit-content;
            max-height: 50vh;
            margin-top: 24px;
            display: flex;
            flex-direction: column;
            gap: 16px;

            >div {
                display: flex;
                align-items: center;
                gap: 16px;

                >input {
                    width: 24px;
                    height: 24px;
                }

                >label {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex: 1;
                    text-align: start;

                    >.info-area {
                        >.name {
                            font-weight: 700;
                            font-size: 18px;
                        }

                        >.artist {
                            font-weight: 500;
                            font-size: 14px;
                            color: #666;
                            margin-top: 2px;
                        }
                    }

                    >.image-area {
                        width: 48px;
                        height: 48px;
                        background-position: center center;
                        background-repeat: no-repeat;
                        background-size: cover;
                    }
                }

            }
        }

        >button {
            font-weight: 700;
            font-size: 16px;
        }
    }
}
</style>

<script setup lang="js">
import { supabase } from '@/lib/supabase';
import { ref, computed, defineEmits } from 'vue';

const track_name = ref('');
const track_list = ref([]);
const track_selected = ref({});
const isFilled = computed(() => Object.keys(track_selected.value).length > 0);

const emit = defineEmits();

const getSpotifyToken = async () => {
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: "f720c38535024346a261e206df0a6ae8", // 여기에 클라이언트 ID를 입력하세요.
            client_secret: "d12edcb823a946428802699ea6e9d11c" // 여기에 클라이언트 시크릿을 입력하세요.
        })
    });
    const data = await response.json();
    return data.access_token; // 토큰 반환
}

const searchTrackName = async () => {
    const token = await getSpotifyToken(); // 토큰 받아오기
    const response = await fetch(`https://api.spotify.com/v1/search?q=${track_name.value}&type=track`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    track_selected.value = {};
    track_list.value = data.tracks.items; // 받아온 정보를 track_list에 저장
}

const nextStep = async () => {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession(); // 현재 세션 정보 가져오기

    if (sessionError || !session || !session.user) {
        console.error('세션 정보가 유효하지 않습니다.');
        return; // 세션 정보가 없으면 함수 종료
    }

    const userId = session.user.id; // UID 가져오기

    const { error } = await supabase
        .from('users')
        .update({ fav_music: track_selected.value }) // 생일 업데이트
        .eq('id', userId); // UID로 조건 설정

    if (error) {
        console.error('데이터 업데이트 오류:', error);
    } else {
        emit('nextStep'); // 이벤트 호출
    }
}
</script>
