<template>
    <div class="bio-signup">
        <div>
            <div class="title-area">
                <p class="title">마지막으로, 사진을 올려주세요!<br />더 친근하게 느껴질 거예요! 📸</p>
                <ul class="desc-area">
                    <li>얼굴이 선명하게 나온 사진을 등록해 주세요.</li>
                    <li>타인이 포함되거나 본인이 아닌 사진은 사용할 수 없어요.</li>
                    <li>선글라스, 마스크 등 얼굴을 가리는 요소가 없는 사진을 권장해요.</li>
                    <li>지나치게 보정된 사진보다는 자연스러운 사진이 좋아요.</li>
                    <li>배경이 너무 어두운 사진은 피하고, 밝고 선명한 사진을 선택해 주세요.</li>
                    <li>누군가를 불쾌하게 만들 수 있는 부적절한 사진은 허용되지 않아요.</li>
                    <li>전신 사진을 추가하면 더 좋은 인상을 줄 수 있어요.</li>
                    <li>최대 5장의 사진을 업로드할 수 있어요. 다양한 모습을 보여주세요!</li>
                </ul>
            </div>
            <div class="input-area">
                <input class="d-none" id="required-1" type="file" accept="image/*" @change="handleImageChange(1)" />
                <label for="required-1" :style="{ backgroundImage: image1 ? `url(${image1})` : 'none' }">
                    <p class="badge gradient-background">필수</p>
                    <svg v-if="!image1" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960"
                        width="36px" fill="#000000">
                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                    </svg>
                    <button v-if="image1" @click="removeImage(1)">사진 변경 / 제거</button>
                </label>

                <input class="d-none" id="required-2" type="file" accept="image/*" @change="handleImageChange(2)" />
                <label for="required-2" :style="{ backgroundImage: image2 ? `url(${image2})` : 'none' }">
                    <p class="badge gradient-background">필수</p>
                    <svg v-if="!image2" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960"
                        width="36px" fill="#000000">
                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                    </svg>
                    <button v-if="image2" @click="removeImage(2)">사진 변경 / 제거</button>
                </label>

                <input class="d-none" id="required-3" type="file" accept="image/*" @change="handleImageChange(3)" />
                <label for="required-3" :style="{ backgroundImage: image3 ? `url(${image3})` : 'none' }">
                    <p class="badge optional">선택</p>
                    <svg v-if="!image3" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960"
                        width="36px" fill="#000000">
                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                    </svg>
                    <button v-if="image3" @click="removeImage(3)">사진 변경 / 제거</button>
                </label>

                <input class="d-none" id="required-4" type="file" accept="image/*" @change="handleImageChange(4)" />
                <label for="required-4" :style="{ backgroundImage: image4 ? `url(${image4})` : 'none' }">
                    <p class="badge optional">선택</p>
                    <svg v-if="!image4" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960"
                        width="36px" fill="#000000">
                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                    </svg>
                    <button v-if="image4" @click="removeImage(4)">사진 변경 / 제거</button>
                </label>

                <input class="d-none" id="required-5" type="file" accept="image/*" @change="handleImageChange(5)" />
                <label for="required-5" :style="{ backgroundImage: image5 ? `url(${image5})` : 'none' }">
                    <p class="badge optional">선택</p>
                    <svg v-if="!image5" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960"
                        width="36px" fill="#000000">
                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                    </svg>
                    <button v-if="image5" @click="removeImage(5)">사진 변경 / 제거</button>
                </label>
            </div>
        </div>
        <div>
            <button class="full-width-primary-btn" :disabled="!isFilled" @click="nextStep">확인</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.bio-signup {
    padding: 36px 24px;
    padding-top: 64px;
    height: calc(100dvh - 16px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    >div {
        >.title-area {
            >.title {
                word-break: keep-all;
                font-weight: 700;
                font-size: 24px;
                text-align: start;
            }

            >.desc-area {
                margin-left: 24px;
                margin-top: 16px;

                >li {
                    font-size: 14px;
                    font-weight: 500;
                    text-align: start;
                    line-height: 24px;
                }
            }
        }

        >.input-area {
            margin-top: 24px;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            margin-bottom: 48px;

            >label {
                aspect-ratio: 1 / 1;
                padding: 16px;
                background-color: #efefef;
                border-radius: 8px;
                cursor: pointer;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center center;

                >p {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    border-radius: 100rem;
                    font-weight: 700;
                    font-size: 14px;
                    padding: 4px 12px;
                }

                >.optional {
                    background-color: black;
                    color: white;
                }

                >button {
                    position: absolute;
                    bottom: 16px;
                    left: 16px;
                    right: 16px;
                    background-color: black;
                    color: white;
                    font-size: 12px;
                    font-weight: 700;
                    padding: 8px;
                    border-radius: 8px;
                    z-index: 10;
                }
            }
        }

        >button {
            font-weight: 700;
            font-size: 16px;
            margin-bottom: 24px;
        }
    }
}
</style>

<script setup lang="js">
import { supabase } from '@/lib/supabase';
import { ref, computed, defineEmits } from 'vue';

const image1 = ref(null);
const image2 = ref(null);
const image3 = ref(null);
const image4 = ref(null);
const image5 = ref(null);

const isFilled = computed(() => image1.value && image2.value);

const emit = defineEmits();

const handleImageChange = (index) => {
    const input = document.getElementById(`required-${index}`);
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            if (index === 1) image1.value = e.target.result;
            else if (index === 2) image2.value = e.target.result;
            else if (index === 3) image3.value = e.target.result;
            else if (index === 4) image4.value = e.target.result;
            else if (index === 5) image5.value = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        console.error(`파일이 선택되지 않았습니다: ${index}`);
    }
};

