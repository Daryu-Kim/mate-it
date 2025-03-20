<template>
    <div class="ready-broadcast">
        <MainHeader />
        <div class="content">
            <div class="title-area">
                <div class="text-area">
                    <p class="title">오디오 방송 준비하기 | AUDIO LIVE</p>
                    <p class="desc">오디오 방송을 시작하기 전에 설정을 완료해주세요.</p>
                </div>
                <button @click="startBroadcast" class="full-width-primary-btn gradient-background">방송
                    시작하기</button>
            </div>
            <div class="tab-menu">
                <button class="tab-button" @click="selectTab('tab1')">{{ titleFilled ? "✅ 기본 정보" : "❌ 기본 정보" }}</button>
                <button class="tab-button" @click="selectTab('tab2')">{{ readyDevice ? "✅ 장비 설정" : "❌ 장비 설정" }}</button>
                <button class="tab-button" @click="selectTab('tab3')">{{ selectedCategory ? "✅ 방송 주제" : "❌ 방송 주제"
                    }}</button>
            </div>
            <!-- 선택된 탭의 내용 표시 -->
            <div class="tab-content">
                <div v-if="selectedTab === 'tab1'">
                    <div class="input-area">
                        <div>
                            <div class="title-area">
                                <p class="title">제목</p>
                                <p class="desc">({{ title.length }}/20)</p>
                            </div>
                            <input type="text" v-model="title" maxlength="20"
                                placeholder="부적절한 방송 제목은 블라인드 처리될 수 있습니다." />
                        </div>
                        <div>
                            <div class="title-area">
                                <p class="title">추가 기능</p>
                            </div>
                            <div class="check-area">
                                <div>
                                    <input type="checkbox" id="adult" v-model="isAdult" />
                                    <label for="adult">19+ (성인 방송)</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="guest" v-model="isGuest" />
                                    <label for="guest">게스트 참여 가능 (최대 2인)</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="title-area">
                                <p class="title">방송 공지</p>
                                <p class="desc">({{ textNotice.length }}/100)</p>
                            </div>
                            <textarea type="text" v-model="textNotice" maxlength="100" rows="5"
                                placeholder="청취자 입장 시 맨 처음 보이는 문구입니다."></textarea>
                        </div>
                    </div>
                    <div class="show-area">
                        <p class="title">썸네일 업로드</p>
                        <input id="image" class="d-none" type="file" accept="image/*" @input="handleImageUpload" />
                        <label for="image" class="image-area"
                            :style="{ backgroundImage: uploadedImage ? `url(${uploadedImage})` : 'none' }">
                            <svg v-if="!uploadedImage" xmlns="http://www.w3.org/2000/svg" height="48px"
                                viewBox="0 -960 960 960" width="48px" fill="#434343">
                                <path
                                    d="M480-480ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h320v80H200v560h560v-320h80v320q0 33-23.5 56.5T760-120H200Zm40-160h480L570-480 450-320l-90-120-120 160Zm440-320v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z" />
                            </svg>
                        </label>
                    </div>
                </div>
                <div v-if="selectedTab === 'tab2'">
                    <div class="input-area">
                        <div>
                            <div class="title-area">
                                <p class="title">오디오 장비 설정</p>
                            </div>
                            <select v-model="selectedMicrophone" @change="changeMicrophone">
                                <option v-for="device in microphoneDevices" :key="device.deviceId"
                                    :value="device.deviceId">
                                    {{ device.label || `마이크 ${device.deviceId}` }}
                                </option>
                            </select>
                        </div>
                        <div>
                            <div class="title-area">
                                <p class="title">오디오 음질 설정</p>
                            </div>
                            <select v-model="selectedAudioQuality" @change="changeAudioQuality">
                                <option value="speech_low_quality">낮은 품질, 통화 수준 (분당 데이터 135KB)</option>
                                <option value="speech_standard">표준 품질, 음성 채팅 (분당 데이터 240KB)</option>
                                <option value="music_standard">고음질, 음악 가능 (분당 데이터 360KB)</option>
                                <option value="music_high_quality">매우 높은 품질, 음악 방송 (분당 데이터 960KB)</option>
                            </select>
                        </div>
                    </div>
                    <div class="show-area">
                        <p class="title">오디오 미리보기</p>
                        <div class="volume-bar">
                            <div class="volume-fill gradient-background" :style="{ width: volumeLevel * 100 + '%' }">
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="selectedTab === 'tab3'">
                    <div class="category-area">
                        <div v-for="(category, index) in categories" :key="index">
                            <input type="radio" v-model="selectedCategory" :value="category"
                                :id="'category' + (index + 1)" name="category" class="d-none" />
                            <label :for="'category' + (index + 1)">{{ category }}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.content {
    border-radius: 8px;
    border: 1px solid #efefef;
    margin: 0 auto;
    margin-top: 60px;
    padding: 0 72px;
    padding-bottom: 64px;
    max-width: 1280px;

    >.title-area {
        padding: 48px 0 64px 0;
        text-align: left;
        display: flex;
        align-items: center;
        justify-content: space-between;

        >.text-area {
            >p.title {
                font-size: 32px;
                font-weight: 900;
            }

            >p.desc {
                font-size: 16px;
                font-weight: 500;
                color: #606060;
                margin-top: 6px;
            }
        }

        >button {
            width: fit-content;
            padding: 8px 24px;
            border-radius: 100rem;
            height: fit-content;
            font-size: 18px;
            font-weight: 700;
            color: black;
            text-decoration: none;
        }
    }

    >.tab-menu {
        display: flex;
        align-items: center;
        gap: 8px;

        >.tab-button {
            padding: 8px 16px;
            border: 1px solid #cdcdcd;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;

            &:hover {
                background-color: #fafafa;
            }
        }
    }

    >.tab-content {
        margin-top: 24px;

        >div {
            display: flex;
            gap: 36px;

            >.category-area {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                gap: 8px;
                row-gap: 20px;

                >div {
                    >label {
                        cursor: pointer;
                        border: 1.5px solid #434343;
                        padding: 4px 12px;
                        border-radius: 100rem;
                        font-weight: 500;
                        font-size: 14px;
                        background-color: #fff;
                    }

                    >input:checked+label {
                        background: linear-gradient(45deg, #2af598 0%, #009efd 100%);
                        border-color: transparent;
                        font-weight: 700;
                    }
                }
            }

            >div.input-area {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 24px;

                >div {
                    >.title-area {
                        display: flex;
                        align-items: center;
                        gap: 8px;

                        >.title {
                            font-weight: 700;
                            font-size: 20px;
                        }

                        >.desc {
                            font-weight: 500;
                            font-size: 14px;
                        }
                    }

                    >div-.check-area {
                        margin-top: 12px;

                        >div {
                            width: 100%;
                            display: flex;
                            align-items: center;


                            >label {
                                font-weight: 500;
                                width: 36px;
                                text-align: start;
                            }

                            >input {
                                margin-left: 8px;
                                width: 100%;
                            }
                        }
                    }

                    >input,
                    select,
                    textarea {
                        width: 100%;
                        margin-top: 12px;
                        font-size: 16px;
                        font-weight: 500;
                        padding: 8px 12px;
                        border-radius: 8px;
                    }

                    >.check-area {
                        display: flex;
                        align-items: center;
                        justify-content: start;
                        margin-top: 12px;
                        gap: 16px;
                        row-gap: 8px;
                        flex-wrap: wrap;

                        >div {
                            >label {
                                font-size: 16px;
                                font-weight: 500;
                            }

                            >input {
                                margin-right: 4px;
                            }
                        }
                    }
                }
            }

            >.show-area {
                >.title {
                    font-weight: 700;
                    font-size: 20px;

                    &:not(:first-child) {
                        margin-top: 16px;
                    }
                }

                >.image-area {
                    width: 200px;
                    margin-top: 12px;
                    height: 360px;
                    border-radius: 8px;
                    border: 2px solid #434343;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center center;
                }

                >.volume-bar {
                    width: 240px;
                    height: 12px;
                    background-color: #ddd;
                    border-radius: 8px;
                    overflow: hidden;
                    margin-top: 8px;

                    >.volume-fill {
                        height: 100%;
                        transition: width 100ms ease-in-out;
                    }
                }
            }
        }
    }
}
</style>

<script setup lang="js">
import MainHeader from '@/components/template/MainHeader.vue';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import AgoraRTC from 'agora-rtc-sdk-ng';
import router from '@/router';

const selectedTab = ref('tab1'); // 기본 선택된 탭

const microphoneDevices = ref([]);
const selectedMicrophone = ref("");
const selectedAudioQuality = ref("speech_standard");
const localAudioTrack = ref(null);
const volumeLevel = ref(0);
let volumeInterval = null;

const title = ref('');
const uploadedImage = ref(null);
const isAdult = ref(false);
const isGuest = ref(false);
const textNotice = ref("");
const selectedCategory = ref("");

const titleFilled = computed(() => {
    return title.value.length > 8 && uploadedImage.value;
});

const readyDevice = computed(() => {
    return selectedMicrophone.value && selectedAudioQuality.value;
})

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImage.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

const startBroadcast = () => {
    if (
        selectedCategory.value &&
        titleFilled.value &&
        readyDevice.value
    ) {
        router.push('broadcast');
    }
}

const categories = [
    "음악", "사연", "감성", "고민", "일기", "ASMR", "공포", "연애", "심리", "뉴스",
    "역사", "정치", "경제", "스포츠", "자기계발", "명상", "문학", "독서", "철학", "리뷰",
    "인터뷰", "토론", "여행", "퀴즈", "유머", "건강", "생활", "교육", "이슈", "실험",
    "동화", "광고", "법률", "재테크", "비즈니스", "직장", "창업", "기술", "IT", "개발",
    "예술", "작곡", "패션", "SNS", "식사", "음식", "취미", "트렌드", "마케팅", "성격"
];

const audioQualityPresets = {
    speech_low_quality: { bitrate: 18000, sampleRate: 16000 },
    speech_standard: { bitrate: 32000, sampleRate: 32000 },
    music_standard: { bitrate: 48000, sampleRate: 48000 },
    music_high_quality: { bitrate: 128000, sampleRate: 48000 }
};

function selectTab(tab) {
    selectedTab.value = tab;
}

const getMicrophones = async () => {
    const devices = await AgoraRTC.getDevices();
    microphoneDevices.value = devices.filter(device => device.kind === "audioinput");

    if (microphoneDevices.value.length > 0) {
        selectedMicrophone.value = microphoneDevices.value[0].deviceId;
    }
}

const changeMicrophone = async () => {
    if (!selectedMicrophone.value) return;

    try {
        // 기존 오디오 트랙 정리
        if (localAudioTrack.value) {
            await localAudioTrack.value.stop();
            await localAudioTrack.value.close();
        }

        // 새 오디오 트랙 생성
        localAudioTrack.value = await AgoraRTC.createMicrophoneAudioTrack({
            microphoneId: selectedMicrophone.value,
            encoderConfig: audioQualityPresets[selectedAudioQuality.value]
        });

        console.log("🎤 마이크 변경됨: ", selectedMicrophone.value);
        console.log("🎼 설정된 오디오 품질: ", selectedAudioQuality.value);

        startVolumeMonitoring();
    } catch (error) {
        console.error("❌ 마이크 변경 실패: ", error);
    }
}

// 🔊 오디오 볼륨 모니터링 시작
const startVolumeMonitoring = () => {
    if (!localAudioTrack.value) return;

    clearInterval(volumeInterval);
    volumeInterval = setInterval(() => {
        volumeLevel.value = localAudioTrack.value.getVolumeLevel();
    }, 100);
};

const changeAudioQuality = async () => {
    console.log("오디오 품질 변경됨: ", selectedAudioQuality.value);
    await changeMicrophone(); // 변경된 품질로 마이크 다시 설정
}

onMounted(async () => {
    await getMicrophones();
    await changeMicrophone();
})

onUnmounted(() => {
    clearInterval(volumeInterval);
    if (localAudioTrack.value) {
        localAudioTrack.value.stop();
        localAudioTrack.value.close();
    }
});
</script>