<script setup>
import useAlert from "~/composables/useAlert";
import { useAuthStore } from "~/store/auth.js";

// Композиционные API
const route = useRoute();
const authStore = useAuthStore();

// Константы
const pageTitle = computed(() => "Создание вакансии");
useHead({
  title: "Jobeek - Создание вакансии",
});
const draft_el = ref();
const isLoading = ref(false);

// Оптимизированные вычисления и реактивности
const isEmployer = computed(() => authStore.isEmployer);

// Редирект для неработодателей
onMounted(() => {
  if (!isEmployer.value) {
    navigateTo({ name: "create-resume" });
  }
});

// Слушаем изменения статуса работодателя
watch(isEmployer, (newValue) => {
  if (!newValue) {
    navigateTo({ name: "create-resume" });
  }
});

// Обработка сообщений из URL
const error = computed(() => route.query.message);

// Обработчик сохранения
const handleSave = async () => {
  isLoading.value = true;
  try {
    await draft_el.value.save();
  } catch (error) {
    console.error("Ошибка при сохранении черновика:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <main class="main cabinet create-vacancy-page bg-wrapper" role="main">
    <Head>
      <Title>{{ pageTitle }} - Jobeek</Title>
    </Head>
    <div class="bg-wrapper pt-4 pb-4">
      <PersonalCabinetSearchMobile />
      <div class="wrapper wrapper-1290">
        <form class="create-vacancy" name="create-vacancy">
          <CreateVacancyCreateDraft ref="draft_el" :title="pageTitle" />

          <div class="form-submit-container">
            <button
              class="btn btn-outline-primary"
              @click.prevent="handleSave"
              :disabled="isLoading"
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
