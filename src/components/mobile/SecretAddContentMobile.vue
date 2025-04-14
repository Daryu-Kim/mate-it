<template>
    <div class="content">
        <div class="title-area">
            <div class="text-area">
                <p class="title">비밀방 글쓰기</p>
            </div>
        </div>
        <div class="content-area">
            <div>
                <input
                    type="text"
                    maxlength="50"
                    v-model="inputTitle"
                    placeholder="제목을 입력해주세요. (최대 50자)"
                />
            </div>
            <div>
                <ScrollPicker v-model="selectedCategory" :options="options" />
            </div>
            <div>
                <textarea
                    type="text"
                    v-model="inputContent"
                    :placeholder="placeholderText"
                ></textarea>
            </div>
        </div>

        <button
            class="floating-btn"
            @click="onClickUploadPost"
            :disabled="!isFilled"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#ffffff"
            >
                <path
                    d="M202.63-202.87h57.24l374.74-374.74-56.76-57-375.22 375.22v56.52Zm-90.76 91v-185.3l527.52-526.76q12.48-11.72 27.7-17.96 15.21-6.24 31.93-6.24 16.48 0 32.2 6.24 15.71 6.24 27.67 18.72l65.28 65.56q12.48 11.72 18.34 27.56 5.86 15.83 5.86 31.79 0 16.72-5.86 32.05-5.86 15.34-18.34 27.82L297.65-111.87H111.87Zm642.87-586.39-56.24-56.48 56.24 56.48Zm-148.89 92.41-28-28.76 56.76 57-28.76-28.24Z"
                />
            </svg>
        </button>
    </div>
</template>

<style lang="scss" scoped>
.content {
    margin: 0 auto;
    margin-top: 60px;
    padding: 0 36px;
    padding-bottom: 64px;
    position: relative;

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
        }
    }

    > .content-area {
        display: flex;
        flex-direction: column;
        gap: 16px;

        > div {
            background-color: #efefef;
            border-radius: 8px;
            padding: 8px;

            > input,
            textarea {
                width: 100%;
                font-weight: 500;
                font-size: 14px;
                padding: 8px;
                border: none;
                outline: none;
                background: none;
            }

            > textarea {
                min-height: 360px;
            }
        }
    }
}

.scroll-picker-container {
    height: 120px !important;
    * {
        background: none !important;
        font-size: 14px !important;
        line-height: 20px !important;
        font-weight: 500 !important;
    }
}

.floating-btn {
    border-radius: 100rem;
    position: fixed;
    bottom: 72px;
    right: 24px;
    background-color: black;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
}
</style>

<script setup lang="js">
import { supabase } from '@/lib/supabase';
import router from '@/router';
import { ref, computed } from 'vue';
import ScrollPicker from 'vue3-scroll-picker';

const inputTitle = ref('');
const inputContent = ref('');
const selectedCategory = ref([]);

const isFilled = computed(() => inputTitle.value && inputContent.value && selectedCategory.value[0]);

const onClickUploadPost = async () => {
    try {
        const userSession = (await supabase.auth.getSession()).data.session.user;
        const userId = userSession ? userSession.id : null;

        const { error: uploadError } = await supabase
            .from('secret_board')
            .insert({
                user_id: userId,
                content: inputContent.value.replace(/\n/g, '<br>'),
                category: selectedCategory.value[0],
                title: inputTitle.value
            });
        if (uploadError) throw uploadError;

        const { data: latestPost, error: fetchError } = await supabase
            .from('secret_board')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(1)
            .single(); // 가장 최근의 글을 가져옵니다.

        if (fetchError) throw fetchError;

        alert("업로드가 완료되었습니다!\n작성하신 글로 이동합니다!");
        router.replace(`/secret-detail?id=${latestPost.post_id}`);
    } catch (error) {
        console.error("업로드 실패: ", error);
    }
}

const options = [
    [
        {
            "label": "[ 카테고리 선택 ]",
            "value": ""
        },
        {
            "label": "고민",
            "value": "CONCERNS"
        },
        {
            "label": "질문",
            "value": "QUESTIONS"
        },
        {
            "label": "찾아요",
            "value": "LOOKING_FOR"
        },
        {
            "label": "조언",
            "value": "ADVICE"
        },
        {
            "label": "이야기",
            "value": "STORIES"
        },
        {
            "label": "소통",
            "value": "COMMUNICATION"
        },
        {
            "label": "감정",
            "value": "EMOTIONS"
        },
        {
            "label": "취미",
            "value": "HOBBIES"
        },
        {
            "label": "연애",
            "value": "RELATIONSHIPS"
        },
        {
            "label": "일상",
            "value": "DAILY_LIFE"
        },
        {
            "label": "정보",
            "value": "INFORMATION"
        },
        {
            "label": "추천",
            "value": "RECOMMENDATIONS"
        },
        {
            "label": "이벤트",
            "value": "EVENTS"
        },
        {
            "label": "자기계발",
            "value": "SELF_IMPROVEMENT"
        }
    ]
];

const placeholderText = `[ 비밀방 이용 가이드라인 ]

1) 인스타그램, 게임 ID 등 외부 연락처를 공유하거나, 이를 알고도 방조하는 행위는 허용되지 않습니다.

2) 불쾌감을 유발할 수 있는 글이나 댓글은 삼가 주시고, 모두가 즐겁게 소통할 수 있도록 다른 회원을 존중해 주세요.

3) 매칭된 상대방의 동의 없이 관련된 글을 게시하지 말아주세요.

4) 건의사항이나 유저 신고는 비밀방 대신 고객센터로 문의해 주시면 더욱 빠르게 처리됩니다.

5) 유사한 다른 어플을 언급하거나 추천인을 홍보하는 글은 허용되지 않습니다.

5회 이상 신고된 글이나 댓글은 삭제될 수 있으며, 반복될 경우 비밀방 이용이 제한될 수 있습니다.
`;
</script>
