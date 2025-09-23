<script setup>
import { useProfileStore } from "~/store/profile.js";

const profileStore = useProfileStore();
await useAsyncData("getProfessionalRolesList ", async () => {
  return await profileStore.getProfessionalRolesList();
});

const { professional_roles_list } = storeToRefs(profileStore);
</script>

<template>
  <VeeMultiSelectWithSearch
    name="professional_roles"
    sort_by="none"
    :options="
      professional_roles_list.map((item) => {
        return { name: item.name, value: item.id };
      })
    "
    :placeholder="'Выберите'"
  />
</template>

<style scoped></style>
