<template>
  <CreateResumeForeignLanguagesWrapper
    ref="componentElement"
    v-model="foreign_languages"
    :errors="errors.languages ?? []"
  />
</template>

<script setup>
import { useResumeStore } from "~/store/resume";
const route = useRoute();
const resumeStore = useResumeStore();

const foreign_languages = ref(resumeStore.resume?.languages ?? []);

const errors = ref({});
</script>

<style scoped></style>
