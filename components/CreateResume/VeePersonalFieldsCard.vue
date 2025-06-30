<template>
  <div
    class="w-box"
    v-click-outside="{
      handler: save,
      detectIFrame: true,
      exclude: ['.update-resume'],
    }"
    @click="isFocused = true"
  >
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
    <div class="w-box-body" :class="{ collapse: isCollapsed }">
      <div class="input-row">
        <label for="name">Имя и фамилия <b>*</b></label>
        <div class="input-wrapper">
          <div class="c2">
            <div class="input-wrapper">
              <ResumeTextInput
                name="first_name"
                placeholder="Имя"
                :value="my_resume?.first_name"
              />
            </div>
            <div class="input-wrapper">
              <ResumeTextInput
                name="last_name"
                placeholder="Фамилия"
                :value="my_resume?.last_name"
              />
            </div>
          </div>
          <div class="c1 mt-3">
            <ResumeTextInput
              name="middle_name"
              placeholder="Отчество"
              :value="my_resume?.middle_name"
            />
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
          <ResumeTextInput
            name="email"
            placeholder="Электронная почта"
            :value="my_resume?.email"
          />

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
            :value="my_resume?.additional_information"
          />
        </div>
      </div>

      <div class="input-row">
        <label>Дополнительные контакты</label>
        <div class="input-wrapper mt-2">
          <ResumeTextInput
            name="other_contacts"
            placeholder="Введите"
            :value="my_resume?.other_contacts"
          />
        </div>
      </div>

      <div class="input-row">
        <label>Город проживания:<b>*</b></label>
        <div class="input-wrapper mt-2">
          <VeeSelectWithSearch
            :options="cityOptions"
            name="city_id"
            placeholder="Выберите город"
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
        <label>Пол:<b>*</b></label>
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
          <ResumeTextInput
            name="address"
            placeholder="Введите"
            :value="my_resume?.address"
          />
        </div>
      </div>

      <CreateResumeVeeSocialNetworksForm
        v-show="!state.social_networks.is_hidden"
        name="social_networks"
      />

      <CreateResumeVeePhoneFieldsForm
        v-show="!state.phones.is_hidden"
        name="phones"
        :value="my_resume?.phones"
      />

      <div class="text-danger d-block">
        <ErrorMessage name="phones" />
      </div>
    </div>
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
import { zod } from "~/hooks/ru-zod.js";
import useProviders from "~/composables/useProviders.js";

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

const isCollapsed = ref(false);
const isFocused = ref(false);
const errorMessage = ref(null);
const cityOptions = computed(() => profileStore.cityOptions);

const { t } = useI18n();
const { providers } = useProviders();

const dictionaryStore = useDictionaryStore();

const genderOptions = computed(() =>
  dictionaryStore.resume_genders.map((item) => ({
    name: item.name,
    value: item.id,
  })),
);
const relocationTypeOptions = computed(() =>
  dictionaryStore.relocation_types.map((item) => ({
    name: item.name,
    value: item.id,
  })),
);
const businessTripOptions = computed(() =>
  dictionaryStore.business_trips.map((item) => ({
    name: item.name,
    value: item.id,
  })),
);

watch(
  () => providers.value,
  () => {
    walkThroughFields(providers.value);
  },
);
const isHHSelected = computed(() => {
  return providers.value.hh;
});

