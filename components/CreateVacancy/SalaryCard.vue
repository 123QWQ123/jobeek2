<template>
  <div class="w-box" v-click-outside="save" @click="isFocused = true">
    <div class="w-box-head">
      <h3 class="title">Зарплата({{ isChanged }})</h3>
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
      <div class="w-box-body" :class="{ collapse: isCollapsed }">
        <CreateVacancySalary
          :providers="props.providers"
          v-if="my_vacancy"
          v-model="state.salary.val"
          :errors="errors.salary"
        />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useVacancyStore } from "~/store/vacancy";
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

import { useProfileStore } from "~/store/profile";
import { useFormData } from "~/composables/useFormData";
import useFormValidation from "~/composables/useFormValidation";
import { useWatchStateValues } from "~/composables/useWatchStateValues";
import { useDiff } from "~/composables/useDiff";
import { useDictionaryStore } from "~/store/dictionary";
const vacancyStore = useVacancyStore();
const profileStore = useProfileStore();
const route = useRoute();

const draftID = computed(() => route.query.draft_id);
const vacancyID = computed(() => route.query.vacancy_id);
const { updateVacancy, updateDraft } = vacancyStore;

const my_vacancy = computed(() => vacancyStore.my_vacancy);

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(true);
const isUpdated = ref(false);

const state = reactive({
  salary: {
    val: null,
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
      state.salary.val = newData.salary;
    }
  },
);
watch(
  () => vacancyStore.my_vacancy,
  (newVacancy) => {
    if (isUpdated.value) {
      isUpdated.value = false;
      return;
    }
    if (newVacancy) {
      sectionData.value = {
        salary: { ...newVacancy.salary, period: newVacancy.salary.period?.id },
      };
    }
  },
);

const dictionaryStore = useDictionaryStore();

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
    state.isLoading = true;
    // validate();
    errors.value = {};
    state.errorMessage = "";
    let resData = {};
    const jsonData = useFormData(state);
    jsonData.form_data = "SALARY_DATA";
    if (draftID.value) {
      resData = await updateDraft(draftID.value, jsonData);
    } else {
      resData = await updateVacancy(vacancyID.value, jsonData);
    }
    isUpdated.value = true;
    if (resData.status !== "success") {
      return handleErrorResponse(resData.data);
    }

    isChanged.value = false;
    isSaved.value = false;
    isUpdated.value = false;
    if (is_from_parent) {
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    }
  }
  return true;
};

const isCompleted = computed(() => {
  const myVacancy = my_vacancy.value;
  if (myVacancy && myVacancy.salary) {
    return myVacancy.salary.period && myVacancy.salary.currency;
  }
  return false;
});

defineExpose({
  save,
});
</script>

<style></style>
