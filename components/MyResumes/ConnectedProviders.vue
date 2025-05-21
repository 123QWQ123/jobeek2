<template>
  <div>
    <h1 class="lk-page-title mb-4 mb-0 margin-top-mobile">Cервисы</h1>

	<div class="services-grid-load import-grid">
	   <!-- HeadHunters START-->
	    <div class="provider-item grid-provider-mob" target="_blank" :class="{ navigated: isHHConnected }">
		    <div class="import-box is-connected">
		      <div class="import-box-dvnld">
		         <div class="logo">
		            <img src="~/assets/img/svg/hh-big.svg" alt="#">
		            <div class="check"><img src="~/assets/img/svg/complete.svg" alt="#"></div>
		         </div>
		         <span>HeadHunters.ru</span>
		      </div>
		   </div>
	   </div>
	   <!-- HeadHunters END-->
	   
	   <!-- Superjob START-->
	   <div class="provider-item grid-provider-mob" target="_blank" :class="{ navigated: isSuperjobConnected }">
		   <div class="import-box is-connected">
		      <div class="import-box-dvnld">
		         <div class="logo">
		            <img src="https://jobeek.online/_nuxt/sb.DLBzSeco.svg" alt="#">
		            <div class="check"><img src="~/assets/img/svg/complete.svg" alt="#"></div>
		         </div>
		         <span>Superjob.ru </span>
		         <button class="close" type="button">
		         	<svg width="24" height="24" viewBox="0 0 24 24" fill="#5375fd" xmlns="http://www.w3.org/2000/svg" data-v-3e4ab60c=""><path d="M18.9951 4.99512L5.00586 18.9843" stroke="#5375fd" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-3e4ab60c=""></path><path d="M19.0009 18.9928L5 4.98901" stroke="#5375fd" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-3e4ab60c=""></path></svg>
		         </button>
		      </div>
		   </div>
	   </div>
	   <!-- Superjob END-->
	   
	   <!-- Reload START-->
	   <div class="import-box import-is-complete is-connected grid-provider-mob">
	      <div class="import-box-dvnld sync-card d-flex pe-4">
	         <button class="logo sync-button" :class="{ rotating: isSyncing }" @click="onSync">
	            <svg xmlns="http://www.w3.org/2000/svg" width="51" height="51" fill="#5375FD" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
	               <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"></path>
	               <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"></path>
	            </svg>
	            <div class="check"><span>11:05</span></div>
	         </button>
	         <span class="load-date">19.05.2025</span>
	      </div>
	   </div>
	   <!-- Reload END-->
	</div>
    <!-- 
    <div class="card mb-4 border-0 px-2 py-0" style="border-radius: 12px">
      <div class="row align-baseline justify-between">
        <div class="col-6 list-of-providers">
          <a
            class="provider-item"
            :href="providers.hh.url"
            target="_blank"
            :class="{ navigated: isHHConnected }"
          >
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
            <img src="~/assets/img/logos/min-hh-red.png" class="w-100" />
          </a>
          <a
            class="provider-item"
            :href="providers.superjob.url"
            target="_blank"
            :class="{ navigated: isSuperjobConnected }"
          >

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
              <span class="">в {{ lastSyncedTime }} </span>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-4" v-if="!isAnyProviderConnected">
        Не один сервис не подключен!
      </div>
    </div>
    -->
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
    await syncResumes(); // Call sync function from the store
  } finally {
    isSyncing.value = false; // Ensure syncing state is reset even if an error occurs
    await updateProviderData(); // Update provider information post-sync
  }
};

// Function to disconnect a specific provider
const onDisconnect = async (providerSlug) => {
  await disconnectProviders({ providers: [providerSlug] }); // Disconnect provider via API

  await updateProviderData(); // Update provider information after disconnect
};

// Function to open a given URL (e.g., provider auth URL)
const openProviderAuthUrl = (url) => window.open(url, "_blank"); // Simply opens a URL in a new tab

// Function to update provider information (connected state and auth URLs)
const updateProviderData = async () => {
  // Fetch connected providers from the API
  const connectedProviders = await getConnectedSeekerProviders();
  if (connectedProviders.hh || connectedProviders.superjob) {
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

.services-grid-load.import-grid .provider-item .import-box.disabled .import-box-dvnld {
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
  .services-grid-load.import-grid .import-box-dvnld span, .services-grid-load.import-grid .import-complete span {
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
