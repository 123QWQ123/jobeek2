<script setup>
import SearchSection from "../components/Home/SearchSection";
import WorkSection from "../components/Home/WorkSection";

definePageMeta({
  layout: "cabinet",
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