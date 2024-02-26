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
const { value, setValue, errorMessage } = useField(() => props.name);
const email_to_verify = ref();
const email = ref(value.value);
const is_email_to_verify_sent = ref(false);
const onInputEmail = (e) => {
  email_to_verify.value = e.target.value;
  currentValue.value = e.target.value;
};
const currentValue = ref(null);

const isConfirmButton = ref(false);
const isCheckButton = ref(false);
const isConfirmationSent = ref(false);
const inputEmail = ref();

const profileStore = useProfileStore();
const seeker = storeToRefs(profileStore);

const reAssignEmails = (newObject) => {
  if (!newObject.is_completed) {
    email_to_verify.value = newObject.email_to_verify;
    currentValue.value = email_to_verify.value;
  } else {
    email.value = newObject.email;

    if (
      newObject.email_to_verify !== null &&
      newObject.email !== newObject.email_to_verify
    ) {
      currentValue.value = newObject.email_to_verify;
      email_to_verify.value = newObject.email_to_verify;
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
watch(
  () => email_to_verify.value,
  (newEmailToVerify) => {
    if (newEmailToVerify) {
      if (newEmailToVerify === email.value) {
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
  },
);
watch(
  () => value.value,
  (newEmail) => {
    setValue(newEmail);
  },
);
const { confirmEmail, checkEmailConfirmation } = profileStore;
const onEmailConfirm = async (e) => {
  e.preventDefault();

  const inputEmail = email_to_verify.value
    ? email_to_verify.value
    : email.value;
  const resData = await confirmEmail({ email: inputEmail });
  if (resData.status === "success") {
    isConfirmButton.value = false;
    isConfirmationSent.value = true;
    is_email_to_verify_sent.value = true;
    setValue(inputEmail);
  }
};
</script>

<template>
  <div class="position-relative">
    <input
      ref="inputEmail"
      type="email"
      :value="currentValue"
      placeholder="Электронная почта"
      @input="onInputEmail"
    />
    <!--    <base-button-->
    <!--      v-if="isConfirmButton"-->
    <!--      @click="onEmailConfirm"-->
    <!--      type="button"-->
    <!--      class="position-absolute top-0 end-0"-->
    <!--      style="margin-top: 2px"-->
    <!--    >-->
    <!--      -->
    <!--    </base-button>-->
    <span
      @click="onEmailConfirm"
      v-if="isConfirmButton"
      class="btn btn-outline-primary absolute_button"
    >
      Потверждать
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
      class="h-100 fs-6 position-absolute end-0 top-0 p-0 px-0 mt-0 me-0 pb-2"
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
  </div>

  <div class="text-success" v-if="is_email_to_verify_sent">
    На вашу электронную почту отправлено письмо с кодом подтверждения.
  </div>
  <div class="text-danger">
    {{ errorMessage }}
    <!--    {{ isConfirmButton }}-->
    <!--    <hr />-->
    <!--    {{ isCheckButton }}-->
    <!--    <hr />-->
    <!--    {{ email }}-->
    <!--    <hr />-->
    <!--    {{ email_to_verify }}-->
  </div>
</template>

<style scoped>
.absolute_button {
  position: absolute;
  top: 0.25rem;
  right: 0;
}
</style>
