<template>
  <div class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Водительские права</h3>
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
        <CreateResumeDriverLicensesForm name="driver_license_types" />

        <div class="mt-4">
          <ResumeCheckboxInput
            name="has_vehicle"
            label="у Вас есть личный автомобиль"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { z } from "~/hooks/ru-zod.js";
import { useProfileStore } from "~/store/profile";
import { useRuntimeConfig } from "#app";
import useFormValidation from "~/composables/useFormValidation";
import { useWatchStateValues } from "~/composables/useWatchStateValues";
import { useDiff } from "~/composables/useDiff";
import { useDictionaryStore } from "~/store/dictionary";
import { useResumeStore } from "~/store/resume";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import ResumeCheckboxInput from "~/components/CreateResume/ResumeCheckboxInput.vue";

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
    required: true,
  },
});

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

const schema = computed(() => {
  const s = toTypedSchema(
    z.object({
      has_vehicle: z.boolean().nullable(),
      driver_license_types: z.number().array().optional(),
    }),
  );
  return s;
});

const initialValues = ref({
  has_vehicle: false,
  driver_license_types: [],
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
  validationSchema: schema,
});

const state = reactive({
  driver_license_types: {
    val: [],
    isValid: true,
  },
  has_vehicle: {
    val: false,
    isValid: true,
    is_hidden: false,
  },
  isFormValid: true,
  isNew: true,
  isLoading: false,
  error: null,
  success: null,
});

watch(
  () => useWatchStateValues(state, true, true),
  (newState, oldState) => {
    if (!isFirst.value) {
      isChanged.value = true;
    } else {
      isFirst.value = false;
    }
  },
);

const sectionData = ref({});
watch(
  () => sectionData.value,
  (newData, oldData) => {
    const diffData = useDiff(newData, oldData);
    if (Object.keys(diffData).length) {
      resetForm({
        values: {
          driver_license_types: newData.driver_license_types,
          has_vehicle: newData.has_vehicle,
        },
      });
    }
  },
);
watch(
  () => resumeStore.my_resume,
  (newData) => {
    if (isUpdated.value) {
      isUpdated.value = false;
      return;
    }
    if (newData) {
      sectionData.value = {
        driver_license_types:
          newData.driver_license_types.map((item) => item.id) ?? [],
        has_vehicle: newData.has_vehicle ?? false,
      };
    }
  },
);

const dictionaryStore = useDictionaryStore();
const { getDriverLicenses } = dictionaryStore;
onMounted(() => {
  setTimeout(async () => {
    await getDriverLicenses();
  }, 500);
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
    return false;
  }
  state.isLoading = true;
  errors.value = {};
  errorMessage.value = "";
  let resData = {};

  resData = await updateResume(resumeID.value, {
    form_data: "DRIVER_LICENSES_DATA",
    ...values,
  });

  isUpdated.value = true;
  if (resData.status !== "success") {
    errorMessage.value = resData.message;
    return handleErrorResponse(resData.data);
  }

  isChanged.value = false;
  isSaved.value = false;
  isUpdated.value = false;

  resetForm({ values });
  if (is_from_parent) {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
};

const isCompleted = computed(() => {
  const myResume = my_resume.value;
  if (myResume && !isCollapsed.value) {
    return myResume.driver_license_types.length > 0;
  }
  return false;
});

defineExpose({
  save,
});
</script>
