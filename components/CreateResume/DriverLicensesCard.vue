<template>
  <div class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">
        Водительские права({{ isChanged }}) - {{ isFocused }}
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
        <CreateResumeDriverLicensesForm
          v-model="state.driver_license_types.val"
          :errors="errors.driver_license_types"
        />

        <div class="mt-4">
          <div
            class="form-check form-check-inline d-inline-flex align-items-center justify-content-center"
          >
            <input
              type="checkbox"
              id="has_vehicle"
              class="form-check-input"
              :style="{ height: '2rem', width: '2rem' }"
              v-model="state.has_vehicle.val"
              :checked="state.has_vehicle.val"
            />
            <label for="has_vehicle" class="form-check-label fs-5 ms-3">
              у Вас есть личный автомобиль?
            </label>
          </div>

          <div class="text-danger d-block" v-if="errors.has_vehicle">
            {{ errors.has_vehicle }}
          </div>
        </div>
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
const isCollapsed = ref(true);
const isUpdated = ref(false);

const state = reactive({
  driver_license_types: {
    val: [],
    isValid: true,
  },
  has_vehicle: {
    val: false,
    isValid: true,
    is_hidden: false,
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
      state.driver_license_types.val = newData.driver_license_types;
      state.has_vehicle.val = newData.has_vehicle;
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
        driver_license_types:
          newData.driver_license_types.map((item) => item.id) ?? [],
        has_vehicle: newData.has_vehicle ?? false,
      };
    }
  }
);

const dictionaryStore = useDictionaryStore();
const { getDriverLicenses } = dictionaryStore;
onMounted(() => {
  setTimeout(async () => {
    await getDriverLicenses();
  }, 500);
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
    jsonData.form_data = "DRIVER_LICENSES_DATA";

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
    return myResume.driver_license_types.length > 0;
  }
  return false;
});

defineExpose({
  save,
});
</script>
