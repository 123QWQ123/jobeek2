<template>
  <div>
    <h1 class="lk-page-title mb-4 mb-0 margin-top-mobile">Cервисы</h1>

    <div class="services-grid-load import-grid">
      <!-- HeadHunters START-->
      <div
        class="provider-item grid-provider-mob"
        :class="{ navigated: isHHConnected }"
        @click.prevent="onOpen('hh')"
      >
        <div
          class="import-box is-connected"
          :class="{
            disabled: !isHHConnected,
            'import-is-complete': isHHConnected,
          }"
        >
          <div class="import-box-dvnld">
            <div class="logo">
              <img src="~/assets/img/svg/hh-big.svg" alt="#" />
              <div class="check">
                <img src="~/assets/img/svg/complete.svg" alt="#" />
              </div>
            </div>
            <span>HeadHunters.ru</span>
            <button
              v-show="isHHConnected"
              class="close"
              type="button"
              @click="onDisconnect('hh')"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#5375fd"
                xmlns="http://www.w3.org/2000/svg"
                data-v-3e4ab60c=""
              >
                <path
                  d="M18.9951 4.99512L5.00586 18.9843"
                  stroke="#5375fd"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  data-v-3e4ab60c=""
                ></path>
                <path
                  d="M19.0009 18.9928L5 4.98901"
                  stroke="#5375fd"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  data-v-3e4ab60c=""
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <!-- HeadHunters END-->

      <!-- Superjob START-->
      <div
        class="provider-item grid-provider-mob"
        :class="{ navigated: isSuperjobConnected }"
        @click.prevent="onOpen('superjob')"
      >
        <div
          class="import-box is-connected"
          :class="{
            disabled: !isSuperjobConnected,
            'import-is-complete': isSuperjobConnected,
          }"
        >
          <div class="import-box-dvnld">
            <div class="logo">
              <img src="https://jobeek.online/_nuxt/sb.DLBzSeco.svg" alt="#" />
              <div class="check">
                <img src="~/assets/img/svg/complete.svg" alt="#" />
              </div>
            </div>
            <span>Superjob.ru </span>
            <button
              v-show="isSuperjobConnected"
              class="close"
              type="button"
              @click="onDisconnect('superjob')"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#5375fd"
                xmlns="http://www.w3.org/2000/svg"
                data-v-3e4ab60c=""
              >
                <path
                  d="M18.9951 4.99512L5.00586 18.9843"
                  stroke="#5375fd"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  data-v-3e4ab60c=""
                ></path>
                <path
                  d="M19.0009 18.9928L5 4.98901"
                  stroke="#5375fd"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  data-v-3e4ab60c=""
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <!-- Superjob END-->

      <!-- Reload START-->
      <div class="import-box import-is-complete is-connected grid-provider-mob">
        <div class="import-box-dvnld sync-card d-flex pe-4">
          <button
            class="logo sync-button"
            :class="{ rotating: isSyncing }"
            @click="onSync"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="51"
              height="51"
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
            <div class="check">
              <span>{{ lastSyncedTime.time }}</span>
            </div>
          </button>
          <span class="load-date">{{ lastSyncedTime.date }}</span>
        </div>
      </div>
      <!-- Reload END-->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { toast } from "vue3-toastify";
import moment from "moment";
import { useVacancyStore } from "~/store/vacancy";

/**
 * Accessing the global store for vacancy-related actions.
 */
const vacancyStore = useVacancyStore();
const { synVacancies, disconnectProviders, getConnectedEmployerProviders } =
  vacancyStore;

/**
 * Fetching connected providers' data and authorization endpoints using `useAsyncData`.
 */
const { data: connectedData, refresh: refreshConnectedProviders } =
  await useAsyncData("connectedProviders", () =>
    getConnectedEmployerProviders(),
  );

// Providers state management
const providers = ref({
  hh: { slug: "hh", url: null, is_connected: false },
  superjob: { slug: "superjob", url: null, is_connected: false },
});

const isSyncing = ref(false); // Is syncing in progress?

// Get full URL for redirect
const route = useRoute(); // Access the current route
const redirect_url = useRequestURL(); // Nuxt-specific helper to get the full URL including domain

// Last synced time formatted using `moment`
const lastSyncedTime = computed(() => {
  const date = moment(
    vacancyStore.providers?.synchronized.vacancy.end_date_time,
    "YYYY-MM-DD hh:mm:s",
  );
  return {
    date: date.format("DD.MM.Y"),
    time: date.format("hh:mm"),
  };
});

// Computed properties for each provider's connection state
const isSuperjobConnected = computed(
  () => providers.value.superjob.is_connected,
);
const isHHConnected = computed(() => providers.value.hh.is_connected);

const { data: authEndpoints, refresh: refreshAuthEndpoints } = useAsyncData(
  "authEndpoints",
  () => vacancyStore.getEmployerProvidersAuthEndpoints({}, redirect_url),
);

// Watch for changes in the `connectedData` and `authEndpoints` to update the `providers` state
watch(
  [connectedData, authEndpoints],
  ([connectedDataValue, authEndpointsValue]) => {
    providers.value.hh = {
      ...providers.value.hh,
      url: authEndpointsValue?.hh || null,
      is_connected: connectedDataValue?.hh || false,
    };
    providers.value.superjob = {
      ...providers.value.superjob,
      url: authEndpointsValue?.superjob || null,
      is_connected: connectedDataValue?.superjob || false,
    };
  },
  { immediate: true },
);

/**
 * Handler to synchronize vacancies with connected providers.
 */
const onSync = async () => {
  try {
    isSyncing.value = true; // Start syncing state
    const resData = await synVacancies();
    if (resData.message) toast.info(resData.message, { autoClose: 3000 });

    // Refresh provider data after successful sync
    await Promise.all([refreshConnectedProviders(), refreshAuthEndpoints()]);
  } catch (error) {
    toast.error("Synchronization error", { autoClose: 3000 });
  } finally {
    isSyncing.value = false; // Stop syncing state
  }
};

/**
 * Disconnect a provider by its slug.
 */
const onDisconnect = async (providerSlug) => {
  try {
    const resData = await disconnectProviders({ providers: [providerSlug] });
    if (resData.status !== "success") {
      return;
    }
    toast.success(resData.message, { autoClose: 3000 });

    // Refresh provider data after disconnecting
    await Promise.all([refreshConnectedProviders(), refreshAuthEndpoints()]);
  } catch (error) {
    toast.error("Error disconnecting provider", { autoClose: 3000 });
  }
};

/**
 * Opens the specified provider URL.
 */
const onOpen = (provider) => {
  if (provider === "hh" && !isHHConnected.value && providers.value.hh.url) {
    window.open(providers.value.hh.url, "_blank");
    return;
  }
  if (
    provider === "superjob" &&
    !isSuperjobConnected.value &&
    providers.value.superjob.url
  ) {
    window.open(providers.value.superjob.url, "_blank");
  }
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
  align-items: baseline;
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
  animation: rotation 2s infinite linear;
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
