<template>
  <div class="row position-relative empty-area">
    <span class="position-absolute absoluted_icon" @click="deleteItem">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    </span>
    <div class="col-12">
      <div class="row">
        <div class="input-row" v-show="!state.profession.is_hidden">
          <label for="position">Должность<b>*</b></label>
          <div class="input-wrapper">
            <ResumeTextInput
              :name="`${name}[${idx}].profession`"
              placeholder="Введите"
            />
          </div>
        </div>

        <div class="input-row" v-show="!state.company_url.is_hidden">
          <label for="position">Ссылка на сайт компании<b>*</b></label>
          <div class="input-wrapper">
            <ResumeTextInput
              :name="`${name}[${idx}].company_url`"
              placeholder="Введите"
            />
          </div>
        </div>

        <div class="input-row" v-show="!state.company.is_hidden">
          <label for="position">Название компании<b>*</b></label>
          <div class="input-wrapper">
            <ResumeTextInput
              :name="`${name}[${idx}].company`"
              placeholder="Введите"
            />
          </div>
        </div>

        <div class="input-row">
          <label>Город:</label>
          <div class="input-wrapper mt-2">
            <VeeSelectWithSearch
              :options="cityOptions"
              :name="`${props.name}[${props.idx}].city_id`"
              placeholder="Выберите город"
              @input="updateCityInput"
            />
          </div>
        </div>

        <!--        <div class="input-row" v-show="!state.company.is_hidden">-->
        <!--          <label for="position">Город<b>*</b></label>-->
        <!--          <div class="input-wrapper">-->
        <!--            <VeeCustomSelect-->
        <!--              :options="cityOptions"-->
        <!--              :name="`${props.name}[${props.idx}].city_id`"-->
        <!--              label="Начало года"-->
        <!--            />-->
        <!--          </div>-->
        <!--        </div>-->

        <div class="input-row" v-show="!state.company_scope.is_hidden">
          <label for="position">Деятельность компании</label>
          <div class="input-wrapper">
            <ResumeTextInput
              :name="`${props.name}[${props.idx}].company_scope`"
              placeholder="Опишите"
            />
          </div>
        </div>
        <div class="input-row" v-show="!state.industries.is_hidden">
          <label for="position">Отраслей компании<b>*</b></label>
          <div class="input-wrapper">
            <VeeMultiSelectWithSearch
              :options="industryOptions"
              @input="updateIndustryInput"
              :name="`${props.name}[${props.idx}].industries`"
              placeholder="Выберите"
            />
          </div>
        </div>

        <div class="input-row">
          <label for="position">Даты<b>*</b></label>
          <div class="input-wrapper">
            <div class="c2">
              <div v-show="!state.start_year.is_hidden">
                <VeeCustomSelect
                  :options="yearOptions"
                  :name="`${props.name}[${props.idx}].start_year`"
                  label="Начало года"
                />
                <div
                  class="alert alert-warning"
                  v-if="state.start_year.isValid"
                >
                  Начало должен быть меньше чем окончания
                </div>
              </div>
              <div v-show="!state.start_month.is_hidden">
                <VeeCustomSelect
                  :options="monthOptions"
                  :name="`${props.name}[${props.idx}].start_month`"
                  label="Начало месяца"
                />
              </div>
            </div>
            <div class="c2 mt-2" v-if="!until_today === true">
              <div v-show="!state.end_year.is_hidden">
                <VeeCustomSelect
                  :options="yearOptions"
                  :name="`${name}[${idx}].end_year`"
                  label="Выберите"
                />
              </div>
              <div v-show="!state.end_month.is_hidden">
                <VeeCustomSelect
                  :options="monthOptions"
                  :name="`${props.name}[${props.idx}].end_month`"
                  label="Окончание месяца"
                />
              </div>
            </div>
            <div class="check-block mt-2" v-show="!state.until_today.is_hidden">
                <ResumeCheckboxInput
                  label="Работаю по настоящее время"
                  :name="`${props.name}[${props.idx}].until_today`"
                />
            </div>
          </div>
        </div>

        <div class="input-row" v-show="!state.responsibilities.is_hidden">
          <label for="position">Обязанности<b>*</b></label>
          <div class="input-wrapper">
            <ResumeTextarea
              :name="`${props.name}[${props.idx}].responsibilities`"
              placeholder="Опишите, какие обязанности у вас были в этой компании, что именно вы делали"
            />
          </div>
        </div>
        <div class="input-row" v-show="!state.achievements.is_hidden">
          <label for="position">Достижения<b>*</b></label>
          <div class="input-wrapper">
            <ResumeTextInput
              :name="`${props.name}[${props.idx}].achievements`"
              placeholder="Опишите"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDictionaryStore } from "~/store/dictionary";
