<template>
  <div
    class="w-box"
    v-click-outside="{
      handler: save,
      detectIFrame: true,
    }"
  >
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
    <div class="text-danger d-block p-4" v-if="errorMessage">
      {{ errorMessage }}
    </div>
    <transition>
      <div
        class="w-box-body"
        :class="{ collapse: isCollapsed }"
        @click="isFocused = true"
      >
        <CreateResumeDriverLicensesForm name="driver_license_types" />

        <div class="mt-4" v-show="!state.has_vehicle.is_hidden">
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
import { zod } from "~/hooks/ru-zod.js";
import { useProfileStore } from "~/store/profile";
import { useRuntimeConfig } from "#app";
import useFormValidation from "~/composables/useFormValidation";
import { useResumeStore } from "~/store/resume";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import ResumeCheckboxInput from "~/components/CreateResume/ResumeCheckboxInput.vue";
import useProviderFields from "~/composables/useProviderFields.js";
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
  },
  errors: {
    default: {},
    required: false,
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

const isCollapsed = ref(false);

const schema = computed(() => {
  return toTypedSchema(
    zod.object({
      has_vehicle: zod.boolean().nullable(),
      driver_license_types: zod.number().array().optional(),
    }),
  );
});

const initialValues = ref({
  has_vehicle: my_resume.value?.has_vehicle ?? false,
  driver_license_types:
    my_resume.value?.driver_license_types.map((item) => item.id) ?? [],
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

const fields = ref({
  hh: {
    driver_license_types: false,
    has_vehicle: false,
  },
  superjob: {
    driver_license_types: false,
    has_vehicle: null,
  },
});

const state = reactive({
  driver_license_types: {
    is_hidden: false,
  },
  has_vehicle: {
    is_hidden: false,
  },
});

const { walkThroughFields } = useProviderFields(state, fields);
const { providers } = useProviders();
watch(
  () => providers.value,
  () => {
    walkThroughFields(providers.value);
  },
);

walkThroughFields(providers.value);
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

  try {
    const resData = await updateResume(resumeID.value, {
      form_data: "DRIVER_LICENSES_DATA",
      ...values,
    });
    isFocused.value = false;
    if (resData.status !== "success") {
      errorMessage.value = resData.message || "Ошибка при сохранении";
      setErrors(resData.errors || {});
      return false;
    }

    resetForm({ values });
  } catch (err) {
    errorMessage.value = "Произошла непредвиденная ошибка";
  }

  return is_from_parent ? Promise.resolve(true) : true;
};

const isCompleted = computed(() => {
  const myResume = my_resume.value;
  if (myResume && !isCollapsed.value) {
    return myResume.driver_license_types.length > 0;
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
</script>
