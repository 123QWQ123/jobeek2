<template>
  <div class="row position-relative">
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

    {{ values }}
    <div class="input-wrapper">
      <VeeCustomSelect
        :options="preferredContactTypeOptions"
        name="type_id"
        :label="'Выберите'"
      />
    </div>

    <div class="input-wrapper mt-2">
      <div class="position-relative">
        <span
          class="position-absolute absoluted_icon right-0 top-2"
          @click="onCancelConfirmation"
        >
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

        <span
          v-if="isPhoneConfirmed"
          class="h-100 fs-6 position-absolute end-0 top-0 p-0 px-0 mt-0 me-5 pb-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style="transform: scale(0.5)"
            viewBox="0 0 48 48"
            width="48px"
            height="48px"
          >
            <path
              fill="green"
              d="M40.6 12.1L17 35.7 7.4 26.1 4.6 29 17 41.3 43.4 14.9z"
            />
          </svg>
        </span>
        <VuePhoneInput
          ref="phoneElement"
          v-model="phone"
          @focusout="onPhoneChange"
          @focus="onStartEditing"
          @change-country-code="onChangeCountryCode"
          :disabled="state.phone.disabled"
        />
      </div>

      <div class="captcha_url mt-2" v-if="isCaptchaUrlShown">
        <p class="alert alert-info">
          Пройдите капчу потом обратно вернитесь, к текущему действию.
        </p>
        <button class="btn btn-primary" @click="onClickSolveCaptcha">
          Решить капчу
        </button>
      </div>

      <div class="mt-2 c2 align-items-baseline">
        <div class="input-wrapper" v-if="isConfirmationCodeInputShown">
          <input
            type="text"
            placeholder="Код потверждения"
            v-model="state.confirmation_code.val"
            @focusin="() => (errors.confirmation_code = '')"
          />

          <div class="text-danger d-block" v-if="errors.confirmation_code">
            {{ errors.confirmation_code }}
          </div>
        </div>

        <div class="input-wrapper" v-if="isConfirmationButtonShown">
          <button
            type="button"
            class="btn btn-outline-primary"
            @click.prevent="onSendConfirmationCode"
          >
            Получить код
          </button>
        </div>
        <div class="input-wrapper" v-else-if="isConfirmationCodeButtonShown">
          <button
            type="button"
            class="btn btn-outline-primary"
            @click.prevent="onConfirmPhone"
          >
            Потвердить телефон
          </button>
        </div>
      </div>
      <div class="text-danger d-block" v-if="errors.phone">
        {{ errors.phone }}
      </div>
      <div
        class="spinner-border text-primary mt-1"
        role="status"
        v-if="isPhoneChecking"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="text-danger d-block" v-if="phoneMessage">
        {{ phoneMessage }}
      </div>

      <br />
      <div class="alert alert-info" v-if="seconds">
        На телефон выслан код подтверждения. Выслать код повторно можно через
        {{ formattedLeftTime }}
      </div>
      <!--      <TimerWithProgressBar v-if="seconds" v-model="seconds" :max="10" />-->
    </div>

    <div class="row">
      <ResumeCheckboxInput
        name="is_preferred"
        label="предпочтительным является"
      />
    </div>

    <div class="input-row mt-2">
      <label>Отвечу на звонки</label>

      <div class="start-to-end">
        <div class="hour_c2">
          <VeeCustomSelect
            :options="useHourOptions()"
            name="start_available_time_phone"
            :label="'От'"
          />
        </div>
        <div class="hour_c2">
          <VeeCustomSelect
            :options="useHourOptions()"
            name="end_available_time_phone"
            :label="'До'"
          />
        </div>
      </div>
    </div>

    <div class="input-wrapper mt-2">
      <ResumeTextarea name="comment"></ResumeTextarea>
    </div>
  </div>
</template>

<script setup>
import { useDictionaryStore } from "~/store/dictionary";
import { useHourOptions } from "~/composables/useHourOptions";
import { useResumeStore } from "~/store/resume";
import { useAuthStore } from "~/store/auth";
import useResumeHooks from "~/hooks/useResumeHooks";
import ResumeTextarea from "~/components/CreateResume/ResumeTextarea.vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import ResumeCheckboxInput from "~/components/CreateResume/ResumeCheckboxInput.vue";

const emit = defineEmits(["delete", "update", "update:modelValue"]);
const props = defineProps({
  isNew: {
    required: false,
    default: false,
  },
  key: {
    required: true,
  },
});
watch(
  () => props.errors,
  (newErrors) => {
    errors.value = newErrors;
  },
);
const authStore = useAuthStore();

const dictionaryStore = useDictionaryStore();

const preferredContactTypeOptions = computed(() => {
  return dictionaryStore.preferred_contact_types.map((item) => ({
    name: item.name,
    value: item.id,
  }));
});

const isNew = ref(props.isNew);

const { values, errors, meta, setFieldValue } = useForm({
  validationSchema: {
    type_id: yup.number().required(),
    start_available_time_phone: yup.string().required(),
    end_available_time_phone: yup.string().required(),
    comment: yup.string().required(),
    is_preferred: "boolean",
  },
});

const state = reactive({
  type_id: {
    is_hidden: false,
  },
  phone: {
    is_hidden: false,
    disabled: false,
    country_code: "RU",
  },
  confirmation_code: {
    is_hidden: true,
  },
  comment: {
    is_hidden: false,
  },
  is_preferred: {
    is_hidden: false,
  },
  start_available_time_phone: {
    is_hidden: false,
  },
  end_available_time_phone: {
    is_hidden: false,
  },
});

const phoneElement = ref();
const { seeker } = authStore;
const phone = ref("");
const timer = ref();

