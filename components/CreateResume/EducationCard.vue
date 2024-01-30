<template>
  <div class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Образование({{ isChanged }}) - {{ isFocused }}</h3>
      <span
        class="arrow"
        :class="{ up: isCollapsed, 'is-completed': isCompleted }"
        @click="isCollapsed = !isCollapsed"
      ></span>
    </div>

    <div
      class="text-danger d-block p-4"
      v-if="errors.message"
      v-click-outside="() => (errors.message = '')"
    >
      {{ errors.message }}
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
                <CustomSelect
                  :options="educationLevelOptions"
                  :label="'Выберите'"
                  v-model="state.education_level_id.val"
                  @focusin="() => (errors.education_level_id = '')"
                />

                <div
                  class="text-danger d-block"
                  v-if="errors.education_level_id"
                >
                  {{ errors.education_level_id }}
                </div>
              </div>
            </div>

            <div class="mt-3">
              <CreateResumeEducationHistory
                ref="educationElement"
                v-model="state.educations.val"
                :parent_type_id="state.education_level_id.val"
                :providers="props.providers"
                :errors="errors.primary"
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

const props = defineProps({
  providers: {
    default: {
      hh: false,
      superjob: false,
    },
    required: true,
  },
});

import useFormValidation from "~/composables/useFormValidation";
import { useResumeStore } from "~/store/resume";
import { useDiff } from "~/composables/useDiff";
import { useDictionaryStore } from "~/store/dictionary";
const educationElement = ref(false);
const route = useRoute();
const resumeStore = useResumeStore();
const resumeID = computed(() => route.params.id);
const dictionaryStore = useDictionaryStore();

// const educations = ref(resumeStore.resume?.educations.primary ?? []);
// const education_level_id = ref(resumeStore.resume?.education_level?.id ?? null);

const fields = ref({
  hh: {},
  superjob: {
    form_id: false,
    type_id: true,
  },
});
const state = reactive({
  education_level_id: {
    val: resumeStore.resume?.education_level?.id,
    isValid: null,
  },
  educations: {
    val: resumeStore.resume?.educations.primary ?? [],
    isValid: null,
  },
});

const { walkThroughFields } = useProviderFields(state, fields);
const providers = ref(props.providers ?? []);
watch(
  () => props.providers,
  () => {
    walkThroughFields(props.providers);
  }
);
const isShown = ref(false);
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

const sectionData = ref({
  educations: [],
});
watch(
  () => sectionData.value,
  (newData, oldData) => {
    const diffData = useDiff(newData, oldData, ["id"]);
    if (Object.keys(diffData).length) {
      state.educations.val = newData.educations;
      state.education_level_id.value = newData.education_level_id;
      if (newData.education_level_id) {
        isShown.value = true;
      }

      if (isUpdated.value) {
        isUpdated.value = false;
        return;
      }
    }
  }
);

watch(
  () => resumeStore.my_resume,
  (newResume) => {
    if (newResume) {
      sectionData.value = {
        educations: newResume?.educations?.primary.map((item) => ({
          id: item.id,
          faculty: item.faculty,
          institute: item.institute,
          profession: item.profession,
          end_year: item.end_year,
          type_id: item.type.id,
        })),
        education_level_id: newResume?.educations.education_level?.id,
      };
      nextTick(() => {
        isChanged.value = false;
      });
    }
  }
);

watch(
  () => state.educations.val,
  (newData) => {
    isChanged.value = true;
    errors.message = "";
  }
);

onMounted(() => {
  if (resumeStore.my_resume) {
    sectionData.value = {
      educations: resumeStore.resume?.educations?.primary,
      education_level_id: resumeStore.resume?.educations.education_level?.id,
    };
    nextTick(() => {
      isChanged.value = false;
    });
  }
});

watch(
  () => isCollapsed.value,
  (newData) => {
    if (!newData) {
      isShown.value = true;
    }
  }
);

const { getResume, updateResume } = resumeStore;

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
    const resData = await updateResume(resumeID.value, {
      form_data: "EDUCATION_DATA",
      educations: {
        primary: state.educations.val,
        education_level_id: state.education_level_id.val,
      },
    });

    if (resData.status !== "success") {
      return handleErrorResponse(resData.data);
    }
    isChanged.value = false;
    isSaved.value = false;
    isUpdated.value = true;

    await getResume(resumeID.value);
  }
};

const isCompleted = computed(() => {
  return resumeStore.resume?.educations.primary?.length > 0;
});

defineExpose({
  save,
});
</script>
