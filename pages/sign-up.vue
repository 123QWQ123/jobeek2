<template>
  <div class="row">
    <base-modal :show="!!error" title="Error occured">
      <p>{{ error }}</p>
    </base-modal>
    <div class="col-md-6 offset-md-3">
      <h2 class="text-center text-dark mt-5">Sign up Form</h2>
      <div class="text-center mb-5 text-dark">Made with bootstrap</div>
      <div class="card my-5">
        <form
          class="card-body cardbody-color p-lg-5"
          @submit.prevent="onSubmit"
        >
          <div class="text-center">
            <NuxtLink to="/">
              <img
                src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                class="
                  w-25
                  img-fluid
                  profile-image-pic
                  img-thumbnail
                  rounded-circle
                  my-3
                "
                width="200px"
                alt="profile"
              />
            </NuxtLink>
          </div>

          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': !state.email.isValid }"
              @focusin="clearValidity('email')"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Email"
              v-model.trim="state.email.val"
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              class="form-control"
              :class="{ 'is-invalid': !state.password.isValid }"
              @focusin="clearValidity('password')"
              id="password"
              placeholder="password"
              v-model.trim="state.password.val"
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              class="form-control"
              :class="{ 'is-invalid': !state.passwordConfirmation.isValid }"
              @focusin="clearValidity('passwordConfirmation')"
              id="confirmation_password"
              placeholder="confirmation_password"
              v-model.trim="state.passwordConfirmation.val"
            />
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary px-5 mb-5 w-100">
              Login
            </button>
          </div>
          <div id="emailHelp" class="form-text text-center mb-5 text-dark">
            Have an account?
            <router-link :to="{ name: 'sign-in' }" class="text-dark fw-bold">
              Sign in</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~~/store/auth";

const authStore = useAuthStore();

const { signUp } = authStore;

const isFormValid = ref(true);
const isLoading = ref(true);
const error = ref(null);

const state = reactive({
  email: {
    val: "",
    isValid: true,
  },
  password: {
    val: "",
    isValid: true,
  },
  passwordConfirmation: {
    val: "",
    isValid: true,
  },
});

function clearValidity(input) {
  state[input].isValid = true;
  isFormValid.value = true;
}

function validateForm() {
  if (state.email.val === "") {
    state.email.isValid = false;
    isFormValid.value = false;
  }

  if (state.password.val === "" || state.password.val.length < 6) {
    state.password.isValid = false;
    isFormValid.value = false;
  }

  if (state.password.val !== state.passwordConfirmation.val) {
    state.passwordConfirmation.isValid = false;
    isFormValid.value = false;
  }
}

const router = useRouter();

const onSubmit = async () => {
  validateForm();
  if (isFormValid.value) {
    const response = await signUp({
      email: state.email.val,
      password: state.password.val,
    });
    if (response.error && response.error.message) {
      this.error = response.error.message;
    } else {
      router.replace({ name: "coaches-register" });
    }
  }
};
</script>