
<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "~~/store/auth";

const auth = useAuthStore();
// const { isAuthed } = storeToRefs(auth);
const isAuthed = computed(() => auth.isAuthed);
const { signIn } = auth;
const router = useRouter();

onBeforeMount(() => {
  if (isAuthed.value === true) {
    router.replace({ name: "requests" });
  }
});

const state = reactive({
  email: {
    val: "",
    isValid: true,
  },
  password: {
    val: "",
    isValid: true,
  },
  isFormValid: true,
  isLoading: true,
  error: null,
  success: null,
});

function clearValidity(input) {
  state[input].isValid = true;
  state.isFormValid = true;
}

function validateForm() {
  if (state.email.val === "") {
    state.email.isValid = false;
    state.isFormValid = false;
  }

  if (state.password.val === "" || state.password.val.length < 6) {
    state.password.isValid = false;
    state.isFormValid = false;
  }
}

const route = useRoute();

async function onSubmit() {
  validateForm();
  if (state.isFormValid) {
    const response = await signIn({
      email: state.email.val,
      password: state.password.val,
    });
    if (response.error && response.error.message) {
      console.log(response.error);
      state.error = response.error.message;
      return;
    }
    const route_name = route.query.redirect;
    state.success = "You signed in";
    if (route_name) {
      router.replace({ name: route_name });
    } else {
      router.replace({ name: "requests" });
    }
  }
}
</script>

<template>
  <div class="row">
    <base-modal :show="!!state.error" title="Error occured">
      <p>{{ state.error }}</p>
    </base-modal>

    <base-modal :show="!!state.success" title="Success">
      <p>{{ state.success }}</p>
    </base-modal>

    <div class="col-md-6 offset-md-3">
      <h2 class="text-center text-dark mt-5">Login Form({{ isAuthed }})</h2>
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
          <div class="text-center">
            <button type="submit" class="btn btn-primary px-5 mb-5 w-100">
              Login
            </button>
          </div>
          <div id="emailHelp" class="form-text text-center mb-5 text-dark">
            Not Registered?
            <NuxtLink :to="{ name: 'sign-up' }" class="text-dark fw-bold">
              Create an Account</NuxtLink
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
