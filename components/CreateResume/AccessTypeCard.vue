<template>
  <div v-if="isHidden" class="w-box" v-click-outside="save">
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
import { useRuntimeConfig } from "#app";
import useFormValidation from "~/composables/useFormValidation";
import { useDiff } from "~/composables/useDiff";
import { useDictionaryStore } from "~/store/dictionary";
import { useResumeStore } from "~/store/resume";
import { zod } from "~/hooks/ru-zod.js";
import useProviders from "~/composables/useProviders.js";

const props = defineProps(["title", "providers"]);

const resumeStore = useResumeStore();
const profileStore = useProfileStore();
const CONFIG = useRuntimeConfig();
const route = useRoute();

const resumeID = computed(() => route.params.id);
const { updateResume, getMyResume } = resumeStore;

const { employer } = profileStore;
const my_resume = computed(() => resumeStore.my_resume);

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(false);
const isUpdated = ref(false);

const { providers } = useProviders();
const isHidden = ref(providers.value.hh ?? false);
watch(
  () => providers.value,
  (newProviders) => {
    isHidden.value = newProviders.hh;
  },
);
const schema = computed(() => {
  if (providers.value.hh === true && providers.value.superjob === false) {
    return zod.object({
      resume_access_type_id: zod.number(),
    });
  }
  if (providers.value.hh === false && providers.value.superjob === true) {
    return zod.object({
      resume_access_type_id: zod.number().optional(),
    });
  }
  return zod.object({
    resume_access_type_id: zod.number(),
  });
});

const initialValues = ref({
  resume_access_type_id: null,
});
const { errors, values, setErrors, meta, setValues, resetForm, validate } =
  useForm({
    initialValues: initialValues,
    validationSchema: toTypedSchema(schema.value),
  });

const state = reactive({
  resume_access_type_id: {
    val: null,
    isValid: true,
  },
  isFormValid: true,
  isNew: true,
  isLoading: false,
  error: null,
  success: null,
});

const sectionData = ref({});
watch(
  () => sectionData.value,
  (newData, oldData) => {
    const diffData = useDiff(newData, oldData);
    if (Object.keys(diffData).length) {
      resetForm({ values: newData });
    }
  },
);
watch(
  () => resumeStore.my_resume,
  (newData) => {
    if (newData) {
      sectionData.value = {
        resume_access_type_id: newData.resume_access_type?.id,
      };
    }
  },
);
onMounted((newData) => {
  if (resumeStore.my_resume) {
    sectionData.value = {
      resume_access_type_id: resumeStore.my_resume.resume_access_type?.id,
    };
  }
});

const dictionaryStore = useDictionaryStore();
const { getResumeAccessTypes } = dictionaryStore;
onMounted(() => {
  setTimeout(async () => {
    await getResumeAccessTypes();
  }, 500);
});
const resumeAccessTypeOptions = computed(() => {
  return dictionaryStore.resume_access_types.map((item) => ({
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
const isLoading = ref(false);
const errorMessage = ref(null);
const save = async (is_from_parent = false) => {
  validate();
  if (!meta.value.dirty) {
    return true;
  }
  if (!meta.value.valid) {
    errorMessage.value = "Заполните все поля";
    return false;
  }
  state.isLoading = true;
  errors.value = {};
  state.errorMessage = "";
  let resData = {};
  resData = await updateResume(resumeID.value, {
    form_data: "ACCESS_DATA",
    ...values,
  });
  isUpdated.value = true;
  if (resData.status !== "success") {
    return handleErrorResponse(resData.data);
  }

  isChanged.value = false;
  isSaved.value = false;
  isUpdated.value = false;
  isFocused.value = false;

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

defineExpose({
  save,
});
</script>
