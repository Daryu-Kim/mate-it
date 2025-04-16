<template>
    <div class="content">
        <div class="title-area">
            <div class="text-area">
                <p class="title">{{ data.username }}</p>
                <p class="desc">
                    만 {{ calculateAge(data.birthdate) }}세 |
                    {{ data.gender === "male" ? "남자" : "여자" }}
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
                    <p class="desc">{{ data.job && getJobLabel(data.job) }}</p>
                </div>
            </div>
            <div class="info-area text-area">
                <p class="title">소개말</p>
                <p class="text" v-html="data.bio"></p>
            </div>
            <div class="info-area multiple-area">
                <p class="title">기본 정보</p>
                <div class="chip-area">
                    <p class="chip">{{ data.gender }}</p>
                    <p class="chip">{{ data.body_type }}</p>
                    <p class="chip">{{ data.drinking }}</p>
                    <p class="chip">{{ data.smoking }}</p>
                    <p class="chip">{{ data.religion }}</p>
                </div>
            </div>
            <div class="info-area multiple-area">
                <p class="title">나는 이런 사람!</p>
                <div class="chip-area">
                    <p
                        class="chip"
                        v-for="(item, index) in data.personality"
                        :key="index"
                    >
                        {{ item }}
                    </p>
                    <p class="chip">{{ data.mbti }}</p>
                    <p class="chip">{{ data.education }}</p>
                    <p class="chip">{{ data.job }}</p>
                </div>
            </div>
            <div class="info-area multiple-area">
                <p class="title">요즘 관심있는 것은</p>
                <div class="chip-area">
                    <p
                        class="chip"
                        v-for="(item, index) in data.interests"
                        :key="index"
                    >
                        {{ item }}
                    </p>
                </div>
            </div>
            <div class="info-area multiple-area">
                <p class="title">이런 친구를 찾아요</p>
                <div class="chip-area">
                    <p class="chip">{{ data.looking_for }}</p>
                    <p
                        class="chip"
                        v-for="(item, index) in data.ideal_type"
                        :key="index"
                    >
                        {{ item }}
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

        data.value = userData;
        currentUserId.value = currentUid;
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

const getJobLabel = (jobValue) => {
    for (const group of jobOptions) {
        const job = group.find(option => option.value === jobValue);
        if (job) {
            return job.label; // 해당하는 label 반환
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

onMounted(() => {
    loadUserData();
});
</script>
