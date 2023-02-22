
<script setup>

import {useAuthStore} from "../../store/auth";
import {storeToRefs} from "pinia";

definePageMeta({
  layout: "cabinet"
});

const authStore = useAuthStore();
const {isEmployer} = storeToRefs(authStore);

</script>

<template>
  <main class="main cabinet profile-page bg-wrapper" role="main">
<!--    <PersonalCabinetSearchMobile />-->
    <div class="has-sidebar has-sidebar--v2 wrapper wrapper-1290">
      <div class="content">
        <div class="w-box w-box--main">
          <div class="w-box-head">
            <h1 class="title">Профиль</h1>
          </div>
          <Transition name="content">
            <ProfileEmployerEditForm v-if="isEmployer"/>
            <ProfileSeekerEditForm v-else="isEmployer"/>
          </Transition>
        </div>
      </div>
      <aside class="sidebar">
        <div class="premium-col sticky-item">
          <div class="title" v-if="isEmployer">Премиум</div>
          <div class="title" v-else>Подключите Премиум подписку</div>
          <div class="term" v-if="isEmployer">
            <span>Действует до</span><strong>24 августа 2024</strong>
          </div>
          <a class="btn button-xs" href="#" v-if="isEmployer">Отключить </a>
          <a class="btn button-xs" href="#" v-else>Подключить</a>
        </div>
      </aside>
    </div>
  </main>
</template>

<style scoped>

.content-enter-active,
.content-leave-active {
  transition: opacity 0.5s ease;
}

.content-enter-from,
.content-leave-to {
  opacity: 0;
}

</style>