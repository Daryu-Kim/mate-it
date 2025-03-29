<template>
    <div class="interests-signup">
        <div>
            <div class="title-area">
                <p>어떤 취미를 즐기시나요?<br />같이 하면 더 재밌을지도! 🎨⚽</p>
            </div>
            <div class="input-area">
                <div v-for="(item, index) in options" :key="index">
                    <input v-model="interests" :id="`interests-${index}`" type="checkbox" name="interests"
                        :value="item.value" class="d-none" />
                    <label :for="`interests-${index}`">{{ item.label }}</label>
                </div>
            </div>
        </div>
        <div>
            <button class="full-width-primary-btn" :disabled="!isFilled" @click="$emit('nextStep')">확인</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.interests-signup {
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
            padding: 8px 0;
            max-height: 70dvh;
            height: fit-content;
            overflow-y: scroll;
            display: flex;
            flex-wrap: wrap;
            align-items: start;
            gap: 8px;
            row-gap: 20px;

            >div {
                >label {
                    cursor: pointer;
                    border: 1.5px solid #434343;
                    padding: 4px 12px;
                    border-radius: 100rem;
                    font-weight: 500;
                    font-size: 16px;
                    background-color: #fff;
                }

                >input:checked+label {
                    background: linear-gradient(45deg, #2af598 0%, #009efd 100%);
                    border-color: transparent;
                    font-weight: 700;
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

const interests = ref([]);
const isFilled = computed(() => interests.value.length > 0);

const options = [
    { "label": "영화 감상", "value": "watching_movies" },
    { "label": "독서", "value": "reading" },
    { "label": "여행", "value": "traveling" },
    { "label": "운동", "value": "exercise" },
    { "label": "요리", "value": "cooking" },
    { "label": "음악 감상", "value": "listening_music" },
    { "label": "사진 촬영", "value": "photography" },
    { "label": "게임", "value": "gaming" },
    { "label": "미술 / 디자인", "value": "art_design" },
    { "label": "봉사 활동", "value": "volunteering" },
    { "label": "패션", "value": "fashion" },
    { "label": "드라마 감상", "value": "watching_dramas" },
    { "label": "도시 탐방", "value": "city_exploration" },
    { "label": "악기 연주", "value": "playing_instruments" },
    { "label": "테크놀로지 / 프로그래밍", "value": "technology_programming" },
    { "label": "수영", "value": "swimming" },
    { "label": "등산", "value": "hiking" },
    { "label": "볼링", "value": "bowling" },
    { "label": "요가", "value": "yoga" },
    { "label": "농구", "value": "basketball" },
    { "label": "축구", "value": "soccer" },
    { "label": "클라이밍", "value": "climbing" },
    { "label": "낚시", "value": "fishing" },
    { "label": "다트", "value": "darts" },
    { "label": "패러글라이딩", "value": "paragliding" },
    { "label": "캠핑", "value": "camping" },
    { "label": "사교춤", "value": "ballroom_dancing" },
    { "label": "디지털 아트", "value": "digital_art" },
    { "label": "공예", "value": "crafting" },
    { "label": "사이클링", "value": "cycling" },
    { "label": "음악 제작", "value": "music_production" },
    { "label": "보드게임", "value": "board_games" },
    { "label": "바다 낚시", "value": "sea_fishing" },
    { "label": "축제 참여", "value": "attending_festivals" },
    { "label": "정원 가꾸기", "value": "gardening" },
    { "label": "패치워크", "value": "patchwork" },
    { "label": "요리 배우기", "value": "learning_cooking" },
    { "label": "새로운 음식 시도", "value": "trying_new_foods" },
    { "label": "복싱", "value": "boxing" },
    { "label": "펜싱", "value": "fencing" },
    { "label": "사냥", "value": "hunting" },
    { "label": "산책", "value": "walking" },
    { "label": "클래식 음악 감상", "value": "listening_classical_music" },
    { "label": "애완동물 돌보기", "value": "pet_care" }
];

</script>
