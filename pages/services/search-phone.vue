<script setup>
import IMask from "imask";

definePageMeta({
  layout: 'cabinet'
});

import {toast} from "vue3-toastify";
import {useScamStore} from "~/store/scam";


const scamStore = useScamStore();

const {searchPhone, getScamOptions} = scamStore;

const route = useRoute();
const phoneInputElement = ref();
const phoneMask = ref(null);
const isLoading = ref(false);

const rateOptions = computed(() => scamStore.rate_options.map((item) => {
  return {name: item.title, value: item.key}
}));
const frequencyOptions = computed(() => scamStore.frequency_options.map((item) => {
  return {name: item.title, value: item.key}
}));
// const frequencyOptions = ref(scamStore.frequency_options ?? []);
onMounted(async( ) => {
  await getScamOptions();

  isLoading.value = true;
  phoneMask.value = new IMask(phoneInputElement.value, {
    mask: "+{7}(000)000-00-00",
  });

  if (route.query.hasOwnProperty('phone')){
    phones.value = await searchPhone({phone:route.query.phone});
    setTimeout(() => {
      isLoading.value = false;
    }, 1000)
  }else{
    isLoading.value = false;
  }
  // phoneInputElement.value.addEventListener("input", () => {});
})

const phones = ref([]);
const getPhones = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(phones.value)
    }, 1000)
  })
}
const onPhoneSearch = async() => {

  console.log(phoneMask.value.unmaskedValue);
  const resData = await searchPhone({phone: phoneMask.value.unmaskedValue ?? "77777777777"});

  console.log(resData);
  if (resData.status === 'failed'){
    return toast.error(resData.message, {autoClose: 3000});
  }

  phones.value = resData;
  isLoading.value = false;
}

</script>
<template>
  <main class="main bg-wrapper scam-phone-page" role="main">

    {{rateOptions}}
    {{frequencyOptions}}

    <div class="head-w-section">
      <div class="wrapper wrapper-1290">
        <h1 class="head-w-section__title">Поиск по номеру телефона</h1>

        <div class="radio-buttons-row">
          <div class="check-block">
            <div class="checkbox">
              <input
                  id="by-phone"
                  name="search-type"
                  type="radio"
                  checked="checked" />
              <div class="radio-mask">
                <img
                    src="~/assets/img/svg/check.svg"
                    alt="#" />
              </div>
            </div>
            <label for="by-phone">По номеру телефона</label>
          </div>

          <div class="check-block">
            <div class="checkbox">
              <input
                  id="by-adress"
                  name="search-type"
                  type="radio" />
              <div class="radio-mask">
                <img
                    src="~/assets/img/svg/check.svg"
                    alt="#" />
              </div>
            </div>
            <label for="by-adress">По адресу</label>
          </div>

          <div class="check-block">
            <div class="checkbox">
              <input
                  id="by-name"
                  name="search-type"
                  type="radio" />
              <div class="radio-mask">
                <img
                    src="~/assets/img/svg/check.svg"
                    alt="#" />
              </div>
            </div>
            <label for="by-name">По названию</label>
          </div>
        </div>

        <form class="search-row" @submit.prevent="onPhoneSearch">
          <button class="search-button">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none">
              <circle
                  cx="11.7659"
                  cy="11.7666"
                  r="8.98856"
                  stroke="#B8BFC6"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round" />
              <path
                  d="M18.0195 18.4851L21.5436 22"
                  stroke="#B8BFC6"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round" />
            </svg>
          </button>
          <input
              ref="phoneInputElement"
              type="text"
              placeholder="+7 992 932 32 12" />
          <button
              class="button-accent">
            Сохранить
          </button>
        </form>
      </div>
    </div>

    <div class="wrapper wrapper-1290">
      <div class="course-grid">




        <ServicesScamLoadingList v-if="isLoading"/>
        <ServicesScamAsyncList :phones="phones" :get-phones="getPhones" v-else/>

<!--        <ClientOnly>-->
<!--          <Suspense>-->
<!--            <template #default>-->
<!--            </template>-->

