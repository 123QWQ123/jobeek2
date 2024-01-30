<template>
  <div class="w-box w-box--main w-box-resume pb-4" v-click-outside="save">
    <div class="w-box-head">
      <h1 class="title">{{ formTitle }}</h1>
      <div class="descr">
        Получайте уведомления о новых по созданному запросу
      </div>
      <span class="arrow"></span>
    </div>

    <div class="text-danger d-block p-4" v-if="errors.message">
      {{ errors.message }}
    </div>
    <div class="w-box-body" :class="{ disabled: isLoading }">
      <CreateResumeProvidersInput
        v-model="state.providers.val"
        :errors="errors"
      />
      <div class="input-row">
        <label for="name">Название вакансии<b>*</b></label>
        <div class="input-wrapper">
          {{ title }}
          <div class="c1 mt-1">
            {{ state.title.val }}
            {{ values }}

            <input
              type="text"
              placeholder="Название"
              v-model="state.title.val"
              @focusin="
                () => {
                  errors.title = '';
                }
              "
            />

            <div class="text-danger d-block" v-if="errors.title">
              {{ errors.title }}
            </div>
            <!--            <div class="text-danger d-block" v-if="veeErrors.title">-->
            <!--              {{ veeErrors.title }}-->
            <!--            </div>-->
          </div>
        </div>
      </div>

      <div class="input-row">
        <label for="name">Имя и фамилия <b>*</b></label>
        <div class="input-wrapper">
          <div class="c2">
            <div class="input-wrapper">
              <input
                type="text"
                placeholder="Имя"
                v-model="state.first_name.val"
                @focusin="
                  () => {
                    errors.first_name = '';
                  }
                "
              />

              <!--              <div class="text-danger d-block" v-if="veeErrors.first_name">-->
              <!--                {{ veeErrors.first_name }}-->
              <!--              </div>-->
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

              <!--              <div class="text-danger d-block" v-if="veeErrors.last_name">-->
              <!--                {{ veeErrors.last_name }}-->
              <!--              </div>-->
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

            <!--            <div class="text-danger d-block" v-if="veeErrors.middle_name">-->
            <!--              {{ veeErrors.middle_name }}-->
            <!--            </div>-->
            <div class="text-danger d-block" v-if="errors.middle_name">
              {{ errors.middle_name }}
            </div>
          </div>
        </div>
      </div>

      <div class="input-row">
        <label>Дата рождения <b>*</b></label>
        <div class="input-wrapper">
          <div class="mb-1">
            <VeeBirthDatePicker
              v-model.lazy="state.birth_date.val"
              @focusin="() => (errors.birth_date = '')"
            ></VeeBirthDatePicker>

            <!--            {{ veeErrors }}-->
            <!--            <div class="text-danger d-block" v-if="veeErrors.birth_date">-->
            <!--              {{ veeErrors.birth_date }}-->
            <!--            </div>-->
            <div class="text-danger d-block" v-if="errors.birth_date">
              {{ errors.birth_date }}
            </div>
          </div>
        </div>
      </div>
      <div class="input-row">
        <label>Город проживания:<b>*</b></label>
        <div class="input-wrapper mt-2">
          <SelectWithSearch
            :options="cityOptions"
            v-model="state.city_id.val"
            :placeholder="'Выберите город'"
            @input="updateCityInput"
            @focusin="() => (errors.city_id = '')"
          ></SelectWithSearch>
          <div class="text-danger d-block" v-if="errors.city_id">
            {{ errors.city_id }}
          </div>
        </div>
      </div>

      <!--          <div class="input-row" v-if="isMovableCitiesEnabled">-->
      <!--            <label>Переехать могу:<b>*</b></label>-->
      <!--            <div class="input-wrapper mt-2">-->
      <!--              <MultiSelectWithSearch :options="moveableCityOptions" v-model="state.move_able_cities.val" :label="'Выберите город'" @input="updateMoveableCityInput" @focusin="() => errors.move_able_cities = ''"></MultiSelectWithSearch>-->
      <!--              <div class="text-danger d-block" v-if="errors.move_able_cities">-->
      <!--                {{errors.move_able_cities}}-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->

      <!--          <div class="input-row">-->
      <!--            <label>Переехать могу:<b>*</b></label>-->
      <!--            <div class="input-wrapper mt-2">-->
      <!--              {{state.move_able_cities.val}}-->
      <!--              <MultiSelectWithSearch :options="workTypeOptions" v-model="state.work_types.val" :label="'Выберите город'" @input="updateMoveableCityInput" @focusin="() => errors.move_able_cities = ''"></MultiSelectWithSearch>-->
      <!--              <div class="text-danger d-block" v-if="errors.work_types">-->
      <!--                {{errors.move_able_cities}}-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->

      <div class="input-row">
        <label for="email">Email<b>*</b></label>
        <div class="input-wrapper">
          <div class="c1 mt-1">
            <input
              type="text"
              id="email"
              placeholder="Э-почта"
              v-model="state.email.val"
              @focusin="() => (errors.email = '')"
            />

            <div class="text-danger d-block" v-if="errors.email">
              {{ errors.email }}
            </div>
          </div>

          <div class="check-block mt-2">
            <div class="checkbox">
              <input
                type="checkbox"
                id="is_preferred_email"
                v-model.number="state.is_preferred_email.val"
                @focusin="() => (errors.is_preferred_email = '')"
              />
              <div class="checkbox-mask">
                <img src="~/assets/img/svg/check.svg" alt="#" />
              </div>
            </div>
            <label for="is_preferred_email" class="fs-14"
              >Является ли предпочтительным способом связи</label
            >
          </div>
          <div class="text-danger d-block" v-if="errors.is_preferred_email">
            {{ errors.is_preferred_email }}
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

      <div class="input-row">
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

      <div class="input-row">
        <label>Тип работы:<b>*</b></label>
        <div class="input-wrapper mt-2">
          <MultiSelectWithSearch
            :options="workTypeOptions"
            v-model="state.work_types.val"
            :label="'Выберите'"
          ></MultiSelectWithSearch>
          <div class="text-danger d-block" v-if="errors.work_types">
            {{ errors.work_types }}
          </div>
        </div>
      </div>

      <!--      {{ values }}-->
      <!--          <CreateResumeDraftCardMetrosInput v-model="state.metros.val" :errors="{metros: errors.metros}"/>-->
      <!--            <div class="input-row">-->
      <!--                <label>Специализация:<b>*</b></label>-->
      <!--                <div class="input-wrapper mt-2">-->
      <!--                    <MultiSelectWithSearch :options="professionalRoleOptions" v-model="state.professional_roles.val" :label="'Выберите специализацию'" @input="updateProfessionalInput" @focusin="() => errors.professional_roles = ''"></MultiSelectWithSearch>-->

      <!--                    <div class="text-danger d-block" v-if="errors.professional_roles">-->
      <!--                        {{errors.professional_roles}}-->
      <!--                    </div>-->

      <!--                </div>-->

      <!--            </div>-->

      <!--            <div class="input-row">-->
      <!--                <label for="description">Описание:</label>-->
      <!--                <div class="input-wrapper">-->
      <!--                  <RichEditor v-model="state.description.val"/>-->
      <!--                    <div class="text-danger d-block" v-if="errors.description">-->
      <!--                        {{errors.description}}-->
      <!--                    </div>-->
      <!--                </div>-->
      <!--            </div>-->

      <!--            <CreateVacancySalary v-model="state.salary.val" :errors="errors.salary"/>-->
      <br />
    </div>
  </div>
