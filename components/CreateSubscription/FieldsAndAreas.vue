<template>
  <div class="input-row">
    <label for="locations">Города</label>
    <div class="input-wrapper">
      <VeeMultiSelectWithSearchWithSelectedOptions
        :options="cityOptions"
        @updateSelectedOptions="onUpdateSelectedOptions"
        name="cities"
        placeholder="Выберите город"
        @input="updateCityInput"
      />
    </div>
  </div>
</template>

<script setup>
import { useSetFormValues } from "vee-validate";
import { useProfileStore } from "~/store/profile.js";

const setFormValues = useSetFormValues();
const cityOptions = ref([]);
const { searchCities } = useProfileStore();

const onUpdateSelectedOptions = (value) => {
  setFormValues({ cities: value.map((item) => item.value) });
};
const updateCityInput = async (newValue = "") => {
  let items;
  if (newValue === "") {
    items =
      (await searchCities({
        // providers: [...selectedProviders.value],
      })) ?? [];
  } else {
    items =
      (await searchCities({
        search: newValue,
        // providers: [...selectedProviders.value],
      })) ?? [];
  }
  cityOptions.value = items.map((item) => ({
    value: item.id,
    name: item.name,
  }));
};

onBeforeMount(async () => {
  await updateCityInput();
});

// import { useVacancyStore } from "~/store/vacancy.js";
//
// const { getIndustries } = useVacancyStore();
// const { industries_formatted_for_filter } = storeToRefs(useVacancyStore());
// onBeforeMount(async () => {
//   await getIndustries();
// });
//
// console.log("FieldsAndAreas.vue", industries_formatted_for_filter);
const myValue2 = ref();
</script>

<style></style>
