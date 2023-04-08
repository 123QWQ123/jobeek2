<script setup>
import { navigateTo } from "nuxt/app";
import { useAuthStore } from "../store/auth";
import { useVacancyStore } from "../store/vacancy";
import { storeToRefs } from "pinia";
import PageLoader from "../components/UI/PageLoader";
import CustomModal from "../components/UI/CustomModal";

definePageMeta({
  layout: "cabinet",
});
useHead({
  title: "Мои вакансии",
})

const authStore = useAuthStore();
const vacancyStore = useVacancyStore();

const isEmployer = computed(() => authStore.isEmployer);
const user = computed(() => authStore.user);
const employer = computed(() => authStore.employer);

const isLoading = ref(false);
watch(isEmployer, (new_value) => {
  console.log(new_value);
  if (new_value) {
    navigateTo({ name: 'your-vacancies' });
  }
})

const route = useRoute();
const { getMyVacancies } = vacancyStore;
const { my_vacancies } = storeToRefs(vacancyStore);
onMounted(async () => {
  console.log(isEmployer.value);
  if (isEmployer.value) {
    navigateTo({ name: 'your-vacancies' });
  }
  console.log(user, employer);
  if (employer && employer.is_completed) {

  }
  isLoading.value = true;
  if (my_vacancies.value.length === 0) {
    await getMyVacancies();
  }
  isLoading.value = false;
});

const isSuccess = ref(true);
const isAuthorized = ref(true);
const isProviderModalShown = ref(true);


const closeProviderModal = () => {
  console.log(11);
  isProviderModalShown.value = false;
}
</script>
<template>
  <main class="main cabinet subs-page" role="main">
    <PersonalCabinetSearchMobile />
    <div class="bg-wrapper pt position-relative">
      <PageLoader v-if="isLoading" />
      <YourVacanciesList></YourVacanciesList>

      <button type="button" class="btn btn-primary" @click="isProviderModalShown = !isProviderModalShown">
        Connect providers
      </button>
    </div>

    <div class="bg-wrapper bt">
      <HomeWorkSection></HomeWorkSection>
    </div>
    <HomeSearchSection></HomeSearchSection>

    <CustomModal v-if="isProviderModalShown" title="Пожалуйста, авторизуйтесь у поставщика!" @close="closeProviderModal">
      <div class="modal-content p-2 m-0 border-0">
        <div class="list-of-providers">
          <a href="/redirect" class="provider-item">
            <span class="provider-label" :class="{ success: isSuccess }">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#f14646" class="bi bi-x"
                viewBox="0 0 16 16">
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </span>
            <img src="https://tech.hh.ru/api/logos/min-hh-red.png" />
          </a>
          <a href="/redirect" class="provider-item">
            <span class="provider-label" :class="{ success: isSuccess }">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="limegreen" class="bi bi-check"
                viewBox="0 0 16 16">
                <path
                  d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
              </svg>
            </span>
            <img src="~/assets/img/logos/superjob.svg" />
          </a>
        </div>
      </div>
    </CustomModal>
  </main>
</template>


<style>
.list-of-providers {
  display: inline-flex;
  max-height: 20rem;
  padding: 1.5rem;
}

.list-of-providers .provider-item {
  max-height: 10rem;
  max-width: 10rem;
  display: inline-flex;
  justify-content: center;
}

.list-of-providers .provider-item {
  width: 100%;
  position: relative;
}

.list-of-providers .provider-item .provider-label {
  position: absolute;
  top: 0;
  left: 24px;
  transform: scale(1.5);
  background-color: rgba(229, 229, 229, 0.99);
  border-radius: 50%;
}</style>