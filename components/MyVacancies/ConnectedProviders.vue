<template>
  <div>
    <h1 class="lk-page-title mb-4 mb-0 margin-top-mobile">Cервисы</h1>

    <div class="card mb-4 border-0 px-2 py-0" style="border-radius: 12px">
      <div class="subs-card-options services-margin">
        <div class="services-block-group services-block-all">
          <div class="option">
            <div class="custom-check-wrap">
              <div class="theme-checker theme-checker--blue">
                <input
                  :checked="providers.hh"
                  type="checkbox"
                  id="hh"
                  @click.prevent="switchProvider('hh')"
                />
                <div class="theme-checker-ui">
                  <div class="circle"></div>
                </div>
              </div>
              <label for="hh"
                ><img src="~/assets/img/logos/hhmini.svg" alt="Logo" /><span
                  >Hh.ru</span
                ></label
              >
            </div>
          </div>
          <div class="option">
            <div class="custom-check-wrap">
              <div class="theme-checker theme-checker--blue">
                <input
                  :checked="providers.superjob"
                  type="checkbox"
                  id="superjob"
                  @click.prevent="switchProvider('superjob')"
                />
                <div class="theme-checker-ui">
                  <div class="circle"></div>
                </div>
              </div>
              <label for="superjob"
                ><img src="~/assets/img/logos/sj.svg" alt="Logo" /><span
                  >Superjob.ru
                </span></label
              >
            </div>
          </div>
        </div>
        <div
          v-if="lastSyncedTime.date"
          class="services-block-group reload-block-btn"
        >
          <div class="services-block-time">
            {{ lastSyncedTime.date }} {{ lastSyncedTime.time }}
          </div>
          <div class="services-block-reload">
            <button
              class="logo sync-button"
              :class="{ rotating: isSyncing }"
              @click="onSync"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#5375FD"
                class="bi bi-arrow-repeat"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"
                ></path>
                <path
                  fill-rule="evenodd"
                  d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                ></path>
              </svg>
              Обновить данные
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useVacancyStore } from "~/store/vacancy";
import moment from "moment";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";

// Resume store provides methods to work with resume-related features
const vacancyStore = useVacancyStore();
const {
  getEmployerProvidersAuthEndpoints,
  getConnectedEmployerProviders,
  syncVacancies,
  disconnectProviders,
} = vacancyStore;

const { providers, provider_auth_urls } = storeToRefs(vacancyStore);
/**
 * Fetching connected providers' data and authorization endpoints using `useAsyncData`.
 */
const { data: connectedData, refresh: refreshConnectedProviders } =
  await useAsyncData("connectedProviders", () =>
    getConnectedEmployerProviders(),
  );

const isSyncing = ref(false); // Is syncing in progress?

// Get full URL for redirect
const route = useRoute(); // Access the current route
const redirect_url = useRequestURL(); // Nuxt-specific helper to get the full URL including domain
const { data: authEndpoints, refresh: refreshAuthEndpoints } = useAsyncData(
  "authEndpoints",
  () =>
    getEmployerProvidersAuthEndpoints(
      {},
      redirect_url.origin + redirect_url.pathname,
    ),
);

// Last synced time formatted using `moment`
const lastSyncedTime = computed(() => {
  if (vacancyStore.providers?.synchronized?.length === 0) {
    return {
      date: null,
      time: null,
    };
  }
  const date = moment(
    vacancyStore.providers?.synchronized?.vacancy?.end_date_time,
    "YYYY-MM-DD hh:mm:s",
  );
  return {
    date: date.format("DD.MM.Y"),
    time: date.format("hh:mm"),
  };
});

/**
 * Handler to synchronize vacancies with connected providers.
 */
const onSync = async () => {
  try {
    isSyncing.value = true; // Start syncing state
    await syncVacancies();

    // Refresh provider data after successful sync
    await Promise.all([refreshConnectedProviders(), refreshAuthEndpoints()]);
  } finally {
    isSyncing.value = false; // Stop syncing state
  }
};

const switchProvider = async (providerSlug) => {
  if (providers.value[providerSlug]) {
    await onDisconnect(providerSlug);
  } else {
    if (provider_auth_urls.value[providerSlug]) {
      window.location.href = provider_auth_urls.value[providerSlug];
    }
  }
  return false;
};
/**
 * Disconnect a provider by its slug.
 */
