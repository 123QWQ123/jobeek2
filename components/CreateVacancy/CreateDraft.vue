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
      <CreateVacancyProvidersInput name="providers" v-model="providers" />

      <div class="input-row">
        <label for="name">Название вакансии<b>*</b></label>
        <div class="input-wrapper">
          <div class="c1 mt-1">
            <CreateVacancyTextInput name="name" placeholder="Введите" />
          </div>
        </div>
      </div>
      <div class="input-row">
        <label>Список городов:<b>*</b></label>
        <div class="input-wrapper mt-2">
          <CreateVacancyCities name="cities" />
        </div>
      </div>

      <div class="input-row">
        <label>Специализация:<b>*</b></label>
        <div class="input-wrapper mt-2">
          <CreateVacancyProfessionalRoles name="professional_roles" />
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
                :options="dictionaryStore.payment_period_formatted"
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDictionaryStore } from "~/store/dictionary";

import { useProfileStore } from "~/store/profile";
import { useRuntimeConfig } from "#app";
import useFormValidation from "~/composables/useFormValidation";
import { storeToRefs } from "pinia";
import { z } from "~/hooks/ru-zod.js";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { useVacancyStore } from "~/store/vacancy.js";
import useProviders from "~/composables/useProviders.js";

const props = defineProps(["title"]);

// const providers = ref({ hh: false, superjob: false });
const { providers } = useProviders();
watch(
  () => providers.value,
  () => {
  },
);

const vacancyStore = useVacancyStore();
const dictionaryStore = useDictionaryStore();
const profileStore = useProfileStore();
const CONFIG = useRuntimeConfig();
const route = useRoute();

const { employer } = profileStore;
const { my_vacancy } = storeToRefs(vacancyStore);
const formTitle = computed(() => props.title);

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(false);
const isUpdated = ref(false);
const { getPaymentPeriodOptions } = dictionaryStore;
onMounted(() => {
  setTimeout(async () => {
    await getPaymentPeriodOptions();
  });
});
const currencyOptions = ref(useCurrencyOptions());

const schema = z.object({
  providers: z.array(z.string()).nonempty("Выберите хотя бы 1 сервис"),
  name: z.string(),
  cities: z.array(z.number()).nonempty("Выберите хотя бы 1"),
  description: z.string(),
  professional_roles: z.array(z.number()).nonempty("Выберите хотя бы 1"),
  salary: z.object({
    currency: z.string(),
    from: z.number(),
    to: z.number(),
    gross: z.boolean(),
    period: z.number(),
  }),
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
    gross: false,
    period: null,
  },
};
const { values, errors, meta, setErrors, handleSubmit, validate } = useForm({
  initialValues,
  initialTouched: true,
  validationSchema: toTypedSchema(schema),
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
    errorMessage.value = "Вам необходимо заполнить";
    scrollTop();
    errorMessageElement.value.scrollIntoView({ behavior: "smooth" });
    return;
  }
  setErrors({});
  errorMessage.value = "";
  isLoading.value = true;

  let resData = await createDraft(unref(values));

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
  const vacancy_id = resData.data.data.id;
  setTimeout(() => {
    navigateTo({
      name: "my-vacancy-id",
      params: { id: vacancy_id },
      query: { type: "draft" },
    });
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
