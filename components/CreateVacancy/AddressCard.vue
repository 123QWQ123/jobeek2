<template>
  <div class="w-box" v-click-outside="save">
    <div class="w-box-head">
      <h3 class="title">Адрес({{ isChanged }})</h3>
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
        <div class="input-row" v-if="!state.address_id.is_hidden">
          <label>Список Адресов компании:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <CustomSelect
              :options="addressOptions"
              v-model="state.address_id.val"
              :label="'Выберите'"
              @focusin="() => (errors.address_id = '')"
            ></CustomSelect>
            <div class="text-danger d-block" v-if="errors.address_id">
              Вам нужно выбрать тип ваканции!
            </div>
            <div class="text-danger d-block" v-if="addressErrorMessage">
              {{ addressErrorMessage }}
            </div>
          </div>
        </div>

        <div class="input-row" v-if="!state.address.is_hidden">
          <label>Адрес:</label>
          <div class="input-wrapper mt-2">
            <input
              v-model="state.address.val"
              @focusin="() => (errors.address = '')"
            />
            <div class="text-danger d-block" v-if="errors.address">
              Вам нужно ввести адрес!
            </div>
          </div>
        </div>

        <div class="input-row" v-if="!state.show_metro_only.is_hidden">
          <label>Метро:</label>
          <div class="input-wrapper mt-2">
            <div class="check-block mt-2">
              <div class="checkbox">
                <input
                  type="checkbox"
                  id="show_metro_only"
                  v-model.boolean="state.show_metro_only.val"
                  @focusin="() => (errors.show_metro_only = '')"
                />
                <div class="checkbox-mask">
                  <img src="~/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <label for="show_metro_only" class="fs-14"
                >показывать только метро для указанного адреса</label
              >
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useVacancyStore } from "~/store/vacancy";

const props = defineProps({
  title: {
    default: "",
    required: false,
  },
  providers: {
    required: true,
    default: {},
  },
});

import { useFormData } from "~/composables/useFormData";
import useFormValidation from "~/composables/useFormValidation";
import { useWatchStateValues } from "~/composables/useWatchStateValues";
import { useDiff } from "~/composables/useDiff";
import { useDictionaryStore } from "~/store/dictionary";
import useProviderFields from "~/composables/useProviderFields";
const vacancyStore = useVacancyStore();
const route = useRoute();

const draftID = computed(() => route.query.draft_id);
const { updateVacancy, updateDraft } = vacancyStore;

const my_vacancy = computed(() => vacancyStore.my_vacancy);

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(true);
const isUpdated = ref(false);

const state = reactive({
  address: {
    val: null,
    isValid: true,
    is_hidden: false,
  },
  address_id: {
    val: null,
    isValid: true,
    is_hidden: false,
  },
  show_metro_only: {
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

const fields = ref({
  hh: {
    address_id: false,
    show_metro_only: false,
  },
  superjob: {
    address: false,
  },
});

const { walkThroughFields } = useProviderFields(state, fields);
watch(() => props.providers, walkThroughFields);

onMounted(() => {
  walkThroughFields(props.providers);
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
      state.address_id.val = newData.address_id;
      state.address.val = newData.address;
      state.show_metro_only.val = newData.show_metro_only;
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
        address: newVacancy.address?.address,
        address_id: newVacancy.address?.address_id,
        show_metro_only: newVacancy.address?.show_metro_only,
      };
    }
  },
);

const dictionaryStore = useDictionaryStore();
const { getVacancyTypes } = dictionaryStore;
onMounted(() => {
  setTimeout(async () => {
    await getVacancyTypes();
  }, 500);
});
const addressOptions = computed(() => {
  return dictionaryStore.addresses?.map((item) => ({
    name: item.raw,
    value: item.id,
  }));
});

const { searchAddresses } = dictionaryStore;
const addressErrorMessage = ref(null);
onMounted(() => {
  setTimeout(async () => {
    if (props.providers.hh) {
      const resData = await searchAddresses();
      if (resData.hasOwnProperty("message")) {
        addressErrorMessage.value = resData.message;
      }
    }
  }, 500);
});

const onAddressSearch = async (newString) => {};
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
    const jsonData = { address: useFormData(state) };

    jsonData.action = "UpdateAddress";
    if (draftID.value) {
      resData = await updateDraft(draftID.value, jsonData);
    } else {
      resData = await updateVacancy(draftID.value, jsonData);
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
    return myVacancy.address && myVacancy.address.address;
  }
  return false;
});

defineExpose({
  save,
});
</script>

<style></style>
