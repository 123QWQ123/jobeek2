<template>
  <div class="carryover-box">
    <div class="carryover-box-label">
      Есть вакансии на hh или SuperJob? Просто перенесите его!
    </div>

    <div class="import-grid">
      <div
        class="import-box"
        :class="{
          'import-is-complete': isHHSelected,
          disabled: !isHHEnabled,
          'is-connected': isHHEnabled,
        }"
        @click="handleToggle('hh')"
      >
        <div class="import-box-dvnld">
          <div class="logo">
            <img src="~/assets/img/logos/hh.svg" alt="#" />
            <div class="check">
              <img src="~/assets/img/svg/complete.svg" alt="#" />
            </div>
          </div>
          <span>Опубликовать на HeadHunters.ru</span>
        </div>
        <div class="import-complete">
          <div class="logo logo-fake"></div>
          <span>Опубликовать на HeadHunters.ru</span>
          <button class="close" type="button">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.9951 4.99512L5.00586 18.9843"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19.0009 18.9928L5 4.98901"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        class="import-box"
        :class="{
          'import-is-complete': isSuperjobSelected,
          disabled: !isSuperjobEnabled,
          'is-connected': isSuperjobEnabled,
        }"
        @click="handleToggle('superjob')"
      >
        <div class="import-box-dvnld">
          <div class="logo">
            <img src="~/assets/img/logos/sb.svg" alt="#" />
            <div class="check">
              <img src="~/assets/img/svg/complete.svg" alt="#" />
            </div>
          </div>
          <span>Опубликовать на Superjob.ru </span>
        </div>
        <div class="import-complete">
          <div class="logo logo-fake"></div>
          <span>Опубликовать на Superjob.ru</span>
          <button class="close" type="button">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.9951 4.99512L5.00586 18.9843"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19.0009 18.9928L5 4.98901"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "#imports";
import { toast } from "vue3-toastify";
import { useVacancyStore } from "~/store/vacancy";

const props = defineProps({
  providers: {
    required: true,
    default: [],
  },
  type: String,
  placeholder: String,
});

/**
 * Reactive State Setup
 */
const isLoading = ref(false);
const {
  getConnectedEmployerProviders,
  getEmployerProvidersAuthEndpoints,
  updateVacancy,
  updateDraft,
} = useVacancyStore();
const { providers, provider_auth_urls } = storeToRefs(useVacancyStore());
const redirect_url = useRequestURL();
await getConnectedEmployerProviders();
await getEmployerProvidersAuthEndpoints(
  { providers: ["hh", "superjob"] },
  redirect_url.origin + redirect_url.pathname,
);
const route = useRoute();

/**
 * Reactive Helpers
 */
const isHHEnabled = computed(() => providers.value.hh);
const isSuperjobEnabled = computed(() => providers.value.superjob);
const isHHSelected = ref(
  props.providers.filter((provider) => provider.name === "hh").length > 0,
);
const isSuperjobSelected = ref(
  props.providers.filter((provider) => provider.name === "superjob").length > 0,
);

/**
 * Methods and Handlers
 */
const handleToggle = async (provider) => {
  if (provider === "hh" && !isHHEnabled.value) {
    toast.info("Вам нужно подключить HH", { autoClose: 3000 });
    if (provider_auth_urls.value.hh) {
      window.open(provider_auth_urls.value.hh);
    }
    return;
  }
  if (provider === "superjob" && !isSuperjobEnabled.value) {
    toast.info("Вам нужно подключить Superjob", { autoClose: 3000 });
    if (provider_auth_urls.value.superjob) {
      window.open(provider_auth_urls.value.superjob);
    }
    return;
  }

  isLoading.value = true;
  try {
    // Simulate a call to endpoint based on the selected provider
    let selectedProvidersValue = [];
    if (provider === "hh") {
      isHHSelected.value = !isHHSelected.value;
      if (isHHSelected.value) {
        selectedProvidersValue.push("hh");
      }
    }
    if (provider === "superjob") {
      isSuperjobSelected.value = !isSuperjobSelected.value;
      if (isSuperjobSelected.value) {
        selectedProvidersValue.push("superjob");
      }
    }

    if (selectedProvidersValue.length === 0) {
      toast.error(`Ни один из провайдеров не выбран!`);
      return;
    }

    if (route.query.type === "draft" && route.params.id) {
      await updateDraft(route.params.id, {
        providers: selectedProvidersValue,
        form_data: "PROVIDERS_DATA",
      });
    } else {
      await updateVacancy(route.params.id, {
        providers: selectedProvidersValue,
        form_data: "PROVIDERS_DATA",
      });
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.import-box {
  cursor: pointer;
}

.import-box.is-loading {
  align-items: center;
  justify-content: center;
}

.is-connected .import-box-dvnld .logo .check {
  display: block;
}

.import-box.disabled {
  background: #ffffff;
  box-shadow: 0px 0px 20px rgb(0 0 0 / 4%);
  border-radius: 12px;
}

.import-box.disabled .import-box-dvnld {
  border: 1px dashed #8c8c8c;
  color: #8c8c8c;
}

.import-box.disabled .import-box-dvnld .logo {
  -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
  filter: grayscale(100%);
}

.import-box.disabled .import-box-dvnld span {
  color: #8c8c8c;
}
</style>
