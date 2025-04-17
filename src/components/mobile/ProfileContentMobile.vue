<template>
    <div class="content">
        <div class="title-area">
            <div class="text-area">
                <p class="title">{{ data.username }}</p>
                <p class="desc">
                    친구 {{ userFriendsCount }}명 | 좋아요
                    {{ userLikesCount }}개
                </p>
            </div>
        </div>
        <div class="content-area">
            <swiper
                :modules="modules"
                navigation
                :pagination="{ clickable: true }"
            >
                <swiper-slide
                    v-if="data.avatar_main"
                    v-for="(item, index) in data.avatar_main"
                    :key="index"
                    :style="`background-image: url('${item}');`"
                ></swiper-slide>
                <swiper-slide
                    v-if="data.avatar_sub"
                    v-for="(item, index) in data.avatar_sub"
                    :key="index"
                    :style="`background-image: url('${item}');`"
                ></swiper-slide>
            </swiper>
            <div class="info-area summary-area">
                <div>
                    <p class="title">나이</p>
                    <p class="desc">만 {{ calculateAge(data.birthdate) }}세</p>
                </div>
                <div>
                    <p class="title">지역</p>
                    <p class="desc">
                        {{
                            data.address &&
                            `${data.address[0]} ${data.address[1]}`
                        }}
                    </p>
                </div>
                <div>
                    <p class="title">키</p>
                    <p class="desc">{{ data.height && data.height }}cm</p>
                </div>
                <div>
                    <p class="title">직업</p>
                    <p class="desc">
                        {{ data.job && getDataLabel(data.job, jobOptions) }}
                    </p>
                </div>
            </div>
            <div class="info-area text-area">
                <p class="title">소개말</p>
                <p class="text" v-html="data.bio"></p>
            </div>
            <div class="info-area multiple-area">
                <p class="title">기본 정보</p>
                <div class="chip-area">
                    <p class="chip" v-if="data.gender">
                        {{ getDataLabel(data.gender, genderOptions) }}
                    </p>
                    <p class="chip" v-if="data.body_type">
                        {{ getDataLabel(data.body_type, bodyTypeOptions) }}
                    </p>
                    <p class="chip" v-if="data.drinking">
                        {{ getDataLabel(data.drinking, drinkingOptions) }}
                    </p>
                    <p class="chip" v-if="data.smoking">
                        {{ getDataLabel(data.smoking, smokingOptions) }}
                    </p>
                    <p class="chip" v-if="data.religion">
                        {{ getDataLabel(data.religion, religionOptions) }}
                    </p>
                </div>
            </div>
            <div class="info-area multiple-area">
                <p class="title">나는 이런 사람!</p>
                <div class="chip-area">
                    <p
                        class="chip"
                        v-for="(item, index) in data.personality"
                        v-if="data.personality"
                        :key="index"
                    >
                        {{ getDataLabel(item, personalityIdealTypeOptions) }}
                    </p>
                    <p class="chip" v-if="data.mbti">{{ data.mbti }}</p>
                    <p class="chip" v-if="data.education">
                        {{ getDataLabel(data.education, educationOptions) }}
                    </p>
                    <p class="chip" v-if="data.job">
                        {{ getDataLabel(data.job, jobOptions) }}
                    </p>
                </div>
            </div>
            <div class="info-area multiple-area">
                <p class="title">요즘 관심있는 것은</p>
                <div class="chip-area">
                    <p
                        class="chip"
                        v-for="(item, index) in data.interests"
                        v-if="data.interests"
                        :key="index"
                    >
                        {{ getDataLabel(item, interestsOptions) }}
                    </p>
                </div>
            </div>
            <div class="info-area multiple-area">
                <p class="title">이런 친구를 찾아요</p>
                <div class="chip-area">
                    <p class="chip" v-if="data.looking_for">
                        {{ getDataLabel(data.looking_for, lookingForOptions) }}
                    </p>
                    <p
                        class="chip"
                        v-for="(item, index) in data.ideal_type"
                        v-if="data.ideal_type"
                        :key="index"
                    >
                        {{ getDataLabel(item, personalityIdealTypeOptions) }}
                    </p>
                </div>
            </div>
            <div class="info-area data-area">
                <div
                    class="image-area"
                    :style="
                        data.fav_music &&
                        `background-image: url('${data.fav_music.album.images[0].url}');`
                    "
                ></div>
                <div class="introduce-area">
                    <p class="title">최애 노래</p>
                    <p class="desc">
                        {{ data.fav_music && data.fav_music.name }}
                    </p>
                </div>
            </div>
            <div class="info-area data-area">
                <div
                    class="image-area"
                    :style="
                        data.fav_movie &&
                        `background-image: url('${data.fav_movie.poster_path}');`
                    "
                ></div>
                <div class="introduce-area">
                    <p class="title">최애 영화</p>
                    <p class="desc">
                        {{ data.fav_movie && data.fav_movie.original_title }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.content {
    margin: 0 auto;
    margin-top: 60px;
    padding: 0 36px;
    padding-bottom: 72px;

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
        > .info-area {
            background-color: #efefef;
            padding: 12px;
            border-radius: 8px;
            margin-top: 16px;
        }

        > .summary-area {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            row-gap: 12px;
            padding: 12px 24px;

            > div {
                display: flex;
                align-items: center;
                gap: 8px;

                > .title {
                    font-weight: 700;
                    font-size: 14px;
                }

                > .desc {
                    font-weight: 500;
                    font-size: 12px;
                    color: grey;
                }
            }
        }

        > .text-area {
            > .title {
                font-weight: 700;
                font-size: 16px;
            }

            > .text {
                font-weight: 500;
                font-size: 14px;
                margin-top: 12px;
                background-color: #cdcdcd;
                border-radius: 8px;
                padding: 8px;
            }
        }

        > .multiple-area {
            > .title {
                font-weight: 700;
                font-size: 16px;
            }

            > .chip-area {
                display: flex;
                align-items: center;
                gap: 8px;
                flex-wrap: wrap;
                margin-top: 12px;
                > .chip {
                    border-radius: 100rem;
                    font-size: 14px;
                    font-weight: 500;
                    background-color: #cdcdcd;
                    padding: 4px 12px;
                }
            }
        }

        > .data-area {
            display: flex;
            align-items: center;
            gap: 12px;

            > .image-area {
                width: 56px;
                height: 56px;
                aspect-ratio: 1 / 1;
                background-position: center center;
                background-size: cover;
                background-repeat: no-repeat;
                border-radius: 8px;
            }

            > .introduce-area {
                text-align: start;

                > .title {
                    font-weight: 700;
                    font-size: 16px;
                }

                > .desc {
                    font-weight: 500;
                    font-size: 14px;
                    margin-top: 4px;
                }
            }
        }
    }
}

