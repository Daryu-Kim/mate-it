<template>
    <div class="broadcaster">
        <MainHeader />
        <div class="content">
            <div class="broadcast-area">
                <video v-if="isVideoBroadcast"></video>
                <div class="broadcast-overlay"></div>
                <div class="content-area">
                    <div class="title-area">
                        <div class="broadcaster-area">
                            <div>
                                <button class="broadcaster-image">
                                    <img src="https://picsum.photos/300/600" />
                                </button>
                                <div>
                                    <p class="broadcast-title gradient-font">
                                        {{ title }}
                                    </p>
                                    <div>
                                        <p class="broadcaster-name">
                                            다류Daryu
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button class="notice-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960"
                                        width="28px">
                                        <defs>
                                            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" style="stop-color:#2af598; stop-opacity:1" />
                                                <stop offset="100%" style="stop-color:#009efd; stop-opacity:1" />
                                            </linearGradient>
                                        </defs>
                                        <path fill="url(#gradient1)"
                                            d="M720-440v-80h160v80H720Zm48 280-128-96 48-64 128 96-48 64Zm-80-480-48-64 128-96 48 64-128 96ZM200-200v-160h-40q-33 0-56.5-23.5T80-440v-80q0-33 23.5-56.5T160-600h160l200-120v480L320-360h-40v160h-80Zm240-182v-196l-98 58H160v80h182l98 58Zm120 36v-268q27 24 43.5 58.5T620-480q0 41-16.5 75.5T560-346ZM300-480Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="info-area">
                            <div>
                                <div class="analytics-area">
                                    <div>
                                        <p><strong style="font-weight: 900;">TOP</strong> 00%</p>
                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960"
                                            width="16px" fill="#000000">
                                            <path
                                                d="M168-96v-432H96v-216h184q-5-11-7.5-22.94Q270-778.87 270-792q0-50 35-85t85-35q26.29 0 49.14 11Q462-890 480-871q17-19 40.5-30t49.5-11q50 0 85 35t35 85q0 12-3.5 24t-6.5 24h184v216h-72v432H168Zm402-744q-20.4 0-34.2 13.8Q522-812.4 522-792q0 20.4 13.8 34.2Q549.6-744 570-744q20.4 0 34.2-13.8Q618-771.6 618-792q0-20.4-13.8-34.2Q590.4-840 570-840Zm-228 48q0 20.4 13.8 34.2Q369.6-744 390-744q20.4 0 34.2-13.8Q438-771.6 438-792q0-20.4-13.8-34.2Q410.4-840 390-840q-20.4 0-34.2 13.8Q342-812.4 342-792ZM168-672v72h276v-72H168Zm276 504v-360H240v360h204Zm72 0h204v-360H516v360Zm276-432v-72H516v72h276Z" />
                                        </svg>
                                        <p>0</p>
                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960"
                                            width="16px" fill="black">
                                            <path
                                                d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                                        </svg>
                                        <p>0</p>
                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960"
                                            width="20px" fill="#000000">
                                            <path
                                                d="M480-480q-60 0-102-42t-42-102q0-60 42-102t102-42q60 0 102 42t42 102q0 60-42 102t-102 42ZM192-192v-96q0-23 12.5-43.5T239-366q55-32 116.29-49 61.29-17 124.5-17t124.71 17Q666-398 721-366q22 13 34.5 34t12.5 44v96H192Zm72-72h432v-24q0-5.18-3.03-9.41-3.02-4.24-7.97-6.59-46-28-98-42t-107-14q-55 0-107 14t-98 42q-5 4-8 7.72-3 3.73-3 8.28v24Zm216.21-288Q510-552 531-573.21t21-51Q552-654 530.79-675t-51-21Q450-696 429-674.79t-21 51Q408-594 429.21-573t51 21Zm-.21-72Zm0 360Z" />
                                        </svg>
                                        <p>0</p>
                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960"
                                            width="20px" fill="#000000">
                                            <path
                                                d="M96-192v-92q0-25.78 12.5-47.39T143-366q54-32 114.5-49T384-432q66 0 126.5 17T625-366q22 13 34.5 34.61T672-284v92H96Zm648 0v-92q0-42-19.5-78T672-421q39 8 75.5 21.5T817-366q22 13 34.5 34.67Q864-309.65 864-284v92H744ZM384-480q-60 0-102-42t-42-102q0-60 42-102t102-42q60 0 102 42t42 102q0 60-42 102t-102 42Zm336-144q0 60-42 102t-102 42q-8 0-15-.5t-15-2.5q25-29 39.5-64.5T600-624q0-41-14.5-76.5T546-765q8-2 15-2.5t15-.5q60 0 102 42t42 102ZM168-264h432v-20q0-6.47-3.03-11.76-3.02-5.3-7.97-8.24-47-27-99-41.5T384-360q-54 0-106 14t-99 42q-4.95 2.83-7.98 7.91-3.02 5.09-3.02 12V-264Zm216.21-288Q414-552 435-573.21t21-51Q456-654 434.79-675t-51-21Q354-696 333-674.79t-21 51Q312-594 333.21-573t51 21ZM384-264Zm0-360Z" />
                                        </svg>
                                        <p>0</p>
                                    </div>
                                </div>
                                <div class="time-area">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960"
                                        width="16px" fill="black">
                                        <path
                                            d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
                                    </svg>
                                    <p>00:00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="video-area" v-if="isVideoBroadcast"></div>
                    <div class="chat-area">
                        <p>
                            건강한 방송 환경을 위해 상시 모니터링중입니다.<br />
                            운영정책에 위배되는 내용은 제재 대상입니다.<br /><br />

                            [안내] 방송이 시작되었습니다.<br />

                            스푼 멤버십 가입자는 최대 4시간까지 방송할 수 있습니다.<br /><br />

                            첫 방문한 청취자의 닉네임을 불러주세요~<br />
                            당신의 목소리가 큰 힘이 됩니다.
                        </p>
                        <div class="broadcaster">
                            <button class="profile-image"></button>
                            <div class="content-area">
                                <div>
                                    <p class="role">DJ</p>
                                    <p class="name">다류</p>
                                </div>
                                <p>채팅 내용입니다.</p>
                            </div>
                        </div>
                        <div class="audience">
                            <button class="profile-image"></button>
                            <div class="content-area">
                                <div>
                                    <p class="role gradient-font d-none">시청자</p>
                                    <p class="name">다류</p>
                                </div>
                                <p>채팅 내용입니다.</p>
                            </div>
                        </div>
                        <div class="audience">
                            <button class="profile-image"></button>
                            <div class="content-area">
                                <div>
                                    <p class="role gradient-font">애청자</p>
                                    <p class="name">다류</p>
                                </div>
                                <p>채팅 내용입니다.</p>
                            </div>
                        </div>
                        <div class="audience">
                            <button class="profile-image"></button>
                            <div class="content-area">
                                <div>
                                    <p class="role gradient-font">애청자</p>
                                    <p class="name">다류</p>
                                </div>
                                <p>채팅 내용입니다.</p>
                            </div>
                        </div>
                        <div class="audience">
                            <button class="profile-image"></button>
                            <div class="content-area">
                                <div>
                                    <p class="role gradient-font">애청자</p>
                                    <p class="name">다류</p>
                                </div>
                                <p>채팅 내용입니다.</p>
                            </div>
                        </div>
                        <div class="audience">
                            <button class="profile-image"></button>
                            <div class="content-area">
                                <div>
                                    <p class="role gradient-font">애청자</p>
                                    <p class="name">다류</p>
                                </div>
                                <p>채팅 내용입니다.</p>
                            </div>
                        </div>
                    </div>
                    <div class="input-area">
                        <input type="text" placeholder="채팅 내용을 입력해주세요." />
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px"
                                fill="#ffffff">
                                <path
                                    d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" />
                            </svg>
                        </button>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px"
                                fill="#ffffff">
                                <path
                                    d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z" />
                            </svg>
                        </button>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px"
                                fill="#ffffff">
                                <path
                                    d="M360-400h80v-320h-80v320Zm160 0h80v-320h-80v320ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
                            </svg>
                        </button>
                        <button class="" @click="">
                            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px">
                                <defs>
                                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style="stop-color:#2af598; stop-opacity:1" />
                                        <stop offset="100%" style="stop-color:#009efd; stop-opacity:1" />
                                    </linearGradient>
                                </defs>
                                <path fill="url(#gradient1)"
                                    d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="rename-area">
                <div class="tab-menu">
                    <input type="radio" name="menu" id="menu-1" class="tab-button d-none" v-model="selectedTab"
                        value="tab1" checked></input>
                    <label for="menu-1">정보 수정</label>
                    <input type="radio" name="menu" id="menu-2" class="tab-button d-none" v-model="selectedTab"
                        value="tab2"></input>
                    <label for="menu-2">청취자</label>
                    <input type="radio" name="menu" id="menu-3" class="tab-button d-none" v-model="selectedTab"
                        value="tab3"></input>
                    <label for="menu-3">라이브콜</label>
                    <input type="radio" name="menu" id="menu-4" class="tab-button d-none" v-model="selectedTab"
                        value="tab4"></input>
                    <label for="menu-4">보관함</label>
                </div>

                <div class="tab-content">
                    <div v-if="selectedTab === 'tab1'">
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
                                <p class="title">방송 공지</p>
                                <p class="desc">({{ textNotice.length }}/100)</p>
                            </div>
                            <textarea type="text" v-model="textNotice" maxlength="100" rows="5"
                                placeholder="청취자 입장 시 맨 처음 보이는 문구입니다."></textarea>
                        </div>
                        <!-- <div>
                            <div class="title-area">
                                <p class="title">썸네일 업로드</p>
                            </div>
                            <input id="image" class="d-none" type="file" accept="image/*" @input="handleImageUpload" />
                            <label for="image" class="image-area"
                                :style="{ backgroundImage: uploadedImage ? `url(${uploadedImage})` : 'none' }">
                                <svg v-if="!uploadedImage" xmlns="http://www.w3.org/2000/svg" height="48px"
                                    viewBox="0 -960 960 960" width="48px" fill="#434343">
                                    <path
                                        d="M480-480ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h320v80H200v560h560v-320h80v320q0 33-23.5 56.5T760-120H200Zm40-160h480L570-480 450-320l-90-120-120 160Zm440-320v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z" />
                                </svg>
                            </label>
                        </div> -->
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
                                <p class="title">오디오 미리보기</p>
                            </div>
                            <div class="volume-bar">
                                <div class="volume-fill gradient-background"
                                    :style="{ width: volumeLevel * 100 + '%' }">
                                </div>
                            </div>
                        </div>
                        <div v-if="isVideoBroadcast">
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
                        <div v-if="isVideoBroadcast">
                            <div class="title-area">
                                <p class="title">비디오 미리보기</p>
                            </div>
                            <video ref="videoRef" autoplay playsinline :style="{ filter: filterStyle }"></video>
                        </div>
                        <div v-if="isVideoBroadcast">
                            <div class="title-area">
                                <p class="title">비디오 필터 설정</p>
                            </div>
                            <div class="filter-area">
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
                        <div>
                            <div class="title-area">
                                <p class="title">방송 주제</p>
                            </div>
                            <div class="category-area">
                                <div v-for="(category, index) in categories" :key="index">
                                    <input type="radio" v-model="selectedCategory" :value="category"
                                        :id="'category' + (index + 1)" name="category" class="d-none" />
                                    <label :for="'category' + (index + 1)">{{ category }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="selectedTab === 'tab2'">TAB2</div>
                    <div v-if="selectedTab === 'tab3'">TAB3</div>
                    <div v-if="selectedTab === 'tab4'">TAB4</div>
                </div>
            </div>
        </div>
        <!-- <h1>Agora Live Streaming</h1>
        <div>
            <button id="host-join" @click="joinAsHost">Join as Host</button>
            <button id="audience-join" @click="joinAsAudience">Join as Audience</button>
            <button id="leave" @click="leaveChannel">Leave</button>
        </div> -->
        <div id="video-container"></div>
    </div>
</template>

<style lang="scss" scoped>
.broadcaster {
    display: flex;
    flex-direction: column;
    height: 100vh;

    >.content {
        flex: 1;
        width: 100%;
        margin: 0 auto;
        margin-top: 84px;
        padding: 0 36px;
        padding-bottom: 24px;
        max-width: 1280px;
        display: flex;
        height: 100%;
        gap: 16px;

        >.broadcast-area {
            flex: 1;
            background-image: url("https://picsum.photos/1080");
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
            position: relative;
            border-radius: 8px;

            >video {
                z-index: 0;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                border-radius: 8px;
            }

            >.content-area {
                z-index: 2;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                display: flex;
                flex-direction: column;

                >.title-area {
                    padding: 12px 16px;
                    background-color: rgba($color: #000000, $alpha: 0.75);
                    border-radius: 8px 8px 0 0;

                    >.broadcaster-area {
                        display: flex;
                        align-items: center;
                        gap: 16px;
                        justify-content: space-between;

                        >div {
                            display: flex;
                            align-items: center;
                            gap: 12px;

                            >.broadcaster-image {
                                position: relative;
                                width: 56px;
                                height: 56px;
                                box-sizing: border-box;
                                border: 2px solid transparent;
                                border-radius: 50%;
                                background-image: linear-gradient(45deg, #2af598, #009efd);
                                background-origin: border-box;
                                background-clip: border-box;

                                // 그라디언트 테두리 효과
                                &:hover {
                                    filter: unset;
                                }

                                >img {
                                    width: 100%;
                                    height: 100%;
                                    object-fit: cover;
                                    object-position: center;
                                    border-radius: 50%;
                                }
                            }

                            >div {
                                >p.broadcast-title {
                                    font-weight: 700;
                                    color: white;
                                    text-align: start;
                                }

                                >div {
                                    display: flex;
                                    align-items: center;
                                    margin-top: 6px;

                                    >p.broadcaster-name {
                                        color: white;
                                        font-weight: 500;
                                        font-size: 14px;
                                    }
                                }
                            }

                            >button {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                        }
                    }

                    >.info-area {
                        margin-top: 12px;

                        >div {
                            display: flex;
                            align-items: center;
                            gap: 16px;

                            >div {
                                border-radius: 100rem;
                                background-color: white;
                                display: flex;
                                align-items: center;
                                gap: 4px;
                                padding: 6px 8px;
                                font-weight: 500;
                                font-size: 12px;
                                font-weight: 700;

                                p {
                                    line-height: 16px;
                                }
                            }

                            >.analytics-area {
                                display: flex;
                                align-items: center;
                                gap: 12px;

                                >div {
                                    display: flex;
                                    align-items: center;
                                    gap: 2px;
                                }
                            }
                        }
                    }
                }

                >.video-area {
                    flex: 2;
                }

                >.chat-area {
                    flex: 1;
                    padding: 16px 24px;
                    text-align: start;
                    font-weight: 500;
                    color: white;
                    font-size: 14px;
                    line-height: 1.5;
                    display: flex;
                    flex-direction: column;
                    background-color: rgba($color: #000000, $alpha: 0.5);
                    overflow-y: auto;
                    gap: 12px;

                    &::-webkit-scrollbar {
                        background: transparent;
                        width: 8px;
                    }

                    &::-webkit-scrollbar-thumb {
                        background: rgba($color: #fff, $alpha: 0.5); // 스크롤바 바의 색상 및 투명도 설정
                        border-radius: 100rem; // 스크롤바 바의 모서리를 둥글게 설정
                    }

                    >div {
                        display: flex;
                        height: fit-content;
                        gap: 8px;

                        >.profile-image {
                            background-image: url('https://picsum.photos/100');
                            width: 36px;
                            height: 36px;
                            background-position: center;
                            background-repeat: no-repeat;
                            background-size: cover;
                            border-radius: 50%;
                        }

                        >.content-area {
                            >div {
                                display: flex;
                                align-items: center;
                                gap: 4px;
                                margin-bottom: 4px;

                                >.role {
                                    font-size: 12px;
                                    font-weight: 700;
                                }
                            }

                            >p {
                                padding: 6px 8px;
                                border-radius: 8px;
                                background-color: black;
                            }
                        }

                        &.broadcaster {
                            align-self: flex-end;

                            .profile-image {
                                display: none;
                            }

                            >div {
                                >div {
                                    display: none;
                                }

                                >p {
                                    background-color: yellow;
                                    color: black;
                                }
                            }
                        }
                    }
                }

                >.input-area {
                    display: flex;
                    align-items: center;
                    background-color: rgba($color: #000000, $alpha: 0.75);
                    padding: 12px 24px;
                    border-radius: 0 0 8px 8px;
                    gap: 16px;

                    >input {
                        background-color: transparent;
                        outline: none;
                        border: none;
                        flex: 1;
                        color: white;
                        font-size: 16px;
                    }

                    >button {
                        display: flex;
                        align-items: center;
                        justify-content: center;

                    }
                }
            }
        }

        >.rename-area {
            width: 320px;
            height: 100%;
            background-color: black;
            color: white;
            border-radius: 8px;
            text-align: start;
            display: flex;
            flex-direction: column;

            >.tab-menu {
                display: grid;
                grid-template-columns: repeat(4, 1fr);

                >label {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #acacac;
                    color: white;
                    padding: 8px;
                    font-weight: 500;
                    font-size: 14px;
                    background-color: #303030;
                    color: #999;
                    cursor: pointer;
                }

                >input:checked+label {
                    background-color: black;
                    color: white;
                    font-weight: 700;
                    border-color: transparent;
                }

                label:nth-child(2) {
                    border-radius: 8px 0 0 0;
                }

                label:last-child {
                    border-radius: 0 8px 0 0;
                }
            }

            >.tab-content {
                padding: 16px 24px;
                overflow-y: auto;
                flex: 1;

                &::-webkit-scrollbar {
                    background: transparent;
                    width: 8px;
                }

                &::-webkit-scrollbar-thumb {
                    background: rgba($color: #fff, $alpha: 0.5); // 스크롤바 바의 색상 및 투명도 설정
                    border-radius: 100rem; // 스크롤바 바의 모서리를 둥글게 설정
                }

                >div {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                    overflow-y: auto;
                    height: auto;

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

                        >.image-area {
                            width: 100%;
                            margin-top: 12px;
                            aspect-ratio: 9 / 16;
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

                        >.volume-bar {
                            width: 240px;
                            height: 12px;
                            background-color: #ddd;
                            border-radius: 8px;
                            overflow: hidden;
                            margin-top: 12px;

                            >.volume-fill {
                                height: 100%;
                                transition: width 100ms ease-in-out;
                            }
                        }

                        >.filter-area {
                            >div:nth-child(1) {
                                margin-top: 12px;
                            }

                            >div {

                                >label {
                                    font-weight: 500;
                                }

                                >input {
                                    width: 100%;
                                    margin-top: 4px;
                                }
                            }
                        }

                        >.category-area {
                            display: flex;
                            align-items: center;
                            flex-wrap: wrap;
                            gap: 8px;
                            row-gap: 20px;
                            margin-top: 12px;

                            >div {
                                >label {
                                    cursor: pointer;
                                    border: 1.5px solid #434343;
                                    padding: 4px 12px;
                                    border-radius: 100rem;
                                    font-weight: 500;
                                    font-size: 14px;
                                    background-color: #fff;
                                    color: black;
                                }

                                >input:checked+label {
                                    background: linear-gradient(45deg, #2af598 0%, #009efd 100%);
                                    border-color: transparent;
                                    font-weight: 700;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

#video-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>

<script setup>
import { ref } from 'vue';
import AgoraRTC from 'agora-rtc-sdk-ng';
import MainHeader from '@/components/template/MainHeader.vue';

const selectedTab = ref('tab1');

const isVideoBroadcast = ref(false);

let client = null;
const localAudioTrack = ref(null);
const localVideoTrack = ref(null);
const appId = "1a65760a47cb46f5a24f7098a96ece44";
const channel = "test";
// const token = "<-- Insert token -->"; 
const token = null;
const uid = ref(0); // User ID

const title = ref("방송 제목 테스트");
const textNotice = ref("공지사항 테스트입니다.");

const categories = isVideoBroadcast ? [
    "브이로그", "여행", "먹방", "게임", "영화", "리뷰", "실험", "공방", "요리", "피트니스",
    "스포츠", "챌린지", "뷰티", "패션", "다이어트", "음악", "연주", "일상", "반려동물", "장난감",
    "ASMR", "자동차", "사진", "드로잉", "메이크업", "운동", "낚시", "캠핑", "야외", "경제",
    "주식", "부동산", "자동차", "테스트", "자전거", "헬스", "무술", "취미", "공예", "DIY",
    "IT", "드라마", "연극", "교육", "역사", "예술", "마술", "전시회", "라이프", "도전"
] : [
    "음악", "사연", "감성", "고민", "일기", "ASMR", "공포", "연애", "심리", "뉴스",
    "역사", "정치", "경제", "스포츠", "자기계발", "명상", "문학", "독서", "철학", "리뷰",
    "인터뷰", "토론", "여행", "퀴즈", "유머", "건강", "생활", "교육", "이슈", "실험",
    "동화", "광고", "법률", "재테크", "비즈니스", "직장", "창업", "기술", "IT", "개발",
    "예술", "작곡", "패션", "SNS", "식사", "음식", "취미", "트렌드", "마케팅", "성격"
];

const selectTab = (tab) => {
    selectedTab.value = tab;
};

function initializeClient() {
    client = AgoraRTC.createClient({ mode: "live", codec: "vp8", role: "host" });
    setupEventListeners();
}

function setupEventListeners() {
    client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
            displayRemoteVideo(user);
        }
        if (mediaType === "audio") {
            user.audioTrack.play();
        }
    });
    client.on("user-unpublished", async (user) => {
        const remotePlayerContainer = document.getElementById(user.uid);
        remotePlayerContainer && remotePlayerContainer.remove();
    });
}

async function createLocalTracks() {
    localAudioTrack.value = await AgoraRTC.createMicrophoneAudioTrack();
    localVideoTrack.value = await AgoraRTC.createCameraVideoTrack();
}

function displayLocalVideo() {
    const localPlayerContainer = document.createElement("div");
    localPlayerContainer.id = uid.value;
    localPlayerContainer.textContent = `Local user ${uid.value}`;
    localPlayerContainer.style.width = "640px";
    localPlayerContainer.style.height = "480px";
    document.getElementById("video-container").append(localPlayerContainer);
    localVideoTrack.value.play(localPlayerContainer);
}

async function joinAsHost() {
    await client.join(appId, channel, token, uid.value);
    client.setClientRole("host");
    await createLocalTracks();
    await publishLocalTracks();
    displayLocalVideo();
    disableJoinButtons();
    console.log("Host joined and published tracks.");
}

async function joinAsAudience() {
    await client.join(appId, channel, token, uid.value);
    let clientRoleOptions = { level: 2 };
    client.setClientRole("audience", clientRoleOptions);
    disableJoinButtons();
    console.log("Audience joined.");
}

async function publishLocalTracks() {
    await client.publish([localAudioTrack.value, localVideoTrack.value]);
}

function displayRemoteVideo(user) {
    const remotePlayerContainer = document.createElement("div");
    remotePlayerContainer.id = user.uid.toString();
    remotePlayerContainer.textContent = `Remote user ${user.uid}`;
    remotePlayerContainer.style.width = "640px";
    remotePlayerContainer.style.height = "480px";
    document.getElementById("video-container").append(remotePlayerContainer);
    user.videoTrack.play(remotePlayerContainer);
}

async function leaveChannel() {
    if (localAudioTrack.value) {
        localAudioTrack.value.close();
        localAudioTrack.value = null;
    }
    if (localVideoTrack.value) {
        localVideoTrack.value.close();
        localVideoTrack.value = null;
    }
    const localPlayerContainer = document.getElementById(uid.value);
    localPlayerContainer && localPlayerContainer.remove();
    client.remoteUsers.forEach((user) => {
        const playerContainer = document.getElementById(user.uid);
        playerContainer && playerContainer.remove();
    });
    await client.leave();
    enableJoinButtons();
    console.log("Left the channel.");
}

function disableJoinButtons() {
    document.getElementById("host-join").disabled = true;
    document.getElementById("audience-join").disabled = true;
}

function enableJoinButtons() {
    document.getElementById("host-join").disabled = false;
    document.getElementById("audience-join").disabled = false;
}

function setupButtonHandlers() {
    // 버튼 핸들러는 Vue의 @click을 사용하므로 필요 없음
}

function startBasicLiveStreaming() {
    initializeClient();
}

startBasicLiveStreaming();
</script>