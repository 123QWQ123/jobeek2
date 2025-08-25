<template>
  <div>
    <HomeMainSection />
    <HomePlaceSection />
    <HomeVacancySection />
    <HomeCompaniesSection />
    <HomeWorkSection />
    <HomeSearchSection />
  </div>
</template>

<script async setup>
import { useAuthStore } from "~/store/auth";

useHead({
  title: "Jobeek - все для вашего удобства",
});

const authStore = useAuthStore();
const { isAuthed, user } = storeToRefs(authStore);
if (isAuthed.value) {
  navigateTo("/profile");
}
</script>
