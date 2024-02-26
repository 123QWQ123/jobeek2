<script setup>
import { useProfileStore } from "~/store/profile.js";
import useFilter from "~/composables/useFilter.js";
import useProviders from "~/composables/useProviders.js";
import { useDictionaryStore } from "~/store/dictionary.js";

const profileStore = useProfileStore();
const dictionaryStore = useDictionaryStore();

const { providers } = useProviders();

const selectedProviders = computed(() => {
  if (providers.value.hh === true && providers.value.superjob === false)
    return ["hh"];
  if (providers.value.hh === false && providers.value.superjob === true)
    return ["superjob"];
  return ["hh", "superjob"];
});

const workTypeOptions = ref([]);
const { getWorkTypes, getHHWorkTypes, getSuperjobWorkTypes } = dictionaryStore;
const { uniq } = useFilter();

const isHHSelected = computed(() => selectedProviders.value.includes("hh"));
const isSuperjobSelected = computed(() =>
  selectedProviders.value.includes("superjob"),
);

const isHHWorkTypesNeeded = computed(() => {
  if (!isHHSelected.value) return false;
  if (work_type_ids.value.length < 1) return true;
  const selected_fields_values = [...work_type_ids.value];
  return !selected_fields_values.some((item) =>
    hhWorkTypes.value.includes(item),
  );
});
const isSuperjobWorkTypesNeeded = computed(() => {
  if (!isSuperjobSelected.value) return false;
  if (work_type_ids.value.length < 1) return true;
  const selected_fields_values = [...work_type_ids.value];
  return !selected_fields_values.some((item) =>
    superjobWorkTypes.value.includes(item),
  );
});

// const { value: prof_role_ids } = useField("professional_roles");
// watch(
//   () => prof_role_ids.value,
//   async () => {
//     let items = [];
//     if (isHHProfRolesNeeded.value) {
//       const new_h = profileStore.hh_professional_roles_with_parent;
//       items = items.concat(new_h);
//     }
//     if (isSuperjobProfRolesNeeded.value) {
//       const new_s = profileStore.superjob_professional_roles_with_parent;
//       items = items.concat(new_s);
//     }
//     if (isHHProfRolesNeeded.value || isSuperjobProfRolesNeeded.value) {
//       items = items.concat(profileStore.professional_roles_with_parent);
//       items = uniq(items, "value");
//       professionalRoleOptions.value = items;
//     } else {
//       professionalRoleOptions.value =
//         profileStore.professional_roles_with_parent;
//     }
//   },
// );

const { value: work_type_ids } = useField("work_types");
watch(
  () => work_type_ids.value,
  async () => {
    let items = [];
    if (isHHWorkTypesNeeded.value) {
      const new_h = dictionaryStore.hh_work_types.map((item) => ({
        value: item.id,
        name: item.name,
      }));
      items = items.concat(new_h);
    }
    if (isSuperjobWorkTypesNeeded.value) {
      const new_s = dictionaryStore.superjob_work_types.map((item) => ({
        value: item.id,
        name: item.name,
      }));
      items = items.concat(new_s);
    }
    if (isHHWorkTypesNeeded.value || isSuperjobWorkTypesNeeded.value) {
      const all_items = dictionaryStore.work_types;
      items = items.concat(all_items);
      items = uniq(items, "value");
      workTypeOptions.value = items;
    } else {
      const all_items = dictionaryStore.work_types;
      workTypeOptions.value = all_items;
    }
  },
);

const hhWorkTypes = ref([]);
const superjobWorkTypes = ref([]);

watch(
  () => dictionaryStore.hh_work_types,
  () => {
    hhWorkTypes.value = dictionaryStore.hh_work_types.map((item) => item.id);
  },
);
watch(
  () => dictionaryStore.superjob_work_types,
  () => {
    superjobWorkTypes.value = dictionaryStore.superjob_work_types.map(
      (item) => item.id,
    );
  },
);
const updateHHWorkTypes = async (newValue = "") => {
  let items;
  items = await getHHWorkTypes();
  items = items.filter((item) => item.parent_id !== 0);
  hhWorkTypes.value = items.map((item) => item.id);
};
const updateSuperjobWorkTypes = async (newValue = "") => {
  let items;
  items = await getSuperjobWorkTypes();
  superjobWorkTypes.value = items.map((item) => item.id);
};

onMounted(() => {
  getWorkTypes();
  updateHHWorkTypes();
  updateSuperjobWorkTypes();
});
</script>

<template>
  <VeeMultiSelectWithSearch
    name="work_types"
    sort_by="none"
    :options="workTypeOptions"
    :placeholder="'Выберите'"
  />
</template>

<style scoped></style>
