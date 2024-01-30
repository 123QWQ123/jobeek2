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

    <div class="text-danger d-block p-4" v-if="errors.message">
      {{ errors.message }}
    </div>
    <transition>
      <div
        class="w-box-body"
        :class="{ collapse: isCollapsed }"
        @click="isFocused = true"
      >
        {{ values }}
        <br />
        <!--        <VeeForm @submit="onSubmit">-->
        <!--          <div class="input-row" v-if="!state.title.is_hidden">-->
        <!--            <label>Название:<b>*</b></label>-->
        <!--            <div class="input-wrapper mt-2">-->
        <!--              <VeeField-->
        <!--                v-model="values.title"-->
        <!--                name="title"-->
        <!--                type="text"-->
        <!--                :rules="state.title.rules"-->
        <!--              />-->
        <!--              <div class="text-danger d-block">-->
        <!--                <VeeErrorMessage name="title" />-->
        <!--              </div>-->
        <!--            </div>-->
        <!--            &lt;!&ndash;            <CustomInput&ndash;&gt;-->
        <!--            &lt;!&ndash;              v-model="state.title.val"&ndash;&gt;-->
        <!--            &lt;!&ndash;              name="title"&ndash;&gt;-->
        <!--            &lt;!&ndash;              type="text"&ndash;&gt;-->
        <!--            &lt;!&ndash;              :error-message="errors.title"&ndash;&gt;-->
        <!--            &lt;!&ndash;              :rules="state.title.rules"&ndash;&gt;-->
        <!--            &lt;!&ndash;            />&ndash;&gt;-->
        <!--          </div>-->

        <!--          <button class="btn btn-primary">Submit</button>-->

        <!--          &lt;!&ndash;          <div class="input-row">&ndash;&gt;-->
        <!--          &lt;!&ndash;            <label>Специализация:<b>*</b></label>&ndash;&gt;-->
        <!--          &lt;!&ndash;            <div class="input-wrapper mt-2">&ndash;&gt;-->
        <!--          &lt;!&ndash;              <MultiSelectWithSearch&ndash;&gt;-->
        <!--          &lt;!&ndash;                v-model="state.professional_roles.val"&ndash;&gt;-->
        <!--          &lt;!&ndash;                :label="'Выберите'"&ndash;&gt;-->
        <!--          &lt;!&ndash;                :options="professionalRoleOptions"&ndash;&gt;-->
        <!--          &lt;!&ndash;              />&ndash;&gt;-->
        <!--          &lt;!&ndash;              <div class="text-danger d-block" v-if="errors.professional_roles">&ndash;&gt;-->
        <!--          &lt;!&ndash;                {{ errors.professional_roles }}&ndash;&gt;-->
        <!--          &lt;!&ndash;              </div>&ndash;&gt;-->
        <!--          &lt;!&ndash;            </div>&ndash;&gt;-->
        <!--          &lt;!&ndash;          </div>&ndash;&gt;-->
        <!--        </VeeForm>-->

        <!--        <div class="input-row" v-if="!state.title.is_hidden">-->
        <!--          <label>Название:<b>*</b></label>-->
        <!--          <div class="input-wrapper mt-2">-->
        <!--            <VeeField v-model="title" name="title" type="text" />-->

        <!--            <div class="text-danger d-block">-->
        <!--              {{ errors.title }}-->
        <!--              <VeeErrorMessage name="title" />-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->

        <!--        <div class="input-row" v-if="!state.title.is_hidden">-->
        <!--          <label>Название:<b>*</b></label>-->
        <!--          <div class="input-wrapper mt-2">-->
        <!--            <input-->
        <!--              v-model="state.title.val"-->
        <!--              type="text"-->
        <!--              @focusin="() => (errors.title = '')"-->
        <!--            />-->
        <!--            <div class="text-danger d-block" v-if="errors.title">-->
        <!--              {{ errors.title }}-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->

        <!--        <div class="input-row">-->
        <!--          <label>Специализация:<b>*</b></label>-->
        <!--          <div class="input-wrapper mt-2">-->
        <!--            <MultiSelectWithSearch-->
        <!--              :options="professionalRoleOptions"-->
        <!--              v-model="state.professional_roles.val"-->
        <!--              :label="'Выберите специализацию'"-->
        <!--              @input="updateProfessionalInput"-->
        <!--              @focusin="() => (errors.professional_roles = '')"-->
        <!--            ></MultiSelectWithSearch>-->
        <!--            <div class="text-danger d-block" v-if="errors.professional_roles">-->
        <!--              {{ errors.professional_roles }}-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->

        <!--        <div class="input-row" v-if="!state.place_of_work_id.is_hidden">-->
        <!--          <label>Место работы:</label>-->
        <!--          <div class="input-wrapper mt-2">-->
        <!--            <CustomSelect-->
        <!--              :options="placeOfWorkOptions"-->
        <!--              v-model="state.place_of_work_id.val"-->
        <!--              :label="'Выберите'"-->
        <!--              @focusin="() => (errors.place_of_work_id = '')"-->
        <!--            ></CustomSelect>-->
        <!--            <div class="text-danger d-block" v-if="errors.place_of_work_id">-->
        <!--              {{ errors.place_of_work_id }}-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->

        <!--        <div class="input-row" v-if="!state.schedules.is_hidden">-->
        <!--          <label>Графиков работы:</label>-->
        <!--          <div class="input-wrapper mt-2">-->
        <!--            <MultiSelectWithSearch-->
        <!--              :options="scheduleOptions"-->
        <!--              v-model="state.schedules.val"-->
        <!--              :label="'Выберите'"-->
        <!--              @focusin="() => (errors.schedules = '')"-->
        <!--            ></MultiSelectWithSearch>-->
        <!--            <div class="text-danger d-block" v-if="errors.schedules">-->
        <!--              {{ errors.schedules }}-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--        <div class="input-row" v-if="!state.work_types.is_hidden">-->
        <!--          <label>Типов занятостей:</label>-->
        <!--          <div class="input-wrapper mt-2">-->
        <!--            <MultiSelectWithSearch-->
        <!--              :options="workTypeOptions"-->
        <!--              v-model="state.work_types.val"-->
        <!--              :label="'Выберите'"-->
        <!--              @focusin="() => (errors.work_types = '')"-->
        <!--            ></MultiSelectWithSearch>-->
        <!--            <div class="text-danger d-block" v-if="errors.work_types">-->
        <!--              {{ errors.work_types }}-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->

        <!--        <CreateResumeSalary-->
        <!--          v-model="salary"-->
        <!--          :fields_visibility="{ currency: state.currency.is_hidden }"-->
        <!--          :errors="errors"-->
        <!--        />-->
      </div>
    </transition>
  </div>
