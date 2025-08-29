<template>
  <div class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Образование</h3>
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
        <div class="" v-if="isShown">
          <div class="row">
            <div class="input-row">
              <label for="position">Уровен образование 1<b>*</b></label>
              <div class="input-wrapper">
                <VeeCustomSelect
                  :options="educationLevelOptions"
                  :label="'Выберите'"
                  name="education_level_id"
                />
              </div>
            </div>

            <div class="mt-3">
              <LazyCreateResumeVeeEducationForm
                ref="educationElement"
                name="educations"
                :parent_type_id="state.education_level_id.val"
                :providers="props.providers"
              />
            </div>
          </div>
        </div>
        <div class="empty-area" v-else>
          <span>Здесь вы можете указать</span>
          <button class="add" type="button" @click="isShown = !isShown">
            Добавить
          </button>
        </div>

        <transition>
          <span
            v-if="isSaved"
            class="p-3 d-inline-flex justify-content-center align-items-center"
            style="color: #0c0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="me-2"
            >
              <path
                fill="#0c0"
                d="M10.041 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591zm5.959 7v-2h-8v2h8zm0-24v2h-8v-2h8zm2 0h1c2.762 0 5 2.239 5 5v1h-2v-1c0-1.654-1.346-3-3-3h-1v-2zm6 16h-2v-8h2v8zm-18 8h-1c-2.762 0-5-2.239-5-5v-1h2v1c0 1.654 1.346 3 3 3h1v2zm18-6v1c0 2.761-2.238 5-5 5h-1v-2h1c1.654 0 3-1.346 3-3v-1h2zm-24-12v-1c0-2.761 2.238-5 5-5h1v2h-1c-1.654 0-3 1.346-3 3v1h-2zm0 2h2v8h-2v-8z"
              />
            </svg>
            Сохранен
          </span>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script setup>
import useProviderFields from "~/composables/useProviderFields";
import useFormValidation from "~/composables/useFormValidation";
import { useResumeStore } from "~/store/resume";
import { useDiff } from "~/composables/useDiff";
import { useDictionaryStore } from "~/store/dictionary";
import { toTypedSchema } from "@vee-validate/zod";
import { zod } from "~/hooks/ru-zod.js";
import { useForm } from "vee-validate";

const props = defineProps({
  providers: {
    default: {
      hh: false,
      superjob: false,
    },
    required: true,
  },
});

const educationElement = ref(false);
const route = useRoute();
const resumeStore = useResumeStore();
const resumeID = computed(() => route.params.id);
const dictionaryStore = useDictionaryStore();

const educationScheme = zod.object({
  type_id: zod.number(),
  profession: zod.string(),
  institute: zod.string(),
  faculty: zod.string(),
  form_id: zod.number(),
  end_year: zod.number(),
});
const schema = computed(() => {
  const s = toTypedSchema(
    zod.object({
      education_level_id: zod.number().nullable(),
      educations: zod.array(educationScheme).optional(),
    }),
  );
  return s;
});

const initialValues = ref({
  education_level_id: null,
  educations: [],
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
  hh: {},
  superjob: {
    form_id: false,
    type_id: true,
  },
});

const state = reactive({
  education_level_id: {
    is_hidden: false,
  },
  educations: {
    is_hidden: false,
  },
});

const { walkThroughFields } = useProviderFields(state, fields);
const providers = ref(props.providers ?? []);
watch(
  () => props.providers,
  () => {
    walkThroughFields(props.providers);
  },
);
const isShown = ref(true);
const isChanged = ref(false);
const isSaved = ref(false);
const isCollapsed = ref(false);
const isUpdated = ref(false);

const educationLevelOptions = computed(() => {
  return dictionaryStore.resume_educations.map((item) => ({
    name: item.name,
    value: item.id,
  }));
});

const { getResumeEducations } = dictionaryStore;
onMounted(() => {
  getResumeEducations();
});
const sectionData = ref({
  educations: [],
});
watch(
  () => sectionData.value,
  (newData, oldData) => {
    const diffData = useDiff(newData, oldData);
    if (Object.keys(diffData).length) {
      if (newData.educations?.length > 0) {
        isShown.value = true;
      }
      resetForm({ values: newData });
    }
  },
);

watch(
  () => resumeStore.my_resume,
  (newResume) => {
    if (newResume) {
      sectionData.value = {
        educations: newResume?.educations?.primary.map((item) => ({
          faculty: item.faculty,
          institute: item.institute,
          profession: item.profession,
          end_year: item.end_year,
          type_id: item.type.id,
          form_id: item.form.id,
        })),
        education_level_id: newResume?.educations.education_level?.id,
      };
    }
  },
);

watch(
  () => state.educations.val,
  (newData) => {
    isChanged.value = true;
    errors.message = "";
  },
);

onMounted(() => {
  if (resumeStore.my_resume) {
    sectionData.value = {
      educations: resumeStore.my_resume?.educations?.primary.map((item) => ({
        faculty: item.faculty,
        institute: item.institute,
        profession: item.profession,
        end_year: item.end_year,
        type_id: item.type.id,
        form_id: item.form.id,
      })),
      education_level_id: newResume?.educations.education_level?.id,
    };
  }
});

watch(
  () => isCollapsed.value,
  (newData) => {
    if (!newData) {
      isShown.value = true;
    }
  },
);

const { getResume, updateResume } = resumeStore;

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
  if (!isFocused.value || !meta.value.dirty) {
    return false;
  }

  await validate();

  if (!meta.value.valid) {
    return false;
  }
  errorMessage.value = "";
  isFocused.value = false;

  const resData = await updateResume(resumeID.value, {
    form_data: "EDUCATION_DATA",
    educations: {
      primary: values.educations,
      education_level_id: values.education_level_id,
    },
  });

  if (resData.status !== "success") {
    errorMessage.value = resData.message;
    return handleErrorResponse(resData.data, true);
  }
  isChanged.value = false;
  isSaved.value = false;
  isUpdated.value = true;

  resetForm({ values });
};

const isCompleted = computed(() => {
  return resumeStore.resume?.educations.primary?.length > 0;
});

defineExpose({
  save,
});
</script>
