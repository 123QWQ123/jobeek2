<template>
  <div v-if="isHidden" class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Видимость({{ isChanged }}) - {{ isFocused }}</h3>
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
        <div class="input-row">
          <label>Тип вакансии:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <CustomSelect
              :options="resumeAccessTypeOptions"
              v-model="state.resume_access_type_id.val"
              :label="'Выберите'"
              @focusin="() => (errors.resume_access_type_id = '')"
            ></CustomSelect>
            <div
              class="text-danger d-block"
              v-if="errors.resume_access_type_id"
            >
              Вам нужно выбрать тип!
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
const props = defineProps(["title", "providers"]);

import { useProfileStore } from "~/store/profile";
import { useFormData } from "~/composables/useFormData";
import { useRuntimeConfig } from "#app";
import useFormValidation from "~/composables/useFormValidation";
import { useWatchStateValues } from "~/composables/useWatchStateValues";
import { useDiff } from "~/composables/useDiff";
import { useDictionaryStore } from "~/store/dictionary";
import { useResumeStore } from "~/store/resume";
const resumeStore = useResumeStore();
const profileStore = useProfileStore();
const CONFIG = useRuntimeConfig();
const route = useRoute();

const resumeID = computed(() => route.params.id);
const { updateResume, getMyResume } = resumeStore;

const { employer } = profileStore;
const my_resume = computed(() => resumeStore.my_resume);

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(false);
const isUpdated = ref(false);

const providers = computed(() => props.providers);
const isHidden = ref(props.providers.hh ?? false);
watch(
  () => props.providers,
  (newProviders) => {
    isHidden.value = newProviders.hh;
  }
);

const state = reactive({
  resume_access_type_id: {
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
  }
);

const sectionData = ref({});
watch(
  () => sectionData.value,
  (newData, oldData) => {
    const diffData = useDiff(newData, oldData);
    if (Object.keys(diffData).length) {
      state.resume_access_type_id.val = newData.resume_access_type_id;
    }
  }
);
watch(
  () => resumeStore.my_resume,
  (newData) => {
    if (isUpdated.value) {
      isUpdated.value = false;
      return;
    }
    if (newData) {
      sectionData.value = {
        resume_access_type_id: newData.resume_access_type?.id,
      };
    }
  }
);

const dictionaryStore = useDictionaryStore();
const { getResumeAccessTypes } = dictionaryStore;
onMounted(() => {
  setTimeout(async () => {
    await getResumeAccessTypes();
  }, 500);
});
const resumeAccessTypeOptions = computed(() => {
  return dictionaryStore.resume_access_types.map((item) => ({
    name: item.name,
    value: item.id,
  }));
});

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
    jsonData.form_data = "ACCESS_DATA";
    resData = await updateResume(resumeID.value, jsonData);
    isUpdated.value = true;
    if (resData.status !== "success") {
      return handleErrorResponse(resData.data);
    }

    isChanged.value = false;
    isSaved.value = false;
    isUpdated.value = false;
    isFocused.value = false;

    if (is_from_parent) {
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    }
  } else {
    return true;
  }
};

const isCompleted = computed(() => {
  const newData = my_resume.value;
  if (newData && !isCollapsed.value) {
    return newData.type && newData.type.id;
  }
  return false;
});

defineExpose({
  save,
});
</script>
