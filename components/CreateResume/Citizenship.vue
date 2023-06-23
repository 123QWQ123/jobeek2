<template>

  <div class="w-box">
    <div class="w-box-head">
      <h3 class="title">Гражданство</h3>
    </div>
    <div class="w-box-body">
        <div class="form_content" v-if="isShown">
          <SelectWithSearch :options="profileStore.countryOptions" v-model="selectedCountry" :placeholder="'Выберите страну'"/>
        </div>
        <div class="empty-area" v-else>
            <span>Здесь вы можете указать страну</span>
          <button class="add" type="button" @click="add">Добавить  </button>
        </div>
    </div>
  </div>
</template>

<script setup>

import {useVacancyStore} from "~/store/vacancy";
import {useProfileStore} from "~/store/profile";

const profileStore = useProfileStore();
const vacancyStore = useVacancyStore();
const {getCountries} = profileStore;
await getCountries();
const countryOptions = computed(() => profileStore.countries);

const emit = defineEmits(['set']);
const isShown = ref(false);
const selectedCountry = ref(null);
// const hasChanged = ref(false);

const add  = () => {
    isShown.value = !isShown.value;
    // hasChanged.value = true;
}

const updateState = (name, value) => {
    console.log(name, value);
    emit('set', name, value);
};
</script>

<style scoped>

</style>