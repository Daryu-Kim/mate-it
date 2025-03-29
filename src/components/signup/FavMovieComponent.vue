<template>
    <div class="fav-movie-signup">
        <div>
            <div class="title-area">
                <p>인생 영화나 좋아하는 장르가 있나요? 🍿</p>
            </div>
            <div class="input-area">
                <div>
                    <input type="text" v-model="movie_name" placeholder="영화 제목을 입력해주세요."
                        @keyup.enter="searchMovieName" />
                    <button @click="searchMovieName">
                        <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px"
                            fill="#000000">
                            <path
                                d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="select-area">
                <div v-for="(item, index) in movie_list" :key="index">
                    <input v-model="movie_selected" :id="`movie-${index}`" type="radio" name="movie" :value="item" />
                    <label :for="`movie-${index}`">
                        <div class="info-area">
                            <p class="name">{{ item.original_title }} ({{ item.title }})</p>
                            <p class="artist">{{ item.director }}</p>
                        </div>
                        <div class="image-area" :style="{ backgroundImage: `url(${item.poster_path})` }"></div>
                    </label>
                </div>
            </div>
        </div>
        <div>
            <button class="full-width-primary-btn" :disabled="!isFilled" @click="$emit('nextStep')">확인</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.fav-movie-signup {
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
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            max-width: calc(100vw - 256px);
                        }

                        >.artist {
                            font-weight: 500;
                            font-size: 14px;
                            color: #666;
                            margin-top: 2px;
                        }
                    }

                    >.image-area {
                        width: 96px;
                        aspect-ratio: 1 / 1.3;
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
import { ref, computed } from 'vue';

const movie_name = ref('');
const movie_list = ref([]);
const movie_selected = ref({});
const isFilled = computed(() => Object.keys(movie_selected.value).length > 0);

const searchMovieName = async () => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjhiYzBlMTNiNjUwMmIyNTI5ZDVlZmI2NTgzMGUyZiIsIm5iZiI6MTc0MzAxMDc5My43NDMsInN1YiI6IjY3ZTQzYmU5N2RiOWU3MGM0N2RjYjVmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6-uY_NNt8XmjUdYXxfrZuY_t6I9pVQ_F1YzkawQ4dr4'; // 토큰 받아오기
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie_name.value}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data)
    movie_selected.value = {};
    movie_list.value = data.results.map(movie => ({
        ...movie,
        poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, // 포스터 이미지 URL 추가
        director: movie.credits ? movie.credits.crew.find(person => person.job === 'Director')?.name : '정보 없음' // 감독 이름 추가
    })).sort((a, b) => b.vote_count - a.vote_count); // 받아온 정보를 track_list에 저장
}
</script>
