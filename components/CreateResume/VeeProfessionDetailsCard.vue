<template>
  <div class="w-box" v-click-outside="save" @click="isFocused = true">
    <div class="w-box-head">
      <h3 class="title">Детали резюме({{ isChanged }}) - {{ isFocused }}</h3>
      <span
        class="arrow"
        :class="{ up: isCollapsed, 'is-completed': isCompleted }"
        @click="isCollapsed = !isCollapsed"
      ></span>
    </div>

    <div class="text-danger d-block p-4">
      {{ errorMessage }}
    </div>
    <transition>
      <div
        class="w-box-body"
        :class="{ collapse: isCollapsed }"
        @click="isFocused = true"
      >
        <form @submit.prevent="" @focusin="errorMessage = ''">
          <div class="input-row">
            <label for="name">Название вакансии<b>*</b></label>
            <div class="input-wrapper">
              <div class="c1 mt-1">
                <ResumeTextInput name="title" />
              </div>
            </div>
          </div>

          <div class="input-row">
            <label>Специализация:<b>*</b></label>
            <div class="input-wrapper mt-2">
              <VeeMultiSelectWithSearch
                name="professional_roles"
                sort_by="none"
                :options="professionalRoleOptions"
                @input="updateProfessionalInput"
                :placeholder="'Выберите'"
              />
            </div>
          </div>

          <div class="input-row" v-show="!state.place_of_work_id.is_hidden">
            <label>Место работы:</label>
            <div class="input-wrapper mt-2">
              <VeeCustomSelect
                name="place_of_work_id"
                :options="placeOfWorkOptions"
                :label="'Выберите'"
              ></VeeCustomSelect>
            </div>
          </div>

          <div class="input-row" v-show="!state.schedules.is_hidden">
            <label>Графиков работы:<b>*</b></label>
            <div class="input-wrapper mt-2">
              <VeeMultiSelectWithSearch
                :options="scheduleOptions"
                name="schedules"
                placeholder="Выберите"
              />
            </div>
          </div>

          <div class="input-row" v-show="!state.work_types.is_hidden">
            <label>Тип работы:<b>*</b></label>
            <div class="input-wrapper mt-2">
              <VeeMultiSelectWithSearch
                name="work_types"
                sort_by="none"
                :options="workTypeOptions"
                placeholder="Выберите"
              />
            </div>
          </div>

          <div class="input-row">
            <label>Какой доход вы рассматриваете?</label>
            <div class="row-container">
              <div class="row">
                <div class="col-8">
                  <div
                    class="mb-3"
                    :class="{
                      'input-wrapper': !state.currency.is_hidden,
                      'input-group': state.currency.is_hidden,
                    }"
                  >
                    <Field
                      v-show="!state.salary.is_hidden"
                      name="salary"
                      :class="{ 'form-control': state.currency.is_hidden }"
                      type="number"
                      placeholder="Укажите сумму"
                    />
                    <span
                      class="input-group-text"
                      v-show="state.currency.is_hidden"
                      >₽</span
                    >
                  </div>

                  <div class="text-danger">
                    <ErrorMessage name="salary" />
                  </div>
                </div>
                <div class="col-4" v-show="!state.currency.is_hidden">
                  <VeeCustomSelect
                    name="currency"
                    :label="'Валюта'"
                    :options="currencyOptions"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useCurrencyOptions } from "~/composables/useCurrencyOptions.js";
import { useProfileStore } from "~/store/profile";
import { useRuntimeConfig } from "#app";
import useFormValidation from "~/composables/useFormValidation";
import { useDiff } from "~/composables/useDiff";
import { useDictionaryStore } from "~/store/dictionary";
import useProviderFields from "~/composables/useProviderFields";
import { z } from "~/hooks/ru-zod.js";
import { toTypedSchema } from "@vee-validate/zod";
import { useResumeStore } from "~/store/resume";
import ResumeTextInput from "~/components/CreateResume/ResumeTextInput.vue";
import useProviders from "~/composables/useProviders.js";
import useFilter from "~/composables/useFilter.js";

const dictionaryStore = useDictionaryStore();

const props = defineProps({
  providers: {
    default: {
      hh: false,
      superjob: false,
    },
    required: true,
  },
});

const profileStore = useProfileStore();
const CONFIG = useRuntimeConfig();
const route = useRoute();

const resumeID = computed(() => route.params.id);

const { employer } = profileStore;
const resumeStore = useResumeStore();
const { updateResume } = resumeStore;
const my_resume = computed(() => resumeStore.my_resume);

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(false);
const isUpdated = ref(false);
const { providers } = useProviders();

const currencyOptions = useCurrencyOptions();
const professionalRoleOptions = ref([]);

