<template>
  <div class="w-box" v-if="!isHidden" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Водительские права({{ isChanged }})</h3>
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
        <CreateVacancyDriverLicensesForm
          v-if="my_vacancy"
          v-model="state.driver_license_type.val"
          :errors="errors.driver_license_type"
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
import { useRuntimeConfig } from "#app";
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

const isHidden = computed(() => {
  if (!!props.providers.superjob || !!props.providers.hh) {
    return false;
  }
  return true;
});
const state = reactive({
  driver_license_type: {
    val: vacancyStore.my_vacancy?.driver_license_type ?? [],
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
      state.driver_license_type.val = newData.driver_license_type ?? [];
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
        driver_license_type: newVacancy.driver_license_type?.map(
          (item) => item.name,
        ),
      };
    }
  },
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
  } else {
    return true;
  }
};

const isCompleted = computed(() => {
  const myVacancy = my_vacancy.value;
  if (myVacancy && !isCollapsed.value) {
    return myVacancy.driver_license_type.length > 0;
  }
  return false;
});

defineExpose({
  save,
});
</script>

<style></style>
