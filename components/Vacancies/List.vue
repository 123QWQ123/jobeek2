<template>
<!--      <PageLoader v-if="isLoading"/>-->
  <div class="content">

    <ClientOnly>
      <Suspense>
        <template #default>
          <VacanciesAsyncList/>
        </template>

        <template #fallback>
          <VacanciesLoadingList/>
        </template>
      </Suspense>
    </ClientOnly>

  </div>

</template>

<script setup>
import { defineAsyncComponent } from 'vue';
const AsyncList = defineAsyncComponent(() =>
    import('./List.vue')
);

</script>

<style scoped>

</style>