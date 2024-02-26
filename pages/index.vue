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

<script setup>
definePageMeta({
  layout: "cabinet",
});

useHead({
  title: "Jobeek - все для вашего удобства",
});
</script>
