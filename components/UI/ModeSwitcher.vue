<template>
  <div
    class="theme-checker-box cursor-pointer checker-box right__box"
    @click="toggle"
  >
    <span class="v v1" :class="{ active: !auth.isEmployer }" title="Соискатель"
      >Соискатель</span
    >
    <div class="theme-checker">
      <input type="checkbox" id="employer" :checked="!auth.isEmployer" />
      <div class="theme-checker-ui" :class="{ yellow: !auth.isAuthed }">
        <div
          class="circle"
          :class="{ left: !auth.isEmployer, right: auth.isEmployer }"
        ></div>
      </div>
    </div>
    <span class="v v2" :class="{ active: auth.isEmployer }" title="Работодатель"
      >Работодатель</span
    >
  </div>
</template>

<script setup>
import { useAuthStore } from "~~/store/auth";

const auth = useAuthStore();
const { toggleUserMode } = auth;

const toggle = () => {
  toggleUserMode();
};

</script>

<style scoped>
.right__box {
  margin-left: auto;
}

.checker-box .v.white {
  color: white;
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

.theme-checker input ~ .theme-checker-ui.yellow {
  background: #5375fd;
}

.theme-checker input ~ .theme-checker-ui .circle {
  background: #ffffff;
}
</style>
