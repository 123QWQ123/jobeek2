<template>
  <PageLoader v-if="isLoading" />
  <div class="">
    <!--<div class="notification mt-0">
      <div class="ic">
        <img src="~/assets/img/svg/crown2.svg" alt="#" />
      </div>
      <div class="notification-text">
        <strong class="title">Подключите премиум</strong>
        <p>
          У вас есть лимит на создание вакансий:
          {{ can_create_vacancy_count }} шт. Чтобы создавать неограниченное
          количество вакансий, подключите премиум-подписку
        </p>
      </div>
    </div>-->
    <NuxtLink
      v-if="can_create_vacancy_count"
      class="create-button"
      type="link"
      :to="{ name: 'create-vacancy' }"
      >Создать вакансию
    </NuxtLink>
    <div v-else></div>
    <div class="col d-flex justify-content-between mt-4">
      <h1 class="lk-page-title">Ваши вакансии</h1>
    </div>
    <div
      class="col d-flex justify-content-between align-items-center py-4 pt-0"
    >
      <ul class="nav nav-tabs vacancy_tabs w-100">
        <li
          class="nav-item"
          :class="{ active: form.status === 'draft' }"
          @click="onFilterChange('draft')"
        >
          <a
            class="nav-link"
            :to="{ name: 'my-vacancies', query: { status: 'draft' } }"
            :class="{ active: form.status === 'draft' }"
            >Черновик ({{ totalDrafts }})</a
          >
        </li>
        <li
          class="nav-item"
          :class="{ active: form.status === 'active' }"
          @click="onFilterChange('active')"
        >
          <a
            class="nav-link"
            :to="{ name: 'my-vacancies', query: { status: 'active' } }"
            :class="{ active: form.status === 'active' }"
            >Активные ({{ totalActiveVacancies }})</a
          >
        </li>
        <li
          class="nav-item"
          :class="{ active: form.status === 'archived' }"
          @click="onFilterChange('archived')"
        >
          <a
            class="nav-link"
            :to="{ name: 'my-vacancies', query: { status: 'archived' } }"
            :class="{ active: form.status === 'archived' }"
            >В архиве ({{ totalArchivedVacancies }})</a
          >
        </li>
      </ul>
      <div class="d-inline-flex">
        <!--              <form class="sort mx-2 ms-auto" action="#">-->
        <!--                <span>Поставщик:</span>-->
        <!--                <CustomSelect :options="providerOptions" v-model="form.provider" @change="onProviderChange" class="bg-white w-auto" :listStyles="listStyles"></CustomSelect>-->
        <!--              </form>-->
      </div>

      <!--      <form class="sort">-->
      <!--        <span>Фильтр:</span>-->
      <!--        <CustomSelect-->
      <!--          :options="filterOptions"-->
      <!--          v-model="form.status"-->
      <!--          @change="onFilterChange"-->
      <!--          class="bg-white w-auto"-->
      <!--          :listStyles="listStyles"-->
      <!--        ></CustomSelect>-->
      <!--      </form>-->
    </div>

    <MyVacanciesDraftList
      v-if="form.status === 'draft'"
      :items="vacancyStore.my_drafts"
    />
    <MyVacanciesActiveList
      v-else-if="form.status === 'active'"
      :items="vacancyStore.my_vacancies"
    />
    <MyVacanciesArchivedList
      v-else
      :items="vacancyStore.my_archived_vacancies"
    />
  </div>
</template>

<script setup>
import { useVacancyStore } from "~/store/vacancy";
import { storeToRefs } from "pinia";
import PageLoader from "~/components/UI/PageLoader.vue";
import { useMyVacancyForm } from "~/composables/useMyVacancyForm";
import { useMyVacanciesFilterOptions } from "~/composables/useMyVacanciesFilterOptions";

const vacancyStore = useVacancyStore();
const {
  getMyVacancies,
  getMyDrafts,
  getArchivedVacancies,
  getCreateAvailability,
} = vacancyStore;

