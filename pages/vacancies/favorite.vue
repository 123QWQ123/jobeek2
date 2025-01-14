<script setup>
import { useAuthStore } from "~/store/auth";

useHead({
  title: "Мои избранние резюме - Jobeek",
});

const authStore = useAuthStore();

const isEmployer = computed(() => authStore.isEmployer);
const user = computed(() => authStore.user);
const employer = computed(() => authStore.employer);

watch(
  () => isEmployer.value,
  (new_value) => {
    if (!new_value) {
      navigateTo({ name: "favorite-vacancies" });
    }
  },
);
</script>
<template>
  <main class="main cabinet my-vacancies-page" role="main">
    <PersonalCabinetSearchMobile />

    <div class="bg-wrapper position-relative pt-4">
      <div class="has-sidebar has-sidebar--v2 wrapper wrapper-1290">
        <div class="content mb-4">
          <MyResumesConnectedProviders />

          <MyFavoriteVacanciesList />
        </div>
      </div>
    </div>
  </main>
  <!--  <main class="main cabinet my-vacancies-page" role="main">-->
  <!--    <div class="bg-wrapper position-relative">-->
  <!--    </div>-->
  <!--  </main>-->
</template>

<style></style>
