<template>
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

<script setup></script>

<style></style>
