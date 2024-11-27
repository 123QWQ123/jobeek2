<template>
  <NuxtLink
    class="tile-card"
    :to="{
      name: 'search-vacancies',
      query: {
        countries: `[${1}]`,
        regions: `[${22}]`,
        professional_roles: `[${getProfessionalRoles(vacancy.professional_roles)}]`,
      },
    }"
  >
    <h4 class="tile-card-title">{{ vacancy.name }}</h4>
    <span class="tile-card-dop-info" v-if="vacancy.salary_to">
      До {{ vueNumberFormat(vacancy.salary_to, {}) }} ₽ / месяц
    </span>
    <span v-else class="tile-card-dop-info">
      От {{ vueNumberFormat(vacancy.salary_from, {}) }} ₽ / месяц
    </span>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  vacancy: {
    type: Object,
    required: true,
  },
});

const getProfessionalRoles = (objectData) => {
  if (objectData) return Object.keys(objectData);
  return [];
};
</script>

<style scoped>
.tile-card {
  /* Добавьте свои стили */
}

.tile-card-title {
  /* Добавьте свои стили */
}

.tile-card-dop-info {
  /* Добавьте свои стили */
}
</style>
