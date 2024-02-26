<template>
  <div class="w-box w-box--main w-box-resume pb-4">
    <div class="w-box-head">
      <h1 class="title">{{ formTitle }}</h1>
      <div class="descr">
        Получайте уведомления о новых по созданному запросу
      </div>
      <span class="arrow"></span>
    </div>

    <div class="w-box-body" :class="{ disabled: isLoading }">
      <div>
        <div class="text-danger d-block" v-if="errors.message">
          {{ errors.message }}
        </div>
        <div class="text-danger d-block" ref="errorMessageElement">
          {{ errorMessage }}
        </div>
      </div>
      <form @submit.prevent="onSubmit" :validation-schema="schema">
        <CreateResumeProvidersInput name="providers" />
        <div class="input-row">
          <label for="name">Название вакансии<b>*</b></label>
          <div class="input-wrapper">
            <div class="c1 mt-1">
              <ResumeTextInput name="title" placeholder="Название" />
            </div>
          </div>
        </div>

        <div class="input-row">
          <label for="name">Имя и фамилия <b>*</b></label>
          <div class="input-wrapper">
            <div class="c2">
              <div class="input-wrapper">
                <ResumeTextInput name="first_name" placeholder="Имя" />
              </div>
              <div class="input-wrapper">
                <ResumeTextInput name="last_name" placeholder="Фамилия" />
              </div>
            </div>
            <div class="c1 mt-1">
              <ResumeTextInput name="middle_name" placeholder="Отчество" />
            </div>
          </div>
        </div>

        <div class="input-row">
          <label for="resume_email">Электронная почта<b>*</b></label>
          <div class="input-wrapper">
            <ResumeTextInput
              name="email"
              type="email"
              placeholder="Электронная почта"
            />
            <ResumeCheckboxInput
              class="mt-2"
              v-if="!state.is_preferred_email.is_hidden"
              name="is_preferred_email"
              label="Email является ли предпочтительным способом связи"
            />
          </div>
        </div>

        <div class="input-row">
          <label>Дата рождения <b>*</b></label>
          <div class="input-wrapper">
            <div class="mb-1">
              <VeeBirthDatePicker name="birth_date" />
            </div>
          </div>
        </div>
        <div class="input-row">
          <label>Город проживания:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <VeeSelectWithSearch
              :options="cityOptions"
              name="city_id"
              placeholder="Выберите город"
              @input="updateCityInput"
            />
          </div>
        </div>

        <div class="input-row">
          <label>Поль:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <LazyVeeCustomSelect
              :options="genderOptions"
              name="gender_id"
              :label="'Выберите'"
            />
          </div>
        </div>

        <div class="input-row">
          <label>Готовность к командировкам:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <LazyVeeCustomSelect
              :options="businessTripOptions"
              name="business_trip_id"
              :label="'Выберите'"
            />
          </div>
        </div>

        <div class="input-row">
          <label>Готовность к релокацию:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <LazyVeeCustomSelect
              :options="relocationTypeOptions"
              name="relocation_type_id"
              :label="'Выберите'"
            />
          </div>
        </div>

        <div class="input-row" v-if="isMovableCitiesEnabled">
          <label>Городов в которым готов переехать:</label>
          <div class="input-wrapper mt-2">
            <VeeMultiSelectWithSearch
              name="move_able_cities"
              :options="moveableCityOptions"
              placeholder="Выберите"
              @input="updateMoveableCityInput"
            />
          </div>
        </div>

        <div class="input-row">
          <label>Тип работы:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <VeeMultiSelectWithSearch
              name="work_types"
              :options="workTypeOptions"
              placeholder="Выберите"
            />
          </div>
        </div>
      </form>
    </div>
    {{ values }}
    <hr />
    {{ meta }}
  </div>
</template>

<script setup>
import { useDictionaryStore } from "~/store/dictionary";
import { useResumeStore } from "~/store/resume";

import { useProfileStore } from "~/store/profile";
import { useRuntimeConfig } from "#app";
import useFormValidation from "~/composables/useFormValidation";
import { storeToRefs } from "pinia";
import useResumeHooks from "~/hooks/useResumeHooks";
import ResumeCheckboxInput from "~/components/CreateResume/ResumeCheckboxInput.vue";
import ResumeTextInput from "~/components/CreateResume/ResumeTextInput.vue";

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

<style>
.w-box-body.disabled {
  position: relative;
}

.w-box-body.disabled:before {
  left: 0;
  top: 0;
  z-index: 999;
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
</style>
