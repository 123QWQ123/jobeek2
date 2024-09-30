<template>
  <div class="w-box" v-click-outside="onSubmit">
    <div class="w-box-head">
      <h3 class="title">Личные данные</h3>
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
          <label for="name">Имя и фамилия <b>*</b></label>
          <div class="input-wrapper">
            <div class="c2">
              <div class="input-wrapper">
                <ResumeTextInput name="first_name" placeholder="Имя" />
              </div>
              <div class="input-wrapper">
                <ResumeTextInput name="last_name" placeholder="Фамилия" />
              </div>
            </div>
            <div class="c1 mt-1">
              <ResumeTextInput name="middle_name" placeholder="Отчество" />
            </div>
          </div>
        </div>

        <div class="input-row">
          <label>Дата рождения <b>*</b></label>
          <div class="input-wrapper">
            <div class="mb-1">
              <VeeBirthDatePicker name="birth_date" />
            </div>
          </div>
        </div>

        <div class="input-row">
          <label for="resume_email"
            >Электронная почта
            <b v-if="isHHSelected">*</b>
          </label>
          <div class="input-wrapper">
            <ResumeTextInput name="email" placeholder="Электронная почта" />

            <ResumeCheckboxInput
              v-if="!state.is_preferred_email.is_hidden"
              class="mt-2"
              name="is_preferred_email"
              type="checkbox"
              label="e-mail является ли предпочтительным способом связи"
            />
          </div>
        </div>

        <div class="input-row" v-if="!state.additional_information.is_hidden">
          <label>Дополнительные сведения</label>
          <div class="input-wrapper mt-2">
            <ResumeTextInput
              name="additional_information"
              placeholder="Введите"
            />
          </div>
        </div>

        <div class="input-row">
          <label>Дополнительные контакты</label>
          <div class="input-wrapper mt-2">
            <ResumeTextInput name="other_contacts" placeholder="Введите" />
          </div>
        </div>

        <div class="input-row">
          <label>Город проживания:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <VeeSelectWithSearch
              :options="cityOptions"
              name="city_id"
              placeholder="Выберите город"
              @input="updateCityInput"
            />
          </div>
        </div>

        <div class="input-row">
          <label>Релокация:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <VeeCustomSelect
              :options="relocationTypeOptions"
              name="relocation_type_id"
              :label="'Выберите'"
            ></VeeCustomSelect>
          </div>
        </div>

        <div class="input-row" v-if="canBeRelocated">
          <label>Городов в которым готов переехать:</label>
          <div class="input-wrapper mt-2">
            <VeeMultiSelectWithSearch
              name="move_able_cities"
              :options="moveableCityOptions"
              placeholder="Выберите"
              @input="updateMoveableCityInput"
            />
          </div>
        </div>

        <div class="input-row">
          <label>Готовность к командировкам:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <LazyVeeCustomSelect
              :options="businessTripOptions"
              name="business_trip_id"
              :label="'Выберите'"
            />
          </div>
        </div>

        <!--        <CreateResumePersonalFieldsMetroInput-->
        <!--          v-if="isMetroEnabled"-->
        <!--          v-model="state.metros.val"-->
        <!--          :errors="errors.metro"-->
        <!--          :providers="providers"-->
        <!--        />-->

        <div class="input-row">
          <label>Поль:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <LazyVeeCustomSelect
              :options="genderOptions"
              name="gender_id"
              :label="'Выберите'"
            />
          </div>
        </div>

        <div class="input-row" v-if="!state.address.is_hidden">
          <label>Адрес: </label>
          <div class="input-wrapper mt-2">
            <ResumeTextInput name="address" placeholder="Введите" />
          </div>
        </div>

        <CreateResumeVeeSocialNetworksForm
          v-show="!state.social_networks.is_hidden"
          name="social_networks"
        />

        <CreateResumeVeePhoneFieldsForm
          v-show="!state.phones.is_hidden"
          name="phones"
        />

        <div class="text-danger d-block">
          <ErrorMessage name="phones" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useProfileStore } from "~/store/profile";
