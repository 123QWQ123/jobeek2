<template>
  <div class="carryover-box">
    <div class="carryover-box-label">
      Есть резюме на HH или SuperJob? Просто перенесите его.
    </div>

    <div class="import-grid">
      <div
        class="import-box"
        :class="getImportBoxClass('hh')"
        @click="handleToggle('hh')"
      >
        <BlockLoader v-if="isHHLoading" />
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
        :class="getImportBoxClass('superjob')"
        @click="handleToggle('superjob')"
      >
        <BlockLoader v-if="isSuperjobLoading" />
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
import { useResumeStore } from "~/store/resume";

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
const isHHLoading = ref(false);
const isSuperjobLoading = ref(false);
const {
  getConnectedSeekerProviders,
  getSeekerProvidersAuthEndpoints,
  updateResume,
} = useResumeStore();
const enabledProviders = await getConnectedSeekerProviders();
const route = useRoute();

/**
 * Reactive Helpers
 */
const isHHEnabled = computed(() => Boolean(enabledProviders?.hh));
const isSuperjobEnabled = computed(() => Boolean(enabledProviders?.superjob));
const isHHSelected = ref(false);
const isSuperjobSelected = ref(false);

/**
 * Methods and Handlers
 */
const handleToggle = async (provider) => {
  const isLoading = provider === "hh" ? isHHLoading : isSuperjobLoading;
  const isEnabled =
    provider === "hh" ? isHHEnabled.value : isSuperjobEnabled.value;

  if (isLoading.value || !isEnabled) return; // Prevent clicks if loading or disabled

  isLoading.value = true;
  try {
    // Simulate a call to endpoint based on the selected provider
    isHHSelected.value = provider === "hh";
    isSuperjobSelected.value = provider === "superjob";

    const res = await getSeekerProvidersAuthEndpoints(
      { providers: [provider] },
      useRequestURL(),
    );

    await updateResume(route.params.id, {
      providers: [provider],
      form_data: "PROVIDERS_DATA",
    });

    if (res.hasOwnProperty(provider)) {
      openProviderAuthUrl(res[provider]);
    }
    // toast.success(`Резюме успешно перенесено на ${provider.toUpperCase()}!`);
  } catch (error) {
    // toast.error(`Не удалось перенести резюме на ${provider.toUpperCase()}.`);
  } finally {
    isLoading.value = false;
  }
};

/**
 * Class Helper
 */
const getImportBoxClass = (provider) => {
  const isLoading =
    provider === "hh" ? isHHLoading.value : isSuperjobLoading.value;
  const isEnabled =
    provider === "hh" ? isHHEnabled.value : isSuperjobEnabled.value;
  const isSelected =
    provider === "hh" ? isHHSelected.value : isSuperjobSelected.value;

  return {
    "import-is-complete": isSelected,
    disabled: !isEnabled,
    "is-connected": isEnabled,
    "is-loading": isLoading,
  };
};

const openProviderAuthUrl = (url) => {
  window.open(url);
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