const removeImage = (index) => {
    if (index === 1) {
        image1.value = null;
        document.getElementById(`required-1`).value = '';
    } else if (index === 2) {
        image2.value = null;
        document.getElementById(`required-2`).value = '';
    } else if (index === 3) {
        image3.value = null;
        document.getElementById(`required-3`).value = '';
    } else if (index === 4) {
        image4.value = null;
        document.getElementById(`required-4`).value = '';
    } else if (index === 5) {
        image5.value = null;
        document.getElementById(`required-5`).value = '';
    }
};

const nextStep = async () => {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session || !session.user) {
        console.error('세션 정보가 유효하지 않습니다.', sessionError);
        return;
    }

    const userId = session.user.id;

    const avatarMain = [];
    const avatarSub = [];

    const images = [image1.value, image2.value, image3.value, image4.value, image5.value];
    for (let i = 0; i < images.length; i++) {
        if (images[i]) {
            const input = document.getElementById(`required-${i + 1}`);
            const file = input.files[0];

            if (!file) {
                console.error(`파일이 선택되지 않았습니다: ${i + 1}`);
                continue;
            }

            const fileName = `user-${userId}/image-${i + 1}${file.name.substring(file.name.lastIndexOf('.'))}`;

            const { error: deleteError } = await supabase.storage.from('users').remove([fileName]);
            if (deleteError) {
                console.error('기존 파일 삭제 오류:', deleteError);
            }

            const { error: uploadError } = await supabase.storage.from('users').upload(fileName, file);
            if (uploadError) {
                console.error('이미지 업로드 오류:', uploadError);
                return;
            }

            const { data: urlData, error: urlError } = await supabase.storage.from('users').getPublicUrl(fileName);
            if (urlError) {
                console.error('publicURL 가져오기 오류:', urlError);
                return;
            }

            if (urlData) {
                if (i < 2) {
                    avatarMain.push(urlData.publicUrl);
                } else {
                    avatarSub.push(urlData.publicUrl);
                }
            } else {
                console.error('publicURL이 null입니다:', fileName);
            }
        }
    }

    const { error } = await supabase
        .from('users')
        .update({
            avatar_main: avatarMain,
            avatar_sub: avatarSub
        })
        .eq('id', userId);

    if (error) {
        console.error('데이터 업데이트 오류:', error);
    } else {
        emit('nextStep');
    }
}
</script>
