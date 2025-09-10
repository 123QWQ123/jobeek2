<script setup>
import { useAuthStore } from "~/store/auth";

useHead({
  title: "Jobeek - Мои избранные резюме",
});

const authStore = useAuthStore();

const isEmployer = computed(() => authStore.isEmployer);
const user = computed(() => authStore.user);
const employer = computed(() => authStore.employer);

watch(isEmployer, (new_value) => {
  if (new_value === false) {
    navigateTo({ name: "favorite-vacancies" });
  }
});
</script>
<template>
  <main class="main cabinet my-favorite-resumes-page" role="main">
    <PersonalCabinetSearchMobile />

    <div class="bg-wrapper position-relative pb-4 pt-4">
      <div class="wrapper wrapper-1290">
        <div class="content mb-4">
          <MyFavoriteResumesList />
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