import useFormValidation from "~/composables/useFormValidation";
import { useDiff } from "~/composables/useDiff";
import { useDictionaryStore } from "~/store/dictionary";
import useProviderFields from "~/composables/useProviderFields";
import { useResumeStore } from "~/store/resume";
import useResumeHooks from "~/hooks/useResumeHooks";
import ResumeTextInput from "~/components/CreateResume/ResumeTextInput.vue";
import ResumeCheckboxInput from "~/components/CreateResume/ResumeCheckboxInput.vue";
import { useI18n } from "vue-i18n";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "~/hooks/ru-zod.js";
import useProviders from "~/composables/useProviders.js";
import { zodToJsonSchema } from "zod-to-json-schema";

const props = defineProps({
  title: {
    default: "-",
    required: false,
  },
});

const profileStore = useProfileStore();
const route = useRoute();

const resumeID = computed(() => route.params.id);

const resumeStore = useResumeStore();
const { updateResume } = resumeStore;
const my_resume = computed(() => resumeStore.my_resume);

const isSaved = ref(false);
const isChanged = ref(false);
const isCollapsed = ref(false);
const isUpdated = ref(false);

const { t } = useI18n();
const { providers } = useProviders();

watch(
  () => providers.value,
  () => {
    walkThroughFields(providers.value);
  },
);
const isHHSelected = computed(() => {
  if (providers.value.hh === true) return true;
  else return false;
});

const schema = computed(() => {
  if (providers.value.hh === true && providers.value.superjob === false) {
    let phoneScheme = z.object({
      type_id: z.number(),
      comment: z.string().optional().nullable(),
      phone: z.string(),
      is_preferred: z.boolean().optional().nullable(),
    });
    return z.object({
      first_name: z.string().min(2),
      last_name: z.string().min(2),
      middle_name: z.string().nullable().optional(),
      email: z.string().email(),
      is_preferred_email: z.boolean().nullable(),
      birth_date: z.string().nullable().optional(),
      additional_information: z.string().nullable().optional(),
      other_contacts: z.string().nullable().optional(),
      gender_id: z.number(),
      city_id: z.number(),
      address: z.string().nullable().optional(),
      business_trip_id: z.number(),
      relocation_type_id: z.number().nullable().optional(),
      social_networks: z.number().array().optional(),
      phones: z.array(phoneScheme).nonempty(),
    });
  }
  if (providers.value.hh === false && providers.value.superjob === true) {
    const phoneScheme = z.object({
      start_available_time_phone: z.string().optional().nullable(),
      end_available_time_phone: z.string().optional().nullable(),
      phone: z.string(),
    });
    return z.object({
      first_name: z.string().min(2),
      last_name: z.string().nullable().optional(),
      middle_name: z.string().nullable().optional(),
      email: z.string().email().nullable().optional(),
      is_preferred_email: z.boolean().nullable().optional(),
      birth_date: z.string(),
      additional_information: z.string().nullable().optional(),
      other_contacts: z.string().nullable().optional(),
      gender_id: z.number(),
      city_id: z.number(),
      address: z.string().nullable().optional(),
      business_trip_id: z.number().nullable(),
      relocation_type_id: z.number().nullable().optional(),
      social_networks: z.number().array().optional(),
      phones: z.array(phoneScheme).optional(),
    });
  }
  let phoneScheme = z.object({
    type_id: z.number(),
    comment: z.string().optional().nullable(),
    start_available_time_phone: z.string().optional().nullable(),
    end_available_time_phone: z.string().optional().nullable(),
    phone: z.string(),
    is_preferred: z.boolean(),
  });
  return z.object({
    first_name: z.string().min(2),
    last_name: z.string().min(2),
    middle_name: z.string().nullable().optional(),
    email: z.string().email(),
    is_preferred_email: z.boolean().nullable(),
    birth_date: z.string(),
    additional_information: z.string().nullable().optional(),
    other_contacts: z.string().nullable().optional(),
    gender_id: z.number(),
    city_id: z.number(),
    address: z.string().nullable().optional(),
    business_trip_id: z.number(),
    relocation_type_id: z.number().nullable().optional(),
    social_networks: z.number().array().optional(),
    phones: z.array(phoneScheme).nonempty(),
  });
});

