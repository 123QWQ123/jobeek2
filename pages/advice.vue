<script setup>
import { navigateTo } from "nuxt/app";

definePageMeta({
  layout: "cabinet",
});

const route = useRoute();
onMounted(() => {
  if (route.name === "advice") {
    navigateTo({ name: "advice-category", params: { category: "popular" } });
  }
});
</script>
<template>
  <main class="main cabinet advice-page bg-wrapper" role="main">
    <NuxtLayout name="guest">
      <div class="articles-grid-container wrapper wrapper-1290">
        <NuxtPage></NuxtPage>
      </div>
    </NuxtLayout>
  </main>
</template>

<style>
/*.router-link-exact-active{*/
/*color: var(--bs-link-hover-color) !important;*/
/*}*/

/*.router-link-exact-active:after {*/
/*  background: #5375FD;*/
/*}*/
</style>
