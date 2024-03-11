<template>
  <div class="w-box" v-click-outside="save" @click="isFocused = true">
    <div class="w-box-head">
      <h3 class="title">Где публиковать?({{ isChanged }})</h3>
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
          <label>Список городов:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <CreateVacancyCities
              name="cities"
              :selected_options="selectedCityOptions"
            />
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
const selectedCityOptions = ref([]);

const schema = computed(() => {
  // if (providers.value.hh === true && providers.value.superjob === false) {
  //   return z.object({
  //     salary: z.number(),
  //     currency: z.string().nullable().optional(),
  //     place_of_work_id: z.number().nullable(),
  //     work_types: z.array(z.number()).nonempty(),
  //     schedules: z.array(z.number()).nonempty(),
  //   });
  // }
  // if (providers.value.hh === false && providers.value.superjob === true) {
  //   return z.object({
  //     title: z.string().nullable().optional(),
  //     salary: z.number().min(2),
  //     currency: z.string().nullable(),
  //     place_of_work_id: z.number().nullable(),
  //     professional_roles: z.array(z.number()).nonempty(),
  //     work_types: z.array(z.number()).nonempty(),
  //     schedules: z.array(z.number()).nonempty(),
  //   });
  // }
  return z.object({
    cities: z.array(z.number()).optional(),
  });
});

const initialValues = {
  cities: [],
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
  cities: {
    is_hidden: false,
  },
});

const fields = ref({
  hh: {
    cities: true,
  },
  superjob: {
    cities: true,
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
    cities: newObject.cities.map((item) => item.id),
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
const dictionaryStore = useDictionaryStore();

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

  jsonData.action = "UpdateCities";
  if (type.value === "draft") {
    resData = await updateDraft(objectID.value, jsonData);
  } else {
    resData = await updateVacancy(objectID.value, jsonData);
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
// const save = async (is_from_parent = false) => {
//   if (is_from_parent === true) {
//     isFocused.value = true;
//   }
//   if (!isFocused.value) {
//     return true;
//   }
//
//   if (isChanged.value) {
//     state.isLoading = true;
//     errors.value = {};
//     state.errorMessage = "";
//     let resData = {};
//     const jsonData = useFormData(state);
//     jsonData.action = "UpdateCities";
//     resData = await updateDraft(draftID.value, jsonData);
//     isUpdated.value = true;
//     if (resData.status !== "success") {
//       return handleErrorResponse(resData.data);
//     }
//
//     isChanged.value = false;
//     isSaved.value = false;
//     isUpdated.value = false;
//     if (is_from_parent) {
//       return new Promise((resolve, reject) => {
//         resolve(true);
//       });
//     }
//   } else {
//     return true;
//   }
// };

const isCompleted = computed(() => {
  const myVacancy = my_vacancy.value;
  if (myVacancy && !isCollapsed.value) {
    return (
      myVacancy.first_name &&
      myVacancy.last_name &&
      myVacancy.id &&
      myVacancy.birth_date &&
      myVacancy.city_id &&
      myVacancy.phone &&
      myVacancy.phone_time_start &&
      myVacancy.phone_time_end &&
      myVacancy.email
    );
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
