<template>
  <div>
    <div class="wrapper wrapper-1290">
      <h1 class="lk-page-title">Cервисы</h1>
      <div class="card mb-4 border-0">
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
              <img
                :src="'https://tech.hh.ru/api/logos/min-hh-red.png'"
                class="w-100"
              />
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
              <img src="~/assets/img/logos/superjob.svg" class="w-100" />
            </a>
          </div>
          <div class="col-6 refresh-button_col">
            <div class="h-100 d-flex align-items-center">
              <div class="sync-card d-flex flex-column pe-4 pb-3">
                <button
                  class="sync-button"
                  :class="{ rotating: isSyncing }"
                  @click="onSync"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
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
      </div>

      <div class="mb-4" v-if="!isAnyProviderConnected">
        Не один сервис не подключен!
      </div>
    </div>

    {{ vacancyStore.providers }}
  </div>
</template>

<script setup>
import { useProfileStore } from "~/store/profile";
import { toast } from "vue3-toastify";
import moment from "moment";
import { useVacancyStore } from "~/store/vacancy";

const vacancyStore = useVacancyStore();
const profileStore = useProfileStore();
const { getEmployerProvidersAuthEndpoints } = vacancyStore;

const providers = ref({
  hh: {
    slug: "hh",
    url: null,
    is_connected: false,
  },
  superjob: {
    slug: "superjob",
    url: null,
    is_connected: false,
  },
});

// const resData = await getConnectedEmployerProviders();

const isSyncing = ref(false);
const lastSyncedTime = computed(() => {
  return moment().format("h:mm a, DD.MM.Y");
});

const { importVacancies } = vacancyStore;
const onSync = async () => {
  isSyncing.value = true;
  const resData = await importVacancies();
  console.log(resData);
  if (resData.hasOwnProperty("message")) {
    toast.info(resData.message, { autoClose: 3000 });
  }
  isSyncing.value = false;
  console.log(resData);
  // window.location.reload();
};

const onDisconnect = () => {
  console.log(isSyncing.value);
};

const onOpen = (url) => {
  window.open(url);
};

const isSuperjobConnected = computed(() => {
  return vacancyStore.providers.superjob;
});
const isHHConnected = computed(() => {
  return vacancyStore.providers.hh;
});
providers.value.hh.is_connected = vacancyStore.providers.hh;
providers.value.superjob.is_connected = vacancyStore.providers.superjob;

watch(
  () => vacancyStore.providers,
  (newProviders) => {
    providers.value.hh.is_connected = newProviders.hh;
    providers.value.superjob.is_connected = newProviders.superjob;
  }
);

const isAnyProviderConnected = computed(() => {
  if (
    vacancyStore.providers.hh === true ||
    vacancyStore.providers.superjob === true
  )
    return true;
  else return false;
});
const route = useRoute();
onMounted(async () => {
  if (!isAnyProviderConnected.value) {
    const redirect_uri = route.fullPath.substring(1);
    console.log(redirect_uri);
    const authData = await getEmployerProvidersAuthEndpoints({}, redirect_uri);
    providers.value.hh.url = authData.hh;
    providers.value.superjob.url = authData.superjob;
  }
});

const openProviderAuthUrl = (url) => {
  window.open(url);
};
const onIframeLoaded = (data) => {
  console.log(data, iframe);
};
const iframe = ref();
</script>

<style scoped>
.list-of-providers {
  display: inline-flex;
  max-height: 20rem;
  padding: 1.5rem;
}

.refresh-button_col {
  display: inline-flex;
  max-height: 20rem;
  padding: 1.5rem;
  justify-content: flex-end;
}

.list-of-providers .provider-item {
  max-height: 8rem;
  max-width: 8rem;
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
  left: 24px;
  transform: scale(1.5);
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
