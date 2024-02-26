<template>
  <div class="">
    <div class="notification mt-0">
      <div class="ic">
        <img src="~/assets/img/svg/crown2.svg" alt="#" />
      </div>
      <div class="notification-text">
        <strong class="title">Подключите премиум</strong>
        <p>
          У вас стоит лимит на создание подписок: 3 шт. Чтобы создавать
          неограниченное кол-во подписок, подключите премиум
        </p>
      </div>
      <a class="notification-button button-accent" href="#">Подключить </a>
    </div>
    <NuxtLink class="create-button" type="link" :to="{ name: 'create-resume' }"
      >Создать резюме
    </NuxtLink>
    <div class="col d-flex justify-content-between mt-4">
      <h1 ref="filterRef" class="lk-page-title mt-4">
        Ваши резюме({{ total }})
      </h1>
    </div>
    <div
      class="provider_buttons d-lg-flex justify-content-between align-items-center"
    >
      <div class="d-inline-flex">
        <form class="sort mx-2 ms-auto" action="#">
          <span>Поставщик:</span>
          <CustomSelect
            :options="providerOptions"
            v-model="form.provider"
            @change="onProviderChange"
            class="bg-white w-auto"
            :listStyles="listStyles"
          ></CustomSelect>
        </form>
      </div>

      <div class="d-inline-flex ms-0 ms-lg-auto">
        <div class="d-inline-flex flex-column flex-lg-row mt-4 mt-lg-0 ms-sm-4">
          <div class="check-block mb-2 mb-md-1 mb-lg-0 me-lg-3">
            <div class="checkbox">
              <input type="checkbox" id="enable-push" />
              <div class="checkbox-mask">
                <img src="~/assets/img/svg/check.svg" />
              </div>
            </div>
            <label for="enable-push">Подключить все уведомления</label>
          </div>
          <div class="check-block mb-2 mb-md-1 mb-lg-0 me-lg-3">
            <div class="checkbox">
              <input type="checkbox" id="enable-push" />
              <div class="checkbox-mask">
                <img src="~/assets/img/svg/check.svg" alt="#" />
              </div>
            </div>
            <label for="enable-push">Push </label>
          </div>
          <div class="check-block">
            <div class="checkbox">
              <input type="checkbox" id="enable-email-notification" />
              <div class="checkbox-mask">
                <img src="~/assets/img/svg/check.svg" alt="#" />
              </div>
            </div>
            <label for="enable-email-notification">E-mail</label>
          </div>
        </div>
      </div>

      <!--          <form class="sort">-->
      <!--            <span>Фильтр:</span>-->
      <!--            <CustomSelect :options="filterOptions" v-model="form.status" @change="onFilterChange" class="bg-white w-auto" :listStyles="listStyles"></CustomSelect>-->
      <!--          </form>-->
      <!--            <div class="d-inline-flex">-->
      <!--              <form class="sort mx-1" action="#">-->
      <!--                <span>Показать:</span>-->
      <!--                <CustomSelect v-model="form.per_page" :options="perPageOptions" @change="onChangePerPage" class="bg-white w-auto" :listStyles="listStyles"></CustomSelect>-->
      <!--              </form>-->
      <!--              <form class="sort mx-1" action="#">-->
      <!--                <span>Сортировать:</span>-->
      <!--                <CustomSelect v-model="form.order_by" :options="sortingOptions" @change="onChangeSorting" class="bg-white w-auto" :listStyles="listStyles"></CustomSelect>-->
      <!--              </form>-->
      <!--            </div>-->
    </div>

    <ul class="resume-list mt-4" v-if="my_resumes.length > 0">
      <MyResumesItem v-for="item in my_resumes" :key="item.id" :item="item" />
    </ul>
    <div class="d-flex mt-4 pb-4 justify-content-center" v-else>
      <p>Ничего не найдено!</p>
    </div>

    <div class="d-flex mt-4 justify-content-between" v-if="my_total > 0">
      <button
        class="btn btn-primary btn-group-sm"
        :class="{ disabled: isPrevDisabled }"
        @click="prevPage"
      >
        Prev
      </button>
      <p>{{ current_page }}</p>
      <button class="btn btn-primary btn-group-sm" @click="nextPage">
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import { storeToRefs } from "pinia";
import { useMyVacancyForm } from "~/composables/useMyVacancyForm";
import CustomSelect from "~/components/UI/CustomSelect.vue";
import { useMyVacancySortingOptions } from "~/composables/useMyVacancySortingOptions";
import { useMyVacancyPerPageOptions } from "~/composables/useMyVacancyPerPageOptions";
import { useMyVacanciesFilterOptions } from "../../composables/useMyVacanciesFilterOptions";
import { useMyResumeForm } from "~/composables/useMyResumeForm";
import { useResumeStore } from "~/store/resume";

