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

const isLoading = ref(true);
const providers = ref([
  {
    name: 'HeadHunter',
    slug: 'hh',
    url: null,
    is_connected: false,
    icon: "https://tech.hh.ru/api/logos/min-hh-red.png",
  },
  {
    name: 'Superjob',
    slug: 'superjob',
    url: null,
    is_connected: false,
    icon: new URL("~/assets/img/logos/superjob.svg", import.meta.url),
  },
]);
watch(isEmployer, (new_value) => {
  console.log(new_value);
  if (new_value) {
    navigateTo({ name: 'your-vacancies' });
  }
})

const route = useRoute();
const { getMyVacancies, getProvidersAuthUrl } = vacancyStore;
const { my_vacancies } = storeToRefs(vacancyStore);


const isProviderModalShown = ref(false);
onMounted(async () => {
  isLoading.value = true;
  if (isEmployer.value) {
    navigateTo({ name: 'your-vacancies' });
  }
  if (employer && employer.is_completed) {

  }
  if (my_vacancies.value.length === 0) {
    const res = await getMyVacancies();
    if (res.status === 'error'){
      const authData = await getProvidersAuthUrl();
      for (let i = 0; i < providers.value.length; i++){
        const providerItem = providers.value[i];
        providerItem.url = authData[providerItem.slug];
      }
      isProviderModalShown.value = true;
    }
    if (my_vacancies.value.length){
      isProviderModalShown.value = false;
    }
  }
  isLoading.value = false;
});

const isSuccess = ref(true);
const iframe = ref();


const closeProviderModal = () => {
  isProviderModalShown.value = false;
}

const openProviderAuthUrl = (url) => {
  window.open(url);
}
const onIframeLoaded = (data) => {
  console.log(data, iframe);
};

const src = ref('https://hh.ru/oauth/authorize?client_id=S4U13T10N0HBBFTFB0VA9RKJUKT69A98NIDDQPLPENQKNCT2BBAF3RG1MDH5IBGC&response_type=code&redirect_uri=https%3A%2F%2Fjobeek.me%2Fapi%2Fservices%2Fhh%2Fauth%2Fcallback&state=1');
</script>
<template>
  <main class="main cabinet subs-page" role="main">
    <PersonalCabinetSearchMobile />
    <div class="bg-wrapper pt position-relative">
      <PageLoader v-if="isLoading" />

      <div class="wrapper wrapper-1290">
        <h1 class="lk-page-title">Cервисы</h1>
        <div class="modal-content p-2 m-0 border-0" style="min-width: 10rem;">
          <div class="list-of-providers">
            <a @click="openProviderAuthUrl(item.url)" v-for="item in providers" class="provider-item">
          <span class="provider-label" :class="{ success: isSuccess }">
            <svg v-if="item.is_connected" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="limegreen" class="bi bi-check"
                 viewBox="0 0 16 16">
              <path
                  d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#f14646" class="bi bi-x"
                 viewBox="0 0 16 16">
              <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </span>
              <img :src="item.icon" />
            </a>
          </div>
        </div>
      </div>
<!--      <button type="button" class="btn btn-primary" @click="isProviderModalShown = !isProviderModalShown.value">-->
<!--        Connect providers-->
<!--      </button>-->
      <YourVacanciesList></YourVacanciesList>

    </div>

    <div class="bg-wrapper bt">
      <HomeWorkSection></HomeWorkSection>
    </div>
    <HomeSearchSection></HomeSearchSection>

<!--    <CustomModal v-if="isProviderModalShown"  title="Providers: " @close="closeProviderModal">-->
<!--      -->
<!--    </CustomModal>-->

<!--    <CustomModal v-if="isProviderModalShown" title="Пожалуйста, авторизуйтесь у поставщика" @close="closeProviderModal">-->
<!--      <div class="modal-content p-2 m-0 border-0">-->
<!--        <iframe ref="iframe" :src="src" @load="onIframeLoaded"></iframe>-->
<!--      </div>-->
<!--    </CustomModal>-->

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