<template>
  <div class="w-box" v-click-outside="save" @click="isFocused = true">
    <div class="w-box-head">
      <h3 class="title">Зарплата({{ isChanged }})</h3>
      <span
        class="arrow"
        :class="{ up: isCollapsed, 'is-completed': isCompleted }"
        @click="isCollapsed = !isCollapsed"
      ></span>
    </div>

    <div class="text-danger d-block p-4" v-if="errors.message">
      {{ errors.message }}
    </div>
    <transition>
      <div class="w-box-body" :class="{ collapse: isCollapsed }">
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
    </transition>
  </div>
</template>

<script setup>
import { useVacancyStore } from "~/store/vacancy";
import { useProfileStore } from "~/store/profile";
import { useRuntimeConfig } from "#app";
import { useDiff } from "~/composables/useDiff";
import { z } from "~/hooks/ru-zod.js";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import useProviderFields from "~/composables/useProviderFields.js";
import { useDictionaryStore } from "~/store/dictionary.js";
import useProviders from "~/composables/useProviders.js";
import { useCurrencyOptions } from "~/composables/useCurrencyOptions.js";

const props = defineProps(["title"]);

const vacancyStore = useVacancyStore();
const profileStore = useProfileStore();
const CONFIG = useRuntimeConfig();
const route = useRoute();

const { providers } = useProviders();
const ID = computed(() => route.params.id);
const type = computed(() => route.query.type);
const { updateVacancy, updateDraft, getMyVacancy, getMyDraft } = vacancyStore;

const { employer } = profileStore;
const my_vacancy = computed(() => vacancyStore.my_vacancy);

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(false);
const isUpdated = ref(false);
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

const schema = computed(() => {
  // if (providers.value.hh === true && providers.value.superjob === false) {
  //   return z
  //     .object({
  //       type_id: z.number(),
  //       custom_employer_name: z.string().nullable(),
  //       response_url: z.string().nullable(),
  //     })
  //     .refine((data) => data.type_id === 48, {
  //       message: "custom_employer_name field is required",
  //       path: ["custom_employer_name"], // Pointing out which field is invalid
  //     });
  // }
  // if (providers.value.hh === false && providers.value.superjob === true) {
  //   return z
  //     .object({
  //       type_id: z.number(),
  //       custom_employer_name: z.string().optional(),
  //       response_url: z.string().optional(),
  //     })
  //     .refine((data) => data.type_id === 48, {
  //       message: "custom_employer_name field is required",
  //       path: ["custom_employer_name"], // Pointing out which field is invalid
  //     });
  // }
  return z.object({
    salary: z.object({
      currency: z.string(),
      gross: z.boolean(),
      from: z.number(),
      to: z.number(),
      period: z.number(),
    }),
  });
});

const initialValues = {
  currency: "RUB",
  from: null,
  to: null,
  gross: null,
  period: null,
};
const {
  values,
  errors,
  meta,
  resetForm,
  setValues,
  setErrors,
  handleSubmit,
  validate,
} = useForm({
  initialValues: initialValues,
  initialTouched: true,
  validationSchema: toTypedSchema(schema.value),
});

const state = reactive({
  salary: {
    currency: {
      is_hidden: false,
    },
    gross: {
      is_hidden: false,
    },
    from: {
      is_hidden: false,
    },
    to: {
      is_hidden: false,
    },
    period: {
      is_hidden: false,
    },
  },
});

const fields = ref({
  hh: {
    salary: {
      currency: false,
      from: false,
      gross: false,
      to: false,
      period: null,
    },
  },
  superjob: {
    salary: {
      currency: false,
      from: false,
      gross: null,
      to: false,
      period: false,
    },
  },
});

const { walkThroughFields } = useProviderFields(state, fields);
walkThroughFields(providers.value);

onMounted(() => {
  walkThroughFields(providers.value);
});

const sectionData = ref({});
const getFields = (newObject) => {
  return {
    salary: { ...newObject.salary, period: newObject.salary.period?.id },
  };
};
watch(
  () => vacancyStore.my_vacancy,
  (newData) => {
    if (newData) {
      sectionData.value = getFields(newData);
    }
  },
);

onMounted(() => {
  const newData = vacancyStore.my_vacancy;
  if (newData) {
    sectionData.value = getFields(newData);
  }
});

watch(
  () => sectionData.value,
  (newData, oldData) => {
    const diffData = useDiff(newData, oldData);
    if (Object.keys(diffData).length) {
      resetForm({ values: newData });
    }
  },
);

const isFocused = ref(false);
const isLoading = ref(false);
const errorMessage = ref(null);
const save = async (is_from_parent = false) => {
  validate();
  if (!meta.value.dirty) {
    return true;
  }
  if (!meta.value.valid) {
    errorMessage.value = "Запольните все поля";
    return false;
  }
  isLoading.value = true;
  setErrors({});
  errorMessage.value = "";
  let jsonData = { ...values };
  let resData = {};

  jsonData.action = "UpdateSalary";
  if (type.value === "draft") {
    resData = await updateDraft(ID.value, jsonData);
  } else {
    resData = await updateVacancy(ID.value, jsonData);
  }

  isUpdated.value = true;
  if (resData.status !== "success") {
    errorMessage.value = resData.message;
    if (resData.hasOwnProperty("errors")) {
      setErrors(resData.errors);
      return;
    }
    return;
  }
  resetForm({ values });
  isSaved.value = false;
  isUpdated.value = false;
  if (is_from_parent) {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
};

const isCompleted = computed(() => {
  const myVacancy = my_vacancy.value;
  if (myVacancy && !isCollapsed.value) {
    return myVacancy.type_id !== null;
  }
  return false;
});

defineExpose({
  save,
});
</script>

<style>
.from-to-block {
}
</style>
