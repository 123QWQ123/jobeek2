<template>
  <div class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">
        Гражданство и Семья({{ isChanged }}) - {{ isFocused }}
      </h3>
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
        <div class="row w-100 mt-2">
          <div class="col-12">
            <label for="about_me">Гражданство</label>
            <MultiSelectWithSearch
              :options="countryOptions"
              v-model="state.citizenship.val"
              :label="'Выберите'"
            />
          </div>
          <div class="text-danger d-block" v-if="errors.citizenship">
            {{ errors.citizenship }}
          </div>
        </div>
        <div class="row w-100 mt-4">
          <div class="col-12">
            <label for="about_me">Страны разрешено работать</label>
            <MultiSelectWithSearch
              :options="countryOptions"
              v-model="state.work_tickets.val"
              :label="'Выберите'"
            />
          </div>
          <div class="text-danger d-block" v-if="errors.work_tickets">
            {{ errors.work_tickets }}
          </div>
        </div>
        <div class="row w-100 mt-4">
          <div class="input-row">
            <label for="remote-work">Семейное положение</label>
            <div class="input-wrapper">
              <CustomSelect
                :label="'Выберите'"
                :options="maritalStatusOptions"
                v-model="state.marital_status_id.val"
              ></CustomSelect>

              <div class="text-danger d-block" v-if="errors.marital_status_id">
                {{ errors.marital_status }}
              </div>
            </div>
          </div>
        </div>
        <div class="row w-100 mt-4">
          <div class="input-row">
            <label for="remote-work">Желательное время в пути до работы</label>
            <div class="input-wrapper">
              <CustomSelect
                :options="travelTimeOptions"
                :label="'Выберите'"
                v-model="state.travel_time_id.val"
              ></CustomSelect>

              <div class="text-danger d-block" v-if="errors.travel_time_id">
                {{ errors.travel_time_id }}
              </div>
            </div>
          </div>
        </div>
        <div class="row w-100 mt-4">
          <div class="input-row">
            <label for="remote-work">Наличие детей</label>
            <div class="input-wrapper">
              <CustomSelect
                :options="childrenOptions"
                :label="'Выберите'"
                v-model="state.children_id.val"
              ></CustomSelect>

              <div class="text-danger d-block" v-if="errors.children_id">
                {{ errors.children_id }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useResumeStore } from "~/store/resume";

import { useProfileStore } from "~/store/profile";
import useFormValidation from "~/composables/useFormValidation";
import { useWatchStateValues } from "~/composables/useWatchStateValues";
import { useDiff } from "~/composables/useDiff";
import { useDictionaryStore } from "~/store/dictionary";
import { useFormData } from "~/composables/useFormData";
const resumeStore = useResumeStore();
const profileStore = useProfileStore();

const dictionaryStore = useDictionaryStore();

const { getMaritalStatusForResume, getTravelTimeOptions, getResumeChildren } =
  dictionaryStore;
await getMaritalStatusForResume();
await getTravelTimeOptions();
await getResumeChildren();
const { getCountries } = profileStore;
await getCountries();
const countryOptions = computed(() =>
  profileStore.countries.map((item) => ({ name: item.name, value: item.id }))
);
const maritalStatusOptions = computed(() =>
  dictionaryStore.resume_marital_statuses.map((item) => ({
    value: item.id,
    name: item.name,
  }))
);
const travelTimeOptions = computed(() =>
  dictionaryStore.travel_times.map((item) => ({
    value: item.id,
    name: item.name,
  }))
);
const childrenOptions = computed(() =>
  dictionaryStore.resume_children.map((item) => ({
    value: item.id,
    name: item.name,
  }))
);

const route = useRoute();

const resumeID = computed(() => route.params.id);

const { seeker } = profileStore;
const my_resume = computed(() => resumeStore.my_resume);

const isShown = ref(false);
const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(false);
const isUpdated = ref(false);

const { getMyResume } = resumeStore;

const state = reactive({
  citizenship: {
    val: my_resume.value?.citizenship ?? [],
    isValid: true,
  },
  work_tickets: {
    val: my_resume.value?.work_tickets ?? [],
    isValid: true,
  },
  about: {
    val: my_resume.value?.about,
    isValid: true,
  },
  children_id: {
    val: my_resume.value?.children?.id,
    isValid: true,
  },
  marital_status_id: {
    val: my_resume.value?.marital_status?.id ?? 113,
    isValid: true,
  },
  travel_time_id: {
    val: my_resume.value?.travel_time?.id ?? 18,
    isValid: true,
  },
});

watch(
  () => useWatchStateValues(state, true, true),
  () => {
    if (!isFirst.value) {
      isChanged.value = true;
    } else {
      isFirst.value = false;
    }
  }
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
      state["citizenship"].val = newData["citizenship"];
      state["work_tickets"].val = newData["work_tickets"];
      state["about"].val = newData["about"];
      state["children_id"].val = newData["children_id"];
      state["marital_status_id"].val = newData["marital_status_id"];
      state["travel_time_id"].val = newData["travel_time_id"];
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
        citizenship: resumeStore.my_resume?.citizenship.map((item) => item.id),
        work_tickets: resumeStore.my_resume?.work_tickets?.map(
          (item) => item.id
        ),
        children_id: resumeStore.my_resume?.children?.id,
        marital_status_id: resumeStore.my_resume?.marital_status?.id,
        travel_time_id: resumeStore.my_resume?.travel_time?.id,
      };

      nextTick(() => {
        isChanged.value = false;
      });
    }
  }
);

onMounted(() => {
  if (resumeStore.my_resume) {
    sectionData.value = {
      citizenship: resumeStore.my_resume?.citizenship,
      work_tickets: resumeStore.my_resume?.work_tickets,
      children_id: resumeStore.my_resume?.children_id,
      marital_status_id: resumeStore.my_resume?.marital_status_id,
      travel_time_id: resumeStore.my_resume?.travel_time_id,
    };

    isShown.value = true;

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

const { updateResume } = resumeStore;

const { errors, handleErrorResponse, clearInputError } = useFormValidation();
const add = () => {
  isShown.value = !isShown.value;
  // hasChanged.value = true;
};
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
    const jsonData = useFormData(state);
    jsonData.form_data = "CITIZENSHIP_AND_FAMILY_DATA";
    state.isLoading = true;
    errors.value = {};
    state.errorMessage = "";

    const resData = await updateResume(resumeID.value, jsonData);

    if (resData.status !== "success") {
      return handleErrorResponse(resData.data);
    }
    isChanged.value = false;
    isSaved.value = false;
    isUpdated.value = false;
    isFocused.value = false;

    await getMyResume(resumeID.value);
  }
};

const isCompleted = computed(() => {
  const myResume = my_resume.value;
  if (myResume) {
    return (
      myResume.citizenship &&
      myResume.about &&
      myResume.has_children &&
      myResume.marital_status_id
    );
  }
  return false;
});

defineExpose({
  save,
});
</script>
