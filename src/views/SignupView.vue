<template>
    <div class="sign-up">
        <div class="progress-bar">
            <div class="progress gradient-background" :style="{ width: `${progress}%` }">
            </div>
        </div>
        <component class="component" :is="stepComponents[step]" @nextStep="nextStep" />
    </div>
</template>

<style lang="scss" scoped>
.progress-bar {
    width: 100%;
    height: 16px;
    background-color: #ececec;

    >.progress {
        height: 16px;
    }
}
</style>

<script setup lang="js">
import AddressComponent from "@/components/signup/AddressComponent.vue";
import AvatarComponent from "@/components/signup/AvatarComponent.vue";
import BioComponent from "@/components/signup/BioComponent.vue";
import BirthdateComponent from "@/components/signup/BirthdateComponent.vue";
import BodyTypeComponent from "@/components/signup/BodyTypeComponent.vue";
import DrinkingComponent from "@/components/signup/DrinkingComponent.vue";
import EducationComponent from "@/components/signup/EducationComponent.vue";
import FavMovieComponent from "@/components/signup/FavMovieComponent.vue";
import FavMusicComponent from "@/components/signup/FavMusicComponent.vue";
import GenderComponent from "@/components/signup/GenderComponent.vue";
import HeightComponent from "@/components/signup/HeightComponent.vue";
import IdealTypeComponent from "@/components/signup/IdealTypeComponent.vue";
import InterestsComponent from "@/components/signup/InterestsComponent.vue";
import JobComponent from "@/components/signup/JobComponent.vue";
import LookingForComponent from "@/components/signup/LookingForComponent.vue";
import MbtiComponent from "@/components/signup/MbtiComponent.vue";
import NicknameComponent from "@/components/signup/NicknameComponent.vue";
import PersonalityComponent from "@/components/signup/PersonalityComponent.vue";
import ReligionComponent from "@/components/signup/ReligionComponent.vue";
import SmokingComponent from "@/components/signup/SmokingComponent.vue";
import WaitComponent from "@/components/signup/WaitComponent.vue";

import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const stepComponents = {
    1: NicknameComponent,
    2: BirthdateComponent,
    3: GenderComponent,
    4: AddressComponent,
    5: HeightComponent,
    6: BodyTypeComponent,
    7: EducationComponent,
    8: JobComponent,
    9: ReligionComponent,
    10: DrinkingComponent,
    11: SmokingComponent,
    12: MbtiComponent,
    13: PersonalityComponent,
    14: InterestsComponent,
    15: FavMusicComponent,
    16: FavMovieComponent,
    17: IdealTypeComponent,
    18: LookingForComponent,
    19: BioComponent,
    20: AvatarComponent,
    21: WaitComponent
};

const step = ref(Number(route.query.step) || 1);
const totalSteps = 21;

const progress = computed(() => {
    return (step.value / totalSteps) * 100;
});

watch(route, () => {
    step.value = Number(route.query.step) || 1;
});

function nextStep() {
    if (step.value < totalSteps) {
        router.push(`/signup?step=${step.value + 1}`);
    } else {
        router.push('/');
    }
}
</script>