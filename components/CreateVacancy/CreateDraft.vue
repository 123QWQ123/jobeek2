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
          <Cities name="cities" />
        </div>
      </div>

      <div class="input-row">
        <label>Специализация:<b>*</b></label>
        <div class="input-wrapper mt-2">
          <ProfessionalRoles name="professional_roles" />
        </div>
      </div>

      <div class="input-row">
        <label for="description">Описание:</label>
        <div class="input-wrapper">
          <VeeTipTapRichEditor name="description" />
        </div>
      </div>

      <div class="input-row">
        <label>Зарплата:</label>
        <div class="row-container">
          <div class="row mb-2">
            <div class="col-6">
              <div class="input-wrapper w-100">
                <CreateVacancyTextInput
                  type="number"
                  name="salary.from"
                  placeholder="От"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="input-wrapper w-100">
                <CreateVacancyTextInput
                  type="number"
                  name="salary.to"
                  placeholder="До"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <VeeCustomSelect
                label="Период"
                :options="periodOptions"
                name="salary.period"
              />
            </div>
            <div class="col-6">
              <VeeCustomSelect
                label="Валюта"
                :options="currencyOptions"
                name="salary.currency"
              />
            </div>
          </div>

          <div class="row mt-2">
            <CreateVacancyCheckboxInput
              name="salary.gross"
              label="до вычета налогов"
            />
          </div>
        </div>
        {{ props.providers }}
      </div>
      <!--      <CreateVacancySalary-->
      <!--        v-model="state.salary.val"-->
      <!--        :errors="errors.salary"-->
      <!--        :providers="providers"-->
      <!--      />-->
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
import { z } from "~/hooks/ru-zod.js";
import { toTypedSchema } from "@vee-validate/zod";
import VacancyTextInput from "~/components/CreateVacancy/VacancyTextInput.vue";
import ProfessionalRoles from "~/components/CreateVacancy/ProfessionalRoles.vue";
import Cities from "~/components/CreateVacancy/Cities.vue";
import { useCurrencyOptions } from "~/composables/useCurrencyOptions.js";
import { useDictionaryStore } from "~/store/dictionary.js";

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
    professional_roles: z.array(z.number()),
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
  professional_roles: [],
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

const dictionaryStore = useDictionaryStore();
const { getPaymentPeriodOptions } = dictionaryStore;
onMounted(() => {
  setTimeout(async () => {
    await getPaymentPeriodOptions();
  });
});
const currencyOptions = ref(useCurrencyOptions());
const periodOptions = computed(() => {
  return dictionaryStore.payment_period.map((item) => ({
    name: item.name,
    value: item.id,
  }));
});

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
