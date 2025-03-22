<template>
    <div class="sign-up">
        <component :is="stepComponents[step]" @nextStep="nextStep" />

        <button v-if="step > 1" @click="prevStep">이전</button>
    </div>
</template>

<style lang="scss" scoped></style>

<script setup lang="js">
import BirthdateComponent from "@/components/signup/BirthdateComponent.vue";

import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const stepComponents = {
    1: BirthdateComponent
};

const step = ref(Number(route.query.step) || 1);
const totalSteps = 10;

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

function prevStep() {
    if (step.value > 1) {
        router.push(`/signup?step=${step.value - 1}`);
    }
}
</script>