const schema = computed(() => {
  if (providers.value.hh === true && providers.value.superjob === false) {
    return z.object({
      title: z.string().min(2),
      salary: z.number(),
      currency: z.string().nullable().optional(),
      place_of_work_id: z.number().nullable(),
      professional_roles: z.array(z.number()).array().nonempty(),
      work_types: z.array(z.number()).nonempty(),
      schedules: z.array(z.number()).nonempty(),
    });
  }
  if (providers.value.hh === false && providers.value.superjob === true) {
    return z.object({
      title: z.string().nullable().optional(),
      salary: z.number().min(2),
      currency: z.string().nullable(),
      place_of_work_id: z.number().nullable(),
      professional_roles: z.array(z.number()).nonempty(),
      work_types: z.array(z.number()).nonempty(),
      schedules: z.array(z.number()).nonempty(),
    });
  }
  return z.object({
    title: z.string().min(2),
    professional_roles: z.number().array().nonempty(),
    work_types: z.array(z.number()).nonempty(),
    schedules: z.array(z.number()).nonempty(),
    salary: z.number().nullable(),
    currency: z.string(),
    place_of_work_id: z.number().nullable(),
  });
});

const initialValues = computed(() => {
  return {
    title: null,
    professional_roles: [],
    work_types: [],
    schedules: [],
    place_of_work_id: null,
    salary: null,
    currency: "RUB",
  };
});
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
  title: {
    is_hidden: false,
  },
  professional_roles: {
    is_hidden: false,
  },
  salary: {
    is_hidden: false,
  },
  currency: {
    is_hidden: false,
  },
  work_types: {
    is_hidden: false,
  },
  schedules: {
    is_hidden: false,
  },
  place_of_work_id: {
    is_hidden: false,
  },
});

const fields = ref({
  hh: {
    professional_roles: true,
    title: true,
    schedules: true,
    work_types: true,
    place_of_work_id: null,
    salary: false,
    currency: false,
  },
  superjob: {
    professional_roles: true,
    title: true,
    schedules: null,
    work_types: false,
    place_of_work_id: false,
    salary: false,
    currency: null,
  },
});

const { walkThroughFields } = useProviderFields(state, fields);

watch(
  () => providers.value,
  () => {
    walkThroughFields(providers.value);
  },
);

onMounted(() => {
  walkThroughFields(providers.value);
});

