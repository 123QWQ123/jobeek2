<script setup>
import { useProfileStore } from "~/store/profile.js";
const profileStore = useProfileStore();

const { searchProfessionalRoles } = profileStore;
await searchProfessionalRoles();

const { professional_roles_without_parent } = storeToRefs(profileStore);
const professionalRoleOptions = computed(() =>
  professional_roles_without_parent.value.map((item) => ({
    name: item.name,
    value: item.id,
  })),
);
</script>

<template>
  <VeeMultiSelectWithSearch
    name="professional_roles"
    sort_by="none"
    :options="professionalRoleOptions"
    :placeholder="'Выберите'"
  />
</template>

<style scoped></style>
