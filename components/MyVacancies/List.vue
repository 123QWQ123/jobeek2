<template>
  <PageLoader v-if="isLoading" />
  <div class="">
    <NuxtLink class="create-button" type="link" :to="{ name: 'create-vacancy' }"
      >Создать вакансию
    </NuxtLink>
    <div class="col d-flex justify-content-between mt-4">
      <h1 ref="filterRef" class="lk-page-title mt-4">Ваши вакансии</h1>
    </div>
    <div class="col d-flex justify-content-between align-items-center py-4">
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
            >Черновек({{ totalDrafts }})</a
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
            >Активные({{ totalActiveVacancies }})</a
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
            >В архиве({{ totalArchivedVacancies }})</a
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
import Swal from "sweetalert2";
import { useVacancyStore } from "~/store/vacancy";
import { storeToRefs } from "pinia";
import PageLoader from "~/components/UI/PageLoader.vue";
import { useMyVacancyForm } from "~/composables/useMyVacancyForm";
import { useMyVacancySortingOptions } from "~/composables/useMyVacancySortingOptions";
import { useMyVacancyPerPageOptions } from "~/composables/useMyVacancyPerPageOptions";
import { useMyVacanciesFilterOptions } from "~/composables/useMyVacanciesFilterOptions";

useHead({
  title: "Jobeek - Мои вакансии",
});

const router = useRouter();
const vacancyStore = useVacancyStore();
const { getMyVacancies, getMyDrafts, getArchivedVacancies } = vacancyStore;

const sortingOptions = ref(useMyVacancySortingOptions());
const perPageOptions = ref(useMyVacancyPerPageOptions());
const filterOptions = ref(useMyVacanciesFilterOptions());
const providerOptions = ref([
  { value: "*", name: "Все" },
  { value: "hh", name: "HeadHunter" },
  { value: "superjob", name: "Superjob" },
]);

const { my_vacancies, current_page, my_total } = storeToRefs(vacancyStore);

const isPrevDisabled = computed(() => {
  if (parseInt(current_page.value) === 1) return true;
  return false;
});
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

const onProviderToggle = (provider) => {
  providers.value[provider] = !providers.value[provider];
};

const vacancies = ref([]);
const my_drafts = ref([]);
const isLoading = ref(true);

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
    const params = { status: newStatus };
    console.log(params);
    if (newStatus === "draft") {
      await getMyDrafts(params);
    } else if (newStatus === "active") {
      await getMyVacancies(params);
    } else {
      await getArchivedVacancies(params);
    }
  },
);

const onFilterChange = (filter) => {
  navigateTo({ name: "my-vacancies", query: { status: filter } });
};
onMounted(async () => {
  // let newStatus = "draft";
  // if (
  //   filterOptions.value.map((item) => item.value).includes(route.query.status)
  // ) {
  //   newStatus = route.query.status;
  // }
  // form.value.status = newStatus;
  // const params = { status: newStatus };
  // if (newStatus === "draft") {
  //   await getMyDrafts(params);
  // } else if (newStatus === "active") {
  //   await getMyVacancies(params);
  // } else {
  //   await getArchivedVacancies(params);
  // }
  // navigateTo({
  //   query: { status: form.value.status },
  // });
  // isLoading.value = false;
  // // const params = useMyVacancyForm(form.value, 'backend');
  setTimeout(() => {
    getMyDrafts({ status: "draft" });
    getMyVacancies({ status: "active" });
    getArchivedVacancies({ status: "archived" });
  }, 0);
  isLoading.value = false;
});

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

const filterRef = ref();

const onInput = async (page) => {
  isLoading.value = true;
  const params = useMyVacancyForm(form.value, "backend");
  await getMyVacancies({ ...params });
  isLoading.value = false;
};

const prevPage = async (page) => {
  isLoading.value = true;
  const params = useMyVacancyForm(form.value, "backend");
  let page_number = parseInt(current_page.value);
  if (page_number > 1) {
    form.value.page = form.value.page - 1;
  }
  await getMyVacancies(params);
  current_page.value = form.value.page;
  isLoading.value = false;
  filterRef.value.scrollIntoView({ behavior: "smooth", block: "start" });
};

const nextPage = async (page) => {
  isLoading.value = true;
  isLoading.value = true;
  form.value.page = form.value.page + 1;
  current_page.value = form.value.page;
  const params = useMyVacancyForm(form.value, "front");
  const response = await getMyVacancies(params);
  if (response?.data?.items.length === 0) {
    Swal.fire({
      title: "Больше нет вакансий",
      text: response.message,
      icon: "success",
      confirmButtonText: "ОК",
    });
  }
  isLoading.value = false;
  filterRef.value.scrollIntoView({ behavior: "smooth", block: "start" });
};

const onChangePerPage = async (per_page) => {
  isLoading.value = true;
  form.value.per_page = per_page;
  const params = useMyVacancyForm(form.value, "front");
  await getMyVacancies(params);
  isLoading.value = false;
  form.value.page = 1;
  current_page.value = form.value.page;
};

const onChangeSorting = async (sorting) => {
  isLoading.value = true;
  form.value.order_by = sorting;
  const params = useMyVacancyForm(form.value, "front");
  await getMyVacancies(params);
  isLoading.value = false;
};

// const router = useRouter();

const onProviderChange = async (provider) => {
  form.value.provider = provider;
  if (provider === "*") {
    providers.value.hh = true;
    providers.value.superjob = true;
  }
  if (provider === "hh") {
    providers.value.hh = true;
    providers.value.superjob = false;
  }
  if (provider === "superjob") {
    providers.value.hh = false;
    providers.value.superjob = true;
  }
  // const params = useMyVacancyForm(form.value, 'front');
  // await getMyVacancies(params);
  // isLoading.value = false;
};
</script>

<style scoped>
.vacancy_tabs .nav-link {
  padding: 0.8rem 2rem 0.5rem 2rem;
}

.theme-checker input ~ .theme-checker-ui .circle.left {
  transform: translate(3px, -50%);
}

.theme-checker input ~ .theme-checker-ui .circle.right {
  transform: translate(30px, -50%);
}
</style>
