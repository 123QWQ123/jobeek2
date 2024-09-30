<script setup>
import { useProfileStore } from "~/store/profile.js";
import useFilter from "~/composables/useFilter.js";
import useProviders from "~/composables/useProviders.js";

const profileStore = useProfileStore();
const { providers } = useProviders();
const isHHSelected = computed(() => providers.value.hh === true);
const isSuperjobSelected = computed(() => providers.value.superjob === true);

const professionalRoleOptions = ref([]);
const {
  searchProfessionalRoles,
  searchHHProfessionalRoles,
  searchSuperjobProfessionalRoles,
} = profileStore;

const { uniq } = useFilter();
const { value: prof_role_ids } = useField("professional_roles");

const updateProfessionalInput = async (newValue = "", providers = []) => {
  await searchProfessionalRoles();
  if (newValue) {
    professionalRoleOptions.value =
      profileStore.professional_roles_without_parent
        .filter((item) =>
          item.name.toLowerCase().includes(newValue.toLowerCase()),
        )
        .map((item) => ({
          name: item.name,
          value: item.id,
        }));
  } else {
    professionalRoleOptions.value =
      profileStore.professional_roles_without_parent.map((item) => ({
        name: item.name,
        value: item.id,
      }));
  }
};

const isHHProfRolesNeeded = computed(() => {
  if (!isHHSelected.value) return false;
  if (prof_role_ids.value.length < 1) return true;
  const selected_fields_values = [...prof_role_ids.value];
  return !selected_fields_values.some((item) =>
    profileStore.hh_professional_roles_with_parent_ids.includes(item),
  );
});
const isSuperjobProfRolesNeeded = computed(() => {
  if (!isSuperjobSelected.value) return false;
  if (prof_role_ids.value.length < 1) return true;
  const selected_fields_values = [...prof_role_ids.value];
  return !selected_fields_values.some((item) =>
    profileStore.superjob_professional_roles_with_parent_ids.includes(item),
  );
});
const updateHHProfessionalRoles = async (newValue = "") => {
  await searchHHProfessionalRoles();
};
const updateSuperjobProfessionalRoles = async (newValue = "") => {
  await searchSuperjobProfessionalRoles();
};

onMounted(() => {
  updateProfessionalInput("");
  updateHHProfessionalRoles();
  updateSuperjobProfessionalRoles();
});
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
