<script setup>
import { useProfileStore } from "~/store/profile.js";
import useFilter from "~/composables/useFilter.js";
import useProviders from "~/composables/useProviders.js";

const profileStore = useProfileStore();
const { providers } = useProviders();

const selectedProviders = computed(() => {
  if (providers.value.hh === true && providers.value.superjob === false)
    return ["hh"];
  if (providers.value.hh === false && providers.value.superjob === true)
    return ["superjob"];
  return ["hh", "superjob"];
});

const isHHSelected = computed(() => selectedProviders.value.includes("hh"));
const isSuperjobSelected = computed(() =>
  selectedProviders.value.includes("superjob"),
);

const professionalRoleOptions = ref([]);
const {
  searchProfessionalRoles,
  searchHHProfessionalRoles,
  searchSuperjobProfessionalRoles,
} = profileStore;

const { uniq } = useFilter();
const { value: prof_role_ids } = useField("professional_roles");
watch(
  () => prof_role_ids.value,
  async () => {
    let items = [];
    if (isHHProfRolesNeeded.value) {
      const new_h = profileStore.hh_professional_roles_with_parent;
      items = items.concat(new_h);
    }
    if (isSuperjobProfRolesNeeded.value) {
      const new_s = profileStore.superjob_professional_roles_with_parent;
      items = items.concat(new_s);
    }
    if (isHHProfRolesNeeded.value || isSuperjobProfRolesNeeded.value) {
      items = items.concat(profileStore.professional_roles_with_parent);
      items = uniq(items, "value");
      professionalRoleOptions.value = items;
    } else {
      professionalRoleOptions.value =
        profileStore.professional_roles_with_parent;
    }
  },
);

const updateProfessionalInput = async (newValue = "", providers = []) => {
  let items = await searchProfessionalRoles();
  if (newValue) {
    items = items
      .filter((item) => item.parent_id !== 0)
      .filter((item) => item.name.includes(newValue));
  } else {
    items = items.filter((item) => item.parent_id !== 0);
  }
  professionalRoleOptions.value = items.map((item) => ({
    value: item.id,
    name: item.name,
  }));
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
    @input="updateProfessionalInput"
    :placeholder="'Выберите'"
  />
</template>

<style scoped></style>
