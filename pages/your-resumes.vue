<script setup>
import { useAuthStore } from "../store/auth";
import { navigateTo } from "nuxt/app";

const authStore = useAuthStore();

const isEmployer = computed(() => authStore.isEmployer);

watch(isEmployer, (new_value) => {
  if (new_value) {
    navigateTo({ name: "my-vacancies" });
  }
});

const route = useRoute();
onMounted(async () => {
  if (isEmployer.value) {
    navigateTo({ name: "my-vacancies" });
  }
});
</script>
<template>
  <main class="main cabinet subs-page" role="main">
    <PersonalCabinetSearchMobile />
    <div class="bg-wrapper pt">
      <YourResumesList></YourResumesList>
    </div>
    <div class="bg-wrapper bt">
      <HomeWorkSection />
    </div>
    <HomeSearchSection />
  </main>
</template>
