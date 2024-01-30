<template>
  <div class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Языки({{ isChanged }}) - {{ isFocused }}</h3>
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
        <CreateResumeForeignLanguagesWrapper
          ref="componentElement"
          v-if="my_resume"
          v-model="state.languages.val"
          :errors="errors.languages ?? []"
        />
      </div>
    </transition>
  </div>
</template>

<script setup>
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
import { useRuntimeConfig } from "#app";
import useFormValidation from "~/composables/useFormValidation";
import { useWatchStateValues } from "~/composables/useWatchStateValues";
import { useDiff } from "~/composables/useDiff";
import { useDictionaryStore } from "~/store/dictionary";
import useProviderFields from "~/composables/useProviderFields";

import { useResumeStore } from "~/store/resume";
const profileStore = useProfileStore();
const CONFIG = useRuntimeConfig();
const route = useRoute();

const resumeID = computed(() => route.params.id);

const resumeStore = useResumeStore();
const { updateResume } = resumeStore;
const my_resume = computed(() => resumeStore.my_resume);

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(true);
const isUpdated = ref(false);

const state = reactive({
  languages: {
    val: [],
    isValid: true,
    is_hidden: false,
  },
});

const fields = ref({
  hh: {},
  superjob: {},
});

const { walkThroughFields } = useProviderFields(state, fields);
watch(() => props.providers, walkThroughFields);

onMounted(() => {
  walkThroughFields(props.providers);
});

const set = (key, val) => {
  state[key].val = val;
};

watch(
  () => useWatchStateValues(state, true, true),
  (newState, oldState) => {
    const diffData = useDiff(newState, oldState);
    if (!isFirst.value) {
      isChanged.value = true;
    } else {
      isFirst.value = false;
    }
  }
);

const sectionData = ref({});
watch(
  () => resumeStore.my_resume,
  (newResume) => {
    if (isUpdated.value) {
      isUpdated.value = false;
      return;
    }
    if (newResume) {
      sectionData.value = {
        languages: newResume.languages.map((item) => ({
          language_id: item.language.id,
          level_id: item.level.id,
        })),
      };
    }
  }
);

watch(
  () => sectionData.value,
  (newData, oldData) => {
    const diffData = useDiff(newData, oldData);
    if (Object.keys(diffData).length) {
      state.languages.val = newData.languages;
    }
  }
);

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
    const jsonData = { ...useFormData(state) };

    jsonData.form_data = "LANGUAGES_DATA";

    resData = await updateResume(resumeID.value, jsonData);

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
  } else {
    return true;
  }
};

const isCompleted = computed(() => {
  const myResume = my_resume.value;
  if (myResume && !isCollapsed.value) {
    return myResume.address && myResume.address.address;
  }
  return false;
});

defineExpose({
  save,
});
</script>

<style></style>