useHead({
  title: "Jobeek - Мои вакансии",
});

const router = useRouter();
const resumeStore = useResumeStore();
const { getMyResumes } = resumeStore;
// const my_resumes = computed(() => resumeStore.my_resumes);

const sortingOptions = ref(useMyVacancySortingOptions());
const perPageOptions = ref(useMyVacancyPerPageOptions());
const filterOptions = ref(useMyVacanciesFilterOptions());
const providerOptions = ref([
  { value: "*", name: "Все" },
  { value: "hh", name: "HeadHunter" },
  { value: "superjob", name: "Superjob" },
]);

const filterItemsClass = {};
const { my_resumes, current_page, my_total } = storeToRefs(resumeStore);

const isPrevDisabled = computed(() => {
  if (parseInt(current_page.value) === 1) return true;
  return false;
});

const form = ref(useMyResumeForm());

const total = computed(() => {
  return resumeStore.my_resumes.length;
});
const providers = ref({
  hh: true,
  superjob: true,
});

const onProviderToggle = (provider) => {
  providers.value[provider] = !providers.value[provider];
};

const resumes = ref([]);
const isLoading = ref(false);

const route = useRoute();
// watch(() => route.query, async(newQuery) => {
//   const params = useMyResumeForm(form.value, 'backend');
//   await getMyResumes(params);
// })

const onFilterChange = (filter) => {
  // navigateTo({name: 'my-vacancies', query: {status: filter}});
};
onMounted(async () => {
  isLoading.value = true;
  await getMyResumes({});
  isLoading.value = false;
});

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

const filterRef = ref();

const prevPage = async (page) => {
  isLoading.value = true;
  const params = useMyResumeForm(form.value, "backend");
  let page_number = parseInt(current_page.value);
  if (page_number > 1) {
    form.value.page = form.value.page - 1;
  }
  await getMyResumes(params);
  current_page.value = form.value.page;
  isLoading.value = false;
  filterRef.value.scrollIntoView({ behavior: "smooth", block: "start" });
};

const nextPage = async (page) => {
  isLoading.value = true;
  isLoading.value = true;
  form.value.page = form.value.page + 1;
  current_page.value = form.value.page;
  const params = useMyResumeForm(form.value, "front");
  const response = await getMyResumes(params);
  if (response?.data?.items.length === 0) {
    Swal.fire({
      title: "Больше нет резюме",
      text: response.message,
      icon: "success",
      confirmButtonText: "ОК",
    });
  }
  isLoading.value = false;
  filterRef.value.scrollIntoView({ behavior: "smooth", block: "start" });
};

// const onChangePerPage = async(per_page) => {
//     isLoading.value = true;
//     form.value.per_page = per_page;
//     const params = useMyResumeForm(form.value, 'front');
//     await getMyResumes(params);
//     isLoading.value = false;
//     form.value.page = 1;
//     current_page.value = form.value.page;
// }
//
// const onChangeSorting = async(sorting) => {
//     isLoading.value = true;
//     form.value.order_by = sorting;
//     const params = useMyResumeForm(form.value, 'front');
//     await getMyResumes(params);
//     isLoading.value = false;
//
// }

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
  const params = useMyVacancyForm(form.value, "front");
  await getMyResumes(params);
  isLoading.value = false;
};

const listStyles = {
  left: 0,
  right: "unset",
  width: "auto !important",
};
</script>

<style scoped>
.provider_buttons {
  background-color: #fff;
  border-radius: 1rem;
  padding: 1rem 1.5rem 1rem 1.5rem;
}

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
