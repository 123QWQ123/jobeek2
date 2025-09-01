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
    <div class="text-danger d-block">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { toast } from "vue3-toastify";
import { useResumeStore } from "~/store/resume";

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

const route = useRoute();

const resumeID = computed(() => route.params.id);

const resumeStore = useResumeStore();
const { getConnectedSeekerProviders, getSeekerProvidersAuthEndpoints } =
  resumeStore;
await getConnectedSeekerProviders();
await getSeekerProvidersAuthEndpoints(
  { providers: ["hh", "superjob"] },
  useRequestURL(),
);

const { value, errorMessage, setValue } = useField(() => props.name);

const isHHEnabled = computed(() => resumeStore.providers.hh);
const isSuperjobEnabled = computed(() => resumeStore.providers.superjob);
const selectedProviders = ref([]);
const provider_auth_urls = computed(() => resumeStore.provider_auth_urls);

const isHHSelected = computed(() => selectedProviders.value.hh);
const isSuperjobSelected = computed(() => selectedProviders.value.superjob);

const toggle = async (provider) => {
  if (provider === "hh" && !isHHEnabled.value) {
    toast.info("Вам нужно подключить HH", { autoClose: 3000 });
    if (provider_auth_urls.value.hh) {
      window.open(provider_auth_urls.value.hh, "_blank");
    }
    return;
  }
  if (provider === "superjob" && !isSuperjobEnabled.value) {
    toast.info("Вам нужно подключить Superjob", { autoClose: 3000 });
    if (provider_auth_urls.value.superjob) {
      window.open(provider_auth_urls.value.superjob, "_blank");
    }
    return;
  }
  selectedProviders.value[provider] = !selectedProviders.value[provider];

  let selectedProvidersValue = [];
  if (selectedProviders.value.hh) {
    selectedProvidersValue.push("hh");
  }
  if (selectedProviders.value.superjob) {
    selectedProvidersValue.push("superjob");
  }

  setValue(selectedProvidersValue);
  emit("update:modelValue", selectedProvidersValue);
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
