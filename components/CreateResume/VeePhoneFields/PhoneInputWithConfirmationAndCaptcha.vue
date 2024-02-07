<template>
  <div>
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
          v-model="phone.val"
          @focusout="onPhoneChange"
          @focus="onStartEditing"
          @change-country-code="onChangeCountryCode"
          :disabled="phone.disabled"
        />
        <LazyErrorMessage :name="props.name" />
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
            v-model="confirmation_code.val"
            @focusin="() => (errors.confirmation_code = '')"
          />

          <!--          <div class="text-danger d-block" v-if="errors.confirmation_code">-->
          <!--            {{ errors.confirmation_code }}-->
          <!--          </div>-->
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
      <div class="text-danger d-block" v-if="errorMessage">
        {{ errorMessage }}
      </div>

      <br />
      <div class="alert alert-info" v-if="seconds">
        На телефон выслан код подтверждения. Выслать код повторно можно через
        {{ formattedLeftTime }}
      </div>
      <!--      <TimerWithProgressBar v-if="seconds" v-model="seconds" :max="10" />-->
    </div>
  </div>
</template>

<script>
export default {
  name: "ResumePhoneInputWithConfirmationAndCaptcha",
};
</script>
<script setup>
import { useField } from "vee-validate";
import { useDictionaryStore } from "~/store/dictionary.js";
import { useResumeStore } from "~/store/resume.js";
import useResumeHooks from "~/hooks/useResumeHooks.js";

const props = defineProps(["name"]);
const { idx, name } = toRefs(props);
const emit = defineEmits(["remove"]);

const { value, errorMessage } = useField(() => props.name);

const confirmEmail = () => {
  value.value = "@mail.uz";
};
const dictionaryStore = useDictionaryStore();
const preferredContactTypeOptions = computed(() => {
  return dictionaryStore.preferred_contact_types.map((item) => ({
    name: item.name,
    value: item.id,
  }));
});

const resumeStore = useResumeStore();
const { getPhoneConfirmationCode, confirmPhoneConfirmationCode, getPhoneInfo } =
  resumeStore;

const errors = ref({});

watch(
  () => props.errors,
  (newErrors) => {
    errors.value = newErrors;
  },
);

const isPhoneChanged = ref(false);
const isConfirmationButtonShown = ref(false);
const isConfirmationCodeButtonShown = ref(false);
const isConfirmationCodeInputShown = ref(false);
const isConfirmationButtonClicked = ref(false);
const isCaptchaUrlShown = ref(false);
const isPhoneConfirmed = ref(true);
const isPhoneChecking = ref(false);
const captchaUrl = ref(null);

const timer = ref();
const seconds = ref(0);
const phoneMessage = ref(null);
const phoneElement = ref();
const phone = reactive({
  val: value.value ?? "",
  disabled: false,
  country_code: "RU",
});
const confirmation_code = ref({
  val: null,
});
const onChangeCountryCode = async (newCountryCode) => {
  console.log(newCountryCode);
  if (typeof newCountryCode === "string") {
    phone.value.country_code = newCountryCode;
  }
};
const onStartEditing = () => {
  isConfirmationButtonClicked.value = false;
  phone.disabled = false;
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
const onPhoneChange = async (e) => {
  isPhoneChecking.value = true;
  const phoneInput = phone.val.replace("+", "");
  const phoneInfo = await getPhoneInfo({ phone: phoneInput });
  if (phoneInfo.status !== "success") {
    phoneMessage.value = phoneInfo.message;
    phone.disabled = true;
    isPhoneChecking.value = false;
    return;
  }
  const { phone: phoneObject } = phoneInfo.data.hh;
  if (!phoneObject) {
    isPhoneChecking.value = false;
    value.value = phoneInput;
    return;
  }

  console.log(phoneObject);
  if (!phoneObject.need_verification) {
    isPhoneChecking.value = false;
    phoneMessage.value = null;
    value.value = phoneInput;
    return;
  }
  const country_code = phone.country_code;

  if (["UZ", "RU", "KZ", "BY"].includes(country_code)) {
    phone.disabled = true;
    isPhoneChanged.value = true;

    isConfirmationButtonShown.value = true;
    isPhoneConfirmed.value = false;
    isPhoneChecking.value = false;
    return;
  }
  value.value = phoneInput;
  // setFieldValue("phone", phoneInput);
  isPhoneChecking.value = false;
};
const onSendConfirmationCode = async () => {
  isConfirmationButtonClicked.value = true;
  isPhoneChecking.value = true;
  const phoneInput = phone.val.replace("+", "");
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
const { convertSecondsToHoursAndMinutes } = useResumeHooks();
const formattedLeftTime = computed(() => {
  if (seconds.value < 60) {
    return seconds.value + " c";
  }

  return convertSecondsToHoursAndMinutes(seconds.value) + " c";
});
const remove = (id) => {
  emit("remove", id);
};
</script>

<style scoped>
.absoluted_icon {
  position: absolute;
  left: -1.8rem;
  top: 0.5rem;
  font-size: 1rem;
  z-index: 1;
  cursor: pointer;
  max-width: 3rem;
}

.absoluted_icon.right-0 {
  right: 0.5rem;
  left: unset;
  top: 0.9rem;
}

.absoluted_icon svg {
  width: 24px;
  height: 24px;
}
</style>
