<template>
  <footer class="main-footer">
    <div class="main-footer-content wrapper">
	  <div class="logo">
        <NuxtLink to="/"
          ><img src="~/assets/img/jobeek-dark.svg" alt="#"
        /></NuxtLink>
        <span class="copyright-text">© 2018–{{ new Date().getFullYear() }} Jobeek </span>
      </div>
      <div class="footer-navigation navigation" role="navigation">
        <div class="col">
          <h5 class="col-title">Информация</h5>
          <ul>
            <li v-if="isAuthed">
              <NuxtLink :to="{ name: 'profile' }">Личный кабинет</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="{ name: 'support' }">Помощь</NuxtLink>
            </li>
            <li>
              <a href="https://reg.jobeek.me/rules.pdf"
                >Пользовательское соглашение</a
              >
            </li>
            <li v-if="isAuthed">
              <a href="https://reg.jobeek.me/default-jobeek/control"
                >Отмена премиума</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="main-footer-bottom">
      <div class="wrapper">
        <div class="text-center" v-html="uiStore.footer"></div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useUIStore } from "~/store/ui.js";
import { useAuthStore } from "~/store/auth";

const { isAuthed } = storeToRefs(useAuthStore());
const uiStore = useUIStore();
const { getFooterSettings } = uiStore;
useAsyncData("getFooterSettings", async () => {
  return await getFooterSettings();
});
</script>

<style scoped>
	.copyright-text {
		margin-top: 8px;
	    font-size: 12px;
	    color: #78757e;
	    display: block;
	}
</style>
