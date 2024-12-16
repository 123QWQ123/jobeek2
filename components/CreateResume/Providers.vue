<template>
  <div class="carryover-box">
    <div class="carryover-box-label">
      Есть резюме на HH или SuperJob? Просто перенесите его.
    </div>

    <div class="import-grid">
      <div
        class="import-box"
        :class="{
          'import-is-complete': isHHSelected,
          disabled: !isHHEnabled,
          'is-connected': isHHEnabled,
          'is-loading': isHHLoading,
        }"
        @click="toggle('hh')"
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
        :class="{
          'import-is-complete': isSuperjobSelected,
          disabled: !isSuperjobEnabled,
          'is-connected': isSuperjobEnabled,
          'is-loading': isSuperjobLoading,
        }"
        @click="toggle('superjob')"
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
// To DO default by connected_providers

import { useDictionaryStore } from "~/store/dictionary";
import { toast } from "vue3-toastify";
import { useResumeStore } from "~/store/resume";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    required: false,
    default: {},
  },
});
const dictionaryStore = useDictionaryStore();

const route = useRoute();

const resumeID = computed(() => route.params.id);

const resumeStore = useResumeStore();
const {
  getConnectedSeekerProviders,
  getSeekerProvidersAuthEndpoints,
  getMyResume,
} = resumeStore;
await getConnectedSeekerProviders();

const enabledProviders = ref(resumeStore.providers);
const isHHEnabled = computed(() => enabledProviders.value.hh);
const isSuperjobEnabled = computed(() => enabledProviders.value.superjob);

const resetObject = {
  superjob: false,
  hh: false,
};
const resumeProviders = computed(() => {
  let selectedProvidersValue = [];
  if (!resumeStore.my_resume) {
    return resetObject;
  }
  const providersNewValues = { ...resetObject };

  if (!resumeStore.my_resume.hasOwnProperty("providers")) {
    return providersNewValues;
  }
  if (resumeStore.my_resume.providers.length > 0) {
    selectedProvidersValue = resumeStore.my_resume.providers.map(
      (item) => item.name,
    );
  }
  // return selectedProvidersValue;

  if (selectedProvidersValue.includes("hh")) {
    providersNewValues.hh = true;
  } else {
    providersNewValues.superjob = false;
  }
  if (selectedProvidersValue.includes("superjob")) {
    providersNewValues.superjob = true;
  } else {
    providersNewValues.superjob = false;
  }
  return providersNewValues;
});

watch(
  () => resumeProviders.value,
  (newValue) => {
    selectedProviders.value = newValue;
  },
);
const selectedProviders = ref(props.modelValue ?? resetObject);
watch(
  () => selectedProviders.value,
  (newSelectedItems) => {
    emit("update:modelValue", newSelectedItems);
  },
);

const errors = computed(() => props.errors);
const isHHSelected = computed(() => selectedProviders.value.hh);
const isSuperjobSelected = computed(() => selectedProviders.value.superjob);
const reset = () => {
  selectedProviders.value = resetObject;
};

const { updateResume } = resumeStore;
// const providers = ref(resetObject);
const isHHLoading = ref(false);
const isSuperjobLoading = ref(false);
const redirect_url = useRequestURL();
const toggle = async (provider) => {
  if (!selectedProviders.value[provider]) {
    if (enabledProviders.value[provider] === false) {
      const providerParams = new URLSearchParams();
      providerParams.set("providers[]", provider);
      const resData = await getSeekerProvidersAuthEndpoints(
        providerParams,
        redirect_url,
      );
      if (resData.hasOwnProperty(provider)) {
        openProviderAuthUrl(resData[provider]);
      } else {
        alert(resData.message);
      }
      return;
    }
  }

  selectedProviders.value[provider] = !selectedProviders.value[provider];

  const providerParams = [];
  if (selectedProviders.value.hh) {
    providerParams.push("hh");
  }
  if (selectedProviders.value.superjob) {
    providerParams.push("superjob");
  }

  const data = {
    providers: providerParams,
  };
  data.form_data = "PROVIDERS_DATA";
  let resData = {};
  if (resumeID.value) {
    if (provider === "hh") {
      isHHLoading.value = true;
    }
    if (provider === "superjob") {
      isSuperjobLoading.value = true;
    }
    resData = await updateResume(resumeID.value, data);

    if (resData.status !== "success") {
      toast.info(resData.message, { autoClose: 3000 });
    }
    if (provider === "hh") {
      isHHLoading.value = false;
    }
    if (provider === "superjob") {
      isSuperjobLoading.value = false;
    }
    await getMyResume(resumeID.value);
  } else {
    // selectedProviders.value = {...resetObject, [provider] : }
    // resData = await updateVacancy(vacancyID.value, data);
    // if (resData.status !== 'success'){
    //   toast.info(resData.message, {autoClose: 3000});
    // }
  }
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
