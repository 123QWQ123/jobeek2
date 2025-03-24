<template>
  <div class="w-box" v-click-outside="save">
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
            <div class="c2 mb2">
              <div class="input-wrapper">
                <input
                  type="text"
                  placeholder="Имя"
                  v-model="state.first_name.val"
                  @focusin="() => (errors.first_name = '')"
                />

                <div class="text-danger d-block" v-if="errors.first_name">
                  {{ errors.first_name }}
                </div>
              </div>
              <div class="input-wrapper">
                <input
                  type="text"
                  placeholder="Фамилия"
                  v-model="state.last_name.val"
                  @focusin="() => (errors.last_name = '')"
                />

                <div class="text-danger d-block" v-if="errors.last_name">
                  {{ errors.last_name }}
                </div>
              </div>
            </div>
            <div class="c1 mt-1">
              <input
                type="text"
                placeholder="Отчество"
                v-model="state.middle_name.val"
                @focusin="() => (errors.middle_name = '')"
              />

              <div class="text-danger d-block" v-if="errors.middle_name">
                {{ errors.middle_name }}
              </div>
            </div>
          </div>
        </div>
        <div class="input-row">
          <label>Дата рождения <b>*</b></label>
          <div class="input-wrapper">
            <BirthDatePicker
              v-model.lazy="state.birth_date.val"
              :value="state.birth_date.val"
              @focusin="() => (errors.birth_date = '')"
            ></BirthDatePicker>
            <div class="text-danger d-block" v-if="errors.birth_date">
              {{ errors.birth_date }}
            </div>
          </div>
        </div>

        <div class="input-row">
          <label for="resume_email">Электронная почта</label>
          <div class="input-wrapper">
            <div class="mb-1">
              <input
                id="resume_email"
                type="email"
                placeholder="Электронная почта"
                v-model="state.email.val"
                @focusin="() => (errors.email = '')"
              />
              <div class="text-danger d-block" v-if="errors.email">
                {{ errors.email }}
              </div>
            </div>
            <div
              class="check-block mt-2"
              v-if="!state.is_preferred_email.is_hidden"
            >
              <div class="checkbox">
                <input
                  type="checkbox"
                  id="hide_birthday"
                  v-model.number="state.is_preferred_email.val"
                  @focusin="() => (errors.is_preferred_email = '')"
                />
                <div class="checkbox-mask">
                  <img src="~/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <label for="hide_birthday" class="fs-14"
                >e-mail Является ли предпочтительным способом связи</label
              >
            </div>
            <div class="text-danger d-block" v-if="errors.is_preferred_email">
              {{ errors.is_preferred_email }}
            </div>
          </div>
        </div>

        <div class="input-row">
          <label>Город проживания <b>*</b></label>
          <div class="input-wrapper mt-2">
            <SelectWithSearch
              :options="cityOptions"
              v-model="state.city_id.val"
              :placeholder="'Ишите город'"
              @input="updateCityInput"
              @focusin="() => (errors.city_id = '')"
            ></SelectWithSearch>

            <div class="text-danger d-block" v-if="errors.city_id">
              {{ errors.city_id }}
            </div>
          </div>
        </div>

        <div class="input-row">
          <label>Релокация:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <CustomSelect
              :options="relocationTypeOptions"
              v-model="state.relocation_type_id.val"
              :label="'Выберите'"
            ></CustomSelect>
            <div class="text-danger d-block" v-if="errors.relocation_type_id">
              {{ errors.relocation_type_id }}
            </div>
          </div>
        </div>

        <CreateResumePersonalFieldsMovableCitiesInput
          v-if="canBeRelocated"
          v-model="state.move_able_cities.val"
          :errors="errors.move_able_cities"
          :providers="providers"
        />
        <CreateResumePersonalFieldsMetroInput
          v-if="isMetroEnabled"
          v-model="state.metros.val"
          :errors="errors.metro"
          :providers="providers"
        />

        <div class="input-row" v-if="!state.additional_information.is_hidden">
          <label>Дополнительные сведения</label>
          <div class="input-wrapper mt-2">
            <input
              type="text"
              v-model="state.additional_information.val"
              :placeholder="'Введите'"
              @focusin="() => (errors.additional_information = '')"
            />

            <div
              class="text-danger d-block"
              v-if="errors.additional_information"
            >
              {{ errors.additional_information }}
            </div>
          </div>
        </div>

        <div class="input-row">
          <label>Дополнительные контакты</label>
          <div class="input-wrapper mt-2">
            <input
              type="text"
              v-model="state.other_contacts.val"
              :placeholder="'Введите'"
              @focusin="() => (errors.other_contacts = '')"
            />

            <div class="text-danger d-block" v-if="errors.other_contacts">
              {{ errors.other_contacts }}
            </div>
          </div>
        </div>

        <div class="input-row">
          <label>Поль:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <CustomSelect
              :options="genderOptions"
              v-model="state.gender_id.val"
              :label="'Выберите'"
            ></CustomSelect>
            <div class="text-danger d-block" v-if="errors.gender_id">
              {{ errors.gender_id }}
            </div>
          </div>
        </div>

        <div class="input-row" v-if="!state.business_trip_id.is_hidden">
          <label>Готовность к командировкам:<b>*</b></label>
          <div class="input-wrapper mt-2">
            <CustomSelect
              :options="businessTripOptions"
              v-model="state.business_trip_id.val"
              :label="'Выберите'"
            ></CustomSelect>
            <div class="text-danger d-block" v-if="errors.business_trip_id">
              {{ errors.business_trip_id }}
            </div>
          </div>
        </div>

        <div class="input-row" v-if="!state.address.is_hidden">
          <label>Адрес</label>
          <div class="input-wrapper mt-2">
            <input
              type="text"
              v-model="state.address.val"
              :placeholder="'Введите'"
              @focusin="() => (errors.address = '')"
            />

            <div class="text-danger d-block" v-if="errors.address">
              {{ errors.address }}
            </div>
          </div>
        </div>

        <CreateResumeSocialNetworksForm
          v-if="my_resume"
          v-model="state.social_networks.val"
          :errors="errors"
        />

        <CreateResumePhoneFieldsForm
          v-if="my_resume && !state.phones.is_hidden"
          v-model="state.phones.val"
          :errors="errors"
        />

        <div class="text-danger d-block" v-if="errors.phones?.message">
          Телефон обязательно для заполнения
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useVacancyStore } from "~/store/vacancy";
import { useProfileStore } from "~/store/profile";
import { useFormData } from "~/composables/useFormData";
import { useRuntimeConfig } from "#app";
import useFormValidation from "~/composables/useFormValidation";
import { useWatchStateValues } from "~/composables/useWatchStateValues";
import { useDiff } from "~/composables/useDiff";
import { useDictionaryStore } from "~/store/dictionary";
import useProviderFields from "~/composables/useProviderFields";

