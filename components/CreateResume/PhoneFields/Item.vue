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

    <div class="input-wrapper">
      <CustomSelect
        :options="preferredContactTypeOptions"
        v-model="state.type_id.val"
        :label="'Выберите'"
      ></CustomSelect>
      <div class="text-danger d-block" v-if="errors.type_id">
        {{ errors.type_id }}
      </div>
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
          v-model="state.phone.val"
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

    <div class="row mt-2">
      <div class="check-block mt-2">
        <div class="checkbox">
          <input
            type="checkbox"
            :id="isPreferredId"
            v-model="state.is_preferred.val"
            :checked="state.is_preferred.val"
            @focusin="() => (errors.is_preferred = '')"
          />
          <div class="checkbox-mask">
            <img src="~/assets/img/svg/check.svg" alt="#" />
          </div>
        </div>
        <label :for="isPreferredId">предпочтительным является</label>
      </div>

      <div class="text-danger d-block" v-if="errors.is_preferred">
        {{ errors.is_preferred }}
      </div>
    </div>

    <div class="input-row mt-2">
      <label>Отвечу на звонки</label>

      <div class="start-to-end">
        <div class="hour_c2">
          <CustomSelect
            :options="useHourOptions()"
            v-model="state.start_available_time_phone.val"
            :label="'От'"
            @focusin="() => (errors.start_available_time_phone = '')"
          ></CustomSelect>
          <div
            class="text-danger d-block"
            v-if="errors.start_available_time_phone"
          >
            {{ errors.start_available_time_phone }}
          </div>
        </div>
        <div class="hour_c2">
          <CustomSelect
            :options="useHourOptions()"
            v-model="state.end_available_time_phone.val"
            :label="'До'"
            @focusin="() => (errors.end_available_time_phone = '')"
          ></CustomSelect>

          <div
            class="text-danger d-block"
            v-if="errors.end_available_time_phone"
          >
            {{ errors.end_available_time_phone }}
          </div>
        </div>
      </div>
    </div>

    <div class="text-danger d-block" v-if="errors.phone">
      {{ errors.phone }}
    </div>
  </div>
</template>

<script setup>
import { useDictionaryStore } from "~/store/dictionary";
import { useWatchStateValues } from "~/composables/useWatchStateValues";
import { useHourOptions } from "~/composables/useHourOptions";
import { useResumeStore } from "~/store/resume";
import { useAuthStore } from "~/store/auth";
import useResumeHooks from "~/hooks/useResumeHooks";

const emit = defineEmits(["delete", "update"]);
const props = defineProps({
  isNew: {
    required: false,
    default: false,
  },
  item: {
    required: false,
    default: false,
  },
  errors: {
    required: true,
    default: {},
  },
});
const errors = ref(props.errors ?? {});
watch(
  () => props.errors,
  (newErrors) => {
    errors.value = newErrors;
  }
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

const state = reactive({
  type_id: {
    val: props.item.type_id,
    isValid: null,
  },
  phone: {
    val: props.item.phone ?? "",
    isValid: null,
    disabled: false,
    country_code: "RU",
  },
  confirmation_code: {
    val: null,
    isValid: null,
    is_hidden: true,
  },
  comment: {
    val: props.item.comment,
    isValid: null,
  },
  is_preferred: {
    val: props.item.is_preferred,
    isValid: null,
  },
  start_available_time_phone: {
    val: props.item.start_available_time_phone,
    isValid: null,
  },
  end_available_time_phone: {
    val: props.item.end_available_time_phone,
    isValid: null,
  },
});

watch(
  () => props.item,
  (newItem) => {
    state.type_id.val = newItem.type_id;
    state.phone.val = "+" + newItem.phone;
    state.comment.val = newItem.comment;
    state.is_preferred.val = newItem.is_preferred;
    state.start_available_time_phone.val = newItem.start_available_time_phone;
  }
);

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
  emit("delete", props.item.key);
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
  const phone = state.phone.val.replace("+", "");
  const resData = await getPhoneConfirmationCode({
    phone: phone,
  });

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

    seconds.value = resData.data.hh.can_request_code_again_in;
    timer.value = setInterval(() => {
      seconds.value--;
      if (seconds.value < 1 && timer.value) {
        clearInterval(timer.value);
      }
    }, 1000);
  }
};
const onConfirmPhone = async () => {
  isConfirmationButtonClicked.value = true;
  const phone = state.phone.val.replace("+", "");
  const resData = await confirmPhoneConfirmationCode({
    phone: phone,
    confirmation_code: state.confirmation_code.val,
  });
  if (resData.status !== "success") {
    return;
  }
  isConfirmationButtonClicked.value = false;
  state.phone.disabled = false;
  state.phone.val = phone;
  isCaptchaUrlShown.value = false;
};
const onChangeCountryCode = async (newCountryCode) => {
  if (typeof newCountryCode === "string") {
    state.phone.country_code = newCountryCode;
  }
};
const onPhoneChange = async (e) => {
  // if (state.phone.val !== seeker.phone){
  //
  // }
  isPhoneChecking.value = true;
  const phone = state.phone.val.replace("+", "");
  const phoneInfo = await getPhoneInfo({ phone });
  if (phoneInfo.status !== "success") {
    phoneMessage.value = phoneInfo.message;
    state.phone.disabled = true;
    isPhoneChecking.value = false;
    return;
  }
  const { phone: phoneObject } = phoneInfo.data.hh;
  if (!phoneObject) {
    isPhoneChecking.value = false;
    return;
  }

  if (!phoneObject.need_verification) {
    isPhoneChecking.value = false;
    phoneMessage.value = null;
    return;
  }
  const country_code = state.phone.country_code;

  if (["UZ", "RU", "KZ"].includes(country_code)) {
    state.phone.disabled = true;
    isPhoneChanged.value = true;

    isConfirmationButtonShown.value = true;
    isPhoneConfirmed.value = false;
  }
  isPhoneChecking.value = false;
};
const isPreferredId = computed(() => {
  return "is_preferred" + props.item.key;
});

const save = () => {
  emit("update", props.item.key, {
    key: props.item.key,
    type_id: state.type_id.val,
    phone: state.phone.val.replace("+", ""),
    comment: state.comment.val,
    is_preferred: state.is_preferred.val,
    start_available_time_phone: state.start_available_time_phone.val,
    end_available_time_phone: state.end_available_time_phone.val,
  });
};
watch(() => useWatchStateValues(state, true, true), save);
</script>

<style scoped>


.absoluted_icon.right-0 {
  right: 0.5rem;
  left: unset;
  top: 0.9rem;
}


.start-to-end {
  display: inline-flex;
  flex: 1 1;
  gap: 1rem;
}

.hour_c2 {
  flex-basis: fit-content;
  flex: 1;
}
</style>
