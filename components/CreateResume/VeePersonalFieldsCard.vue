<template>
  <div class="w-box" v-click-outside="onSubmit">
    <div class="w-box-head">
      <h3 class="title">Личные данные({{ isChanged }}) - {{ isFocused }}</h3>
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
          <label for="resume_email">Электронная почта</label>
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

        <CreateResumeVeeSocialNetworksForm name="social_networks" />

        <CreateResumeVeePhoneFieldsForm name="phones" />

        <div class="text-danger d-block">
          <ErrorMessage name="phones" />
        </div>
      </div>
    </transition>
    <!--    {{ values }}-->
    {{ errors }}
  </div>
</template>

<script setup>
import { useVacancyStore } from "~/store/vacancy";
import { useProfileStore } from "~/store/profile";
import { useRuntimeConfig } from "#app";
import useFormValidation from "~/composables/useFormValidation";
import { useDiff } from "~/composables/useDiff";
import { useDictionaryStore } from "~/store/dictionary";
import useProviderFields from "~/composables/useProviderFields";

import { useResumeStore } from "~/store/resume";
import useResumeHooks from "~/hooks/useResumeHooks";
import * as yup from "yup";
import ResumeTextInput from "~/components/CreateResume/ResumeTextInput.vue";
import ResumeCheckboxInput from "~/components/CreateResume/ResumeCheckboxInput.vue";
import { useI18n } from "vue-i18n";

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

const vacancyStore = useVacancyStore();
const profileStore = useProfileStore();
const CONFIG = useRuntimeConfig();
const route = useRoute();

const resumeID = computed(() => route.params.id);

const { employer } = profileStore;
const resumeStore = useResumeStore();
const { updateResume } = resumeStore;
const my_resume = computed(() => resumeStore.my_resume);

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(false);
const isUpdated = ref(false);

const { t } = useI18n();
const schema = computed(() => {
  return {
    first_name: "required|min:2|max:100",
    last_name: "required|min:1|max:100",
    middle_name: "required|min:1|max:100",
    email: { required: true, email: true },
    is_preferred_email: { boolean: true },
    birth_date: "required|date",
    additional_information: "max:255",
    other_contacts: "max:255",
    gender_id: "required|numeric",
    city_id: "required|numeric",
    relocation_type_id: "required|numeric",
    business_trip_id: "required|numeric",
    move_able_cities: "",
    address: "",
    social_networks: "url",
    phones: yup
      .array()
      .of(
        yup.object().shape({
          type_id: yup
            .string()
            .required(t("create_resume.validation.required")),
          comment: yup
            .string()
            .required(t("create_resume.validation.required")),
          start_available_time_phone: yup
            .string()
            .required(t("create_resume.validation.required")),
          end_available_time_phone: yup
            .string()
            .required(t("create_resume.validation.required")),
          phone: yup.string().required().label("phone"),
          is_preferred: yup
            .bool()
            .required(t("create_resume.validation.required")),
        }),
      )
      .strict(),
  };
});

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
const {
  errors,
  values,
  setErrors,
  meta,
  handleSubmit,
  setValues,
  resetForm,
  resetField,
} = useForm({
  initialValues: initialValues,
  validationSchema: schema,
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
//
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
    is_preferred_email: false,
  },
  superjob: {
    additional_information: false,
    other_contacts: false,
    address: false,
  },
});

const { walkThroughFields } = useProviderFields(state, fields);
const providers = ref(props.providers ?? []);

watch(
  () => props.providers,
  () => {
    walkThroughFields(props.providers);
  },
);

onMounted(() => {
  if (providers.value.length > 0) {
    walkThroughFields(props.providers);
  }
});

const canBeRelocated = computed(() => {
  return (
    parseInt(values.relocation_type_id) === 148 ||
    parseInt(values.relocation_type_id) === 149
  );
});
const isMetroEnabled = computed(() => {
  return true;
});

const { getCityNameFromArea, getCityNameFromArea2 } = useResumeHooks();
const { getCountryCities } = profileStore;
const cityOptions = ref([]);

const updateCityInput = async (newValue = "") => {
  console.log(newValue);
  if (newValue) {
    const items = await searchCities({ search: newValue });
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

// watch(
//   () => useWatchStateValues(state, true, false, ["providers"]),
//   (newState, oldState) => {
//     // console.log(newState, oldState);
//     if (!isFirst.value) {
//       isChanged.value = true;
//     } else {
//       isFirst.value = false;
//     }
//   },
// );

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
        first_name: newResume.first_name,
        last_name: newResume.last_name,
        middle_name: newResume.middle_name,
        email: newResume.email,
        is_preferred_email: newResume.is_preferred_email,
        birth_date: newResume.birth_date,
        city_id: newResume.city?.id,
        additional_information: newResume.additional_information,
        other_contacts: newResume.other_contacts,
        gender_id: newResume.gender?.id,
        relocation_type_id: newResume.relocation_type?.id,
        move_able_cities: newResume.move_able_cities,
        metros: newResume.metros,
        business_trip_id: newResume.business_trip?.id,
        address: newResume.address,
        social_networks: newResume.social_networks,
        phones: newResume.phones.map((item, index) => ({
          id: index,
          type_id: String(item.type?.id),
          phone: String(item.phone),
          comment: item.comment,
          is_preferred: item.is_preferred,
          start_available_time_phone: item.start_available_time_phone,
          end_available_time_phone: item.end_available_time_phone,
        })),
        is_relocatable: newResume.is_relocatable,
      };

      const city = newResume.city;
      if (newResume.city.hasOwnProperty("country_id")) {
        const city = newResume.city;
        onSearchCitiesByCountryId(city.country_id, city.name);
      }
    }
  },
);

watch(
  () => sectionData.value,
  (newData, oldData) => {
    const diffData = useDiff(newData, oldData);
    if (Object.keys(diffData).length) {
      resetForm({ values: newData });
      // resetField("phones", newData.phones);
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

const { errors: serverErrors, handleErrorResponse } = useFormValidation();
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
  console.log(1);
  save();
};
//
// const onSubmit = handleSubmit((submittedValues) => {
//   console.log(submittedValues);
//   save();
// });
const save = async (is_from_parent = false) => {
  state.isLoading = true;
  state.errorMessage = "";
  console.log(meta.value);
  if (!meta.value.dirty) {
    return true;
  }
  if (!meta.value.valid) {
    return false;
  }
  let resData = {};
  const jsonData = { ...values };

  jsonData.form_data = "PERSONAL_DATA";
  jsonData.phones = jsonData.phones.map((item) => ({
    ...item,
    phone: item.phone?.substring(1),
  }));

  resData = await updateResume(resumeID.value, jsonData);

  isUpdated.value = true;
  if (resData.status !== "success") {
    if (resData.message) {
      errorMessage.value = resData.message;
    }
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
