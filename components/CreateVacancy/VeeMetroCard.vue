<template>
  <div class="w-box" v-click-outside="save" @click="isFocused = true">
    <div class="w-box-head">
      <h3 class="title">Метро({{ isChanged }})</h3>
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
        <div class="input-row">
          <label>Список городов:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <!--            <CreateVacancyMetro-->
            <!--              name="cities"-->
            <!--              :selected_options="selectedCityOptions"-->
            <!--            />-->
            <VeeMultiSelectWithSearch
              :options="metroOptions"
              name="metro"
              placeholder="Выберите"
              @input="updateInput"
            />

            <div class="text text-danger" v-if="cityHasNoMetro">
              метро не найдено.
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useVacancyStore } from "~/store/vacancy";
import { useProfileStore } from "~/store/profile";
import { useRuntimeConfig } from "#app";
import { useDiff } from "~/composables/useDiff";
import { z } from "~/hooks/ru-zod.js";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import useProviderFields from "~/composables/useProviderFields.js";
import { useDictionaryStore } from "~/store/dictionary.js";
import useProviders from "~/composables/useProviders.js";

const props = defineProps(["title"]);

const vacancyStore = useVacancyStore();
const profileStore = useProfileStore();
const CONFIG = useRuntimeConfig();
const route = useRoute();

const { providers } = useProviders();
const ID = computed(() => route.params.id);
const type = computed(() => route.query.type);
const { updateVacancy, updateDraft, getMyVacancy, getMyDraft } = vacancyStore;

const { employer } = profileStore;
const my_vacancy = computed(() => vacancyStore.my_vacancy);

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(false);
const isUpdated = ref(false);
const cityHasNoMetro = ref(false);

const cities = computed(() => {
  if (vacancyStore.my_vacancy && vacancyStore.my_vacancy.cities) {
    return vacancyStore.my_vacancy.cities.map((item) => item.id);
  }
  return [];
});
const { searchMetro } = useDictionaryStore();
const selectedOptions = ref([]);
const metroOptions = ref([]);

const updateInput = async (newValue = "") => {
  cityHasNoMetro.value = false;
  const items = (await searchMetro({ city_ids: cities.value })) ?? [];
  console.log(items);
  let newOptions = items.map((item) => ({
    value: item.id,
    name: `${item.name}`,
  }));
  newOptions = newOptions.filter((item) => item.name.includes(newValue));
  if (items.length < 1) {
    cityHasNoMetro.value = true;
    return;
  }
  metroOptions.value = newOptions.concat(selectedOptions.value);
};

const schema = computed(() => {
  return z.object({
    metro: z.array(z.number()).optional(),
  });
});

const initialValues = {
  metro: [],
};
const {
  values,
  errors,
  meta,
  resetForm,
  setValues,
  setErrors,
  handleSubmit,
  validate,
} = useForm({
  initialValues: initialValues,
  initialTouched: true,
  validationSchema: toTypedSchema(schema.value),
});

const state = reactive({
  metro: {
    is_hidden: false,
  },
});

const fields = ref({
  hh: {
    metro: null,
  },
  superjob: {
    metro: true,
  },
});

const { walkThroughFields } = useProviderFields(state, fields);
walkThroughFields(providers.value);

onMounted(() => {
  walkThroughFields(providers.value);
});

const sectionData = ref({});
const getFields = (newObject) => {
  return {
    metro: newObject.metro.map((item) => item.id),
  };
};
watch(
  () => vacancyStore.my_vacancy,
  (newData) => {
    if (newData) {
      sectionData.value = getFields(newData);
    }
  },
);
onMounted(() => {
  const newData = vacancyStore.my_vacancy;
  if (newData) {
    sectionData.value = getFields(newData);
  }
});

watch(
  () => sectionData.value,
  (newData, oldData) => {
    const diffData = useDiff(newData, oldData);
    if (Object.keys(diffData).length) {
      resetForm({ values: newData });
    }
  },
);
const dictionaryStore = useDictionaryStore();

const isFocused = ref(false);
const isLoading = ref(false);
const errorMessage = ref(null);
const save = async (is_from_parent = false) => {
  validate();
  if (!meta.value.dirty) {
    return true;
  }
  if (!meta.value.valid) {
    errorMessage.value = "Запольните все поля";
    return false;
  }
  isLoading.value = true;
  setErrors({});
  errorMessage.value = "";
  let jsonData = { ...values };
  let resData = {};

  jsonData.action = "UpdateMetro";
  if (type.value === "draft") {
    resData = await updateDraft(ID.value, jsonData);
  } else {
    resData = await updateVacancy(ID.value, jsonData);
  }

  isUpdated.value = true;
  if (resData.status !== "success") {
    errorMessage.value = resData.message;
    if (resData.hasOwnProperty("errors")) {
      setErrors(resData.errors);
      return;
    }
    return;
  }
  setErrors({});
  resetForm({ values });
  isSaved.value = false;
  isUpdated.value = false;
  if (is_from_parent) {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
};

const isCompleted = computed(() => {
  const myVacancy = my_vacancy.value;
  if (myVacancy && !isCollapsed.value) {
    return myVacancy.cities.length > 0;
  }
  return false;
});

defineExpose({
  save,
});
</script>

<style>
.from-to-block {
}
</style>
