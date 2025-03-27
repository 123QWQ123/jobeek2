<template>
  <div class="w-box w-box--main w-box-position" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Должность и доход</h3>
      <span
        class="arrow"
        :class="{ up: isCollapsed, 'is-completed': isCompleted }"
        @click="isCollapsed = !isCollapsed"
      ></span>
    </div>

    <div class="text-danger d-block p-4" v-if="errors.message">
      {{ errors.message }}
    </div>
    <div class="w-box-body" :class="{ collapse: isCollapsed }">
      <div class="input-row">
        <label>Какую должность вы хотите занимать? <b>*</b></label>
        <div class="input-wrapper">
          <input
            type="text"
            placeholder="Укажите должность"
            id="title"
            v-model="state.title.val"
            @focusin="() => (errors.title = '')"
          />

          <div class="text-danger d-block" v-if="errors.title">
            {{ errors.title }}
          </div>
        </div>
      </div>
      <CreateResumeSalary
        v-model="state.salary.val"
        @clear-error="clearInputError"
        :errors="errors"
      />

      <div class="input-row">
        <label>Занятость <b>*</b></label>
        <div class="input-wrapper">
          <CustomSelect
            :options="employmentOptions"
            v-model="state.employment_id.val"
            @focusin="() => (errors.employment_id = '')"
          />

          <div class="text-danger d-block" v-if="errors.employment_id">
            {{ errors.employment_id }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useResumeStore } from "~/store/resume";

import { useProfileStore } from "~/store/profile";
import useFormValidation from "~/composables/useFormValidation";
import { useWatchStateValues } from "~/composables/useWatchStateValues";
import { useDiff } from "~/composables/useDiff";
import { useDictionaryStore } from "~/store/dictionary";
const resumeStore = useResumeStore();
const profileStore = useProfileStore();

const dictionaryStore = useDictionaryStore();

const { getWorkTypes } = dictionaryStore;
await getWorkTypes();
const employmentOptions = computed(() => {
  return dictionaryStore.work_types.map((item) => ({
    name: item.name,
    value: item.id,
  }));
});

const route = useRoute();

const draftID = computed(() => route.query.draft_id);
const vacancyID = computed(() => route.query.vacancy_id);

const { seeker } = profileStore;
const resume = computed(() => resumeStore.resume);

const isShown = ref(false);
const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(false);
const isUpdated = ref(false);

const { getResume } = resumeStore;

const state = reactive({
  title: {
    val: resume.title,
    isValid: true,
  },
  salary: {
    val: {
      amount: resume.value.salary_from,
      currency: resume.value.salary_currency,
    },
    isValid: true,
  },
  employment_id: {
    val: resume.value.employment_id,
    isValid: true,
  },
  isFormValid: true,
  isNew: true,
  isLoading: false,
  error: null,
  success: null,
});

watch(
  () => useWatchStateValues(state, true, true),
  () => {
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
    const diffData = useDiff(newData, oldData, [
      "id",
      "created_at",
      "updated_at",
    ]);
    if (Object.keys(diffData).length) {
      state["title"].val = newData["title"];
      state["salary"].val.amount = newData["salary_from"];
      state["salary"].val.currency = newData["salary_currency"];
      state["employment_id"].val = newData["employment_id"];
      if (isUpdated.value) {
        isUpdated.value = false;
        return;
      }
    }
  },
);
watch(
  () => resumeStore.resume,
  (newResume) => {
    if (newResume) {
      sectionData.value = {
        title: resumeStore.resume?.title,
        salary_from: resumeStore.resume?.salary_from,
        salary_currency: resumeStore.resume?.salary_currency,
        employment_id: resumeStore.resume?.employment_id,
      };
      nextTick(() => {
        isChanged.value = false;
      });
    }
  },
);

onMounted(() => {
  if (resumeStore.resume) {
    sectionData.value = {
      title: resumeStore.resume?.title,
      salary_from: resumeStore.resume?.salary_from,
      salary_currency: resumeStore.resume?.salary_currency,
      employment_id: resumeStore.resume?.employment_id,
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
  },
);

const { updateResume } = resumeStore;

const { errors, handleErrorResponse, clearInputError } = useFormValidation();

const save = async () => {
  if (isChanged.value) {
    state.isLoading = true;
    // validate();
    errors.value = {};
    state.errorMessage = "";
    const jsonData = {
      salary_currency: state.salary.val.currency,
      title: state.title.val,
      salary_from: state.salary.val.amount,
      employment_id: state.employment_id.val,
      form_data: "PROFESSION_DETAILS_DATA",
    };
    state.isLoading = true;
    errors.value = {};
    state.errorMessage = "";

    const resData = await updateResume(draftID.value, jsonData);

    if (resData.status !== "success") {
      return handleErrorResponse(resData.data);
    }
    isChanged.value = false;
    isSaved.value = false;
    isUpdated.value = false;

    await getResume(draftID.value);
  }
};

const isCompleted = computed(() => {
  const myResume = resume.value;
  if (myResume) {
    return (
      myResume.title &&
      myResume.salary_from &&
      myResume.salary_currency &&
      myResume.salary_from &&
      myResume.employment_id
    );
  }
  return false;
});
</script>

<style scoped></style>
