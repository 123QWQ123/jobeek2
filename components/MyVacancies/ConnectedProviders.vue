<template>
  <div>
    <h1 class="lk-page-title mb-4 mb-0 margin-top-mobile">Cервисы</h1>
    
	<div class="services-grid-load import-grid">
	   <!-- HeadHunters START-->
	    <a class="provider-item grid-provider-mob" :href="providers.hh.url" target="_blank" :class="{ navigated: isHHConnected }">
		    <div class="import-box is-connected">
		      <div class="import-box-dvnld">
		         <div class="logo">
		            <img src="data:image/svg+xml,%3csvg%20width='52'%20height='52'%20viewBox='0%200%2052%2052'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_159_1714)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M51.5787%2025.6319C51.5787%2030.703%2050.0953%2035.6602%2047.316%2039.8766C44.5367%2044.093%2040.5865%2047.3793%2035.9647%2049.3199C31.343%2051.2605%2026.2574%2051.7683%2021.351%2050.779C16.4446%2049.7897%2011.9377%2047.3477%208.40041%2043.7619C4.86309%2040.1762%202.45415%2035.6076%201.4782%2030.634C0.502256%2025.6604%201.00315%2020.5051%202.91753%2015.82C4.83192%2011.135%208.07382%207.13059%2012.2333%204.31326C16.3927%201.49593%2021.2829%20-0.00781155%2026.2854%20-0.00781155C29.6072%20-0.00872945%2032.8967%200.653831%2035.9658%201.94202C39.0349%203.23021%2041.8236%205.11879%2044.1725%207.49984C46.5214%209.88089%2048.3844%2012.7078%2049.6552%2015.8189C50.926%2018.9301%2051.5796%2022.2646%2051.5787%2025.6319Z'%20fill='%23D20A11'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M15.253%2013.2319V22.0277C15.8095%2021.2862%2016.5263%2020.684%2017.3483%2020.2674C18.1703%2019.8508%2019.0756%2019.6308%2019.9946%2019.6244C20.8741%2019.6106%2021.7455%2019.7968%2022.5446%2020.1693C23.2307%2020.4694%2023.8237%2020.9522%2024.2607%2021.5666C24.6471%2022.1299%2024.9167%2022.7669%2025.0533%2023.4389C25.2222%2024.4894%2025.2937%2025.5537%2025.2669%2026.6177V36.0212H21.1318V27.5469C21.189%2026.4748%2021.1126%2025.3998%2020.9044%2024.3471C20.7547%2023.9051%2020.4636%2023.5264%2020.0773%2023.2712C19.6353%2022.9872%2019.1186%2022.8459%2018.5956%2022.866C17.9526%2022.857%2017.3208%2023.0365%2016.7761%2023.383C16.2297%2023.7523%2015.8237%2024.2994%2015.6252%2024.934C15.3329%2025.9233%2015.207%2026.9554%2015.253%2027.987V36.0212H11.1523V13.2319H15.2875H15.253Z'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M31.4144%2013.2319V22.0277C31.9709%2021.2862%2032.6877%2020.684%2033.5097%2020.2674C34.3317%2019.8508%2035.237%2019.6308%2036.1561%2019.6244C37.0377%2019.611%2037.9112%2019.7971%2038.7129%2020.1693C39.3965%2020.4704%2039.987%2020.9532%2040.4221%2021.5666C40.8085%2022.1299%2041.0782%2022.7669%2041.2147%2023.4389C41.3836%2024.4894%2041.4551%2025.5537%2041.4283%2026.6177V36.0212H37.3277V27.5469C37.3839%2026.4745%2037.3052%2025.3993%2037.0934%2024.3471C36.9437%2023.9051%2036.6526%2023.5264%2036.2663%2023.2712C35.8245%2022.9868%2035.3076%2022.8455%2034.7846%2022.866C34.1416%2022.857%2033.5098%2023.0365%2032.9651%2023.383C32.411%2023.7505%2031.9957%2024.2971%2031.7866%2024.934C31.4992%2025.9243%2031.3734%2026.9556%2031.4144%2027.987V36.0212H27.2793V13.2319H31.4144Z'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_159_1714'%3e%3crect%20width='52'%20height='52'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e" alt="#">
		            <div class="check"><img src="data:image/svg+xml;charset=UTF-8, %3csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M11 0C4.925 0 0 4.925 0 11C0 17.075 4.925 22 11 22C17.075 22 22 17.075 22 11C22 4.925 17.075 0 11 0ZM15.768 9.14C15.8558 9.03964 15.9226 8.92274 15.9646 8.79617C16.0065 8.6696 16.0227 8.53591 16.0123 8.40298C16.0018 8.27005 15.9648 8.14056 15.9036 8.02213C15.8423 7.90369 15.758 7.79871 15.6555 7.71334C15.5531 7.62798 15.4346 7.56396 15.3071 7.52506C15.1796 7.48616 15.0455 7.47316 14.9129 7.48683C14.7802 7.50049 14.6517 7.54055 14.5347 7.60463C14.4178 7.66872 14.3149 7.75554 14.232 7.86L9.932 13.019L7.707 10.793C7.5184 10.6108 7.2658 10.51 7.0036 10.5123C6.7414 10.5146 6.49059 10.6198 6.30518 10.8052C6.11977 10.9906 6.0146 11.2414 6.01233 11.5036C6.01005 11.7658 6.11084 12.0184 6.293 12.207L9.293 15.207C9.39126 15.3052 9.50889 15.3818 9.63842 15.4321C9.76794 15.4823 9.9065 15.505 10.0453 15.4986C10.184 15.4923 10.32 15.4572 10.4444 15.3954C10.5688 15.3337 10.6791 15.2467 10.768 15.14L15.768 9.14Z' fill='%2300aa87'/%3e%3c/svg%3e" alt="#"></div>
		         </div>
		         <span>HeadHunters.ru</span>
		      </div>
		   </div>
	   </a>
	   <!-- HeadHunters END-->
	   
	   <!-- Superjob START-->
	   <a class="provider-item grid-provider-mob" :href="providers.superjob.url" target="_blank" :class="{ navigated: isSuperjobConnected }">
		   <div class="import-box is-connected">
		      <div class="import-box-dvnld">
		         <div class="logo">
		            <img src="https://jobeek.online/_nuxt/sb.DLBzSeco.svg" alt="#">
		            <div class="check"><img src="data:image/svg+xml;charset=UTF-8, %3csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M11 0C4.925 0 0 4.925 0 11C0 17.075 4.925 22 11 22C17.075 22 22 17.075 22 11C22 4.925 17.075 0 11 0ZM15.768 9.14C15.8558 9.03964 15.9226 8.92274 15.9646 8.79617C16.0065 8.6696 16.0227 8.53591 16.0123 8.40298C16.0018 8.27005 15.9648 8.14056 15.9036 8.02213C15.8423 7.90369 15.758 7.79871 15.6555 7.71334C15.5531 7.62798 15.4346 7.56396 15.3071 7.52506C15.1796 7.48616 15.0455 7.47316 14.9129 7.48683C14.7802 7.50049 14.6517 7.54055 14.5347 7.60463C14.4178 7.66872 14.3149 7.75554 14.232 7.86L9.932 13.019L7.707 10.793C7.5184 10.6108 7.2658 10.51 7.0036 10.5123C6.7414 10.5146 6.49059 10.6198 6.30518 10.8052C6.11977 10.9906 6.0146 11.2414 6.01233 11.5036C6.01005 11.7658 6.11084 12.0184 6.293 12.207L9.293 15.207C9.39126 15.3052 9.50889 15.3818 9.63842 15.4321C9.76794 15.4823 9.9065 15.505 10.0453 15.4986C10.184 15.4923 10.32 15.4572 10.4444 15.3954C10.5688 15.3337 10.6791 15.2467 10.768 15.14L15.768 9.14Z' fill='%2300aa87'/%3e%3c/svg%3e" alt="#"></div>
		         </div>
		         <span>Superjob.ru </span>
		      </div>
		   </div>
	   </a>
	   <!-- Superjob END-->
	   
	   <!-- Reload START-->
	   <div class="import-box is-connected grid-provider-mob">
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
            @click.prevent="onOpen(providers.hh.url)"
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
            @click.prevent="onOpen(providers.superjob.url)"
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
                v-if="isSuperjobConnected"
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
              <span v-if="true" class="">в {{ lastSyncedTime }} </span>
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
import { ref, computed, watch } from "vue";
import { toast } from "vue3-toastify";
import moment from "moment";
import { useVacancyStore } from "~/store/vacancy";

