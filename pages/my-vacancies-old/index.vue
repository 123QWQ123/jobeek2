<script setup>
import { useAuthStore } from "../../store/auth";
import { useVacancyStore } from "~/store/vacancy.js";

definePageMeta({
  layout: "cabinet",
});
useHead({
  title: "Мои вакансии - Jobeek",
});

const authStore = useAuthStore();

const isEmployer = computed(() => authStore.isEmployer);
const user = computed(() => authStore.user);
const employer = computed(() => authStore.employer);

const { getMyDrafts } = useVacancyStore();
onMounted(async () => {
  await getMyDrafts();
});

watch(isEmployer, (new_value) => {
  if (new_value === false) {
    navigateTo({ name: "my-resumes" });
  }
});
const vacancyStore = useVacancyStore();
const isCompleted = computed(() => {
  if (
    vacancyStore.providers.hh === true &&
    vacancyStore.providers.superjob === true
  ) {
    return true;
  }
  return false;
});
</script>
<template>
  <main class="main cabinet my-vacancies-page" role="main">
    <PersonalCabinetSearchMobile />
    <div class="bg-wrapper position-relative pt-4">
      <div class="has-sidebar has-sidebar--v2 wrapper wrapper-1290">
        <div class="content mb-4">
          <MyVacanciesConnectedProviders />

          <MyVacanciesDraftList :items="vacancyStore.my_drafts" />
        </div>
        <aside class="sidebar">
          <div class="premium-col sticky-item">
            <div class="title" v-if="isEmployer">Премиум</div>
            <div class="title" v-else>Подключите Премиум подписку</div>
            <div class="term" v-if="isEmployer">
              <span>Действует до</span><strong>24 августа 2024</strong>
            </div>
            <a class="btn button-xs" href="#" v-if="isEmployer">Отключить </a>
            <!--            <a class="btn button-xs" href="#" v-else>Подключить</a>-->
            <a class="notification-button button-accent" href="#"
              >Подключить
            </a>
          </div>
        </aside>
      </div>
    </div>
  </main>
</template>

<style></style>
