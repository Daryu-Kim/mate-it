<template>
    <div class="ready-broadcast">
        <MainHeader />
        <div class="content">
            <div class="title-area">
                <div class="text-area">
                    <p class="title">비디오 라이브 준비하기 | VIDEO LIVE</p>
                    <p class="desc">비디오 방송을 시작하기 전에 설정을 완료해주세요.</p>
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
                            <select v-model="selectedAudioQuality" @change="changeAudioQuality">
                                <option value="speech_low_quality">낮은 품질, 통화 수준 (분당 데이터 135KB)</option>
                                <option value="speech_standard">표준 품질, 음성 채팅 (분당 데이터 240KB)</option>
                                <option value="music_standard">고음질, 음악 가능 (분당 데이터 360KB)</option>
                                <option value="music_high_quality">매우 높은 품질, 음악 방송 (분당 데이터 960KB)</option>
                            </select>
                        </div>
                        <div>
                            <div class="title-area">
                                <p class="title">비디오 장비 설정</p>
                            </div>
                            <select v-model="selectedCamera" @change="changeCamera">
                                <option v-for="device in cameraDevices" :key="device.deviceId" :value="device.deviceId">
                                    {{ device.label || `카메라 ${device.deviceId}` }}
                                </option>
                            </select>
                            <select v-model="selectedResolution" @change="changeCamera">
                                <option value="SD_Standard">SD 일반 (분당 데이터 5.86MB)</option>
                                <option value="HD_Standard">HD 일반 (분당 데이터 14.65MB)</option>
                                <option value="HD_Smooth">HD 부드러운 (분당 데이터 29.3MB)</option>
                                <option value="FHD_Standard">FHD 일반 (분당 데이터 29.3MB)</option>
                                <option value="FHD_Smooth">FHD 부드러운 (분당 데이터 43.95MB)</option>
                            </select>
                        </div>
                        <div>
                            <div class="title-area">
                                <p class="title">비디오 필터 설정</p>
                            </div>
                            <div>
                                <div>
                                    <label>밝기</label>
                                    <input type="range" v-model="brightness" min="0" max="2" step="0.1" />
                                </div>
                                <div>
                                    <label>대비</label>
                                    <input type="range" v-model="contrast" min="0" max="2" step="0.1" />
                                </div>
                                <div>
                                    <label>채도</label>
                                    <input type="range" v-model="saturation" min="0" max="2" step="0.1" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="show-area">
                        <p class="title">오디오 미리보기</p>
                        <div class="volume-bar">
                            <div class="volume-fill gradient-background" :style="{ width: volumeLevel * 100 + '%' }">
                            </div>
                        </div>
                        <p class="title">비디오 미리보기</p>
                        <video ref="videoRef" autoplay playsinline :style="{ filter: filterStyle }"></video>
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
                        background: linear-gradient(90deg, #2af598 0%, #009efd 100%);
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

                >video {
                    width: 240px;
                    height: auto;
                    margin-top: 12px;
                    border-radius: 8px;
                    aspect-ratio: 9 / 16;
                    object-fit: cover;
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

const cameraDevices = ref([]);
const selectedCamera = ref("");
const videoRef = ref(null);
let localVideoTrack = null;
const selectedResolution = ref("HD_Standard");

// 필터 설정
const brightness = ref(1);
const contrast = ref(1);
const saturation = ref(1);
const hue = ref(0);

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
    return selectedMicrophone.value && selectedAudioQuality.value && selectedCamera.value && selectedResolution.value;
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
    "브이로그", "여행", "먹방", "게임", "영화", "리뷰", "실험", "공방", "요리", "피트니스",
    "스포츠", "챌린지", "뷰티", "패션", "다이어트", "음악", "연주", "일상", "반려동물", "장난감",
    "ASMR", "자동차", "사진", "드로잉", "메이크업", "운동", "낚시", "캠핑", "야외", "경제",
    "주식", "부동산", "자동차", "테스트", "자전거", "헬스", "무술", "취미", "공예", "DIY",
    "IT", "드라마", "연극", "교육", "역사", "예술", "마술", "전시회", "라이프", "도전"
];

// 오디오 품질 프리셋
const audioQualityPresets = {
    speech_low_quality: { label: "낮은 품질, 통화 수준 (분당 데이터 135KB)" },
    speech_standard: { label: "표준 품질, 음성 채팅 (분당 데이터 240KB)" },
    music_standard: { label: "고음질, 음악 가능 (분당 데이터 360KB)" },
    music_high_quality: { label: "매우 높은 품질, 음악 방송 (분당 데이터 960KB)" }
};

// 비디오 해상도 프리셋
const resolutionPresets = {
    SD_Standard: { label: "SD 일반 (분당 데이터 5.86MB)" },
    HD_Standard: { label: "HD 일반 (분당 데이터 14.65MB)" },
    HD_Smooth: { label: "HD 부드러운 (분당 데이터 29.3MB)" },
    FHD_Standard: { label: "FHD 일반 (분당 데이터 29.3MB)" },
    FHD_Smooth: { label: "FHD 부드러운 (분당 데이터 43.95MB)" }
};

const filterStyle = computed(() => {
    return `
        brightness(${brightness.value})
        contrast(${contrast.value})
        saturate(${saturation.value})
        hue-rotate(${hue.value}deg)
    `;
});

// 탭 선택 함수
const selectTab = (tab) => {
    selectedTab.value = tab;
};

const getMicrophones = async () => {
    const devices = await AgoraRTC.getDevices();
    microphoneDevices.value = devices.filter(device => device.kind === "audioinput");

    if (microphoneDevices.value.length > 0) {
        selectedMicrophone.value = microphoneDevices.value[0].deviceId;
    }
}

const getCameras = async () => {
    const devices = await AgoraRTC.getDevices();
    cameraDevices.value = devices.filter(device => device.kind === "videoinput");

    if (cameraDevices.value.length > 0) {
        selectedCamera.value = cameraDevices.value[0].deviceId; // 기본 카메라 선택
        await changeCamera(); // 초기 카메라 설정
    }
};

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

const changeAudioQuality = async () => {
    console.log("오디오 품질 변경됨: ", selectedAudioQuality.value);
    await changeMicrophone(); // 변경된 품질로 마이크 다시 설정
}

const changeCamera = async () => {
    if (!selectedCamera.value) return;

    try {
        // 기존 카메라 트랙이 있으면 정리
        if (localVideoTrack) {
            localVideoTrack.stop();
            localVideoTrack.close();
        }

        // 선택한 해상도에 따른 encoderConfig 적용
        const resolution = resolutionPresets[selectedResolution.value];

        // 선택한 카메라로 새로운 비디오 트랙 생성
        localVideoTrack = await AgoraRTC.createCameraVideoTrack({
            cameraId: selectedCamera.value,
            encoderConfig: resolution
        });

        // HTML 비디오 요소에 출력
        if (videoRef.value) {
            await localVideoTrack.play(videoRef.value);
        }

        console.log("카메라 변경됨:", selectedCamera.value);
        console.log("비디오 해상도 변경됨:", resolution);
    } catch (error) {
        console.error("카메라 변경 실패:", error);
    }
};

// 🔊 오디오 볼륨 모니터링 시작
const startVolumeMonitoring = () => {
    if (!localAudioTrack.value) return;

    clearInterval(volumeInterval);
    volumeInterval = setInterval(() => {
        volumeLevel.value = localAudioTrack.value.getVolumeLevel();
    }, 100);
};

onMounted(async () => {
    await getCameras();
    await getMicrophones();
    await changeMicrophone();
    await changeCamera();
})

onUnmounted(() => {
    clearInterval(volumeInterval);
    if (localAudioTrack.value) {
        localAudioTrack.value.stop();
        localAudioTrack.value.close();
    }
    if (localVideoTrack.value) {
        localVideoTrack.value.stop();
        localVideoTrack.value.close();
    }
});
</script>