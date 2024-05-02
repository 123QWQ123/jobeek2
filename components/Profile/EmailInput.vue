<script setup>
import { useProfileStore } from "~/store/profile.js";

const props = defineProps({
  name: {
    type: String,
    default: "email",
  },
  type: {
    type: String,
    default: "seeker",
    required: true,
  },
});
const { value, setValue, errorMessage, setErrors } = useField(() => props.name);

const currentValue = ref(null);

const isLoading = ref(false);
const isConfirmButton = ref(false);
const isCheckButton = ref(false);
const isConfirmationSent = ref(false);
const inputEmail = ref();

const profileStore = useProfileStore();
const seeker = storeToRefs(profileStore);
const email_to_verify = ref();
watch(
  () => currentValue.value,
  (newValue) => {
    if (!value.value) {
      setValue(newValue);
      setErrors(null);
    }
  },
);
const email = ref(value.value);
const is_email_to_verify_sent = ref(false);
const is_sent_and_verified = computed(() => {
  if (props.type === "seeker") {
    if (profileStore.seeker) {
      if (profileStore.seeker.email_to_verify) return true;
    }
    return false;
  } else {
    if (profileStore.employer) {
      if (profileStore.employer.email_to_verify) return true;
    }
    return false;
  }
});
const onInputEmail = (e) => {
  currentValue.value = e.target.value;
  email_to_verify.value = e.target.value;
  if (currentValue.value) {
    if (currentValue.value === email.value) {
      isConfirmButton.value = false;
      isCheckButton.value = true;
    } else {
      isConfirmButton.value = true;
      isCheckButton.value = false;
    }
  } else {
    isConfirmButton.value = true;
    isCheckButton.value = false;
  }
};
const disabled = computed(() => {
  if (!value.value) return false;
  return true;
});
const reAssignEmails = (newObject) => {
  email_to_verify.value = newObject.email_to_verify;
  email.value = newObject.email ? newObject.email : newObject.email_to_verify;
  currentValue.value = newObject.email_to_verify ?? newObject.email;
  if (!newObject.is_completed) {
    if (newObject.email !== null) {
      isCheckButton.value = false;
      isConfirmButton.value = false;
    } else {
      isCheckButton.value = false;
      isConfirmButton.value = true;
    }
  } else {
    if (
      newObject.email_to_verify !== null &&
      newObject.email !== newObject.email_to_verify
    ) {
      isCheckButton.value = false;
      isConfirmButton.value = true;
    } else {
      currentValue.value = email.value;
      isCheckButton.value = true;
      isConfirmButton.value = false;
    }
  }
};
watch(
  () => profileStore.seeker,
  (newObject) => {
    if (props.type === "seeker") {
      if (profileStore.seeker) {
        reAssignEmails(profileStore.seeker);
      }
    }
  },
);

watch(
  () => profileStore.employer,
  (newObject) => {
    if (props.type === "employer") {
      if (profileStore.employer) {
        reAssignEmails(profileStore.employer);
      }
    }
  },
);

onMounted(() => {
  if (props.type === "seeker") {
    if (profileStore.seeker) {
      reAssignEmails(profileStore.seeker);
    }
  }
  if (props.type === "employer") {
    if (profileStore.employer) {
      reAssignEmails(profileStore.employer);
    }
  }
});

const { confirmEmail, checkEmailConfirmation } = profileStore;
const onEmailConfirm = async (e) => {
  e.preventDefault();
  isLoading.value = true;
  const inputEmail = email_to_verify.value
    ? email_to_verify.value
    : email.value;
  const resData = await confirmEmail({ email: inputEmail });
  if (resData.status !== "success") {
    const message = resData.errors?.email ?? resData.message;
    setErrors(message);
    isLoading.value = false;
    return;
  }
  isConfirmButton.value = false;
  isConfirmationSent.value = true;
  is_email_to_verify_sent.value = true;
  setValue(inputEmail);
  isLoading.value = false;
};
</script>

<template>
  <div class="position-relative">
    <input
      ref="inputEmail"
      type="email"
      :disabled="disabled"
      :value="currentValue"
      placeholder="Электронная почта"
      @input="onInputEmail"
      @blur="setValue(currentValue)"
    />
    <span
      @click="onEmailConfirm"
      v-if="isConfirmButton"
      class="btn btn-outline-primary absolute_button"
      @hover="hovered = true"
    >
      Подтверждать
      <Loader class="spinner-border-sm" v-if="isLoading" />
    </span>
    <span
      v-if="isConfirmationSent"
      class="btn btn-outline-success absolute_button"
    >
      <svg
        style="width: 22px; height: 22px; margin-top: 0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      Отправлено
    </span>
    <span
      v-if="isCheckButton"
      class="btn btn-outline-success absolute_button pe-auto"
    >
      <svg
        style="width: 22px; height: 22px; margin-top: 0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        class="green_icon"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </span>
  </div>

  <div class="text-success" v-if="is_email_to_verify_sent">
    На вашу электронную почту отправлено письмо с кодом подтверждения.
  </div>
  <div
    class="text-primary"
    v-if="is_sent_and_verified && !is_email_to_verify_sent"
  >
    Войдите в электронную почту и откройте письмо с заголовком Jobeek и
    подтвердите свой адрес электронной почты.
  </div>
  <div class="text-danger">
    {{ errorMessage }}
  </div>
</template>

<style scoped>
input[type="email"]:disabled {
  background: #ccc;
}

.absolute_button {
  position: absolute;
  top: 0.25rem;
  right: 0.3rem;
}
</style>
