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
const { getMyResume } = resumeStore;
const pageTitle = computed(() => "Создание вакансии");
const error = computed(() => route.query.message);
const { handleAlert } = useAlert();
const draft_el = ref();
const errorMessage = ref(null);
const errors = ref([]);
const isLoading = ref(false);
const authStore = useAuthStore();
const isEmployer = computed(() => authStore.isEmployer);

watch(() => route.query.message, handleAlert);

watch(
  () => authStore.isEmployer,
  (new_value) => {
    if (new_value !== true) {
      navigateTo({ name: "create-resume" });
    }
  },
);
onMounted(() => {
  if (authStore.isEmployer !== true) {
    navigateTo({ name: "create-resume" });
  }
});
</script>
<template>
  <main class="main cabinet create-vacancy-page bg-wrapper" role="main">
    <Head>
      <Title>{{ pageTitle }} - Jobeek</Title>
    </Head>
    <div class="bg-wrapper pt">
      <PersonalCabinetSearchMobile />
      <div class="wrapper wrapper-1290">
        <form
          class="create-vacancy"
          @submit.prevent="omSubmit"
          name="create-vacancy"
        >
          <CreateVacancyCreateDraft ref="draft_el" :title="pageTitle" />

          <div class="form-submit-container">
            <button
              class="btn btn-outline-primary"
              @click.prevent="draft_el.save()"
            >
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
