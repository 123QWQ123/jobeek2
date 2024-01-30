<template>
  <div class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Опыт работы({{ isChanged }}) - {{ isFocused }}</h3>
      <span
        class="arrow"
        :class="{ up: isCollapsed, 'is-completed': isCompleted }"
        @click="isCollapsed = !isCollapsed"
      ></span>
    </div>

    <div
      class="text-danger d-block p-4"
      v-if="errors.message"
      v-click-outside="(e) => (errors.message = '')"
    >
      {{ errors.message }}
    </div>
    <transition>
      <div
        class="w-box-body"
        :class="{ collapse: isCollapsed }"
        @click="isFocused = true"
      >
        <div class="form_content" v-if="isShown">
          <div class="row">
            <CreateResumeWorkExperienceHistory
              v-model="experience"
              ref="workExperienceElement"
              :errors="errors"
            />
          </div>
        </div>
        <div class="empty-area" v-else>
          <span>Здесь вы можете указать</span>
          <button class="add" type="button" @click="isShown = !isShown">
            Добавить
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import useFormValidation from "~/composables/useFormValidation";
import { useResumeStore } from "~/store/resume";
import { useDiff } from "~/composables/useDiff";
const educationElement = ref(false);
const route = useRoute();
const resumeStore = useResumeStore();
const resumeID = computed(() => route.params.id);

const experience = ref(resumeStore.my_resume?.experience ?? []);

const isShown = ref(false);
const isChanged = ref(false);
const isSaved = ref(false);
const isCollapsed = ref(true);
const isUpdated = ref(false);

const sectionData = ref({
  experience: [],
});
watch(
  () => sectionData.value,
  (newData, oldData) => {
    const diffData = useDiff(newData, oldData, ["id"]);
    if (Object.keys(diffData).length) {
      experience.value = newData.experience;
      if (experience.value.length) {
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
        experience: newResume?.experience,
      };
      nextTick(() => {
        isChanged.value = false;
      });
    }
  }
);

watch(
  () => experience.value,
  (newData) => {
    isChanged.value = true;
  }
);

onMounted(() => {
  if (resumeStore.my_resume) {
    sectionData.value = {
      experience: resumeStore.my_resume?.experience,
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
  console.log(is_from_parent);
  if (is_from_parent === true) {
    isFocused.value = true;
  }
  if (!isFocused.value) {
    return true;
  }
  console.log(isChanged.value);
  if (isChanged.value) {
    const payload = {
      form_data: "EXPERIENCE_DATA",
      experience: experience.value,
    };
    if (experience.value.length === 0) {
      delete payload.experience;
    }
    const resData = await updateResume(resumeID.value, payload);

    if (resData.status !== "success") {
      return handleErrorResponse(resData.data);
    }
    isChanged.value = false;
    isSaved.value = false;
    isUpdated.value = true;

    await getResume(resumeID.value);
    if (is_from_parent) {
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    }
  } else return true;
};

const isCompleted = computed(() => {
  return resumeStore.resume?.work_histories?.length > 0;
});

defineExpose({
  save,
});
</script>

<style scoped></style>
