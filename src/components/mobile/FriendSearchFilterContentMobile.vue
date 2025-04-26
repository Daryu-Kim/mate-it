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
        <div class="filter-area" v-for="(item, index) in options" :key="index">
            <p class="title">{{ item.title }}</p>
            <div>
                <div v-for="(optionItem, optionIndex) in item.options" :key="optionIndex">
                    <input type="checkbox" class="d-none" :id="`${item.optionName}-${optionIndex}`" :value="optionItem.value" v-model="item.model" />
                    <label :for="`${item.optionName}-${optionIndex}`">
                        {{ optionItem.label }}
                    </label>
                </div>
            </div>
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

        > p {
            text-align: start;
            font-weight: 700;
            font-size: 16px;
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

                > input:checked+label {
                    background: linear-gradient(45deg, #2af598 0%, #009efd 100%);
                    border-color: transparent;
                    font-weight: 700;
                }
            }
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

const checkedGender = ref([]);
const checkedMbti = ref([]);
const checkedReligion = ref([]);
const checkedDrinking = ref([]);
const checkedSmoking = ref([]);
const checkedEducation = ref([]);
const checkedJob = ref([]);

const options = [
    {
        title: '성별',
        optionName: 'gender',
        model: checkedGender,
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
        title: 'MBTI',
        optionName: 'mbti',
        model: checkedMbti,
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
        title: '종교',
        optionName: 'religion',
        model: checkedReligion,
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
        title: '음주',
        optionName: 'drinking',
        model: checkedDrinking,
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
        title: '흡연',
        optionName: 'smoking',
        model: checkedSmoking,
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
        title: '학력',
        optionName: 'education',
        model: checkedEducation,
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
        title: '직업',
        optionName: 'job',
        model: checkedJob,
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
