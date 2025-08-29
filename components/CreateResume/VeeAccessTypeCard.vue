<template>
  <div
    class="w-box"
    v-click-outside="{
      handler: save,
      detectIFrame: true,
    }"
  >
    <div class="w-box-head">
      <h3 class="title">Видимость</h3>
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
        <div class="input-row">
          <label>Тип вакансии:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="resumeAccessTypeOptions"
              name="resume_access_type_id"
              :label="'Выберите'"
            ></VeeCustomSelect>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useProfileStore } from "~/store/profile";
import useFormValidation from "~/composables/useFormValidation";
import { useDiff } from "~/composables/useDiff";
import { useDictionaryStore } from "~/store/dictionary";
import { useResumeStore } from "~/store/resume";
import { zod } from "~/hooks/ru-zod.js";
import useProviders from "~/composables/useProviders.js";

const props = defineProps({
  title: {
    default: "-",
    required: false,
  },
  providers: {
    default: {
      hh: false,
      superjob: false,
    },
    required: false,
  },
  errors: {
    default: {},
    required: false,
  },
});

const resumeStore = useResumeStore();
const profileStore = useProfileStore();
const route = useRoute();

const resumeID = computed(() => route.params.id);
const { updateResume } = resumeStore;
const { my_resume } = storeToRefs(resumeStore);

const { employer } = profileStore;

const isCollapsed = ref(false);

const { providers } = useProviders();
const isHidden = ref(false);

watch(
  () => providers.value,
  (newProviders) => {
    isHidden.value = newProviders.hh;
  },
);
const schema = computed(() => {
  return zod.object({
    resume_access_type_id: zod.number(),
  });
});

const initialValues = ref({
  resume_access_type_id: my_resume.value?.resume_access_type?.id,
});
const { errors, values, setErrors, meta, setValues, resetForm, validate } =
  useForm({
    initialValues: initialValues,
    initialTouched: true,
    validationSchema: toTypedSchema(schema.value),
  });

const state = reactive({
  resume_access_type_id: {
    val: null,
    isValid: true,
  },
  isFormValid: true,
  isNew: true,
  error: null,
  success: null,
});

const { resume_access_types } = storeToRefs(useDictionaryStore());
const resumeAccessTypeOptions = computed(() => {
  return resume_access_types.value.map((item) => ({
    name: item.name,
    value: item.id,
  }));
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
const errorMessage = ref(null);
const save = async (is_from_parent = false) => {
  if (!isFocused.value || !meta.value.dirty) {
    return false;
  }

  await validate();

  if (!meta.value.valid) {
    return false;
  }
  errorMessage.value = "";
  const resData = await updateResume(resumeID.value, {
    form_data: "ACCESS_DATA",
    ...values,
  });
  if (resData.status !== "success") {
    errorMessage.value = resData.message;
    if (resData.hasOwnProperty("errors")) {
      setErrors(resData.errors);
      return;
    }
    return;
  }
  isFocused.value = false;
  setErrors({});
  resetForm({ values });

  if (is_from_parent) {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
};

const isCompleted = computed(() => {
  const newData = my_resume.value;
  if (newData && !isCollapsed.value) {
    return newData.type && newData.type.id;
  }
  return false;
});

watch(
  () => props.errors,
  (newVal) => {
    setErrors(newVal);
  },
  { immediate: true },
);

defineExpose({
  save,
});
</script>