</template>

<script setup>
// import { useForm } from "vee-validate";

const props = defineProps({
  providers: {
    default: {
      hh: false,
      superjob: false,
    },
    required: true,
  },
});

import { useProfileStore } from "~/store/profile";
import { useFormData } from "~/composables/useFormData";
import { useRuntimeConfig } from "#app";
import useFormValidation from "~/composables/useFormValidation";
import { useWatchStateValues } from "~/composables/useWatchStateValues";
import { useDiff } from "~/composables/useDiff";
import { useDictionaryStore } from "~/store/dictionary";
import useProviderFields from "~/composables/useProviderFields";

import { useResumeStore } from "~/store/resume";

const initialValues = ref({
  title: "",
  salary: "",
  currency: "",
  place_of_work_id: "",
  work_types: [],
  schedules: [],
  professional_roles: [],
});
const { setValues, values } = useForm({
  initialValues,
});

const onSubmit = async (values, { resetForm, setErrors }) => {
  console.log(initialValuesComputed.value);
  console.log(formFields);
  console.log(values);
  let resData = {};
  const jsonData = { ...values };

  jsonData.form_data = "PROFESSION_DETAILS_DATA";

  resData = await updateResume(resumeID.value, jsonData);
  const { errors } = resData;
  setErrors(errors);
};

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

const salary = ref({
  amount: null,
  currency: null,
});

watch(
  () => salary.value,
  (newData) => {
    state.salary.val = newData?.amount;
    state.currency.val = newData?.currency;
  }
);

const state = reactive({
  title: {
    val: null,
    is_hidden: false,
    rules: yup.string().required().min(1),
  },
  professional_roles: {
    val: [],
    is_hidden: false,
  },
  salary: {
    val: null,
    is_hidden: false,
  },
  currency: {
    val: "RUB",
    is_hidden: false,
  },
  work_types: {
    val: [],
    is_hidden: false,
  },
  schedules: {
    val: [],
    is_hidden: false,
  },
  place_of_work_id: {
    val: null,
    is_hidden: false,
  },
});

