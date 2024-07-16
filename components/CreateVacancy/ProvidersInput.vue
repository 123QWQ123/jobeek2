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
        @click="toggle('hh')"
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

        <div class="text-danger d-block" v-if="errors.hh">
          {{ errors.hh }}
        </div>
      </div>
      <div
        class="import-box"
        :class="{
          'import-is-complete': isSuperjobSelected,
          disabled: !isSuperjobEnabled,
          'is-connected': isSuperjobEnabled,
        }"
        @click="toggle('superjob')"
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

        <div class="text-danger d-block" v-if="errors.superjob">
          {{ errors.superjob }}
        </div>
      </div>
    </div>
    <div class="text-danger d-block text-center mt-1">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
// To DO default by connected_providers
import { useDictionaryStore } from "~/store/dictionary";
import { toast } from "vue3-toastify";
import { useVacancyStore } from "~/store/vacancy.js";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    required: false,
    default: {},
  },
  name: {
    required: true,
    type: String,
  },
  errors: {
    required: false,
    default: {},
  },
});

const errors = computed(() => props.errors);
const dictionaryStore = useDictionaryStore();

const route = useRoute();

const vacancyID = computed(() => route.params.id);

const vacancyStore = useVacancyStore();
const { getConnectedEmployerProviders, getEmployerProvidersAuthEndpoints } =
  vacancyStore;
await getConnectedEmployerProviders();

const { value, errorMessage } = useField(() => props.name);

// watch(vacancyProviders.value, (newValues) => {
//   console.log(newValues);
//   const providersNewValues = {...resetObject};
//
//   if (newValues.includes('hh')){
//     providersNewValues.hh = true;
//   }else{
//     providersNewValues.superjob = false;
//   }
//   if (newValues.includes('superjob')){
//     providersNewValues.superjob = true;
//   }else{
//     providersNewValues.superjob = false;
//   }
//   console.log(providersNewValues);
//   selectedProviders.value = providersNewValues;
// });

const enabledProviders = ref(vacancyStore.providers);
const isHHEnabled = computed(() => enabledProviders.value.hh);
const isSuperjobEnabled = computed(() => enabledProviders.value.superjob);

const resetObject = {
  superjob: false,
  hh: false,
};
const vacancyProviders = computed(() => {
  let selectedProvidersValue = [];
  if (!vacancyStore.my_resume) {
    return resetObject;
  }
  const providersNewValues = { ...resetObject };

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
  () => vacancyProviders.value,
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

const isHHSelected = computed(() => selectedProviders.value.hh);
const isSuperjobSelected = computed(() => selectedProviders.value.superjob);
const reset = () => {
  selectedProviders.value = resetObject;
};

const toggle = async (provider) => {
  if (provider === "hh" && !isHHEnabled.value) {
    toast.info("Вам нужно подключить HH", { autoClose: 3000 });
    return;
  }
  if (provider === "superjob" && !isSuperjobEnabled.value) {
    toast.info("Вам нужно подключить Superjob", { autoClose: 3000 });
    return;
  }
  selectedProviders.value[provider] = !selectedProviders.value[provider];

  const providerParams = [];
  if (selectedProviders.value.hh) {
    providerParams.push("hh");
  }
  if (selectedProviders.value.superjob) {
    providerParams.push("superjob");
  }

  let selectedProvidersValue = [];
  if (selectedProviders.value.hh) {
    selectedProvidersValue.push("hh");
  }
  if (selectedProviders.value.superjob) {
    selectedProvidersValue.push("superjob");
  }
  value.value = selectedProvidersValue;
};
const openProviderAuthUrl = (url) => {
  window.open(url);
};
</script>

<style scoped>
.import-box {
  cursor: pointer;
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
