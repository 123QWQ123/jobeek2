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
const { value, errorMessage, setErrors } = useField(props.name);

const { refreshEmployer, refreshSeeker } = authStore;
const currentValue = ref(value.value);
const email_to_verify = ref(null);
const isLoading = ref(false);
const isCheckButton = computed(() => {
  const user = props.type === "seeker" ? authStore.seeker : authStore.employer;
  return user.email && !user.email_to_verify;
});

const isConfirmButton = computed(() => {
  const user = props.type === "seeker" ? authStore.seeker : authStore.employer;

  return (
    (!user?.is_completed && !!user?.email_to_verify) ||
    (!user?.email && !user?.email_to_verify)
  );
});

const is_email_to_verify_sent = ref(false);

const onEmailConfirm = async (e) => {
  e.preventDefault();
  isLoading.value = true;
  const inputEmailValue = value.value || email_to_verify.value;
  const resData = await profileStore.confirmEmail({ email: inputEmailValue });

  if (resData.status !== "success") {
    setErrors(resData.errors?.email || resData.message);
    isLoading.value = false;
    refreshSeeker();
    await refreshEmployer();
  } else {
    authStore.seeker.email_to_verify = inputEmailValue;
    authStore.employer.email_to_verify = inputEmailValue;

    is_email_to_verify_sent.value = true;
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="position-relative">
    <VeeCustomTextInput
      name="email"
      type="email"
      placeholder="Электронная почта"
      :value="currentValue"
      :disabled="!isConfirmButton"
    />

    <span
      v-if="isConfirmButton"
      class="btn btn-outline-primary absolute_button"
      @click="onEmailConfirm"
    >
      Подтвердить
      <Loader class="spinner-border-sm" v-if="isLoading" />
    </span>
    <span
      v-if="isCheckButton"
      class="btn btn-outline-success absolute_button pe-auto"
    >
      <svg
        style="width: 22px; height: 22px; margin-top: -3px"
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
    Войдите в электронную почту, откройте письмо с заголовком Jobeek и
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