import { useWatchStateValues } from "~/composables/useWatchStateValues";
import { useVacancyStore } from "~/store/vacancy";
import ResumeTextInput from "~/components/CreateResume/ResumeTextInput.vue";
import ResumeTextarea from "~/components/CreateResume/ResumeTextarea.vue";
import ResumeCheckboxInput from "~/components/CreateResume/ResumeCheckboxInput.vue";
import useProviderFields from "~/composables/useProviderFields.js";
import useProviders from "~/composables/useProviders.js";
import useResumeHooks from "~/hooks/useResumeHooks.js";
import { useProfileStore } from "~/store/profile.js";
import { useResumeStore } from "~/store/resume.js";

const emit = defineEmits(["delete", "update"]);
const props = defineProps(["idx", "name"]);

const { value: city_id } = useField(
  () => `${props.name}[${props.idx}].city_id`,
);

const errors = ref(props.errors);
watch(
  () => props.errors,
  (newErrors) => {
    errors.value = newErrors;
  },
);
const dictionaryStore = useDictionaryStore();
const vacancyStore = useVacancyStore();
const resumeStore = useResumeStore();

const { getIndustries } = resumeStore;
const { industries } = resumeStore;
const { value: until_today } = useField(
  () => `${props.name}[${props.idx}].until_today`,
);
// const { value: industries } = useField(
//   () => `${props.name}[${props.idx}].industries`,
// );
const updateIndustryInput = async (newValue = "") => {
  industries.filter((item) => item.title.includes(newValue));
  industryOptions.value = industries
    .filter((item) => item.title.includes(newValue))
    .map((item) => ({
      value: item.id,
      name: item.title,
    }));
};
const profileStore = useProfileStore();
const { getCityNameFromArea2 } = useResumeHooks();
const { searchCities } = profileStore;
const industryOptions = ref(
  industries.map((item) => ({
    value: item.id,
    name: item.title,
  })),
);
const cityOptions = ref([]);
const updateCityInput = async (newValue = "") => {
  if (newValue.length < 2) {
    return;
  }
  const items = (await searchCities({ search: newValue })) ?? [];
  cityOptions.value = items.map((item) => ({
    value: item.id,
    name: getCityNameFromArea2(item),
  }));
};
const onSearchCitiesByCountryId = async (country_id, name) => {
  const items = await searchCities({ search: name });

  cityOptions.value = items.map((item) => ({
    value: item.id,
    name: getCityNameFromArea2(item),
  }));
};

onMounted(() => {
  walkThroughFields(providers.value);
  updateIndustryInput();

  const newResume = resumeStore.my_resume;
  if (newResume?.experience?.length) {
    const city = newResume.experience[props.idx].city;
    if (city?.country_id) onSearchCitiesByCountryId(city.country_id, city.name);
  }
});

const isNew = ref(props.isNew);

const deleteItem = (id = null) => {
  emit("delete", props.id);
};

const { providers } = useProviders();

const state = reactive({
  profession: {
    is_hidden: false,
  },
  city_id: {
    is_hidden: false,
  },
  city_name: {
    is_hidden: false,
  },
  company: {
    is_hidden: false,
  },
  company_url: {
    is_hidden: false,
  },
  industries: {
    is_hidden: false,
  },
  start_month: {
    is_hidden: false,
  },
  end_month: {
    is_hidden: false,
  },
  start_year: {
    is_hidden: false,
  },
  until_today: {
    is_hidden: false,
  },
  end_year: {
    is_hidden: false,
  },
  responsibilities: {
    is_hidden: false,
  },
  achievements: {
    is_hidden: false,
  },
  company_scope: {
    is_hidden: false,
  },
});

const fields = ref({
  hh: {
    profession: true,
    responsibilities: true,
    company: true,
    achievements: true,
    company_scope: null,
    company_url: false,
    city_id: false,
    city_name: false,
    industries: false,
    start_year: true,
    start_month: true,
    end_month: false,
    end_year: false,
    until_today: false,
  },
  superjob: {
    profession: false,
    responsibilities: true,
    company: false,
    achievements: false,
    company_scope: null,
    company_url: false,
    city_id: false,
    city_name: false,
    industries: null,
    start_year: true,
    start_month: true,
    end_month: false,
    end_year: false,
    until_today: false,
  },
});

const { walkThroughFields } = useProviderFields(state, fields);
watch(
  () => providers.value,
  () => {
    walkThroughFields(providers.value);
  },
);

const yearOptions = computed(() => useYearOptions());
const monthOptions = computed(() => useMonthOptions());

const save = () => {
  emit("update", props.id, useFormData(state));
};
watch(() => useWatchStateValues(state), save);
</script>

<style scoped>


</style>