</template>

<script setup>
import { useDictionaryStore } from "~/store/dictionary";

const props = defineProps(["title"]);
import { useResumeStore } from "~/store/resume";

import { useProfileStore } from "~/store/profile";
import { useFormData } from "~/composables/useFormData";
import { useRuntimeConfig } from "#app";
import useFormValidation from "~/composables/useFormValidation";
import { storeToRefs } from "pinia";
import { useWatchStateValues } from "~/composables/useWatchStateValues";
import useResumeHooks from "~/hooks/useResumeHooks";
const resumeStore = useResumeStore();
const profileStore = useProfileStore();
const CONFIG = useRuntimeConfig();
const route = useRoute();

const { seeker } = profileStore;
const { resume } = storeToRefs(resumeStore);
const formTitle = computed(() => props.title);

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isCollapsed = ref(false);
const isUpdated = ref(false);

const { values, errors: veeErrors, defineField } = useForm({});
//
// const [title, titleProps] = defineField("title");
// const [first_name, first_nameProps] = defineField("first_name");
// const [last_name, last_nameProps] = defineField("last_name");
// const [middle_name, middle_nameProps] = defineField("middle_name");
// const [birthdate, birthdateProps] = defineField("birthdate");

const { createResume } = resumeStore;

const providers = ref({
  hh: false,
  superjob: false,
});

