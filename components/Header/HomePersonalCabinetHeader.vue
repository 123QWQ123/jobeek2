<script setup>
import { useAuthStore } from "~~/store/auth";
import TheMainHeader from "~/components/Header/TheMainHeader.vue";

const auth = useAuthStore();
const { logout } = auth;

const isAuthed = computed(() => auth.isAuthed);
const isEmployer = computed(() => auth.isEmployer);
const user = computed(() => auth.user);

const selectedType = computed(() =>
  auth.isEmployer ? "resumes" : "vacancies",
);

const form = ref({
  type: selectedType,
  keyword: "",
  city: "",
  country: "",
  salary: "0",
});

watch(selectedType, (new_value) => {
  form.value = { ...form.value, type: new_value };
});

function onChange(selectedOption) {}

const onProfileClick = () => {
  if (!auth.isEmployer) {
    navigateTo({ name: "profile-seeker" });
  } else {
    navigateTo({ name: "profile-employer" });
  }
};
const phone = computed(() => auth.user?.phone);

const isPremium = computed(() => auth.isSubscribed);
</script>
<template>
  <Suspense>
    <template #fallback>
      <TheMainHeader></TheMainHeader>
    </template>
    <template #default>
      <div class="lk-header">
        <div class="lk-header-main">
          <div class="header-wrapper">
            <Logo />
            <div class="profile-action" v-if="auth.isAuthed">
              <div class="premium-notification-icon"></div>
              <button class="profile-button" type="button" v-if="isPremium">
                <PremiumIcon />
              </button>
              <!--- кнопка и иконка неактивного премиума
              <button class="profile-button" type="button" v-else>
                  <svg width="38" height="37" viewBox="0 0 38 37" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.0919 1.06429C17.8431 -0.354766 19.876 -0.354765 20.6272 1.0643L25.1383 9.58606C25.4275 10.1324 25.9532 10.5144 26.5622 10.6206L36.0609 12.2775C37.6426 12.5534 38.2708 14.4868 37.1533 15.6397L30.4426 22.5634C30.0124 23.0073 29.8116 23.6253 29.8987 24.2373L31.2582 33.7831C31.4845 35.3727 29.8399 36.5676 28.3981 35.8611L19.7396 31.6184C19.1844 31.3463 18.5347 31.3463 17.9795 31.6184L9.32101 35.8611C7.87918 36.5676 6.23458 35.3727 6.46095 33.7831L7.82038 24.2373C7.90754 23.6253 7.70675 23.0073 7.27648 22.5634L0.565809 15.6397C-0.551666 14.4868 0.0765169 12.5534 1.65826 12.2775L11.1569 10.6206C11.766 10.5144 12.2916 10.1324 12.5809 9.58606L17.0919 1.06429Z" fill="#fff"/></svg>
              </button>-->
              <a
                class="sign-in-btn ms-4"
                @click="onProfileClick"
                role="link"
              >
                {{ phone }}
              </a>
              <button class="exit-button" type="button" @click="logout">
                <ExitIcon />
              </button>
            </div>

            <div v-else class="header-actions ms-auto">
              <NuxtLink
                class="btn button-xs sign-in-btn"
                :to="{ name: 'sign-in' }"
                role="link"
                >Войти
              </NuxtLink>
              <NuxtLink
                class="btn button-xl sign-up-btn"
                :to="{ name: 'sign-up' }"
                role="link"
                >Регистрация
              </NuxtLink>
            </div>
          </div>
        </div>
        <HeaderCabinetNavbar v-if="auth.isAuthed" />
      </div>
    </template>
  </Suspense>
</template>

<style scoped>
.nav-link {
  color: #fff !important;
}

.router-link-exact-active {
  color: #6c757d !important;
}

.search-form--widget .search-row {
  grid-template-columns: 34.17% 22.56% 1fr 20%;
}
</style>
