<script setup>
import { useAuthStore } from "~/store/auth.js";
const authStore = useAuthStore();
</script>

<template>
  <main class="main cabinet subs-page" role="main">
    <PersonalCabinetSearchMobile />
    <div class="bg-wrapper pt-4">
      <div class="has-sidebar has-sidebar--v2 wrapper wrapper-1290">
        <div class="content mb-4">
          <h1 class="lk-page-title mb-4">Ваши подписки</h1>
          <YourSubscriptionsList></YourSubscriptionsList>
        </div>
        <aside class="sidebar">
          <div class="lk-page-title mb-4 mb-0 margin-top-mobile">Премиум</div>
            <!-- NEW block -->
            <div class="sticky-item sidebar-premium">
			  <div class="notification mt-0">
  	            <div class="notification-text">
  	              <div class="premium-notification-icon"></div>
  	              <strong class="title">Премиум</strong>
                  <div class="plash">Не подключен</div>
                  <div class="premium-checker">
                    <input type="checkbox" id="employer">
                    <div class="premium-checker-ui">
                      <div class="circle left"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="notification mt-0 active">
  	            <div class="notification-text">
  	              <div class="premium-notification-icon"></div>
  	              <strong class="title">Премиум</strong>
                  <div class="plash">Подключен</div>
                  <div class="premium-checker">
                    <input type="checkbox" id="employer">
                    <div class="premium-checker-ui">
                      <div class="circle left"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- END NEW block -->
        </aside>
      </div>
    </div>
    <div class="bg-wrapper bt">
      <HomeWorkSection />
    </div>
    <HomeSearchSection />
  </main>
</template>

<style scoped></style>
