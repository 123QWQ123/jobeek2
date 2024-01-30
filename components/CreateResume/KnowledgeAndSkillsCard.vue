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

    <div class="text-danger d-block p-4" v-if="errors.message">
      {{ errors.message }}
    </div>
    <transition>
      <div
        class="w-box-body"
        :class="{ collapse: isCollapsed }"
        @click="isFocused = true"
      >
        <div class="row">
          <!--          <div class="col-12">-->
          <!--            <CreateResumeKnowledgeAndSkillsForm-->
          <!--              v-if="resumeStore.my_resume"-->
          <!--              v-model="state.skills.val"-->
          <!--              :errors="errors.skills"-->
          <!--            />-->
          <!--          </div>-->
          <div class="col-12">
            <div class="input-row">
              <label for="description">Ключевые навыки:<b>*</b></label>
              <div class="input-wrapper">
                <CreateResumeKnowledgeAndSkillsForm
                  v-if="resumeStore.my_resume"
                  v-model="state.skills.val"
                  :errors="errors.skills"
                />
              </div>
            </div>
          </div>
          <div class="col-12 mt-4">
            <div class="input-row">
              <label for="description">Дополнительная информация:</label>
              <div class="input-wrapper">
                <textarea
                  class="form-control"
                  v-model="state.other_skills.val"
                  v-if="!state.other_skills.is_hidden"
                />
                <div class="text-danger d-block" v-if="errors.other_skills">
                  {{ errors.other_skills }}
                </div>
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
import { useDiff } from "~/composables/useDiff";
import { useDictionaryStore } from "~/store/dictionary";
import { useWatchStateValues } from "~/composables/useWatchStateValues";
const route = useRoute();
const resumeStore = useResumeStore();
const dictionaryStore = useDictionaryStore();
const resumeID = computed(() => route.params.id);

const state = reactive({
  skills: {
    val: [],
    is_hidden: false,
  },
  other_skills: {
    val: null,
    is_hidden: false,
  },
});

const isShown = ref(false);
const isChanged = ref(false);
const isSaved = ref(false);
const isCollapsed = ref(true);
const isUpdated = ref(false);

const sectionData = ref({
  skills: [],
});
watch(
  () => sectionData.value,
  (newData, oldData) => {
    const diffData = useDiff(newData, oldData, []);
    if (Object.keys(diffData).length) {
      state.skills.val = newData.skills;
      state.other_skills.val = newData.other_skills;
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
        skills: Object.values(newResume?.skills),
        other_skills: newResume?.other_skills,
      };
      nextTick(() => {
        isChanged.value = false;
      });
    }
  }
);

watch(
  () => useWatchStateValues(state, true, true),
  (newData) => {
    isChanged.value = true;
  }
);

onMounted(() => {
  if (resumeStore.resume) {
    sectionData.value = {
      skills: resumeStore.resume?.skills,
      other_skills: resumeStore.resume?.other_skills,
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
      form_data: "KNOWLEDGE_AND_SKILLS_DATA",
      skills: state.skills.val,
      other_skills: state.other_skills.val,
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
  return resumeStore.resume?.skills?.length > 0;
});

defineExpose({
  save,
});
</script>
