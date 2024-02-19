<template>
  <div class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Знания и навыки({{ isChanged }}) - {{ isFocused }}</h3>
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
    {{ values }}
    <hr />
    {{ errors }}
  </div>
</template>

<script setup>
import useFormValidation from "~/composables/useFormValidation";
import { useResumeStore } from "~/store/resume";
import { useDiff } from "~/composables/useDiff";
import { useDictionaryStore } from "~/store/dictionary";
import { z } from "~/hooks/ru-zod.js";
import { toTypedSchema } from "@vee-validate/zod";
import ResumeTextarea from "~/components/CreateResume/ResumeTextarea.vue";
import useProviders from "~/composables/useProviders.js";

const route = useRoute();
const resumeStore = useResumeStore();
const dictionaryStore = useDictionaryStore();
const resumeID = computed(() => route.params.id);

const isShown = ref(false);
const isChanged = ref(false);
const isSaved = ref(false);
const isCollapsed = ref(true);
const isUpdated = ref(false);

const { providers } = useProviders();

const schema = computed(() => {
  if (providers.value.hh === true && providers.value.superjob === false) {
    return z.object({
      skills: z.string().array().nullable().optional(),
      other_skills: z.string().nullable().optional(),
    });
  }
  return z.object({
    skills: z.string().array().nonempty(),
    other_skills: z.string(),
  });
});

const initialValues = ref({
  skills: [],
  other_skills: null,
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
watch(
  () => sectionData.value,
  (newData, oldData) => {
    const diffData = useDiff(newData, oldData, []);
    if (Object.keys(diffData).length) {
      resetForm({ values: newData });
    }
  },
);
const getFields = (newObject) => {
  return {
    skills: Object.values(newObject?.skills),
    other_skills: newObject?.other_skills,
  };
};
watch(
  () => resumeStore.my_resume,
  (newResume) => {
    if (newResume) {
      sectionData.value = getFields(resumeStore.my_resume);
    }
  },
);

onMounted(() => {
  if (resumeStore.my_resume) {
    sectionData.value = getFields(resumeStore.my_resume);
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
  validate();
  if (!meta.value.dirty) {
    return true;
  }
  if (!meta.value.valid) {
    return false;
  }
  const resData = await updateResume(resumeID.value, {
    ...values,
    form_data: "KNOWLEDGE_AND_SKILLS_DATA",
  });

  if (resData.status !== "success") {
    errorMessage.value = resData.message;
    return handleErrorResponse(resData.data);
  }
  isChanged.value = false;
  isSaved.value = false;
  isUpdated.value = true;

  resetForm({ values });
};

const isCompleted = computed(() => {
  return resumeStore.resume?.skills?.length > 0;
});

defineExpose({
  save,
});
</script>
