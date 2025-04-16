<template>
    <div class="home">
        <MainHeader />
        <HomeContent />
        <LoginDialog v-model="isLoggedIn" />
        <BottomNavigationBar />
        <vue-bottom-sheet class="bottom-sheet" v-model="isNotPWAInstalled">
            <div class="title-area">
                <p class="title">더욱 편리한 이용을 위한 앱 설치 안내</p>
            </div>
            <hr />
            <div class="content-area">
                <div v-if="isIOS">
                    <p>
                        저희 메이트잇 서비스는 더욱 편리한 이용 및 원활한 알림
                        수신을 위해 앱 설치 기능을 지원하고 있습니다!
                    </p>
                    <p>
                        아이폰이나 아이패드의 경우, 홈 화면에 추가하려면 공유
                        버튼을 클릭한 후 '홈 화면에 추가'를 선택하세요.
                    </p>
                </div>
                <div v-else>
                    <p>
                        저희 메이트잇 서비스는 더욱 편리한 이용 및 원활한 알림
                        수신을 위해 앱 설치 기능을 지원하고 있습니다!
                    </p>
                    <p>이 앱을 설치하려면 아래 버튼을 클릭하세요.</p>
                    <button class="gradient-background" @click="installPWA">
                        설치하기
                    </button>
                </div>
            </div>
        </vue-bottom-sheet>
    </div>
</template>

<style lang="scss" scoped>
.home {
    display: flex;
    flex-direction: column;
    height: 100dvh;
}

.bottom-sheet {
    .title-area {
        text-align: center;
        font-weight: 700;
        font-size: 18px;
        padding: 8px 0;
    }

    hr {
        border: none;
        border-top: 1px solid #efefef;
    }

    .content-area {
        margin-top: 24px;
        padding: 0 16px 16px 16px;

        > div {
            > p {
                text-align: center;
                font-weight: 500;
                word-break: keep-all;
                font-size: 14px;

                &:not(:first-child) {
                    margin-top: 16px;
                }
            }

            > button {
                border-radius: 8px;
                width: 100%;
                height: 36px;
                font-weight: 700;
                font-size: 16px;
                margin-top: 24px;
            }
        }
    }
}
</style>

<script setup>
import MainHeader from "@/components/template/MainHeader.vue";
import LoginDialog from "@/components/dialog/LoginDialog.vue";
import { onMounted, ref } from "vue";
import { checkUserData, getCurrentSession } from "@/lib/supabase";
import BottomNavigationBar from "@/components/template/BottomNavigationBar.vue";
import HomeContent from "@/components/template/HomeContent.vue";
import { VueBottomSheet } from "vue3-bottom-sheet";

const isLoggedIn = ref(false);
const isNotPWAInstalled = ref(false);
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
let deferredPrompt;

const installPWA = () => {
    // PWA 설치를 위한 로직을 여기에 추가합니다.
    // 예를 들어, 'beforeinstallprompt' 이벤트를 사용하여 설치를 요청할 수 있습니다.
    // 아래는 예시 코드입니다.
    if (deferredPrompt) {
        deferredPrompt.prompt(); // 설치 프롬프트 표시
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                console.log("사용자가 PWA 설치를 수락했습니다.");
            } else {
                console.log("사용자가 PWA 설치를 거부했습니다.");
            }
            deferredPrompt = null; // 프롬프트를 사용한 후 null로 설정
        });
    }
    isNotPWAInstalled.value = false; // 설치 후 바텀 시트 닫기
};

onMounted(async () => {
    const session = await getCurrentSession();
    if (session) {
        isLoggedIn.value = false;
        await checkUserData();
    } else {
        isLoggedIn.value = true;
    }

    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault(); // 기본 동작 방지
        deferredPrompt = e; // 이벤트를 저장
        isNotPWAInstalled.value = true; // 설치 가능 시 바텀 시트 열기
    });
});
</script>
