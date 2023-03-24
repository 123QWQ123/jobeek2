<template>
  <div>
    <HomeMainSection/>
    <HomePlaceSection/>
    <HomeVacancySection/>
    <HomeCompaniesSection/>
    <HomeWorkSection/>
    <HomeSearchSection/>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'main'
})

useHead({
  title: "Jobeek - все для вашего удобства",
})
</script>