watch(
  () => providers.value,
  () => {
    state.providers.val = {
      hh: providers.value.hh,
      superjob: providers.value.superjob,
    };
  }
);
const state = reactive({
  providers: {
    val: [],
    isValid: true,
    is_hidden: false,
  },
  title: {
    val: "",
    isValid: true,
    is_hidden: false,
  },
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
  city_id: {
    val: "",
    isValid: true,
    is_hidden: false,
  },
  move_able_cities: {
    val: [],
    isValid: true,
    is_hidden: true,
  },
  metros: {
    val: [],
    isValid: true,
    is_hidden: true,
  },
  birth_date: {
    val: null,
    isValid: true,
  },
  gender_id: {
    val: null,
    isValid: true,
  },
  business_trip_id: {
    val: null,
    isValid: true,
  },
  work_types: {
    val: null,
    isValid: true,
  },
  relocation_type_id: {
    val: null,
    isValid: true,
    is_hidden: true,
  },
  social_networks: {
    val: [],
    isValid: true,
    is_hidden: true,
  },
});
const isMovableCitiesEnabled = computed(() => {
  const relocation_id = parseInt(state.relocation_type_id.val);
  return relocation_id === 148 || relocation_id === 149;
});
watch(
  () => useWatchStateValues(state, true, true),
  (newState, oldState) => {
    isChanged.value = true;
  }
);
// watch(
//   () => ({
//     ...values,
//   }),
//   (newState, oldState) => {
//     isChanged.value = true;
//   }
// );

const { searchCities, searchProfessionalRoles } = profileStore;

const dictionaryStore = useDictionaryStore();
const cityOptions = ref([]);
const moveableCityOptions = ref([]);
const professionalRoleOptions = ref([]);

const genderOptions = computed(() => {
  return dictionaryStore.resume_genders.map((item) => ({
    name: item.name,
    value: item.id,
  }));
});
const workTypeOptions = computed(() => {
  return dictionaryStore.work_types.map((item) => ({
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
const metroOptions = ref([]);
const { getGenders, getBusinessTrips, getWorkTypes } = dictionaryStore;
const { getMetros } = resumeStore;
const { searchMetro } = useDictionaryStore();
onMounted(() => {
  getGenders({}, true);
  getBusinessTrips();
  getWorkTypes();
});

const updateInput = async (newValue = "") => {
  if (newValue.length > 2) {
    const items = (await searchMetro({ search: newValue })) ?? [];
    let newOptions = items
      .filter((item) => item.cityId)
      .map((item) => ({
        value: item.cityId,
        name: `${item.city_name}, ${item.region_name}, ${item.country_name}`,
      }));
    // newOptions = [...new Map(newOptions.map(item =>  [item[key], item])).values()];
    metroOptions.value = newOptions.concat(selectedOptions.value);
  }
};

const { getCityName, getCityNameFromArea2 } = useResumeHooks();
const updateCityInput = async (newValue = "") => {
  const items = (await searchCities({ search: newValue })) ?? [];
  console.log(items);
  cityOptions.value = items.map((item) => ({
    value: item.id,
    name: getCityNameFromArea2(item),
  }));
};

const updateMoveableCityInput = async (newValue = "") => {
  const items = (await searchCities({ search: newValue })) ?? [];
  moveableCityOptions.value = items.map((item) => ({
    value: item.city_id,
    name: getCityName(item),
  }));
};

const updateProfessionalInput = async (newValue = "") => {
  let items = await searchProfessionalRoles();
  items = items.filter((item) => item.name.includes(newValue));
  professionalRoleOptions.value = items.map((item) => ({
    value: item.id,
    name: item.name,
  }));
};

const { errors, handleErrorResponse } = useFormValidation(state);
const isLoading = ref(false);
const save = async (is_from_parent = false) => {
  if (isChanged.value) {
    state.isLoading = true;
    // validate();
    errors.value = {};
    state.errorMessage = "";
    let resData = {};
    const formData = useFormData(state);
    isLoading.value = true;
    resData = await createResume(formData);
    if (resData.status === "success") {
      isLoading.value = false;

      const resume_id = resData.data.data.id;
      state.isNew = false;
      setTimeout(() => {
        console.log("redirecting...");
        navigateTo({ name: "my-resume-id", params: { id: resume_id } });
      }, 100);
    }
    isLoading.value = false;
    if (resData.status !== "success") {
      return handleErrorResponse(resData.data);
    }
    if (is_from_parent) {
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    }
    isChanged.value = false;
    isSaved.value = false;
    isUpdated.value = false;
  }
};
</script>

<style>
.w-box-body.disabled {
  position: relative;
}
.w-box-body.disabled:before {
  left: 0;
  top: 0;
  z-index: 999;
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
</style>
