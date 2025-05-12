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

const cities = ref([]);
const vacancyStore = useVacancyStore();
const { searchCities } = profileStore;
const cityOptions = ref(
  vacancyStore.my_vacancy?.cities.map((item) => ({
    name: item.name,
    value: item.id,
  })),
);

const selectedCityOptions = ref(props.selected_options ?? []);

const ID = computed(() => route.params.id);
const type = computed(() => route.query.type);

watch(
  () => props.selected_options,
  () => {
    selectedCityOptions.value = props.selected_options;
  },
);
const { getCityName } = useResumeHooks();
const updateCityInput = async (newValue = "") => {
  let items;
  if (newValue === "") {
    items =
      (await searchCities({
        providers: [...selectedProviders.value],
      })) ?? [];
  } else {
    items =
      (await searchCities({
        search: newValue,
        providers: [...selectedProviders.value],
      })) ?? [];
  }
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
    let items = vacancyStore.my_vacancy?.cities.map((item) => ({
      name: item.name,
      value: item.id,
    }));
    items = items.concat(
      [...cityOptions.value].filter((item) =>
        city_ids.value.includes(item.value),
      ),
    );
    items = uniq(items, "value");

    await onUpdateSelectedOptions(items);
  },
);

const onUpdateSelectedOptions = async (newItems) => {
  selectedCityOptions.value = newItems;
};
</script>

<template>
  <div>
    <VeeMultiSelectWithSearch
      :options="cityOptions"
      :name="props.name"
      placeholder="Выберите город"
      @input="updateCityInput"
    />
  </div>
</template>

<style scoped></style>
