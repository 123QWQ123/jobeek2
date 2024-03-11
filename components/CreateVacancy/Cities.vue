<script setup>
import { useVacancyStore } from "~/store/vacancy.js";
import { useProfileStore } from "~/store/profile.js";
import useFilter from "~/composables/useFilter.js";
import useProviders from "~/composables/useProviders.js";
import useResumeHooks from "~/hooks/useResumeHooks.js";

const props = defineProps({
  name: {
    required: true,
    default: "cities",
  },
  selected_options: {
    required: false,
    default: [],
  },
});

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
const selectedCityOptions = ref(props.selected_options ?? []);

const ID = computed(() => route.params.id);
const type = computed(() => route.query.type);
const vacancyStore = useVacancyStore();

watch(
  () => vacancyStore.my_vacancy,
  () => {
    console.log(vacancyStore.my_vacancy);
    const items = [];
  },
);
watch(
  () => props.selected_options,
  () => {
    selectedCityOptions.value = props.selected_options;
  },
);
onMounted(() => {
  console.log(1);
  console.log(vacancyStore.my_vacancy);
});

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
    let items = vacancyStore.my_vacancy.cities.map((item) => ({
      name: item.name,
      value: item.id,
    }));
    items = items.concat(
      [...cityOptions.value].filter((item) =>
        city_ids.value.includes(item.value),
      ),
    );
    items = uniq(items, "value");

    onUpdateSelectedOptions(items);
  },
);

const onUpdateSelectedOptions = async (newItems) => {
  console.log(newItems);
  selectedCityOptions.value = newItems;
};

onMounted(() => {
  // updateProfessionalInput("");
  // updateHHProfessionalRoles();
  // updateSuperjobProfessionalRoles();
});
</script>

<template>
  <div>
    {{ selectedCityOptions }}
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
