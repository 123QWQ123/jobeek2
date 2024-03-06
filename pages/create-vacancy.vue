<script setup>
import { useDictionaryStore } from "~/store/dictionary";
import { useResumeStore } from "~/store/resume";

import { useProfileStore } from "~/store/profile";
import { useRuntimeConfig } from "#app";
import useFormValidation from "~/composables/useFormValidation";
import { storeToRefs } from "pinia";
import useResumeHooks from "~/hooks/useResumeHooks";

const props = defineProps(["title"]);

const resumeStore = useResumeStore();
const profileStore = useProfileStore();
const CONFIG = useRuntimeConfig();
const route = useRoute();

const { seeker } = profileStore;
const { resume } = storeToRefs(resumeStore);
const formTitle = computed(() => props.title);

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(false);
const isUpdated = ref(false);

const schema = computed(() => {
  return {
    providers: "required",
    title: "required|min:1|max:100",
    first_name: "required|min:1|max:100",
    last_name: "required|min:1|max:100",
    middle_name: "required|min:1|max:100",
    email: { required: true, email: true },
    is_preferred_email: { boolean: true },
    birth_date: "required|date",
    city_id: "required|numeric",
    gender_id: "required|numeric",
    business_trip_id: "required|numeric",
    relocation_type_id: "required|numeric",
    work_types: "required|min:1",
  };
});
const { values, errors, validate, meta, setTouched, setErrors, handleSubmit } =
  useForm({
    initialValues: {
      providers: [],
      title: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      email: "",
      is_preferred_email: false,
      birth_date: "",
      city_id: null,
      gender_id: null,
      business_trip_id: null,
      relocation_type_id: null,
      move_able_cities: [],
      work_types: [],
    },
    initialTouched: true,
    validationSchema: schema,
  });

const { createResume } = resumeStore;

const state = reactive({
  title: {
    is_hidden: false,
  },
  first_name: {
    is_hidden: false,
  },
  last_name: {
    is_hidden: false,
  },
  middle_name: {
    is_hidden: false,
  },
  email: {
    is_hidden: false,
  },
  is_preferred_email: {
    is_hidden: false,
  },
  city_id: {
    is_hidden: false,
  },
  move_able_cities: {
    is_hidden: true,
  },
  metros: {
    is_hidden: true,
  },
  professional_roles: {
    is_hidden: true,
  },
  birth_date: {
    is_hidden: true,
  },
  salary: {
    is_hidden: true,
  },
  gender_id: {
    is_hidden: true,
  },
  business_trip_id: {
    is_hidden: true,
  },
  work_types: {
    is_hidden: true,
  },
  relocation_type_id: {
    is_hidden: true,
  },
});
const isMovableCitiesEnabled = computed(() => {
  const relocation_id = parseInt(values.relocation_type_id);
  return relocation_id === 148 || relocation_id === 149;
});

const { searchCities } = profileStore;

const dictionaryStore = useDictionaryStore();
const cityOptions = ref([]);
const moveableCityOptions = ref([]);

const genderOptions = computed(() => {
  return dictionaryStore.resume_genders.map((item) => ({
    name: item.name,
    value: item.id,
  }));
});
const workTypeOptions = computed(() => {
  return dictionaryStore.work_types;
});
const businessTripOptions = computed(() => {
  return dictionaryStore.business_trips.map((item) => ({
    name: item.name,
    value: item.id,
  }));
});
const relocationTypeOptions = computed(() => {
  return dictionaryStore.relocation_types.map((item) => ({
    name: item.name,
    value: item.id,
  }));
});
const { getGenders, getBusinessTrips, getWorkTypes, getRelocationTypes } =
  dictionaryStore;
onMounted(() => {
  getGenders({}, true);
  getBusinessTrips();
  getWorkTypes();
  getRelocationTypes();
});

const { getCityName, getCityNameFromArea2 } = useResumeHooks();
const updateCityInput = async (newValue = "") => {
  if (newValue.length < 2) {
    return;
  }
  const items = (await searchCities({ search: newValue })) ?? [];
  cityOptions.value = items.map((item) => ({
    value: item.id,
    name: getCityNameFromArea2(item),
  }));
};

const updateMoveableCityInput = async (newValue = "") => {
  const items = (await searchCities({ search: newValue })) ?? [];
  moveableCityOptions.value = items.map((item) => ({
    value: item.id,
    name: item.name,
  }));
};

const { errors: serverErrors, handleErrorResponse } = useFormValidation(state);

watch(
  () => serverErrors.value,
  (newErrors) => {
    if (Object.keys(newErrors).length > 0) {
      const backendErrors = {};
      Object.keys(newErrors).map(
        (item) => (backendErrors[item] = newErrors[item]),
      );
      setErrors(backendErrors);
    }
  },
);
const isLoading = ref(false);

const errorMessageElement = ref();
const errorMessage = ref(null);
const scrollTop = () => {
  window.scrollTo(0, 0);
};
const onSubmit = handleSubmit((submittedValues) => {
  save();
});
const save = async (is_from_parent = false) => {
  validate();
  if (!meta.value.valid) {
    console.log(1);
    errorMessage.value = "Вам необходимо заполнить";
    scrollTop();
    errorMessageElement.value.scrollIntoView({ behavior: "smooth" });
    return;
  }
  setErrors({});
  errorMessage.value = "";
  isLoading.value = true;

  console.log(values);

  let resData = await createResume(unref(values));

  if (resData.status !== "success") {
    errorMessage.value = resData.message;
    isLoading.value = false;
    return;
  }
  isLoading.value = false;
  if (is_from_parent) {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
  const resume_id = resData.data.data.id;
  setTimeout(() => {
    console.log("redirecting...");
    navigateTo({ name: "my-resume-id", params: { id: resume_id } });
  }, 100);
  isLoading.value = false;
  if (resData.data.hasOwnProperty("errors")) {
    setErrors(resData.data.errors);
    return;
  }
  isChanged.value = false;
  isSaved.value = false;
  isUpdated.value = false;
};
defineExpose({
  onSubmit,
  save,
});
</script>
<template>
  <main class="main cabinet create-subscribe-page bg-wrapper" role="main">
    <Head>
      <Title>{{ pageTitle }} - Jobeek</Title>
    </Head>
    <div class="bg-wrapper pt">
      <PersonalCabinetSearchMobile />
      <div class="wrapper wrapper-1290">
        <form
          class="create-vacancy"
          @submit.prevent="omSubmit"
          name="create-vacancy"
        >
          <LazyCreateResumeDraftCard ref="draft_el" :title="pageTitle" />

          <div class="form-submit-container">
            <button
              class="btn btn-outline-primary"
              @click.prevent="draft_el.save()"
            >
              Далее
              <div
                v-if="isLoading"
                class="ms-2 bg-primary spinner-grow spinner-grow-sm"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