const onDisconnect = async (providerSlug) => {
  const resData = await disconnectProviders({ provider: providerSlug });
  if (resData.status !== "success") {
    return;
  }
  // Refresh provider data after disconnecting
  await Promise.all([refreshConnectedProviders(), refreshAuthEndpoints()]);
};
</script>

<style scoped>
.list-of-providers {
  display: inline-flex;
  max-height: 20rem;
  padding: 12px;
}

.refresh-button_col {
  display: inline-flex;
  max-height: 20rem;
  padding: 0.5rem;
  justify-content: flex-end;
}

.list-of-providers .provider-item {
  max-height: 3.6rem;
  max-width: 3.6rem;
  display: inline-flex;
  justify-content: center;
  margin-right: 1rem;
}

.list-of-providers .provider-item {
  width: 100%;
  position: relative;
}

.list-of-providers .provider-item .provider-label {
  position: absolute;
  top: 0;
  left: 42px;
  transform: scale(1);
  background-color: rgba(229, 229, 229, 0.99);
  border-radius: 50%;
}

.provider-item .remove-text {
  display: none;
}

.provider-item .remove {
  display: none;
  transition: 0.3s;
}

.provider-item.navigated:hover .remove-text {
  position: absolute;
  display: inline-flex;
  justify-content: center;
  align-items: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  border-radius: 3%;
  top: 0%;
  color: #fff;
  font-weight: bold;
}

.provider-item.navigated:hover .connected {
  display: none;
  transition: 0.3s;
}

.provider-item.navigated:hover .remove {
  display: inline-block;
  transition: 0.3s;
}

.sync-button {
  justify-content: flex-end;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

.rotating {
  /*animation: rotation 2s infinite linear;*/
}

.services-grid-load.import-grid {
  grid-template-columns: 1fr 1fr 180px;
}

.services-grid-load.import-grid .check img {
  background: #fff;
  border-radius: 110%;
}

.services-grid-load.import-grid .import-box-dvnld {
  display: flex;
  padding-left: 5px;
}

.services-grid-load.import-grid .import-box-dvnld .sync-button {
  margin-left: 5px;
  margin-right: 16px;
}

.services-grid-load.import-grid .import-box-dvnld .check span {
  text-align: center;
  font-size: 12px;
  background: #00aa87;
  padding: 1px 5px 3px 5px;
  color: #fff;
  border-radius: 15px;
  font-weight: normal;
}

.services-grid-load.import-grid .import-box-dvnld .load-date {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
}

.services-grid-load.import-grid .import-box-dvnld .close {
  margin-left: auto;
  display: none;
}

.services-grid-load.import-grid .import-box-dvnld:hover .close {
  margin-left: auto;
  display: block;
}

.services-grid-load.import-grid .provider-item {
  cursor: pointer;
}

.services-grid-load.import-grid .provider-item .import-box.disabled {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 0 20px #0000000a;
}

.services-grid-load.import-grid
  .provider-item
  .import-box.disabled
  .import-box-dvnld {
  border-radius: 12px;
  box-shadow: 0 0 20px #0000000a;
  border: 1px dashed #8c8c8c;
  color: #8c8c8c;
}

.services-grid-load.import-grid .provider-item .import-box.disabled .logo {
  filter: grayscale(100%);
}

.services-grid-load.import-grid .provider-item .import-box.disabled span {
  color: #8c8c8c;
}

@media (max-width: 767px) {
  .services-grid-load.import-grid {
    display: block;
  }
  .services-grid-load.import-grid .grid-provider-mob {
    margin: 10px 0;
    display: block;
  }
  .services-grid-load.import-grid .import-box-dvnld span,
  .services-grid-load.import-grid .import-complete span {
    font-size: 15px;
    line-height: 20px;
  }
  .services-grid-load.import-grid .import-box-dvnld .sync-button {
    margin-right: 0;
  }
  .services-grid-load.import-grid .import-box-dvnld .sync-button svg {
    height: 40px;
    margin-right: 14px;
    min-width: 40px;
    width: 40px;
  }
}
</style>
