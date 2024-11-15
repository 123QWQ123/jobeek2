<template>
  <ProfileLoadingEmployerEditForm v-if="isServer" />
  <Suspense>
    <template #fallback>
      <ProfileLoadingEmployerEditForm />
    </template>
    <template #default>
      <ProfileEmployerEditForm />
    </template>
  </Suspense>
</template>

<script setup>
const isServer = computed(() => process.server);
</script>

<style></style>
