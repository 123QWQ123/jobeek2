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

const vacancyStore = useVacancyStore();
const { searchCities } = profileStore;
const cityOptions = ref(
  vacancyStore.my_vacancy?.cities.map((item) => ({
    name: item.name,
    value: item.id,
  })),
);

const updateCityInput = async (newValue = "") => {
  if (newValue.length < 2) {
    return;
  }
  const items = (await searchCities({ search: newValue })) ?? [];
  cityOptions.value = items.map((item) => ({
    value: item.id,
    name: item.name,
  }));
};
</script>

<template>
  <div>
    <VeeMultiSelectWithSearch
      :options="cityOptions"
      :name="props.name"
      placeholder="Выберите город"
      not_found="Введите название города"
      @input="updateCityInput"
    />
  </div>
</template>

<style scoped></style>