const filterOptions = ref(useMyVacanciesFilterOptions());

// Загрузка данных при монтировании
await useAsyncData("initialDataLoad", async () => {
  return await Promise.all([
    getMyDrafts({ status: "draft" }),
    getMyVacancies({ status: "active" }),
    getArchivedVacancies({ status: "archived" }),
    getCreateAvailability(),
  ]);
});

const { can_create_vacancy_count, current_page } = storeToRefs(vacancyStore);

const form = ref(useMyVacancyForm());

const total = computed(() => {
  if (form.value.status === "draft") {
    return vacancyStore.my_drafts.length;
  }
  if (form.value.status === "active" || form.value.status === "archived") {
    return vacancyStore.my_vacancies.length;
  }
});
const totalDrafts = computed(() => vacancyStore.my_drafts.length);
const totalActiveVacancies = computed(() => vacancyStore.my_vacancies.length);
const totalArchivedVacancies = computed(
  () => vacancyStore.my_archived_vacancies.length,
);
const providers = ref({
  hh: true,
  superjob: true,
});

const vacancies = ref([]);
const my_drafts = ref([]);
const isLoading = ref(false);

const route = useRoute();
watch(
  () => route.query,
  async (newQuery) => {
    let newStatus = "draft";
    if (
      filterOptions.value.map((item) => item.value).includes(route.query.status)
    ) {
      newStatus = route.query.status;
    }
    form.value.status = newStatus;
    isLoading.value = true;
    const params = { status: newStatus };
    if (newStatus === "draft") {
      await getMyDrafts(params);
    } else if (newStatus === "active") {
      await getMyVacancies(params);
    } else {
      await getArchivedVacancies(route.query);
    }
    isLoading.value = false;
  },
);

const onFilterChange = (filter) => {
  navigateTo({ name: "my-vacancies", query: { status: filter } });
};

watch(
  () => vacancyStore.my_vacancies,
  (newMyVacancies) => {
    vacancies.value = newMyVacancies;
  },
);

watch(
  () => vacancyStore.my_drafts,
  (newMyDrafts) => {
    my_drafts.value = newMyDrafts;
  },
);

const hhFilters = ["active", "archived", "deleted"];
const superjobFilters = [
  "active",
  "private",
  "published",
  "archived",
  "declined",
  "in_moderation",
];

function getCommon(arr1, arr2) {
  let common = []; // Array to contain common elements
  for (let i = 0; i < arr1.length; ++i) {
    for (let j = 0; j < arr2.length; ++j) {
      if (arr1[i] == arr2[j]) {
        // If element is in both the arrays
        common.push(arr1[i]); // Push to common array
      }
    }
  }

  return common; // Return the common elements
}

watch(providers.value, (newProviders) => {
  let prevItems = useMyVacanciesFilterOptions();

  const commonStates = getCommon(hhFilters, superjobFilters);

  if (newProviders.superjob === false && newProviders.hh === false) {
    prevItems = [];
  }
  if (newProviders.superjob === false && newProviders.hh === true) {
    prevItems = prevItems.filter(
      (item) =>
        hhFilters.includes(item.value) || commonStates.includes(item.value),
    );
  }
  if (newProviders.superjob === true && newProviders.hh === false) {
    prevItems = prevItems.filter(
      (item) =>
        superjobFilters.includes(item.value) ||
        commonStates.includes(item.value),
    );
  }
  filterOptions.value = prevItems;
});
watch(filterOptions, (newFilterOptions) => {
  if (newFilterOptions.length > 0) {
    const findItem = newFilterOptions.some(
      (item) => item.value === form.value.status,
    );
    if (!findItem) {
      onFilterChange(newFilterOptions[0].value);
    }
  }
});
</script>

<style scoped>
.theme-checker input ~ .theme-checker-ui .circle.left {
  transform: translate(3px, -50%);
}

.theme-checker input ~ .theme-checker-ui .circle.right {
  transform: translate(30px, -50%);
}
</style>
