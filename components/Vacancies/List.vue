<template>
  <!--      <PageLoader v-if="isLoading"/>-->
  <div class="content">
    <Suspense>
      <template #default>
        <VacanciesAsyncList />
      </template>

      <template #fallback>
        <VacanciesLoadingList />
      </template>
    </Suspense>
  </div>
</template>

<script setup></script>

<style scoped></style>
