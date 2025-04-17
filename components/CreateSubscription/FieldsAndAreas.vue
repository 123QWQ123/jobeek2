<template>
  <div class="input-row">
    <label for="locations">Города</label>
    <div class="input-wrapper">
      <VeeMultiSelectWithSearch
        :options="cityOptions"
        name="cities"
        placeholder="Выберите город"
      />
    </div>
  </div>
</template>

<script setup>
import { useProfileStore } from "~/store/profile.js";

const profileStore = useProfileStore();
const cityOptions = ref(profileStore.cityOptions);
</script>

<style></style>