const fields = ref({
  hh: {
    schedules: true,
    currency: false,
  },
  superjob: {
    place_of_work_id: false,
  },
});

const initialValuesComputed = computed(() => {
  const item = "";
  const object = {};
  Object.keys(state).map((item) => {
    object[item] = state[item].val;
  });
  return object;
});

const { walkThroughFields } = useProviderFields(state, fields);
const providers = ref(props.providers ?? []);
watch(
  () => props.providers,
  () => {
    walkThroughFields(props.providers);
  }
);

onMounted(() => {
  if (providers.value.length > 0) {
    walkThroughFields(props.providers);
  }
});

const professionalRoleOptions = ref([]);

const set = (key, val) => {
  state[key].val = val;
};

watch(
  () => useWatchStateValues(state, true, true, ["providers"]),
  (newState, oldState) => {
    if (!isFirst.value) {
      isChanged.value = true;
    } else {
      isFirst.value = false;
    }
  }
);

const sectionData = ref({});
watch(
  () => resumeStore.my_resume,
  (newData) => {
    if (isUpdated.value) {
      isUpdated.value = false;
      return;
    }
    if (newData) {
      sectionData.value = {
        title: newData.title,
        salary: newData.salary,
        currency: newData.currency,
        place_of_work_id: newData.place_of_work?.id,
        work_types: Object.keys(newData.work_types),
        schedules: Object.keys(newData.schedules),
        professional_roles: newData.professional_roles.map((item) => item.id),
      };

      setValues({
        title: newData.title,
        salary: newData.salary,
        currency: newData.currency,
        place_of_work_id: newData.place_of_work?.id,
        work_types: Object.keys(newData.work_types),
        schedules: Object.keys(newData.schedules),
        professional_roles: newData.professional_roles.map((item) => item.id),
      });
    }
  }
);

watch(
  () => sectionData.value,
  (newData, oldData) => {
    const diffData = useDiff(newData, oldData);
    if (Object.keys(diffData).length) {
      state.title.val = newData.title;
      state.professional_roles.val = newData.professional_roles;
      state.work_types.val = newData.work_types;
      state.schedules.val = newData.schedules;
      state.salary.val = newData.salary;
      state.currency.val = newData.currency;
      salary.value = {
        amount: newData.salary,
        currency: newData.currency,
      };
      state.place_of_work_id.val = newData.place_of_work_id;
      state.work_types.val = newData.work_types;
    }
  }
);

const { searchCities, searchProfessionalRoles } = profileStore;
const updateProfessionalInput = async (newValue = "") => {
  let items = await searchProfessionalRoles();
  items = items.filter((item) => item.name.includes(newValue));
  professionalRoleOptions.value = items.map((item) => ({
    value: item.id,
    name: item.name,
  }));
};

const dictionaryStore = useDictionaryStore();
const { getPlaceOfWorks, getSchedules, getWorkTypes } = dictionaryStore;

const placeOfWorkOptions = computed(() => {
  return dictionaryStore.place_of_works.map((item) => ({
    name: item.name,
    value: item.id,
  }));
});

const workTypeOptions = computed(() => {
  return dictionaryStore.work_types.map((item) => ({
    name: item.name,
    value: item.id,
  }));
});
const scheduleOptions = computed(() => {
  return dictionaryStore.schedules.map((item) => ({
    name: item.name,
    value: item.id,
  }));
});

onMounted(() => {
  updateProfessionalInput();
  getSchedules();
  getWorkTypes();
  getPlaceOfWorks();
  setTimeout(async () => {}, 500);
});
const { errors, handleErrorResponse } = useFormValidation();

const isFocused = ref(false);
const save = async (is_from_parent = false) => {
  if (is_from_parent === true) {
    isFocused.value = true;
  }
  if (!isFocused.value) {
    return true;
  }
  if (isChanged.value) {
    state.isLoading = true;
    // validate();
    errors.value = {};
    state.errorMessage = "";
    let resData = {};
    const jsonData = { ...useFormData(state) };

    jsonData.form_data = "PROFESSION_DETAILS_DATA";

    resData = await updateResume(resumeID.value, jsonData);

    isUpdated.value = true;
    if (resData.status !== "success") {
      return handleErrorResponse(resData.data);
    }
    isChanged.value = false;
    isSaved.value = false;
    isUpdated.value = false;
    if (is_from_parent) {
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    }
  } else {
    return true;
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