const { convertSecondsToHoursAndMinutes } = useResumeHooks();
const formattedLeftTime = computed(() => {
  if (seconds.value < 60) {
    return seconds.value;
  }

  return convertSecondsToHoursAndMinutes(seconds.value);
});
onMounted(() => {
  if (seeker.hasOwnProperty("phone")) {
  }
});

const deleteItem = (id = null) => {
  emit("delete", props.key);
};

const resumeStore = useResumeStore();
const { getPhoneConfirmationCode, confirmPhoneConfirmationCode, getPhoneInfo } =
  resumeStore;
const isPhoneChanged = ref(false);
const isConfirmationButtonShown = ref(false);
const isConfirmationCodeButtonShown = ref(false);
const isConfirmationCodeInputShown = ref(false);
const isConfirmationButtonClicked = ref(false);
const isCaptchaUrlShown = ref(false);
const isPhoneConfirmed = ref(true);
const isPhoneChecking = ref(false);
const captchaUrl = ref(null);

const onCancelConfirmation = () => {
  isConfirmationButtonClicked.value = false;
  state.phone.disabled = false;
  isCaptchaUrlShown.value = false;
  isConfirmationButtonShown.value = false;
  phoneMessage.value = null;
  phoneElement.value.focus();
};
const onStartEditing = () => {
  isConfirmationButtonClicked.value = false;
  state.phone.disabled = false;
  isCaptchaUrlShown.value = false;
  isConfirmationButtonShown.value = false;
  phoneMessage.value = null;
  phoneElement.value.focus();
};

const onClickSolveCaptcha = () => {
  isCaptchaUrlShown.value = false;
  isConfirmationCodeButtonShown.value = false;
  isConfirmationButtonShown.value = true;
  window.open(captchaUrl.value);
};
const seconds = ref(0);
const phoneMessage = ref(null);
const onSendConfirmationCode = async () => {
  isConfirmationButtonClicked.value = true;
  isPhoneChecking.value = true;
  const phoneInput = phone.value.replace("+", "");
  const resData = await getPhoneConfirmationCode({
    phone: phoneInput,
  });

  console.log(resData);

  if (resData.status !== "success") {
    const { data } = resData;
    if (!data) {
      phoneMessage.value = resData.message;
      isPhoneChecking.value = false;
      return;
    }
    if (data.hasOwnProperty("captcha")) {
      isCaptchaUrlShown.value = true;
      isConfirmationButtonShown.value = false;
      captchaUrl.value = data.captcha;
      isPhoneChecking.value = false;
      return;
    }
    phoneMessage.value = resData.message;
    isPhoneChecking.value = false;
    return;
  }

  isPhoneChecking.value = false;
  if (resData.data.hh.can_request_code_again_in) {
    isConfirmationCodeInputShown.value = true;
    isConfirmationCodeButtonShown.value = true;

    console.log(resData.data.hh.can_request_code_again_in);
    seconds.value = resData.data.hh.can_request_code_again_in;
    timer.value = setInterval(() => {
      seconds.value--;
      console.log(timer.value);
      if (seconds.value < 1 && timer.value) {
        clearInterval(timer.value);
      }
    }, 1000);
  }
  console.log(resData);
};
const onConfirmPhone = async () => {
  isConfirmationButtonClicked.value = true;
  const phoneInput = phone.value.replace("+", "");
  const resData = await confirmPhoneConfirmationCode({
    phone: phoneInput,
    confirmation_code: state.confirmation_code.val,
  });
  console.log(resData);
  if (resData.status !== "success") {
    return;
  }
  isConfirmationButtonClicked.value = false;
  state.phone.disabled = false;
  phone.value = phoneInput;
  isCaptchaUrlShown.value = false;
};
const onChangeCountryCode = async (newCountryCode) => {
  console.log(newCountryCode);
  if (typeof newCountryCode === "string") {
    state.phone.country_code = newCountryCode;
  }
};
const onPhoneChange = async (e) => {
  isPhoneChecking.value = true;
  const phoneInput = phone.value.replace("+", "");
  const phoneInfo = await getPhoneInfo({ phone: phoneInput });
  if (phoneInfo.status !== "success") {
    phoneMessage.value = phoneInfo.message;
    state.phone.disabled = true;
    isPhoneChecking.value = false;
    return;
  }
  const { phone: phoneObject } = phoneInfo.data.hh;
  if (!phoneObject) {
    isPhoneChecking.value = false;
    setFieldValue("phone", phoneInput);
    return;
  }

  console.log(phoneObject);
  if (!phoneObject.need_verification) {
    isPhoneChecking.value = false;
    phoneMessage.value = null;
    setFieldValue("phone", phoneInput);
    return;
  }
  const country_code = state.phone.country_code;

  if (["UZ", "RU", "KZ"].includes(country_code)) {
    state.phone.disabled = true;
    isPhoneChanged.value = true;

    isConfirmationButtonShown.value = true;
    isPhoneConfirmed.value = false;
    isPhoneChecking.value = false;
    return;
  }
  setFieldValue("phone", phoneInput);
  isPhoneChecking.value = false;
};
const isPreferredId = computed(() => {
  return "is_preferred" + props.item.key;
});

watch(
  () => ({
    type_id: values.type_id,
    end_available_time_phone: values.end_available_time_phone,
    start_available_time_phone: values.start_available_time_phone,
    comment: values.comment,
    phone: values.phone,
    is_preferred: values.is_preferred,
  }),
  (newValues) => {
    console.log(newValues);
    emit("update:modelValue", newValues);
  },
);
// watch(() => useWatchStateValues(state, true, true), save);
</script>
