<script setup>
import { useVacancyStore } from "~/store/vacancy";
import useAlert from "~/composables/useAlert";
import { useResumeStore } from "~/store/resume";
import { useAuthStore } from "~/store/auth.js";

const route = useRoute();

const vacancyStore = useVacancyStore();

const providers = ref({
  superjob: false,
  hh: false,
});

const resumeStore = useResumeStore();

useHead({
  title: "Jobeek - Создание резюме",
});

const error = computed(() => {
  return route.query.message;
});

const authStore = useAuthStore();

watch(
  () => authStore.isEmployer,
  () => {
    if (authStore.isEmployer === true) {
      navigateTo({ name: "create-vacancy" });
    }
  },
);
onMounted(() => {
  if (authStore.isEmployer === true) {
    navigateTo({ name: "create-vacancy" });
  }
});

const draft_el = ref();

const errorMessage = ref(null);
const errors = ref([]);
const isLoading = ref(false);
</script>
<template>
  <main class="main cabinet create-resume-page bg-wrapper" role="main">
    <Head>
      <Title>Jobeek - Создание резюме</Title>
    </Head>
    <div class="bg-wrapper pt">
      <PersonalCabinetSearchMobile />
      <div class="wrapper wrapper-1290">
        <form
          class="create-vacancy"
          @submit.prevent="draft_el.onSubmit"
          name="create-vacancy"
        >
          <CreateResumeDraftCard ref="draft_el" />

          <div class="form-submit-container">
            <button class="btn btn-outline-primary" @click="draft_el.save()">
              Далее
              <div
                v-if="isLoading"
                class="ms-2 bg-primary spinner-grow spinner-grow-sm"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