const sectionData = ref({});
const getFields = (newObject) => {
  return {
    title: newObject.title,
    salary: newObject.salary,
    currency: newObject.currency,
    place_of_work_id: newObject.place_of_work?.id ?? null,
    work_types: Object.keys(newObject.work_types).map((item) => parseInt(item)),
    schedules: Object.keys(newObject.schedules).map((item) => parseInt(item)),
    professional_roles: newObject.professional_roles.map((item) => item.id),
  };
};
watch(
  () => resumeStore.my_resume,
  (newData) => {
    if (newData) {
      sectionData.value = getFields(newData);
    }
  },
);
onMounted(() => {
  const newData = resumeStore.my_resume;
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

const {
  searchCities,
  searchProfessionalRoles,
  searchHHProfessionalRoles,
  searchSuperjobProfessionalRoles,
} = profileStore;

const selectedProviders = computed(() => {
  if (providers.value.hh === true && providers.value.superjob === false)
    return ["hh"];
  if (providers.value.hh === false && providers.value.superjob === true)
    return ["superjob"];
  return ["hh", "superjob"];
});

const isHHSelected = computed(() => selectedProviders.value.includes("hh"));
const isSuperjobSelected = computed(() =>
  selectedProviders.value.includes("superjob"),
);

const isHHProfRolesNeeded = computed(() => {
  if (!isHHSelected.value) return false;
  if (prof_role_ids.value.length < 1) return true;
  const selected_fields_values = [...prof_role_ids.value];
  return !selected_fields_values.some((item) =>
    profileStore.hh_professional_roles_with_parent_ids.includes(item),
  );
});
const isSuperjobProfRolesNeeded = computed(() => {
  if (!isSuperjobSelected.value) return false;
  if (prof_role_ids.value.length < 1) return true;
  const selected_fields_values = [...prof_role_ids.value];
  return !selected_fields_values.some((item) =>
    profileStore.superjob_professional_roles_with_parent_ids.includes(item),
  );
});

const isHHWorkTypesNeeded = computed(() => {
  if (!isHHSelected.value) return false;
  if (work_type_ids.value.length < 1) return true;
  const selected_fields_values = [...work_type_ids.value];
  return !selected_fields_values.some((item) =>
    hhWorkTypes.value.includes(item),
  );
});
const isSuperjobWorkTypesNeeded = computed(() => {
  if (!isSuperjobSelected.value) return false;
  if (work_type_ids.value.length < 1) return true;
  const selected_fields_values = [...work_type_ids.value];
  return !selected_fields_values.some((item) =>
    superjobWorkTypes.value.includes(item),
  );
});

const hhWorkTypes = ref([]);
const superjobWorkTypes = ref([]);
const { uniq } = useFilter();
const { value: prof_role_ids } = useField("professional_roles");
watch(
  () => prof_role_ids.value,
  async () => {
    let items = [];
    if (isHHProfRolesNeeded.value) {
      const new_h = profileStore.hh_professional_roles_with_parent;
      items = items.concat(new_h);
    }
    if (isSuperjobProfRolesNeeded.value) {
      const new_s = profileStore.superjob_professional_roles_with_parent;
      items = items.concat(new_s);
    }
    if (isHHProfRolesNeeded.value || isSuperjobProfRolesNeeded.value) {
      items = items.concat(profileStore.professional_roles_with_parent);
      items = uniq(items, "value");
      professionalRoleOptions.value = items;
    } else {
      professionalRoleOptions.value =
        profileStore.professional_roles_with_parent;
    }
  },
);

const { value: work_type_ids } = useField("work_types");
watch(
  () => work_type_ids.value,
  async () => {
    let items = [];
    if (isHHWorkTypesNeeded.value) {
      const new_h = dictionaryStore.hh_work_types.map((item) => ({
        value: item.id,
        name: item.name,
      }));
      items = items.concat(new_h);
    }
    if (isSuperjobWorkTypesNeeded.value) {
      const new_s = dictionaryStore.superjob_work_types.map((item) => ({
        value: item.id,
        name: item.name,
      }));
      items = items.concat(new_s);
    }
    if (isHHWorkTypesNeeded.value || isSuperjobWorkTypesNeeded.value) {
      const all_items = dictionaryStore.work_types;
      items = items.concat(all_items);
      items = uniq(items, "value");
      workTypeOptions.value = items;
    } else {
      const all_items = dictionaryStore.work_types;
      workTypeOptions.value = all_items;
    }
  },
);

const updateProfessionalInput = async (newValue = "", providers = []) => {
  console.log("update options");
  let items = await searchProfessionalRoles();
  if (newValue) {
    items = items
      .filter((item) => item.parent_id !== 0)
      .filter((item) => item.name.includes(newValue));
  } else {
    items = items.filter((item) => item.parent_id !== 0);
  }
  professionalRoleOptions.value = items.map((item) => ({
    value: item.id,
    name: item.name,
  }));
};

watch(
  () => dictionaryStore.hh_work_types,
  () => {
    hhWorkTypes.value = dictionaryStore.hh_work_types.map((item) => item.id);
  },
);
watch(
  () => dictionaryStore.superjob_work_types,
  () => {
    superjobWorkTypes.value = dictionaryStore.superjob_work_types.map(
      (item) => item.id,
    );
  },
);
const updateHHProfessionalRoles = async (newValue = "") => {
  await searchHHProfessionalRoles();
};
const updateSuperjobProfessionalRoles = async (newValue = "") => {
  await searchSuperjobProfessionalRoles();
};
const updateHHWorkTypes = async (newValue = "") => {
  let items;
  items = await getHHWorkTypes();
  items = items.filter((item) => item.parent_id !== 0);
  hhWorkTypes.value = items.map((item) => item.id);
};
const updateSuperjobWorkTypes = async (newValue = "") => {
  let items;
  items = await getSuperjobWorkTypes();
  superjobWorkTypes.value = items.map((item) => item.id);
};

const {
  getPlaceOfWorks,
  getSchedules,
  getWorkTypes,
  getHHWorkTypes,
  getSuperjobWorkTypes,
} = dictionaryStore;

const placeOfWorkOptions = computed(() => {
  return dictionaryStore.place_of_works.map((item) => ({
    name: item.name,
    value: item.id,
  }));
});

const workTypeOptions = ref([]);
const scheduleOptions = computed(() => {
  return dictionaryStore.schedules.map((item) => ({
    name: item.name,
    value: item.id,
  }));
});

onMounted(() => {
  updateProfessionalInput("");
  updateHHProfessionalRoles();
  updateSuperjobProfessionalRoles();
  getWorkTypes();
  updateHHWorkTypes();
  updateSuperjobWorkTypes();
  getSchedules();
  getPlaceOfWorks();
});
const { errors: serverErrors, handleErrorResponse } = useFormValidation();
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
  let resData = {};

  resData = await updateResume(resumeID.value, {
    ...values,
    form_data: "PROFESSION_DETAILS_DATA",
  });

  isUpdated.value = true;
  if (resData.status !== "success") {
    if (resData.message) {
      errorMessage.value = resData.message;
    }
    if (resData.data.hasOwnProperty("errors")) {
      setErrors(resData.data.errors);
    }
    return handleErrorResponse(resData.data);
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
  const myResume = my_resume.value;
  if (myResume && !isCollapsed.value) {
    return myResume.address && myResume.address.address;
  }
  return false;
});

defineExpose({
  save,
});
</script>