import { useResumeStore } from "~/store/resume";
import useResumeHooks from "~/hooks/useResumeHooks";

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
const isCollapsed = ref(true);
const isUpdated = ref(false);

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
    val: "",
    isValid: true,
    is_hidden: false,
  },
  last_name: {
    val: "",
    isValid: true,
    is_hidden: false,
  },
  middle_name: {
    val: "",
    isValid: true,
    is_hidden: false,
  },
  email: {
    val: "",
    isValid: true,
    is_hidden: false,
  },
  is_preferred_email: {
    val: false,
    isValid: true,
    is_hidden: false,
  },
  birth_date: {
    val: null,
    isValid: true,
    is_hidden: false,
  },
  city_id: {
    val: null,
    isValid: true,
    is_hidden: false,
  },
  additional_information: {
    val: null,
    isValid: true,
    is_hidden: false,
  },
  other_contacts: {
    val: null,
    isValid: true,
    is_hidden: false,
  },
  gender_id: {
    val: null,
    isValid: true,
    is_hidden: false,
  },
  relocation_type_id: {
    val: null,
    isValid: true,
    is_hidden: false,
  },
  move_able_cities: {
    val: [],
    isValid: true,
    is_hidden: false,
  },
  metros: {
    val: [],
    isValid: true,
    is_hidden: false,
  },
  business_trip_id: {
    val: null,
    isValid: true,
    is_hidden: false,
  },
  address: {
    val: null,
    isValid: true,
    is_hidden: false,
  },
  social_networks: {
    val: [],
    isValid: true,
    is_hidden: false,
  },
  phones: {
    val: [
      {
        type_id: 151, // Рабочий телефон
        phone: null,
        comment: null,
        is_preferred: false,
        start_available_time_phone: null,
        end_available_time_phone: null,
      },
    ],
    isValid: true,
    is_hidden: false,
  },
  is_relocatable: {
    val: false,
    isValid: true,
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
    parseInt(state.relocation_type_id.val) === 148 ||
    parseInt(state.relocation_type_id.val) === 149
  );
});
const isMetroEnabled = computed(() => {
  return true;
});

const { getCityNameFromArea, getCityNameFromArea2 } = useResumeHooks();
const { getCountryCities } = profileStore;
const cityOptions = ref([]);

const updateCityInput = async (newValue = "") => {
  if (newValue) {
    const items = await searchCities({ search: newValue });
    cityOptions.value = items.map((item) => ({
      value: item.id,
      name: getCityNameFromArea2(item),
    }));
  }
};

watch(
  () => useWatchStateValues(state, true, false, ["providers"]),
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
        phones: newResume.phones.map((item) => ({
          type_id: item.type?.id,
          phone: item.phone,
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
      state.first_name.val = newData.first_name;
      state.last_name.val = newData.last_name;
      state.middle_name.val = newData.middle_name;
      state.email.val = newData.email;
      state.is_preferred_email.val = newData.is_preferred_email;
      state.birth_date.val = newData.birth_date;
      state.city_id.val = newData.city_id;
      state.additional_information.val = newData.additional_information;
      state.other_contacts.val = newData.other_contacts;
      state.gender_id.val = newData.gender_id;
      state.relocation_type_id.val = newData.relocation_type_id;
      state.move_able_cities.val = newData.move_able_cities;
      state.metros.val = newData.metros;
      state.business_trip_id.val = newData.business_trip_id;
      state.address.val = newData.address;
      state.social_networks.val = newData.social_networks;
      state.phones.val = newData.phones;
      state.is_relocatable.val = newData.is_relocatable;
    }
  },
);

const { searchCities } = profileStore;

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

    jsonData.form_data = "PERSONAL_DATA";
    jsonData.social_networks = jsonData.social_networks.map(
      (item) => item.item,
    );
    jsonData.phones = jsonData.phones.map((item) => ({
      ...item,
      phone: item.phone.substring(1),
    }));

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
