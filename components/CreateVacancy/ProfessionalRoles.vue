<script setup>
import { useProfileStore } from "~/store/profile.js";

const profileStore = useProfileStore();
await useAsyncData("profileStore ", async () => {
  await profileStore.getProfessionalRolesList();
});

const { professionalRolesListOption } = storeToRefs(profileStore);
</script>

<template>
  <VeeMultiSelectWithSearch
    name="professional_roles"
    sort_by="none"
    :options="professionalRolesListOption"
    :placeholder="'Выберите'"
  />
</template>

<style scoped></style>