const jsonSchemaFixed = zodToJsonSchema(schema.value, { errorMessages: true });
const jsonSchema = computed(() =>
  zodToJsonSchema(schema.value, { errorMessages: true }),
);

const initialValues = ref({
  first_name: null,
  last_name: null,
  middle_name: null,
  email: null,
  is_preferred_email: false,
  birth_date: null,
  city_id: null,
  gender_id: null,
  relocation_type_id: null,
  move_able_cities: [],
  social_networks: ["https://"],
  phones: [],
  business_trip_id: null,
  address: null,
});
const { errors, values, setErrors, meta, resetForm, validate } = useForm({
  initialValues: initialValues,
  validationSchema: toTypedSchema(schema.value),
});
const dictionaryStore = useDictionaryStore();
const { getGenders, getRelocationTypes, getBusinessTrips } = dictionaryStore;

const genderOptions = computed(() => {
  return dictionaryStore.resume_genders.map((item) => ({
    name: item.name,
    value: item.id,
  }));
});
const relocationTypeOptions = computed(() => {
  return dictionaryStore.relocation_types.map((item) => ({
    name: item.name,
    value: item.id,
  }));
});
const businessTripOptions = computed(() => {
  return dictionaryStore.business_trips.map((item) => ({
    name: item.name,
    value: item.id,
  }));
});

onMounted(() => {
  setTimeout(async () => {
    await getGenders(null, true);
    await getRelocationTypes();
    await getBusinessTrips();
  }, 500);
});
const state = reactive({
  first_name: {
    is_hidden: false,
  },
  last_name: {
    is_hidden: false,
  },
  middle_name: {
    is_hidden: false,
  },
  email: {
    is_hidden: false,
  },
  is_preferred_email: {
    is_hidden: false,
  },
  birth_date: {
    is_hidden: false,
  },
  city_id: {
    is_hidden: false,
  },
  additional_information: {
    is_hidden: false,
  },
  other_contacts: {
    is_hidden: false,
  },
  gender_id: {
    is_hidden: false,
  },
  relocation_type_id: {
    is_hidden: false,
  },
  move_able_cities: {
    is_hidden: false,
  },
  metros: {
    is_hidden: false,
  },
  business_trip_id: {
    is_hidden: false,
  },
  address: {
    is_hidden: false,
  },
  social_networks: {
    is_hidden: false,
  },
  phones: {
    is_hidden: false,
  },
  is_relocatable: {
    is_hidden: false,
  },
});

const fields = ref({
  hh: {
    first_name: true,
    last_name: true,
    middle_name: false,
    email: true,
    is_preferred_email: false,
    birth_date: false,
    city_id: true,
    additional_information: null,
    other_contacts: null,
    gender_id: true,
    relocation_type_id: false,
    move_able_cities: false,
    metros: false,
    business_trip_id: true,
    address: null,
    social_networks: false,
    phones: true,
  },
  superjob: {
    first_name: true,
    last_name: false,
    middle_name: false,
    email: false,
    is_preferred_email: null,
    birth_date: true,
    city_id: true,
    additional_information: false,
    other_contacts: false,
    gender_id: true,
    relocation_type_id: false,
    move_able_cities: false,
    metros: false,
    business_trip_id: false,
    address: false,
    social_networks: false,
    phones: false,
  },
});

const { walkThroughFields } = useProviderFields(state, fields);

onMounted(() => {
  walkThroughFields(providers.value);
});

//todo сделать константы для этих магических чисел
const canBeRelocated = computed(() => {
  return (
    parseInt(values.relocation_type_id) === 148 ||
    parseInt(values.relocation_type_id) === 149
  );
});

