<script setup>
import { useVacancyStore } from "~/store/vacancy";
import useAlert from "~/composables/useAlert";

definePageMeta({
  layout: "cabinet",
});

const route = useRoute();

const vacancyStore = useVacancyStore();

const providers = ref({
  superjob: false,
  hh: false,
});

const { createDraft } = vacancyStore;
const pageTitle = computed(() => {
  return "Создание вакансии";
});

const error = computed(() => {
  return route.query.message;
});
const { handleAlert } = useAlert();
watch(() => route.query.message, handleAlert);

const saveAsDraft = (e) => {
  e.preventDefault();
  isLoading.value = true;

  isLoading.value = false;
  console.log("saved as draft");

  // createDraft()
};

const paramProviders = computed(() => {
  if (providers.value.hh && providers.value.superjob) {
    return ["hh", "superjob"];
  }
  if (providers.value.hh) {
    return ["hh"];
  }
  if (providers.value.superjob) {
    return ["superjob"];
  }
  return [];
});

const draft_el = ref();

const errorMessage = ref(null);
const hhErrorMessage = ref(null);
const superjobErrorMessage = ref(null);
const errors = ref([]);
const isLoading = ref(false);
</script>
<template>
  <main class="main cabinet create-subscribe-page bg-wrapper" role="main">
    <Head>
      <Title>{{ pageTitle }} - Jobeek</Title>
    </Head>
    <div class="bg-wrapper pt">
      <PersonalCabinetSearchMobile />
      <div class="wrapper wrapper-1290">
        <form
          class="create-vacancy"
          @submit.prevent="saveAsDraft"
          name="create-vacancy"
        >
          <CreateVacancyDraftCard ref="draft_el" />

          <div class="form-submit-container">
            <button
              class="btn btn-outline-primary"
              @click="draft_el.onSubmit()"
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
