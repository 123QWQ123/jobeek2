<template>
  <div
    class="theme-checker-box cursor-pointer checker-box right__box"
    @click="toggle"
  >
    <span class="v v1" :class="{ active: !auth.isEmployer }" title="Соискатель"
      >Соискатель</span
    >
    <div class="theme-checker">
      <input type="checkbox" id="employer" :checked="auth.isEmployer" />
      <div class="theme-checker-ui">
        <div
          class="circle"
          :class="{ left: !auth.isEmployer, right: auth.isEmployer }"
        ></div>
      </div>
    </div>
    <span class="v v2" :class="{ active: auth.isEmployer }" title="Работодатель"
      >Работодатель</span
    >
    {{ auth.isEmployer }}
  </div>
</template>

<script setup>
import { useAuthStore } from "~~/store/auth";

const auth = useAuthStore();
const { toggleUserMode } = auth;

const toggle = () => {
  let isEmployerMode = localStorage.getItem("isEmployer");
  if (isEmployerMode === String(auth.isEmployer)) {
    localStorage.setItem("isEmployer", !auth.isEmployer);
  }
  toggleUserMode();
};

onMounted(() => {
  if (!process.server) {
    if (!localStorage.getItem("isEmployer") === null) {
      localStorage.setItem("isEmployer", auth.isEmployer);
    } else {
      const isEmployerMode =
        localStorage.getItem("isEmployer") === "false" ? false : true;
      if (isEmployerMode !== auth.isEmployer) {
        toggleUserMode();
      }
    }
  }
});
</script>

<style scoped>
.right__box {
  margin-left: auto;
}
.theme-checker input ~ .theme-checker-ui .circle.left {
  transform: translate(3px, -50%);
}
.theme-checker input ~ .theme-checker-ui .circle.right {
  transform: translate(30px, -50%);
}

@media only screen and (max-width: 960px) {
  .checker-box .v:not(.active) {
    width: auto;
  }
}

.theme-checker input ~ .theme-checker-ui {
  background: #5375fd;
}
.theme-checker input ~ .theme-checker-ui .circle {
  background: #ffffff;
}
</style>
