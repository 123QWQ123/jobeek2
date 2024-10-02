<script setup>
const props = defineProps(["name"]);
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
const { value: prof_role_ids } = useField(() => props.name);

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
