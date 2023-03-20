<script setup>
import {useAuthStore} from "../store/auth";
import {navigateTo} from "nuxt/app";

definePageMeta({
  layout: "cabinet",
});

const authStore = useAuthStore();

const isEmployer = computed(() => authStore.isEmployer);

console.log(isEmployer);

watch(isEmployer, (new_value) => {
  if (new_value){
    navigateTo({name: 'your-vacancies'});
  }
  console.log(new_value);
})

const route = useRoute();
onMounted(async () => {
  console.log(route.query);
  if (isEmployer.value){
    navigateTo({name: 'your-vacancies'});
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
      <HomeWorkSection></HomeWorkSection>
    </div>
    <HomeSearchSection></HomeSearchSection>
  </main>
</template>