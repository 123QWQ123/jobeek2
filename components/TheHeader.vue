<template>
  <header class="p-3 bg-dark text-white">
    <div class="container">
      <div
        class="
          d-flex
          flex-wrap
          align-items-center
          justify-content-center justify-content-lg-start
        "
      >
        <a
          href="/"
          class="
            d-flex
            align-items-center
            mb-2 mb-lg-0
            text-white text-decoration-none
          "
        >
          <i style="font-size: 2rem" class="bi bi-bootstrap"></i>
        </a>

        <ul
          class="
            nav
            col-12 col-lg-auto
            me-lg-auto
            mb-2
            justify-content-center
            mb-md-0
          "
        >
          <li>
            <NuxtLink class="nav-link px-2" :to="{ name: 'index' }">
              Home
            </NuxtLink>
          </li>
          <!--
          <li>
            <router-link class="nav-link px-2" :to="{ name: 'contact' }">
              Contact
            </router-link>
          </li> -->
        </ul>

        <!-- <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
          <input
            type="search"
            class="form-control form-control-dark"
            placeholder="Search..."
            aria-label="Search"
          />
        </form> -->

        <ul
          v-if="isAuthed"
          class="
            nav
            col-12 col-lg-auto
            ms-lg-auto
            mb-2
            justify-content-start
            mb-md-0
            text-end
          "
        >
          <li>
            <base-button @click="logout" class="nav-link mx-2 btn">
              Logout
            </base-button>
          </li>
        </ul>

        <ul
          v-else
          class="
            nav
            col-12 col-lg-auto
            ms-lg-auto
            mb-2
            justify-content-start
            mb-md-0
            text-end
          "
        >
          <li>
            <NuxtLink
              class="btn btn-close-white me-2"
              :to="{ name: 'sign-in' }"
            >
              Sign in
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              class="btn btn-close-white px-2 btn"
              :to="{ name: 'sign-up' }"
            >
              Sign up
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from "~~/store/auth";

const auth = useAuthStore();
const { tryLogin, logout } = auth;

onBeforeMount(() => {
  tryLogin();
});

const isAuthed = computed(() => auth.isAuthed);
</script>

<style scoped>
.nav-link {
  color: #fff !important;
}
.router-link-exact-active {
  color: #6c757d !important;
}
</style>