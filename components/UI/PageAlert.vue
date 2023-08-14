<template>
  <div class="w-box w-box--main" >
    <div class="bg-success w-box-head">
      <h1 class="title text-light" ></h1>
      <p class="descr text-light" >
        <slot/>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~~/store/auth";
import { useVacancyStore } from "../../store/vacancy";
import {useProfileStore} from "~/store/profile";

const auth = useAuthStore();

const isEmployer = computed(() => auth.isEmployer);
const router = useRouter();
const route = useRoute();

const vacancyStore = useVacancyStore();
const profileStore = useProfileStore();
const {providers} = profileStore;

const page = useRoute();

</script>

<style scoped>

</style>