const { getCityNameFromArea2 } = useResumeHooks();
const cityOptions = ref([]);
const selectedProviders = computed(() => {
  if (providers.value.hh === true && providers.value.superjob === false)
    return ["hh"];
  if (providers.value.hh === false && providers.value.superjob === true)
    return ["superjob"];
  return ["hh", "superjob"];
});
const updateCityInput = async (newValue = "") => {
  if (newValue) {
    const items = await searchCities({
      search: newValue,
      providers: selectedProviders.value,
    });
    cityOptions.value = items.map((item) => ({
      value: item.id,
      name: getCityNameFromArea2(item),
    }));
  }
};
const moveableCityOptions = ref([]);
const updateMoveableCityInput = async (newValue = "") => {
  const items = (await searchCities({ search: newValue })) ?? [];
  moveableCityOptions.value = items.map((item) => ({
    value: item.id,
    name: item.name,
  }));
};

const sectionData = ref({});

const getFields = (newObject) => {
  return {
    first_name: newObject.first_name,
    last_name: newObject.last_name,
    middle_name: newObject.middle_name,
    email: newObject.email,
    is_preferred_email: newObject.is_preferred_email,
    birth_date: newObject.birth_date,
    city_id: newObject.city?.id,
    additional_information: newObject.additional_information,
    other_contacts: newObject.other_contacts,
    gender_id: newObject.gender?.id,
    relocation_type_id: newObject.relocation_type?.id,
    move_able_cities: newObject.move_able_cities,
    metros: newObject.metros,
    business_trip_id: newObject.business_trip?.id,
    address: newObject.address,
    social_networks: newObject.social_networks,
    phones: newObject.phones.map((item, index) => ({
      id: index,
      type_id: item.type?.id,
      phone: String(item.phone),
      comment: item.comment,
      is_preferred: item.is_preferred,
      start_available_time_phone: item.start_available_time_phone,
      end_available_time_phone: item.end_available_time_phone,
    })),
    is_relocatable: newObject.is_relocatable,
  };
};
watch(
  () => resumeStore.my_resume,
  (newResume) => {
    if (newResume) {
      sectionData.value = getFields(newResume);

      const city = newResume.city;
      if (newResume.city.hasOwnProperty("country_id")) {
        const city = newResume.city;
        onSearchCitiesByCountryId(city.country_id, city.name);
      }
    }
  },
);

onMounted(() => {
  const newResume = resumeStore.my_resume;
  if (newResume) {
    sectionData.value = getFields(newResume);
    const city = newResume.city;
    if (newResume.city.hasOwnProperty("country_id")) {
      const city = newResume.city;
      onSearchCitiesByCountryId(city.country_id, city.name);
    }
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

const { searchCities } = profileStore;
const onSearchCitiesByCountryId = async (country_id, name) => {
  const items = await searchCities({ search: name });
  cityOptions.value = items.map((item) => ({
    value: item.id,
    name: getCityNameFromArea2(item),
  }));
};

const { errors: serverErrors } = useFormValidation();
watch(
  () => serverErrors.value,
  (newErrors) => {
    if (Object.keys(newErrors).length > 0) {
      const backendErrors = {};
      Object.keys(newErrors).map(
        (item) => (backendErrors[item] = newErrors[item]),
      );
      setErrors(backendErrors);
    }
  },
);

const isFocused = ref(false);

const onSubmit = () => {
  save();
};

const isLoading = ref(false);
const errorMessage = ref(null);
const save = async (is_from_parent = false) => {
  isLoading.value = true;
  errorMessage.value = "";
  validate();
  if (!meta.value.dirty) {
    return true;
  }
  if (!meta.value.valid) {
    return false;
  }
  setErrors({});
  const jsonData = { ...JSON.parse(JSON.stringify(values)) };

  jsonData.form_data = "PERSONAL_DATA";
  jsonData.phones = jsonData.phones.map((item) => ({
    ...item,
    phone: item.phone?.replace("+", ""),
  }));

  let resData = await updateResume(resumeID.value, jsonData);

  isUpdated.value = true;
  if (resData.status !== "success") {
    errorMessage.value = resData.message;
    if (resData.hasOwnProperty("errors")) {
      setErrors(resData.errors);
      return;
    }
    return;
  }
  isChanged.value = false;
  isSaved.value = false;
  isUpdated.value = false;
  setErrors({});
  resetForm({ values });
  if (is_from_parent) {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
  return true;
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
