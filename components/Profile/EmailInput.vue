<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useField } from "vee-validate";
import { useAuthStore } from "~/store/auth.js";
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

const authStore = useAuthStore();
const profileStore = useProfileStore();
const { value, setValue, errorMessage, setErrors } = useField(props.name);

const currentValue = ref(value.value);
const email_to_verify = ref(null);
const isLoading = ref(false);
const isConfirmButton = ref(false);
const isCheckButton = ref(false);

const isConfirmationSent = computed(() => {
  const user = props.type === "seeker" ? authStore.seeker : authStore.employer;
  return !!user?.email_to_verify;
});

const is_email_to_verify_sent = ref(false);

const is_sent_and_verified = computed(() => {
  const user = props.type === "seeker" ? authStore.seeker : authStore.employer;
  return !!user?.email_to_verify;
});

const updateEmails = (user) => {
  email_to_verify.value = user.email_to_verify;
  currentValue.value = user.email ?? user.email_to_verify;

  if (user.is_completed) {
    isCheckButton.value =
      currentValue.value && currentValue.value === user.email;
    isConfirmButton.value =
      email_to_verify.value && email_to_verify.value !== user.email;
  } else {
    isCheckButton.value = false;
    isConfirmButton.value = !user.email;
  }
};

const onEmailConfirm = async (e) => {
  e.preventDefault();
  isLoading.value = true;
  const inputEmailValue = email_to_verify.value || value.value;
  const resData = await profileStore.confirmEmail({ email: inputEmailValue });

  if (resData.status !== "success") {
    setErrors(resData.errors?.email || resData.message);
    isLoading.value = false;
  } else {
    if (props.type === "seeker") {
      authStore.seeker.email = inputEmailValue;
    } else {
      authStore.employer.email = inputEmailValue;
    }
    isConfirmButton.value = false;
    isConfirmationSent.value = true;
    is_email_to_verify_sent.value = true;
    isLoading.value = false;
  }
};

watch(
  () => currentValue.value,
  (newValue) => {
    if (!value.value) {
      setValue(newValue);
      setErrors(null);
    }
  },
);

watch(
  () => props.type,
  () => {
    const user =
      props.type === "seeker" ? authStore.seeker : authStore.employer;
    if (user) updateEmails(user);
  },
  { immediate: true },
);

onMounted(() => {
  const user = props.type === "seeker" ? authStore.seeker : authStore.employer;
  if (user) updateEmails(user);
});
</script>

<template>
  <div class="position-relative">
    <VeeCustomTextInput
      name="email"
      type="email"
      placeholder="Электронная почта"
      :value="currentValue"
      :disabled="!isConfirmButton || isConfirmationSent"
    />

    <span
      v-if="isConfirmButton && !isConfirmationSent"
      class="btn btn-outline-primary absolute_button"
      @click="onEmailConfirm"
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
  <div class="text-danger">{{ errorMessage }}</div>
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
