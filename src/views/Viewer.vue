<template>
    <div id="app">
        <h1>Agora Live Streaming</h1>
        <div>
            <button id="host-join" @click="joinAsHost">Join as Host</button>
            <button id="audience-join" @click="joinAsAudience">Join as Audience</button>
            <button id="leave" @click="leaveChannel">Leave</button>
        </div>
        <div id="video-container"></div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import AgoraRTC from 'agora-rtc-sdk-ng';

let client = null;
const localAudioTrack = ref(null);
const localVideoTrack = ref(null);
const appId = "1a65760a47cb46f5a24f7098a96ece44";
const channel = "test";
// const token = "<-- Insert token -->"; 
const token = null;
const uid = ref(0); // User ID

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

<style>
#video-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>