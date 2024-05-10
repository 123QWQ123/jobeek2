<template>
  <ProfileLoadingEmployerEditForm v-if="isServer" />
  <client-only>
    <Suspense>
      <template #fallback>
        <ProfileLoadingEmployerEditForm />
      </template>
      <template #default>
        <ProfileEmployerEditForm />
      </template>
    </Suspense>
  </client-only>
</template>

<script setup>
const isServer = computed(() => process.server);
</script>

<style></style>
