<template>
  <div>
    <h1 class="lk-page-title mb-4 mb-0 margin-top-mobile">Cервисы</h1>
    <div class="card mb-4 border-0 px-2 py-0" style="border-radius: 12px">
      <div class="row align-baseline justify-between">
        <div class="col-6 list-of-providers">
          <a
            class="provider-item"
            :href="providers.hh.url"
            target="_blank"
            :class="{ navigated: isHHConnected }"
          >
            <!--                  <span class="remove-text">Отключить</span>-->

            <span class="provider-label success">
              <svg
                v-if="isHHConnected"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="limegreen"
                class="bi bi-check connected"
                viewBox="0 0 16 16"
              >
                <path
                  d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#f14646"
                class="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                />
              </svg>

              <svg
                @click="onDisconnect('hh')"
                v-if="isHHConnected"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#f14646"
                class="bi bi-x remove"
                viewBox="0 0 16 16"
              >
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </span>
            <!--            <span class="provider-label reload">-->
            <!--              <svg-->
            <!--                xmlns="http://www.w3.org/2000/svg"-->
            <!--                width="22"-->
            <!--                height="22"-->
            <!--                fill="#5375FD"-->
            <!--                class="bi bi-arrow-repeat"-->
            <!--                viewBox="0 0 16 16"-->
            <!--                data-v-03b4701d=""-->
            <!--              >-->
            <!--                <path-->
            <!--                  d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"-->
            <!--                  data-v-03b4701d=""-->
            <!--                ></path>-->
            <!--                <path-->
            <!--                  fill-rule="evenodd"-->
            <!--                  d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"-->
            <!--                  data-v-03b4701d=""-->
            <!--                ></path>-->
            <!--              </svg>-->
            <!--            </span>-->
            <img src="~/assets/img/logos/min-hh-red.png" class="w-100" />
          </a>
          <a
            class="provider-item"
            :href="providers.superjob.url"
            target="_blank"
            :class="{ navigated: isSuperjobConnected }"
          >
            <!--                <span class="remove-text">Отключить</span>-->

            <span class="provider-label success">
              <svg
                v-if="isSuperjobConnected"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="limegreen"
                class="bi bi-check connected"
                viewBox="0 0 16 16"
              >
                <path
                  d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#f14646"
                class="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                />
              </svg>

              <svg
                @click="onDisconnect('superjob')"
                v-if="isHHConnected"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#f14646"
                class="bi bi-x remove"
                viewBox="0 0 16 16"
              >
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </span>
            <!--            <span class="provider-label reload">-->
            <!--              <svg-->
            <!--                xmlns="http://www.w3.org/2000/svg"-->
            <!--                width="22"-->
            <!--                height="22"-->
            <!--                fill="#5375FD"-->
            <!--                class="bi bi-arrow-repeat"-->
            <!--                viewBox="0 0 16 16"-->
            <!--                data-v-03b4701d=""-->
            <!--              >-->
            <!--                <path-->
            <!--                  d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"-->
            <!--                  data-v-03b4701d=""-->
            <!--                ></path>-->
            <!--                <path-->
            <!--                  fill-rule="evenodd"-->
            <!--                  d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"-->
            <!--                  data-v-03b4701d=""-->
            <!--                ></path>-->
            <!--              </svg>-->
            <!--            </span>-->
            <img src="~/assets/img/logos/superjob.svg" class="w-100" />
          </a>
        </div>
        <div class="col-6 refresh-button_col">
          <div class="h-100 d-flex align-items-center">
            <div class="sync-card d-flex flex-column pe-4">
              <button
                class="sync-button"
                :class="{ rotating: isSyncing }"
                @click="onSync"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  fill="#5375FD"
                  class="bi bi-arrow-repeat"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                  />
                </svg>
              </button>
              <span v-if="true" class="">в {{ lastSyncedTime }} </span>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-4" v-if="!isAnyProviderConnected">
        Не один сервис не подключен!
      </div>
    </div>
  </div>
</template>

<script setup>
import { toast } from "vue3-toastify";
import { useResumeStore } from "~/store/resume";
import moment from "moment";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

// Resume store provides methods to work with resume-related features
const resumeStore = useResumeStore();
const {
  getSeekerProvidersAuthEndpoints,
  getConnectedSeekerProviders,
  syncResumes,
  disconnectProviders,
} = resumeStore;

// Reactive state for providers and their connections
const providers = ref({
  hh: { slug: "hh", url: null, is_connected: false },
  superjob: { slug: "superjob", url: null, is_connected: false },
});

// Reactive state for UI controls
const isSyncing = ref(false); // Tracks if synchronization is in progress
const lastSyncedTime = computed(() => moment().format("h:mm ч, DD.MM.Y")); // Displays the last synchronization time

// Get full URL for redirect
const route = useRoute(); // Access the current route
const redirect_url = useRequestURL(); // Nuxt-specific helper to get the full URL including domain

// Computed states for provider connections
const isSuperjobConnected = computed(
  () => providers.value.superjob.is_connected,
); // Is SuperJob connected
const isHHConnected = computed(() => providers.value.hh.is_connected); // Is HH connected
const isAnyProviderConnected = computed(
  () => isHHConnected.value || isSuperjobConnected.value,
); // Is any provider connected

// Function to sync resumes
const onSync = async () => {
  try {
    isSyncing.value = true; // Set syncing state to true
    const resData = await syncResumes(); // Call sync function from the store
    handleResponseMessage(resData, "info"); // Handle response (e.g., show a toast message)
  } finally {
    isSyncing.value = false; // Ensure syncing state is reset even if an error occurs
    setTimeout(() => window.location.reload(), 1000); // Reload page after syncing
    await updateProviderData(); // Update provider information post-sync
  }
};

// Function to disconnect a specific provider
const onDisconnect = async (providerSlug) => {
  const resData = await disconnectProviders({ providers: [providerSlug] }); // Disconnect provider via API
  // Show success or error message based on API response
  handleResponseMessage(
    resData,
    resData.status === "success" ? "success" : "error",
  );
  await updateProviderData(); // Update provider information after disconnect
};

// Function to open a given URL (e.g., provider auth URL)
const openProviderAuthUrl = (url) => window.open(url, "_blank"); // Simply opens a URL in a new tab

// Helper function to handle API response messages
// Accepts the response object and the type of toast (info, success, or error)
const handleResponseMessage = (response, type) => {
  if (response?.message) {
    toast[type](response.message, { autoClose: 3000 }); // Use appropriate toast type
  }
};

// Function to update provider information (connected state and auth URLs)
const updateProviderData = async () => {
  // Fetch connected providers from the API
  const connectedProviders = await getConnectedSeekerProviders();
  if (connectedProviders.hh && connectedProviders.superjob) {
    providers.value.hh.is_connected = connectedProviders.hh; // Update HH connection state
    providers.value.superjob.is_connected = connectedProviders.superjob; // Update SuperJob connection state
  }

  // Fetch authentication URLs for disconnected providers
  if (!isSuperjobConnected.value || !isHHConnected.value) {
    const authData = await getSeekerProvidersAuthEndpoints({}, redirect_url); // Get auth URLs with full redirect URL
    providers.value.hh.url = authData.hh || null; // Set HH auth URL
    providers.value.superjob.url = authData.superjob || null; // Set SuperJob auth URL
  }
  return true;
};

useAsyncData("updateProviderData", async () => {
  return await updateProviderData();
});
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
</style>