<!--            <template #fallback>-->
<!--            </template>-->
<!--          </Suspense>-->
<!--        </ClientOnly>-->

        <ServicesSubscriptionList/>
      </div>

      <div class="subscribes-grid-container">
        <h3 class="subscribes-grid-container__title">История поиска</h3>
        <div class="subscribes-grid">
          <div class="favorites-card favorites-card--min">
            <div class="favorites-card-head">
              <div class="company">
                <div class="company-logo">
                  <img
                      src="~/assets/img/logos/megafon.svg"
                      alt="#" />
                </div>
                <div class="company-name">
                  <a href="#"> +7 932 932 22 12</a
                  ><span class="count">Мегафон</span>
                </div>
              </div>

              <button class="card-action">
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M4.02539 23.9749H23.9754"
                      stroke="#5375FD"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"></path>
                  <path
                      d="M14.2462 7.15927L19.7324 12.6455M14.2462 7.15927L17.3806 4.0249L22.8668 9.51115L19.7324 12.6455L14.2462 7.15927ZM14.2462 7.15927L8.03177 13.3737C7.82391 13.5815 7.70709 13.8634 7.70703 14.1573V19.1847H12.7344C13.0284 19.1846 13.3102 19.0678 13.518 18.8599L19.7324 12.6455L14.2462 7.15927Z"
                      stroke="#5375FD"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"></path>
                </svg>
              </button>
            </div>
            <div class="favorites-card-body">
              <p>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                  <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M19.0714 19.0699C16.0152 22.1263 11.4898 22.7867 7.78642 21.074C7.23971 20.8539 6.79148 20.676 6.36537 20.676C5.17849 20.683 3.70117 21.8339 2.93336 21.067C2.16555 20.2991 3.31726 18.8206 3.31726 17.6266C3.31726 17.2004 3.14642 16.7602 2.92632 16.2124C1.21283 12.5096 1.87411 7.98269 4.93026 4.92721C8.8316 1.02443 15.17 1.02443 19.0714 4.9262C22.9797 8.83501 22.9727 15.1681 19.0714 19.0699Z"
                      stroke="#FD595E"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                  <path
                      d="M15.9408 12.4131H15.9498"
                      stroke="#FD595E"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                  <path
                      d="M11.9291 12.4131H11.9381"
                      stroke="#FD595E"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                  <path
                      d="M7.92128 12.4131H7.93028"
                      stroke="#FD595E"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                </svg>
                Это спам. не брать трубку
              </p>

              <button class="group-action btn button-md btn--green">
                <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_727_6122)">
                    <circle
                        cx="9.4987"
                        cy="9.49992"
                        r="7.91667"
                        stroke="white"
                        stroke-width="1.5" />
                    <path
                        d="M6.73047 9.89575L8.3138 11.4791L12.2721 7.52075"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_727_6122">
                      <rect
                          width="19"
                          height="19"
                          fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Вы подписаны
              </button>
            </div>
          </div>
          <div class="favorites-card favorites-card--min">
            <div class="favorites-card-head">
              <div class="company">
                <div class="company-logo">
                  <img
                      src="~/assets/img/logos/megafon.svg"
                      alt="#" />
                </div>
                <div class="company-name">
                  <a href="#"> +7 932 932 22 12</a
                  ><span class="count">Мегафон</span>
                </div>
              </div>

              <button class="card-action">
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M4.02539 23.9749H23.9754"
                      stroke="#5375FD"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"></path>
                  <path
                      d="M14.2462 7.15927L19.7324 12.6455M14.2462 7.15927L17.3806 4.0249L22.8668 9.51115L19.7324 12.6455L14.2462 7.15927ZM14.2462 7.15927L8.03177 13.3737C7.82391 13.5815 7.70709 13.8634 7.70703 14.1573V19.1847H12.7344C13.0284 19.1846 13.3102 19.0678 13.518 18.8599L19.7324 12.6455L14.2462 7.15927Z"
                      stroke="#5375FD"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"></path>
                </svg>
              </button>
            </div>
            <div class="favorites-card-body">
              <button class="group-action btn button-md btn--green">
                <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_727_6122)">
                    <circle
                        cx="9.4987"
                        cy="9.49992"
                        r="7.91667"
                        stroke="white"
                        stroke-width="1.5" />
                    <path
                        d="M6.73047 9.89575L8.3138 11.4791L12.2721 7.52075"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_727_6122">
                      <rect
                          width="19"
                          height="19"
                          fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Вы подписаны
              </button>
            </div>
          </div>
          <div class="favorites-card favorites-card--min">
            <div class="favorites-card-head">
              <div class="company">
                <div class="company-logo">
                  <img
                      src="~/assets/img/logos/megafon.svg"
                      alt="#" />
                </div>
                <div class="company-name">
                  <a href="#"> +7 932 932 22 12</a
                  ><span class="count">Мегафон</span>
                </div>
              </div>

              <button class="card-action">
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M4.02539 23.9749H23.9754"
                      stroke="#5375FD"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"></path>
                  <path
                      d="M14.2462 7.15927L19.7324 12.6455M14.2462 7.15927L17.3806 4.0249L22.8668 9.51115L19.7324 12.6455L14.2462 7.15927ZM14.2462 7.15927L8.03177 13.3737C7.82391 13.5815 7.70709 13.8634 7.70703 14.1573V19.1847H12.7344C13.0284 19.1846 13.3102 19.0678 13.518 18.8599L19.7324 12.6455L14.2462 7.15927Z"
                      stroke="#5375FD"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"></path>
                </svg>
              </button>
            </div>
            <div class="favorites-card-body">
              <p>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                  <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M19.0714 19.0699C16.0152 22.1263 11.4898 22.7867 7.78642 21.074C7.23971 20.8539 6.79148 20.676 6.36537 20.676C5.17849 20.683 3.70117 21.8339 2.93336 21.067C2.16555 20.2991 3.31726 18.8206 3.31726 17.6266C3.31726 17.2004 3.14642 16.7602 2.92632 16.2124C1.21283 12.5096 1.87411 7.98269 4.93026 4.92721C8.8316 1.02443 15.17 1.02443 19.0714 4.9262C22.9797 8.83501 22.9727 15.1681 19.0714 19.0699Z"
                      stroke="#FD595E"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                  <path
                      d="M15.9408 12.4131H15.9498"
                      stroke="#FD595E"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                  <path
                      d="M11.9291 12.4131H11.9381"
                      stroke="#FD595E"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                  <path
                      d="M7.92128 12.4131H7.93028"
                      stroke="#FD595E"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                </svg>
                Это спам. не брать трубку
              </p>

              <button class="group-action btn button-md btn--green">
                <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_727_6122)">
                    <circle
                        cx="9.4987"
                        cy="9.49992"
                        r="7.91667"
                        stroke="white"
                        stroke-width="1.5" />
                    <path
                        d="M6.73047 9.89575L8.3138 11.4791L12.2721 7.52075"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_727_6122">
                      <rect
                          width="19"
                          height="19"
                          fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Вы подписаны
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

