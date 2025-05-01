<template>
    <div class="content">
        <div class="title-area">
            <div class="text-area">
                <p class="title">친구 검색 조건</p>
                <p class="desc">만나고 싶은 친구는 어떤 유형의 친구인가요?</p>
            </div>
        </div>
        <div class="filter-area" v-for="(item, index) in options" :key="index">
            <button
                class="title"
                @click="item.expanded.value = !item.expanded.value"
            >
                <p>{{ item.title }}</p>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                    v-if="item.expanded.value === false"
                >
                    <path
                        d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"
                    />
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                    v-else
                >
                    <path
                        d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"
                    />
                </svg>
            </button>
            <Transition v-if="item.expanded.value">
                <div>
                    <div
                        v-for="(optionItem, optionIndex) in item.options"
                        :key="optionIndex"
                    >
                        <input
                            type="checkbox"
                            class="d-none"
                            :id="`${item.optionName}-${optionIndex}`"
                            :value="optionItem.value"
                            v-model="item.model"
                        />
                        <label :for="`${item.optionName}-${optionIndex}`">
                            {{ optionItem.label }}
                        </label>
                    </div>
                </div>
            </Transition>
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
        &:not(:nth-child(2)) {
            margin-top: 36px;
        }

        > button {
            text-align: start;
            font-weight: 700;
            font-size: 16px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        > div {
            margin-top: 16px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 8px;
            row-gap: 20px;

            > div {
                > label {
                    cursor: pointer;
                    border: 1.5px solid #434343;
                    padding: 4px 12px;
                    border-radius: 100rem;
                    font-weight: 500;
                    font-size: 14px;
                    background-color: #fff;
                }

                > input:checked + label {
                    background: linear-gradient(
                        45deg,
                        #2af598 0%,
                        #009efd 100%
                    );
                    border-color: transparent;
                    font-weight: 700;
                }
            }
        }
    }

    > button {
        margin-top: 48px;
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

const isExpandedGender = ref(true);
const isExpandedBodyType = ref(false);
const isExpandedMbti = ref(false);
const isExpandedReligion = ref(false);
const isExpandedDrinking = ref(false);
const isExpandedSmoking = ref(false);
const isExpandedEducation = ref(false);
const isExpandedJob = ref(false);
const isExpandedPersonality = ref(false);
const isExpandedInterests = ref(false);
const isExpandedIdealType = ref(false);
const isExpandedLookingFor = ref(false);
const isExpandedAddress = ref(false);
const isExpandedBirthDate = ref(false);
const isExpandedHeight = ref(false);

const checkedGender = ref([]);
const checkedBodyType = ref([]);
const checkedMbti = ref([]);
const checkedReligion = ref([]);
const checkedDrinking = ref([]);
const checkedSmoking = ref([]);
const checkedEducation = ref([]);
const checkedJob = ref([]);
const checkedPersonality = ref([]);
const checkedInterests = ref([]);
const checkedIdealType = ref([]);
const checkedLookingFor = ref([]);
const checkedAddress = ref([]);
const checkedMinBirthDate = ref(0);
const checkedMaxBirthDate = ref(0);
const checkedMinHeight = ref(0);
const checkedMaxHeight = ref(0);

const options = [
    {
        title: '상대방의 성별',
        optionName: 'gender',
        model: checkedGender,
        expanded: isExpandedGender,
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
    },
    {
        title: '상대방의 체형',
        optionName: 'body_type',
        model: checkedBodyType,
        expanded: isExpandedBodyType,
        options: [
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
    },
    {
        title: '상대방의 MBTI',
        optionName: 'mbti',
        model: checkedMbti,
        expanded: isExpandedMbti,
        options: [
            {
                label: 'ISTJ',
                value: 'ISTJ',
            },
            {
                label: 'ISFJ',
                value: 'ISFJ',
            },
            {
                label: 'INFJ',
                value: 'INFJ',
            },
            {
                label: 'INTJ',
                value: 'INTJ',
            },
            {
                label: 'ISTP',
                value: 'ISTP',
            },
            {
                label: 'ISFP',
                value: 'ISFP',
            },
            {
                label: 'INFP',
                value: 'INFP',
            },
            {
                label: 'INTP',
                value: 'INTP',
            },
            {
                label: 'ESTP',
                value: 'ESTP',
            },
            {
                label: 'ESFP',
                value: 'ESFP',
            },
            {
                label: 'ENFP',
                value: 'ENFP',
            },
            {
                label: 'ENTP',
                value: 'ENTP',
            },
            {
                label: 'ESTJ',
                value: 'ESTJ',
            },
            {
                label: 'ESFJ',
                value: 'ESFJ',
            },
            {
                label: 'ENFJ',
                value: 'ENFJ',
            },
            {
                label: 'ENTJ',
                value: 'ENTJ',
            },
        ]
    },
    {
        title: '상대방의 종교',
        optionName: 'religion',
        model: checkedReligion,
        expanded: isExpandedReligion,
        options: [
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
    },
    {
        title: '상대방의 음주 여부',
        optionName: 'drinking',
        model: checkedDrinking,
        expanded: isExpandedDrinking,
        options: [
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
    },
    {
        title: '상대방의 흡연 여부',
        optionName: 'smoking',
        model: checkedSmoking,
        expanded: isExpandedSmoking,
        options: [
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
    },
    {
        title: '상대방의 학력',
        optionName: 'education',
        model: checkedEducation,
        expanded: isExpandedEducation,
        options: [
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
    },
    {
        title: '상대방의 직업',
        optionName: 'job',
        model: checkedJob,
        expanded: isExpandedJob,
        options: [
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
    },
    {
        title: '상대방의 성격',
        optionName: 'personality',
        model: checkedPersonality,
        expanded: isExpandedPersonality,
        options: [
            { "label": "활발한", "value": "active" },
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
            { "label": "책임감 있는", "value": "accountable" }
        ]
    },
    {
        title: '상대방의 취미',
        optionName: 'interests',
        model: checkedInterests,
        expanded: isExpandedInterests,
        options: [
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
        ]
    },
    {
        title: '상대방의 이상형',
        optionName: 'idealtype',
        model: checkedIdealType,
        expanded: isExpandedIdealType,
        options: [
            { "label": "활발한", "value": "active" },
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
            { "label": "책임감 있는", "value": "accountable" }
        ]
    },
    {
        title: '찾고 있는 인연',
        optionName: 'lookingfor',
        model: checkedLookingFor,
        expanded: isExpandedLookingFor,
        options: [
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
    },
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

    } catch (error) {
        console.error("친구 검색 시작 실패: ", error);
    }
}
</script>
