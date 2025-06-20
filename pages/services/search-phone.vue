<script setup>
import IMask from "imask";
import { useScamStore } from "~/store/scam";
import { useRoute, navigateTo } from "#app";
import { ref } from "vue";

const scamStore = useScamStore();
const route = useRoute();

const errorMessage = ref(null);
const { searchPhone, getScamOptions } = scamStore;

const isLoading = ref(false);
const phones = ref([]);
const getPhones = computed(() => phones.value);

const phoneInputElement = ref();
const phoneMask = ref(null);
onMounted(() => {
  phoneMask.value = new IMask(phoneInputElement.value, {
    mask: "+{7}(000)000-00-00",
  });
  phoneInputElement.value.addEventListener("input", (e) => {
    e.target.value;
  });
  if (route.query.phone) {
    phoneInputElement.value.value = route.query.phone;
    phoneMask.value.value = route.query.phone;
  }
});
useAsyncData("getScamOptions", () => getScamOptions());

// Moved onMounted logic to a separate function for better readability and testability
async function initializeComponent() {
  await getScamOptions(); // No need to store the result if it's not used

  // Initialize IMask after the component is mounted and the input element is available
  phoneMask.value = new IMask(route.query.phone, {
    mask: "+{7}(000) 000-00-00",
  });

  if (route.query.phone) {
    await handlePhoneSearch(route.query.phone);
  }
}

// Function to handle phone search logic. This is now reusable within the component
async function handlePhoneSearch(phone) {
  isLoading.value = true;
  const resData = await searchPhone({ phone });
  isLoading.value = false;

  if (resData.status !== "success") {
    errorMessage.value = resData.message;
    return;
  }
  phones.value = resData.data.data;
}

const onPhoneSearch = async () => {
  navigateTo({
    name: "services-search-phone",
    // Use unmaskedValue directly in navigateTo parameter
    query: { phone: phoneMask.value.unmaskedValue },
  });
};

// Use watchEffect to combine the onMounted and watch logic since route.query.phone is being accessed in both.
watchEffect(async () => {
  // Check if phone query exists and handle accordingly
  if (route.query.phone) {
    await handlePhoneSearch(route.query.phone);
  }
});
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
            ref="phoneInputElement"
            class="search-phone-input"
            name="tel"
            type="tel"
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
    </div>
  </main>
</template>

<style scoped>
.search-phone-input::placeholder {
  color: #78757e;
}
</style>
