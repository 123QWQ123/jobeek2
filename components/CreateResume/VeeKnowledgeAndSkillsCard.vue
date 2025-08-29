<template>
  <div
    class="w-box"
    v-click-outside="{
      handler: save,
      detectIFrame: true,
    }"
  >
    <div class="w-box-head">
      <h3 class="title">Знания и навыки</h3>
      <span
        class="arrow"
        :class="{ up: isCollapsed, 'is-completed': isCompleted }"
        @click="isCollapsed = !isCollapsed"
      ></span>
    </div>

    <div class="text-danger d-block">
      {{ errorMessage }}
    </div>
    <transition>
      <div
        class="w-box-body"
        :class="{ collapse: isCollapsed }"
        @click="isFocused = true"
      >
        <div class="row">
          <div class="col-12">
            <div class="input-row">
              <label for="description">Ключевые навыки:<b>*</b></label>
              <div class="input-wrapper">
                <CreateResumeKnowledgeAndSkillsVeeForm
                  v-if="resumeStore.my_resume"
                  name="skills"
                />
                <div class="text-danger">
                  <ErrorMessage name="skills" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 mt-4">
            <div class="input-row">
              <label for="description">Дополнительная информация:</label>
              <div class="input-wrapper">
                <ResumeTextarea name="other_skills" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import useFormValidation from "~/composables/useFormValidation";
import { useResumeStore } from "~/store/resume";
import { useDictionaryStore } from "~/store/dictionary";
import { zod } from "~/hooks/ru-zod.js";
import { toTypedSchema } from "@vee-validate/zod";
import ResumeTextarea from "~/components/CreateResume/ResumeTextarea.vue";
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

const route = useRoute();
const resumeStore = useResumeStore();
const dictionaryStore = useDictionaryStore();
const resumeID = computed(() => route.params.id);

const isCollapsed = ref(false);

const { providers } = useProviders();
const { my_resume } = storeToRefs(resumeStore);

const schema = computed(() => {
  if (providers.value.hh === true && providers.value.superjob === false) {
    return zod.object({
      skills: zod.string().array().nonempty(),
      other_skills: zod.string(),
    });
  }
  if (providers.value.hh === false && providers.value.superjob === true) {
    return zod.object({
      skills: zod.string().array().nullable().optional(),
      other_skills: zod.string().nullable().optional(),
    });
  }
  return zod.object({
    skills: zod.string().array().nonempty(),
    other_skills: zod.string(),
  });
});

const initialValues = ref({
  skills: Object.values(my_resume.value?.skills || {}) ?? [],
  other_skills: my_resume.value?.other_skills ?? null,
});
const { errors, values, setErrors, meta, setValues, resetForm, validate } =
  useForm({
    initialValues: initialValues,
    validationSchema: toTypedSchema(schema.value),
  });

const state = reactive({
  skills: {
    is_hidden: false,
  },
  other_skills: {
    is_hidden: false,
  },
});
const sectionData = ref({
  skills: [],
});

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
    ...values,
    form_data: "KNOWLEDGE_AND_SKILLS_DATA",
  });
  isFocused.value = false;
  if (resData.status !== "success") {
    errorMessage.value = resData.message;
    if (resData.hasOwnProperty("errors")) {
      setErrors(resData.errors);
      return;
    }
    return;
  }
  setErrors({});
  resetForm({ values });
};

const isCompleted = computed(() => {
  return resumeStore.resume?.skills?.length > 0;
});

watch(
  () => props.errors,
  (newVal) => {
    setErrors(newVal);
  },
  { immediate: true },
);
</script>