const schema = computed(() => {
  if (providers.value.hh === true && providers.value.superjob === false) {
    let phoneScheme = zod.object({
      type_id: zod.number(),
      comment: zod.string().optional().nullable(),
      phone: zod.string(),
      is_preferred: zod.boolean().optional().nullable(),
    });
    return zod.object({
      first_name: zod.string().min(2),
      last_name: zod.string().min(2),
      middle_name: zod.string().nullable().optional(),
      email: zod.string().email(),
      is_preferred_email: zod.boolean().nullable(),
      birth_date: zod.string().nullable().optional(),
      additional_information: zod.string().nullable().optional(),
      other_contacts: zod.string().nullable().optional(),
      gender_id: zod.number(),
      city_id: zod.number(),
      address: zod.string().nullable().optional(),
      business_trip_id: zod.number(),
      relocation_type_id: zod.number().nullable().optional(),
      social_networks: zod.number().array().optional(),
      phones: zod.array(phoneScheme).nonempty(),
    });
  }
  if (providers.value.hh === false && providers.value.superjob === true) {
    const phoneScheme = zod.object({
      start_available_time_phone: zod.string().optional().nullable(),
      end_available_time_phone: zod.string().optional().nullable(),
      phone: zod.string(),
    });
    return zod.object({
      first_name: zod.string().min(2),
      last_name: zod.string().nullable().optional(),
      middle_name: zod.string().nullable().optional(),
      email: zod.string().email().nullable().optional(),
      is_preferred_email: zod.boolean().nullable().optional(),
      birth_date: zod.string(),
      additional_information: zod.string().nullable().optional(),
      other_contacts: zod.string().nullable().optional(),
      gender_id: zod.number(),
      city_id: zod.number(),
      address: zod.string().nullable().optional(),
      business_trip_id: zod.number().nullable(),
      relocation_type_id: zod.number().nullable().optional(),
      social_networks: zod.number().array().optional(),
      phones: zod.array(phoneScheme).optional(),
    });
  }
  let phoneScheme = zod.object({
    type_id: zod.number(),
    comment: zod.string().optional().nullable(),
    start_available_time_phone: zod.string().optional().nullable(),
    end_available_time_phone: zod.string().optional().nullable(),
    phone: zod.string(),
    is_preferred: zod.boolean(),
  });
  return zod.object({
    first_name: zod.string().min(2),
    last_name: zod.string().min(2),
    middle_name: zod.string().nullable().optional(),
    email: zod.string().email(),
    is_preferred_email: zod.boolean().nullable(),
    birth_date: zod.string(),
    additional_information: zod.string().nullable().optional(),
    other_contacts: zod.string().nullable().optional(),
    gender_id: zod.number(),
    city_id: zod.number(),
    address: zod.string().nullable().optional(),
    business_trip_id: zod.number(),
    relocation_type_id: zod.number().nullable().optional(),
    social_networks: zod.number().array().optional(),
    phones: zod.array(phoneScheme).nonempty(),
  });
});

const initialValues = ref({
  first_name: my_resume.value?.first_name,
  last_name: my_resume.value?.last_name,
  middle_name: my_resume.value?.middle_name,
  email: my_resume.value?.email,
  is_preferred_email: my_resume.value?.is_preferred_email,
  birth_date: my_resume.value?.birth_date,
  city_id: my_resume.value?.city.id,
  city_name: my_resume.value?.city.name,
  additional_information: my_resume.value?.additional_information,
  other_contacts: my_resume.value?.other_contacts,
  gender_id: my_resume.value?.gender?.id,
  relocation_type_id: my_resume.value?.relocation_type?.id,
  move_able_cities: my_resume.value?.move_able_cities,
  social_networks: my_resume.value?.social_networks,
  phones: my_resume.value?.phones.map((item, index) => ({
    id: index,
    type_id: item.type?.id,
    phone: String(item.phone),
    comment: item.comment,
    is_preferred: item.is_preferred,
    start_available_time_phone: item.start_available_time_phone,
    end_available_time_phone: item.end_available_time_phone,
  })),
  business_trip_id: my_resume.value?.business_trip?.id,
  metros: my_resume.value?.metros,
  address: my_resume.value?.address,
  is_relocatable: my_resume.value?.is_relocatable,
});

const { errors, values, setErrors, meta, resetForm, validate, setValues } =
  useForm({
    initialValues: initialValues,
    validationSchema: toTypedSchema(schema.value),
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
walkThroughFields(providers.value);

//todo сделать константы для этих магических чисел
const canBeRelocated = computed(() => {
  return (
    parseInt(values.relocation_type_id) === 148 ||
    parseInt(values.relocation_type_id) === 149
  );
});

const selectedProviders = computed(() => {
  if (providers.value.hh === true && providers.value.superjob === false)
    return ["hh"];
  if (providers.value.hh === false && providers.value.superjob === true)
    return ["superjob"];
  return ["hh", "superjob"];
});

const moveableCityOptions = ref(profileStore.cityOptions);
const updateMoveableCityInput = async (newValue = "") => {
  const items = profileStore.cities.filter((item) => {
    return item.name.search(newValue);
  });
  moveableCityOptions.value = items.map((item) => ({
    value: item.id,
    name: item.name,
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

const save = async (is_from_parent = false) => {
  errorMessage.value = "";
  await validate();

  if (!isFocused.value || !meta.value.dirty || !meta.value.valid) {
    return false;
  }
  setErrors({});
  isFocused.value = false;
  const jsonData = { ...JSON.parse(JSON.stringify(values)) };

  jsonData.form_data = "PERSONAL_DATA";
  jsonData.phones = jsonData.phones?.map((item) => ({
    ...item,
    phone: item.phone?.replace("+", ""),
  }));

  let resData = await updateResume(resumeID.value, jsonData);

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
</script>
