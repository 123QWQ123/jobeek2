<script setup>
import IMask from "imask";
import { useScamStore } from "~/store/scam";

definePageMeta({
  layout: "cabinet",
});

const scamStore = useScamStore();

const errorMessage = ref(null);
const { searchPhone, getScamOptions } = scamStore;

const route = useRoute();
const phoneInputElement = ref();
const phoneMask = ref(null);
const isLoading = ref(false);

onMounted(async () => {
  const optionsRequest = await getScamOptions();

  isLoading.value = true;
  phoneMask.value = new IMask(phoneInputElement.value, {
    mask: "+{7}(000)000-00-00",
  });

  if (route.query.hasOwnProperty("phone")) {
    const resData = await searchPhone({ phone: route.query.phone });
    isLoading.value = false;
    phoneMask.value.value = route.query.phone;
    if (resData.status !== "success") {
      errorMessage.value = resData.message;
      return;
    }
    phones.value = resData.data.data;
  } else {
    isLoading.value = false;
  }
});

const phones = ref([]);
const getPhones = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(phones.value);
    }, 1000);
  });
};
const onPhoneSearch = async () => {
  navigateTo({
    name: "services-search-phone",
    query: { phone: phoneMask.value.unmaskedValue },
  });
};
watch(
  () => route.query.phone,
  async (newPhone) => {
    isLoading.value = true;
    phoneMask.value.value = newPhone;
    const resData = await searchPhone({ phone: newPhone });
    isLoading.value = false;

    if (resData.status !== "success") {
      errorMessage.value = resData.message;
      return;
    }
    phones.value = resData.data;
  },
);
</script>
<template>
  <main class="main bg-wrapper scam-phone-page" role="main">
    <div class="head-w-section">
      <div class="wrapper wrapper-1290">
        <h1 class="head-w-section__title">Поиск по номеру телефона</h1>

        <form class="search-row" @submit.prevent="onPhoneSearch">
          <button class="search-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="11.7659"
                cy="11.7666"
                r="8.98856"
                stroke="#B8BFC6"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.0195 18.4851L21.5436 22"
                stroke="#B8BFC6"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <input
            class="search-phone-input"
            ref="phoneInputElement"
            type="text"
            placeholder="+7"
          />
          <button class="button-accent">Поиск</button>
        </form>

        <span class="text-danger">
          {{ errorMessage }}
        </span>
      </div>
    </div>

    <div class="wrapper wrapper-1290">
      <client-only>
        <div class="course-grid">
          <ServicesScamLoadingList v-if="isLoading" />
          <ServicesScamAsyncList
            :phones="phones"
            :get-phones="getPhones"
            v-else
          />

          <div class="search-history-sidebar">
            <ServicesScamSubscriptionList />
          </div>
        </div>
        <ServicesScamHistoryList />
      </client-only>
    </div>
  </main>
</template>

<style scoped>
.search-phone-input::placeholder {
  color: #78757e;
}
</style>
