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

function onChange(selectedOption) {
}

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
              <a
                class="btn button-xs sign-in-btn ms-4"
                @click="onProfileClick"
                role="link"
              >
                {{ phone }}
              </a>
              <button class="profile-button" type="button" v-if="isPremium">
                <PremiumIcon />
              </button>
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
        <HeaderCabinetNavbar />
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
