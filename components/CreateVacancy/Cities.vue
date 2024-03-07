<script setup>
const props = defineProps({
  name: {
    required: true,
    default: "cities",
  },
});
import { useProfileStore } from "~/store/profile.js";
import useFilter from "~/composables/useFilter.js";
import useProviders from "~/composables/useProviders.js";
import useResumeHooks from "~/hooks/useResumeHooks.js";

const profileStore = useProfileStore();
const { providers, getProviderAsArray } = useProviders();

const selectedProviders = computed(() => getProviderAsArray());

const isHHSelected = computed(() => selectedProviders.value.includes("hh"));
const isSuperjobSelected = computed(() =>
  selectedProviders.value.includes("superjob"),
);

const cities = ref([]);

const { searchCities, searchProfessionalRoles } = profileStore;
const { getCountryCities } = profileStore;
const cityOptions = ref([]);
const selectedCityOptions = ref([]);

const { getCityName } = useResumeHooks();
const updateCityInput = async (newValue = "") => {
  const items =
    (await searchCities({
      search: newValue,
      providers: [...selectedProviders.value],
    })) ?? [];
  cityOptions.value = items.map((item) => ({
    value: item.id,
    name: item.name,
  }));
};

const { uniq } = useFilter();
const { value: city_ids } = useField(() => props.name);
watch(
  () => city_ids.value,
  async () => {
    console.log(city_ids.value);
    // let items = [];
    // if (isHHProfRolesNeeded.value) {
    //   const new_h = profileStore.hh_professional_roles_with_parent;
    //   items = items.concat(new_h);
    // }
    // if (isSuperjobProfRolesNeeded.value) {
    //   const new_s = profileStore.superjob_professional_roles_with_parent;
    //   items = items.concat(new_s);
    // }
    // if (isHHProfRolesNeeded.value || isSuperjobProfRolesNeeded.value) {
    //   items = items.concat(profileStore.professional_roles_with_parent);
    //   items = uniq(items, "value");
    //   professionalRoleOptions.value = items;
    // } else {
    //   professionalRoleOptions.value =
    //     profileStore.professional_roles_with_parent;
    // }
  },
);

const onUpdateSelectedOptions = async (newItems) => {
  console.log(newItems);
  selectedCityOptions.value = newItems;
};
// const updateProfessionalInput = async (newValue = "", providers = []) => {
//   let items = await searchProfessionalRoles();
//   if (newValue) {
//     items = items
//       .filter((item) => item.parent_id !== 0)
//       .filter((item) => item.name.includes(newValue));
//   } else {
//     items = items.filter((item) => item.parent_id !== 0);
//   }
//   professionalRoleOptions.value = items.map((item) => ({
//     value: item.id,
//     name: item.name,
//   }));
// };

const isHHNeeded = computed(() => {
  if (!isHHSelected.value) return false;
  if (city_ids.value.length < 1) return true;
  const selected_fields_values = [...city_ids.value];
  return !selected_fields_values.some((item) =>
    profileStore.hh_professional_roles_with_parent_ids.includes(item),
  );
});
const isSuperjobNeeded = computed(() => {
  if (!isSuperjobSelected.value) return false;
  if (city_ids.value.length < 1) return true;
  const selected_fields_values = [...city_ids.value];
  return !selected_fields_values.some((item) =>
    profileStore.superjob_professional_roles_with_parent_ids.includes(item),
  );
});

onMounted(() => {
  // updateProfessionalInput("");
  // updateHHProfessionalRoles();
  // updateSuperjobProfessionalRoles();
});
</script>

<template>
  <div>
    {{ selectedProviders }}
    <VeeMultiSelectWithSearchWithSelectedOptions
      :options="cityOptions"
      :selected_options="selectedCityOptions"
      @updateSelectedOptions="onUpdateSelectedOptions"
      :name="props.name"
      placeholder="Выберите город"
      @input="updateCityInput"
    />
  </div>
</template>

<style scoped></style>
