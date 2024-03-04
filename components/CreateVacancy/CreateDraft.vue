<template>
  <div class="w-box w-box--main w-box-resume pb-4" @click="isFocused = true">
    <div class="w-box-head">
      <h1 class="title">{{ formTitle }}</h1>
      <div class="descr">
        Получайте уведомления о новых по созданному запросу
      </div>
      <span class="arrow"></span>
    </div>

    <div class="text-danger d-block p-4" v-if="errorMessage">
      {{ errorMessage }}
    </div>
    <div class="w-box-body">
      <div class="input-row">
        <label for="name">Название вакансии<b>*</b></label>
        <div class="input-wrapper">
          <div class="c1 mt-1">
            <VacancyTextInput name="name" placeholder="Введите" />
          </div>
        </div>
      </div>
      <div class="input-row">
        <label>Список городов:<b>*</b></label>
        <div class="input-wrapper mt-2">
          <VeeMultiSelectWithSearch
            :options="cityOptions"
            name="cities"
            placeholder="Выберите город"
            @input="updateCityInput"
          ></VeeMultiSelectWithSearch>
        </div>
      </div>

      <div class="input-row">
        <label>Специализация:<b>*</b></label>
        <div class="input-wrapper mt-2">
          <VeeMultiSelectWithSearch
            :options="professionalRoleOptions"
            name="professional_roles"
            label="Выберите специализацию"
            @input="updateProfessionalInput"
          ></VeeMultiSelectWithSearch>
        </div>
      </div>

      <!--      <div class="input-row">-->
      <!--        <label for="description">Описание:</label>-->
      <!--        <div class="input-wrapper">-->
      <!--          <RichEditor v-model="state.description.val" />-->
      <!--          <div class="text-danger d-block" v-if="errors.description">-->
      <!--            {{ errors.description }}-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="input-row">
        <label for="description">Описание:</label>
        <div class="input-wrapper">
          <!--          <VeeRichEditor name="description" />-->
          <!--          <VeeRichEditor2 name="description" />-->
          <!--          <VeeRichEditor2 />-->
          <TipTapRichEditor />
        </div>
      </div>

      <!--            <CreateVacancySalary-->
      <!--              v-model="state.salary.val"-->
      <!--              :errors="errors.salary"-->
      <!--              :providers="providers"-->
      <!--            />-->
      <br />
      {{ values }}
    </div>
  </div>
</template>

<script setup>
import { useVacancyStore } from "~/store/vacancy";
import { useResumeStore } from "~/store/resume";

import { useProfileStore } from "~/store/profile";
import { useRuntimeConfig } from "#app";
import useFormValidation from "~/composables/useFormValidation";
import { storeToRefs } from "pinia";
import useResumeHooks from "~/hooks/useResumeHooks";
import { z } from "~/hooks/ru-zod.js";
import { toTypedSchema } from "@vee-validate/zod";
import VacancyTextInput from "~/components/CreateVacancy/VacancyTextInput.vue";

const props = defineProps(["title", "providers"]);

const providers = ref({});

const resumeStore = useResumeStore();
const profileStore = useProfileStore();
const vacancyStore = useVacancyStore();
const CONFIG = useRuntimeConfig();
const route = useRoute();

const draftID = computed(() => route.query.draft_id);
const vacancyID = computed(() => route.query.vacancy_id);

const { seeker } = profileStore;
const { resume } = storeToRefs(resumeStore);
const formTitle = computed(() => props.title);

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(false);
const isUpdated = ref(false);

const schema = computed(() => {
  return z.object({
    name: z.string(),
    cities: z.array(z.number()),
    description: z.string(),
    salary: z.object({
      currency: z.string().nullable(),
      from: z.number().nullable(),
      to: z.number().nullable(),
      gross: z.boolean().nullable(),
      period: z.number().nullable(),
    }),
  });
});

const initialValues = {
  providers: [],
  name: null,
  cities: [],
  salary: {
    currency: "RUB",
    from: null,
    to: null,
    gross: null,
    period: null,
  },
};
const { values, errors, meta, setErrors, handleSubmit } = useForm({
  initialValues,
  initialTouched: true,
  validationSchema: toTypedSchema(schema.value),
});

const { createDraft } = vacancyStore;

const state = reactive({
  name: {
    is_hidden: false,
  },
  cities: {
    is_hidden: false,
  },
  professional_roles: {
    is_hidden: false,
  },
  description: {
    is_hidden: false,
  },
  salary: {
    currency: {
      is_hidden: false,
    },
    from: {
      is_hidden: false,
    },
    to: {
      is_hidden: false,
    },
    gross: {
      is_hidden: false,
    },
    period: {
      is_hidden: false,
    },
    is_hidden: true,
  },
});

const { searchCities, searchProfessionalRoles } = profileStore;
const { getCountryCities } = profileStore;
const cityOptions = ref([]);
const professionalRoleOptions = ref([]);

const { getCityName } = useResumeHooks();
const updateCityInput = async (newValue = "") => {
  const items = (await searchCities({ search: newValue })) ?? [];
  cityOptions.value = items.map((item) => ({
    value: item.id,
    name: item.name,
  }));
};

const updateProfessionalInput = async (newValue = "") => {
  let items = await searchProfessionalRoles();
  // items = items.filter((item) => item.name.includes(newValue));
  // professionalRoleOptions.value = items.map((item) => ({
  //   value: item.id,
  //   name: item.name,
  // }));
};

const getCities = async (newValue = "") => {
  if (newValue) {
    // const items = (await getCountryCities({ city_id: newValue })) ?? [];
    // cityOptions.value = items.map((item) => ({
    //   value: item.id,
    //   name: item.name,
    // }));
  }
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
const isFocused = ref(false);
const save = async (is_from_parent = false) => {
  if (is_from_parent === true) {
    isFocused.value = true;
  }
  if (!isFocused.value) {
    return true;
  }
  isLoading.value = true;
  // validate();
  errors.value = {};
  errorMessage.value = "";
  let resData = {};
  const formData = { ...values };
  formData.professional_roles = formData.professional_roles.map((item) =>
    parseInt(item),
  );
  formData.cities = formData.cities.map((item) => parseInt(item));

  resData = await createDraft(formData);

  if (resData.status !== "success") {
    if (resData.data.hasOwnProperty("errors")) {
      setErrors(resData.data.errors);
      return;
    }
    return;
  }
  const vacancy_id = resData.data.data.id;
  state.isNew = false;
  setTimeout(() => {
    console.log("redirecting...");
    navigateTo({ name: "create-vacancy", query: { draft_id: vacancy_id } });
  }, 100);

  if (is_from_parent) {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
  isChanged.value = false;
  isSaved.value = false;
  isUpdated.value = false;
};
</script>

<style>
.from-to-block {
}
</style>
