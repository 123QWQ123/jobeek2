<template>
  <footer class="main-footer">
    <div class="main-footer-content wrapper">
      <NuxtLink to="/" class="logo"
        ><img src="~/assets/img/jobeek-dark.svg" alt="#"
      /></NuxtLink>
      <div class="footer-navigation navigation" role="navigation">
        <div class="col">
          <div v-if="isAuthed">
            <h5 class="col-title">Работодателям</h5>
            <ul>
              <li>
                <NuxtLink :to="{ name: 'create-vacancy' }"
                  >Создать вакансию
                </NuxtLink>
              </li>
              <li>
                <NuxtLink :to="{ name: 'search-resumes' }"
                  >Поиск соотрудников
                </NuxtLink>
              </li>
              <li>
                <NuxtLink :to="{ name: 'advice' }">Советы</NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <div class="col">
          <div v-if="isAuthed">
            <h5 class="col-title">Соискателям</h5>
            <ul>
              <li>
                <NuxtLink :to="{ name: 'create-vacancy' }"
                  >Создать резюме
                </NuxtLink>
              </li>
              <li>
                <NuxtLink :to="{ name: 'search-vacancies' }"
                  >Поиск работы
                </NuxtLink>
              </li>
              <li>
                <NuxtLink :to="{ name: 'advice' }">Советы</NuxtLink>
              </li>
            </ul>
          </div>
        </div>

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
        <span>© 2018–{{ new Date().getFullYear() }} Jobeek </span>
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
await getFooterSettings();
</script>

<style></style>
