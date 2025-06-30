<template>
  <div class="w-box w-box--main w-box-resume">
    <div class="w-box-head">
      <h1 class="title">{{ formTitle }}</h1>
      <div class="descr">
        Получайте уведомления о новых по созданному запросу
      </div>
      <!--      <span class="arrow"></span>-->
    </div>

    <div class="w-box-body" :class="{ disabled: isLoading }">
      <BlockLoader ref="block_loader" v-if="isLoading" />
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
            <div class="c1 mt-3">
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
          <label>Пол:<b>*</b></label>
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

        <div class="input-row pb-4">
          <label>Тип работы:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <VeeMultiSelectWithSearch
              name="work_types"
              :options="work_types_formatted"
              placeholder="Выберите"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useDictionaryStore } from "~/store/dictionary";
import { useResumeStore } from "~/store/resume";

import { useProfileStore } from "~/store/profile";
import useFormValidation from "~/composables/useFormValidation";
import { storeToRefs } from "pinia";
import ResumeCheckboxInput from "~/components/CreateResume/ResumeCheckboxInput.vue";
import ResumeTextInput from "~/components/CreateResume/ResumeTextInput.vue";
import { zod } from "~/hooks/ru-zod.js";
import { toTypedSchema } from "@vee-validate/zod";

const props = defineProps(["title"]);

const resumeStore = useResumeStore();
const profileStore = useProfileStore();
const formTitle = computed(() => props.title);

const isSaved = ref(false);
const isChanged = ref(false);
const isUpdated = ref(false);

const dictionaryStore = useDictionaryStore();
const { getGenders, getBusinessTrips, getWorkTypes, getRelocationTypes } =
  dictionaryStore;
useAsyncData(
  "dictionary",
  async () => {
    await getGenders();
    await getBusinessTrips();
    await getWorkTypes();
    await getRelocationTypes();
  },
  {
    immediate: true,
  },
);

const schema = zod.object({
  providers: zod.array(zod.string()).nonempty("Выберите хотя бы 1 сервис"),
  title: zod.string(),
  first_name: zod.string(),
  last_name: zod.string(),
  middle_name: zod.string().optional().nullable(),
  email: zod.string(),
  is_preferred_email: zod.boolean(),
  birth_date: zod.string(),
  city_id: zod.number(),
  gender_id: zod.number(),
  business_trip_id: zod.number(),
  relocation_type_id: zod.number(),
  work_types: zod.array(zod.number()).nonempty("Выберите хотя бы 1"),
});

const { values, errors, validate, meta, setTouched, setErrors, handleSubmit } =
  useForm({
    initialValues: {
      providers: [],
      title: null,
      first_name: null,
      last_name: null,
      middle_name: null,
      email: null,
      is_preferred_email: false,
      birth_date: null,
      city_id: null,
      gender_id: null,
      business_trip_id: null,
      relocation_type_id: null,
      move_able_cities: [],
      work_types: [],
    },
    initialTouched: true,
    validationSchema: toTypedSchema(schema),
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

const cityOptions = ref([]);
const moveableCityOptions = ref([]);
const { work_types_formatted } = storeToRefs(dictionaryStore);
const genderOptions = computed(() => {
  return dictionaryStore.resume_genders.map((item) => ({
    name: item.name,
    value: item.id,
  }));
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

const updateCityInput = async (newValue = "") => {
  if (newValue.length < 2) {
    return;
  }
  const items = (await searchCities({ search: newValue })) ?? [];
  cityOptions.value = items.map((item) => ({
    value: item.id,
    name: item.name,
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
const block_loader = ref();

const errorMessageElement = ref();
const errorMessage = ref(null);
const scrollTop = () => {
  window.scrollTo(0, 0);
};
const onSubmit = handleSubmit((submittedValues) => {
  save();
});
const save = async (is_from_parent = false) => {
  await validate();
  if (!meta.value.valid) {
    errorMessage.value = "Вам необходимо заполнить";
    scrollTop();
    errorMessageElement.value.scrollIntoView({ behavior: "smooth" });
    return;
  }
  setErrors({});
  errorMessage.value = "";
  isLoading.value = true;

  scrollTop();
  errorMessageElement.value.scrollIntoView({ behavior: "smooth" });

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

const blockLoaderStyles = {
  "border-radius": "0 0 12px 12px",
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
</style>
