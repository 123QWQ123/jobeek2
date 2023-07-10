<template>
    <div class="wrapper wrapper-1290" v-if="!isAllConnected">
        <h1 class="lk-page-title">Cервисы</h1>
        <div class="modal-content p-2 m-0 border-0" style="min-width: 10rem;">
            <div class="list-of-providers">
                <a @click="openProviderAuthUrl(item.url)" v-for="item in providers" class="provider-item">
                  <span class="provider-label success">
                    <svg v-if="item.is_connected" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="limegreen" class="bi bi-check"
                         viewBox="0 0 16 16">
                      <path
                              d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#f14646" class="bi bi-x"
                         viewBox="0 0 16 16">
                      <path
                              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </span>
                    <img :src="item.icon" />
                </a>
            </div>
        </div>
    </div>
  <div v-else></div>
</template>

<script setup>

import {useVacancyStore} from "../../store/vacancy";
import {useProfileStore} from "~/store/profile";
import {useResumeStore} from "~/store/resume";


const vacancyStore = useVacancyStore();
const resumeStore = useResumeStore();
const { getProvidersAuthUrl } = useProfileStore();
const { getConnectedProviders } = resumeStore;

const {providers} = resumeStore;
console.log(providers);
// const checkProviders = async() => {
//     if (connectedProviders){
//         for (let i = 0; i < providers.length; i++){
//             const providerItem = providers[i];
//             console.log(providerItem);
//             providerItem.is_connected = connectedProviders[providerItem.slug] ?? false;
//         }
//     }
// }
// await checkProviders();


const isAllConnected = computed(() => {

    let is_all = true;
    for (let i = 0; i < providers.length; i++){
        const providerItem = providers[i];
        if(providerItem.is_connected === false){
            is_all = false;
        }
    }

    return is_all;
});

onMounted(async () => {
    if (!isAllConnected.value){
        const authData = await getProvidersAuthUrl();

        for (let i = 0; i < providers.length; i++){
            const providerItem = providers[i];
            providerItem.url = authData[providerItem.slug];
        }
    }
});


const openProviderAuthUrl = (url) => {
    window.open(url);
}
const onIframeLoaded = (data) => {
    console.log(data, iframe);
};
const iframe = ref();

</script>

<style scoped>

</style>