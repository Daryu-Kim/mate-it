<template>
    <div class="sign-up">
        <div class="progress-bar">
            <div class="progress gradient-background" :style="{ width: `${(step.value / totalSteps) * 100}%` }">
            </div>
        </div>
        <component class="component" :is="stepComponents[step]" @nextStep="nextStep" />
    </div>
</template>

<style lang="scss" scoped>
.progress-bar {
    width: 100%;
    height: 16px;

    >.progress {
        width: unset;
        height: 16px;
    }
}
</style>

<script setup lang="js">
import BirthdateComponent from "@/components/signup/BirthdateComponent.vue";
import GenderComponent from "@/components/signup/GenderComponent.vue";
import HeightComponent from "@/components/signup/HeightComponent.vue";

import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const stepComponents = {
    1: BirthdateComponent,
    2: GenderComponent,
    3: HeightComponent
};

const step = ref(Number(route.query.step) || 1);
const totalSteps = 16;

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