/**
 * Accessing the global store for vacancy-related actions.
 */
const vacancyStore = useVacancyStore();
const { synVacancies, disconnectProviders } = vacancyStore;

// Providers state management
const providers = ref({
  hh: { slug: "hh", url: null, is_connected: false },
  superjob: { slug: "superjob", url: null, is_connected: false },
});

const isSyncing = ref(false); // Is syncing in progress?
const iframe = ref(null); // Iframe reference if needed

// Get full URL for redirect
const route = useRoute(); // Access the current route
const redirect_url = useRequestURL(); // Nuxt-specific helper to get the full URL including domain

// Last synced time formatted using `moment`
const lastSyncedTime = computed(() => moment().format("h:mm a, DD.MM.Y"));

// Computed properties for each provider's connection state
const isSuperjobConnected = computed(
  () => providers.value.superjob.is_connected,
);
const isHHConnected = computed(() => providers.value.hh.is_connected);
const isAnyProviderConnected = computed(() =>
  Object.values(providers.value).some((provider) => provider.is_connected),
);

/**
 * Fetching connected providers' data and authorization endpoints using `useAsyncData`.
 */
const { data: connectedData, refresh: refreshConnectedProviders } =
  useAsyncData("connectedProviders", () =>
    vacancyStore.getConnectedEmployerProviders(),
  );

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
      toast.error(resData.message, { autoClose: 3000 });
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
const onOpen = (url) => {
  if (url) window.open(url, "_blank");
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