.swiper-slide {
    aspect-ratio: 1 / 1;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 8px;
}
</style>

<script setup lang="js">
import { supabase } from '@/lib/supabase';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const data = ref({});
const currentUserId = ref('');
const route = useRoute();
const modules = [Pagination, Navigation];
const userLikesCount = ref(0);
const userFriendsCount = ref(0);

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
            .eq('id', route.query.id)
            .single()

        if (userError) throw userError;

        const { data: friendData, error: friendError } = await supabase
            .from('user_follow')
            .select('*')
            .or(`follow_id_1.eq.${userData.id},follow_id_2.eq.${userData.id}`)
            .eq('status', 'accepted');
        if (friendError) throw friendError;

        const { data: likeData, error: likeError } = await supabase
            .from('user_likes')
            .select('*')
            .eq('target_user_id', userData.id)
        if (likeError) throw likeError;

        data.value = userData;
        currentUserId.value = currentUid;
        userFriendsCount.value = friendData.length > 0 ? friendData.length : 0;
        userLikesCount.value = likeData.length > 0 ? likeData.length : 0;
    } catch (error) {
        console.error('사용자 데이터 가져오기 실패', error);
    }
}

const calculateAge = (birthdate) => {
    if (!birthdate) return null; // 생년월일이 없을 경우 null 반환
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // 생일이 지나지 않은 경우 나이 1세 감소
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const getDataLabel = (data, options) => {
    for (const group of options) {
        const value = group.find(option => option.value === data);
        if (value) {
            return value.label; // 해당하는 label 반환
        }
    }
    return null; // 일치하는 값이 없을 경우 null 반환
}

const jobOptions = [
    [
        {
            "label": "학생",
            "value": "student"
        },
        {
            "label": "회사원",
            "value": "office_worker"
        },
        {
            "label": "프리랜서",
            "value": "freelancer"
        },
        {
            "label": "사업가",
            "value": "entrepreneur"
        },
        {
            "label": "공무원",
            "value": "public_servant"
        },
        {
            "label": "엔지니어 / 개발자",
            "value": "engineer"
        },
        {
            "label": "디자이너",
            "value": "designer"
        },
        {
            "label": "의료계 종사자",
            "value": "healthcare_worker"
        },
        {
            "label": "예술가 / 크리에이터",
            "value": "artist"
        },
        {
            "label": "교사 / 교수",
            "value": "teacher"
        },
        {
            "label": "서비스업",
            "value": "service_industry"
        },
        {
            "label": "금융 / 법률직",
            "value": "finance_legal"
        },
        {
            "label": "연구원",
            "value": "researcher"
        },
        {
            "label": "운동선수 / 트레이너",
            "value": "athlete_trainer"
        },
        {
            "label": "무직",
            "value": "unemployed"
        },
        {
            "label": "기타",
            "value": "other_job"
        }
    ]
];

const genderOptions = [
    [{
        label: '남성', // label에 "cm" 추가
        value: 'male', // value를 string으로 변환
    },
    {
        label: '여성', // label에 "cm" 추가
        value: 'female', // value를 string으로 변환
    }]
];

const drinkingOptions = [
    [
        {
            "label": "전혀 안 마심",
            "value": "never"
        },
        {
            "label": "가끔 기분 낼 때만",
            "value": "occasionally"
        },
        {
            "label": "사교적으로 즐김",
            "value": "social_drinker"
        },
        {
            "label": "자주 마심",
            "value": "frequent_drinker"
        }
    ]
];

const smokingOptions = [
    [
        {
            "label": "비흡연자",
            "value": "non_smoker"
        },
        {
            "label": "가끔 피움",
            "value": "occasionally"
        },
        {
            "label": "자주 피움",
            "value": "frequent_smoker"
        },
        {
            "label": "전자담배만 피움",
            "value": "only_vaping"
        }
    ]
];

const religionOptions = [
    [
        {
            "label": "무교",
            "value": "none"
        },
        {
            "label": "기독교",
            "value": "christian"
        },
        {
            "label": "천주교",
            "value": "catholic"
        },
        {
            "label": "불교",
            "value": "buddhist"
        },
        {
            "label": "이슬람교",
            "value": "muslim"
        },
        {
            "label": "힌두교",
            "value": "hindu"
        },
        {
            "label": "유대교",
            "value": "jewish"
        },
        {
            "label": "기타",
            "value": "other_religion"
        }
    ]
];

const bodyTypeOptions = [
    [
        {
            label: '마른', // label에 "cm" 추가
            value: 'slim', // value를 string으로 변환
        },
        {
            label: '슬림탄탄', // label에 "cm" 추가
            value: 'fit', // value를 string으로 변환
        },
        {
            label: '평균적인 체형', // label에 "cm" 추가
            value: 'average', // value를 string으로 변환
        },
        {
            label: '살짝 통통한', // label에 "cm" 추가
            value: 'soft', // value를 string으로 변환
        },
        {
            label: '볼륨감 있는', // label에 "cm" 추가
            value: 'curvy', // value를 string으로 변환
        },
        {
            label: '건강한 체형', // label에 "cm" 추가
            value: 'solid', // value를 string으로 변환
        },
    ]
];

const personalityIdealTypeOptions = [
    [{ "label": "활발한", "value": "active" },
    { "label": "차분한", "value": "calm" },
    { "label": "낙천적인", "value": "optimistic" },
    { "label": "내성적인", "value": "introverted" },
    { "label": "외향적인", "value": "extroverted" },
    { "label": "상냥한", "value": "kind" },
    { "label": "고집 센", "value": "stubborn" },
    { "label": "개방적인", "value": "open_minded" },
    { "label": "조용한", "value": "quiet" },
    { "label": "유머러스한", "value": "humorous" },
    { "label": "호기심 많은", "value": "curious" },
    { "label": "성실한", "value": "diligent" },
    { "label": "이해심 있는", "value": "understanding" },
    { "label": "감정적인", "value": "emotional" },
    { "label": "이성적인", "value": "rational" },
    { "label": "자유로운", "value": "free_spirited" },
    { "label": "책임감 있는", "value": "responsible" },
    { "label": "배려 깊은", "value": "considerate" },
    { "label": "조직적인", "value": "organized" },
    { "label": "사교적인", "value": "sociable" },
    { "label": "지적인", "value": "intellectual" },
    { "label": "자기주장이 강한", "value": "assertive" },
    { "label": "편안한", "value": "easygoing" },
    { "label": "열정적인", "value": "passionate" },
    { "label": "도전적인", "value": "challenging" },
    { "label": "충동적인", "value": "impulsive" },
    { "label": "진지한", "value": "serious" },
    { "label": "친절한", "value": "gentle" },
    { "label": "사려 깊은", "value": "thoughtful" },
    { "label": "창의적인", "value": "creative" },
    { "label": "자기 반성적인", "value": "self_reflective" },
    { "label": "겸손한", "value": "humble" },
    { "label": "충실한", "value": "loyal" },
    { "label": "이해가 빠른", "value": "quick_learner" },
    { "label": "불안한", "value": "anxious" },
    { "label": "자기 중심적인", "value": "self_centered" },
    { "label": "활기찬", "value": "energetic" },
    { "label": "주도적인", "value": "leadership" },
    { "label": "정직한", "value": "honest" },
    { "label": "호탕한", "value": "outgoing" },
    { "label": "창의적", "value": "innovative" },
    { "label": "신뢰할 수 있는", "value": "trustworthy" },
    { "label": "진정성 있는", "value": "genuine" },
    { "label": "책임감 있는", "value": "accountable" }]
];

const educationOptions = [
    [
        {
            label: '고등학교 졸업', // label에 "cm" 추가
            value: 'high_school', // value를 string으로 변환
        },
        {
            label: '대학교 재학 중', // label에 "cm" 추가
            value: 'bachelor_in_progress', // value를 string으로 변환
        },
        {
            label: '대학교 졸업', // label에 "cm" 추가
            value: 'bachelor_degree', // value를 string으로 변환
        },
        {
            label: '석사 과정 중', // label에 "cm" 추가
            value: 'master_in_progress', // value를 string으로 변환
        },
        {
            label: '석사 졸업', // label에 "cm" 추가
            value: 'master_degree', // value를 string으로 변환
        },
        {
            label: '박사 과정 중', // label에 "cm" 추가
            value: 'phd_in_progress', // value를 string으로 변환
        },
        {
            label: '박사 졸업', // label에 "cm" 추가
            value: 'phd_degree', // value를 string으로 변환
        },
        {
            label: '검정고시', // label에 "cm" 추가
            value: 'ged', // value를 string으로 변환
        },
        {
            label: '기타', // label에 "cm" 추가
            value: 'other', // value를 string으로 변환
        },
    ]
];

const interestsOptions = [[
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
    { "label": "애완동물 돌보기", "value": "pet_care" }]
];

const lookingForOptions = [
    [
        {
            "label": "잘 맞는 친구 찾는 중!",
            "value": "finding_friend"
        },
        {
            "label": "친구도, 연애도 OK.",
            "value": "friend_or_dating"
        },
        {
            "label": "진지한 연애 원해요.",
            "value": "serious_relationship"
        },
        {
            "label": "아직 고민 중!",
            "value": "not_sure_yet"
        }
    ]
];

onMounted(() => {
    loadUserData();
});
</script>
