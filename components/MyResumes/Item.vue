<template>
  <li>
    <div class="resume-card">
      <div class="resume-card-body">
        <div class="resume-card-body-col">
          <!--          <div class="photo">-->
          <!--            <img class="w-100" :src="employerLogo" alt="#" />-->
          <!--          </div>-->
          <div class="resume-card-name">
            <nuxt-link
              :to="{ name: 'my-resume-id', params: { id: item.id } }"
              class="title"
            >
              {{ item.title }}
            </nuxt-link>
            <!--            <span class="location">{{ cityAddress }} </span>-->

            <span>
              <span class="price">
                От {{ vueNumberFormat(salaryAmount, {}) }}
                {{ props.item.currency }}</span
              >
              {{ currency }}
            </span>
          </div>
        </div>
        <div class="resume-card-body-col">
          <div class="date">{{ createdDate }}</div>
          <!--          <div class="date">с {{ published_date.format('D') }} {{ published_date.format('MMMM') }} по 24 марта</div>-->
        </div>
      </div>
      <div class="resume-card-options">
        <!--        <span class="status">Обновлено в {{ moment(item.published_date).format('HH:mm') }}</span>-->
        <div class="option-group selector-group">
          <div class="option">
            <div class="custom-check-wrap">
              <div
                class="theme-checker theme-checker--blue"
                :class="{ disabled: !canHHBeEnabled }"
              >
                <div :class="{ animated: isHHLoading }"></div>

                <input
                  type="checkbox"
                  id="hh"
                  :checked="hhProviderEnabled"
                  @click="toggle('hh')"
                />
                <div class="theme-checker-ui">
                  <div class="circle"></div>
                </div>
              </div>
              <label for="sj">
                <img src="~/assets/img/logos/hhmini.svg" alt="#" />
                <span>HH</span>
              </label>
            </div>
          </div>
          <div class="option">
            <div class="custom-check-wrap position-relative">
              <div
                class="theme-checker theme-checker--blue"
                :class="{
                  disabled: !canSuperjobBeEnabled,
                }"
              >
                <div :class="{ animated: isSuperjobLoading }"></div>
                <input
                  type="checkbox"
                  id="sj"
                  :checked="superjobProviderEnabled"
                  @click="toggle('superjob')"
                />
                <div class="theme-checker-ui">
                  <div class="circle"></div>
                </div>
              </div>
              <label for="sj">
                <img src="~/assets/img/logos/sj.svg" alt="#" />
                <span>Superjob</span>
              </label>
            </div>
          </div>
        </div>

        <div class="push_and_context_wrapper">
          <div class="d-inline-flex me-3">
            <div class="check-block mb-2 mb-md-1 mb-lg-0 me-lg-3">
              <label for="enable-push">Подключить уведомления: </label>
            </div>
            <div
              class="check-block mb-2 mb-md-1 mb-lg-0 me-lg-3"
              @click="onPushToggle"
            >
              <div class="checkbox mx-2">
                <input
                  type="checkbox"
                  id="enable-push"
                  name="enable-push"
                  :checked="pushStatus"
                />
                <div class="checkbox-mask">
                  <img src="~/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <label for="enable-push">Push</label>
            </div>
            <div class="check-block" @click="onEmailToggle">
              <div class="checkbox mx-2">
                <input
                  type="checkbox"
                  id="enable-email"
                  name="enable-email"
                  :checked="emailStatus"
                />
                <div class="checkbox-mask">
                  <img src="~/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <label for="enable-email">E-mail</label>
            </div>
          </div>
          <div
            class="params-button-container"
            v-click-outside.once="closeContextMenu"
          >
            <button
              class="resume-action params-button"
              @click="toggleContextMenu"
            >
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.0002 10.8204C14.7557 10.8204 13.5622 11.3148 12.6823 12.1948C11.8023 13.0747 11.3079 14.2682 11.3079 15.5127C11.3079 16.7571 11.8023 17.9506 12.6823 18.8306C13.5622 19.7106 14.7557 20.2049 16.0002 20.2049C17.2446 20.2049 18.4381 19.7106 19.3181 18.8306C20.1981 17.9506 20.6924 16.7571 20.6924 15.5127C20.6924 14.2682 20.1981 13.0747 19.3181 12.1948C18.4381 11.3148 17.2446 10.8204 16.0002 10.8204ZM12.872 15.5127C12.872 14.683 13.2016 13.8874 13.7882 13.3007C14.3749 12.7141 15.1705 12.3845 16.0002 12.3845C16.8298 12.3845 17.6255 12.7141 18.2121 13.3007C18.7988 13.8874 19.1284 14.683 19.1284 15.5127C19.1284 16.3423 18.7988 17.138 18.2121 17.7246C17.6255 18.3113 16.8298 18.6408 16.0002 18.6408C15.1705 18.6408 14.3749 18.3113 13.7882 17.7246C13.2016 17.138 12.872 16.3423 12.872 15.5127ZM13.1811 27.6925C14.1064 27.9134 15.0536 28.0247 16.0046 28.0247C16.9535 28.0237 17.899 27.9116 18.8218 27.6906C19.0644 27.6322 19.2831 27.5005 19.4481 27.3133C19.6131 27.1261 19.7164 26.8926 19.744 26.6446L19.9554 24.7233C19.9912 24.3797 20.1484 24.0601 20.3988 23.8221C20.6491 23.5841 20.9762 23.4433 21.3212 23.4251C21.5506 23.4151 21.7791 23.458 21.9894 23.5502L23.7455 24.3203C23.8982 24.389 24.0636 24.425 24.231 24.4261C24.3984 24.4272 24.5642 24.3933 24.7178 24.3266C24.8723 24.2609 25.0106 24.1633 25.1244 24.0401C26.4157 22.6482 27.3797 20.9854 27.946 19.1733C28.0202 18.9329 28.0179 18.6754 27.9394 18.4363C27.861 18.1973 27.7103 17.9885 27.5081 17.8388L25.9478 16.6876C25.7619 16.5526 25.6107 16.3756 25.5064 16.1709C25.4021 15.9663 25.3477 15.7399 25.3477 15.5102C25.3477 15.2805 25.4021 15.0541 25.5064 14.8494C25.6107 14.6448 25.7619 14.4677 25.9478 14.3327L27.5031 13.1841C27.7059 13.0341 27.857 12.8248 27.9355 12.5851C28.0139 12.3455 28.0159 12.0873 27.941 11.8465C27.3745 10.0341 26.4093 8.37152 25.1163 6.98091C24.945 6.79779 24.721 6.67236 24.4754 6.62194C24.2297 6.57151 23.9745 6.59856 23.7449 6.69937L21.9894 7.47266C21.8079 7.55461 21.6102 7.59778 21.41 7.59778C21.0497 7.59707 20.7023 7.46336 20.4344 7.22229C20.1665 6.98122 19.9971 6.64976 19.9586 6.29146L19.7459 4.37702C19.7185 4.12586 19.6133 3.88953 19.4451 3.70108C19.2768 3.51262 19.0539 3.38147 18.8074 3.32596C17.889 3.12051 16.9518 3.01127 16.0108 3C15.0637 3.01093 14.1202 3.11996 13.1955 3.32533C12.9492 3.38056 12.7263 3.51139 12.5581 3.69951C12.3898 3.88763 12.2845 4.12363 12.257 4.37452L12.0443 6.29021C12.0042 6.64908 11.8331 6.98054 11.5638 7.22115C11.2892 7.45451 10.9426 7.58715 10.5822 7.59653C10.3839 7.59653 10.1868 7.55524 10.0047 7.47516L8.25296 6.70187C8.02259 6.60016 7.76626 6.57274 7.51959 6.62342C7.27292 6.6741 7.04817 6.80036 6.87656 6.98466C5.58529 8.37557 4.62125 10.0375 4.05496 11.849C3.98015 12.0897 3.98211 12.3478 4.06059 12.5873C4.13906 12.8269 4.29015 13.0361 4.4929 13.1859L6.04948 14.3346C6.32734 14.5403 6.52369 14.8374 6.60392 15.1737C6.68415 15.51 6.64312 15.8637 6.48804 16.1727C6.38475 16.3776 6.23473 16.5552 6.0501 16.6914L4.49227 17.8425C4.28983 17.9922 4.13893 18.2011 4.06046 18.4403C3.982 18.6795 3.97985 18.9372 4.05433 19.1776C4.6196 20.9908 5.58373 22.6544 6.87594 24.0463C7.0467 24.2305 7.27062 24.3568 7.51653 24.4077C7.76245 24.4586 8.01812 24.4316 8.24795 24.3304L10.011 23.5564C10.193 23.4764 10.3895 23.4351 10.5884 23.4351H10.5935C10.9525 23.4355 11.2988 23.568 11.5664 23.8073C11.8341 24.0466 12.0044 24.3759 12.0449 24.7326L12.2564 26.6452C12.284 26.8935 12.3876 27.1273 12.553 27.3146C12.7183 27.5019 12.9375 27.6337 13.1804 27.6919L13.1811 27.6925ZM18.2262 26.2254C16.7622 26.5382 15.2482 26.5382 13.7842 26.2254L13.594 24.56C13.5113 23.821 13.1595 23.1383 12.6056 22.6421C12.0517 22.1459 11.3346 21.871 10.591 21.8697H10.5847C10.17 21.8681 9.75949 21.9533 9.37972 22.12L7.84942 22.7913C6.8567 21.6716 6.09927 20.3638 5.62217 18.9455L6.97666 17.9445C7.35849 17.6631 7.66886 17.296 7.88275 16.8727C8.09665 16.4493 8.20809 15.9817 8.20809 15.5074C8.20809 15.0331 8.09665 14.5654 7.88275 14.1421C7.66886 13.7187 7.35849 13.3516 6.97666 13.0702L5.62279 12.0692C6.10083 10.6525 6.85843 9.34624 7.85068 8.2278L9.37222 8.89848C9.7526 9.0674 10.1643 9.15373 10.5803 9.15311H10.5866C11.332 9.15156 12.0507 8.87571 12.6057 8.37815C13.1607 7.8806 13.5132 7.19616 13.5959 6.45538L13.7836 4.79119C14.5175 4.64411 15.2636 4.56536 16.0121 4.55595C16.7547 4.56534 17.4948 4.64354 18.2231 4.79056L18.4107 6.45475C18.4912 7.19539 18.8421 7.8803 19.3962 8.37822C19.9504 8.87615 20.6688 9.15207 21.4138 9.15311C21.834 9.16304 22.2508 9.07523 22.6313 8.8966L24.1516 8.22654C25.1444 9.34489 25.9023 10.6515 26.3801 12.0686L25.0306 13.0652C24.6462 13.3454 24.3334 13.7125 24.1177 14.1365C23.9021 14.5605 23.7897 15.0295 23.7897 15.5052C23.7897 15.9809 23.9021 16.4498 24.1177 16.8739C24.3334 17.2979 24.6462 17.6649 25.0306 17.9451L26.3851 18.9462C25.9068 20.3626 25.1495 21.6688 24.1578 22.7875L22.6313 22.1181C22.1967 21.9253 21.7227 21.838 21.2479 21.8633C20.7731 21.8886 20.3111 22.0258 19.8994 22.2637C19.4878 22.5016 19.1383 22.8335 18.8793 23.2322C18.6204 23.631 18.4594 24.0853 18.4095 24.5581L18.2262 26.2254Z"
                  fill="#5375FD"
                />
              </svg>
            </button>

            <div
              class="params-box"
              style="left: unset; right: 0"
              :style="{ display: isContextMenuShown ? 'block' : 'none' }"
            >
              <div class="group">
                <button class="b-action">
                  <div class="card-action">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.02539 23.9749H23.9754"
                        stroke="#5375FD"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.2462 7.15927L19.7324 12.6455M14.2462 7.15927L17.3806 4.0249L22.8668 9.51115L19.7324 12.6455L14.2462 7.15927ZM14.2462 7.15927L8.03177 13.3737C7.82391 13.5815 7.70709 13.8634 7.70703 14.1573V19.1847H12.7344C13.0284 19.1846 13.3102 19.0678 13.518 18.8599L19.7324 12.6455L14.2462 7.15927Z"
                        stroke="#5375FD"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <span>
                    <nuxt-link
                      :to="{ name: 'my-resume-id', params: { id: item.id } }"
                      class="title"
                    >
                      Редактировать
                    </nuxt-link>
                  </span>
                </button>
                <button class="b-action" @click="onDelete(item.id)">
                  <div class="card-action">
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.4216 2.32397C13.2394 2.32392 14.0263 2.63682 14.6207 3.1985C15.2152 3.76017 15.5722 4.52803 15.6185 5.34455L15.6234 5.52583H20.7956C20.9828 5.52588 21.163 5.597 21.2998 5.72481C21.4366 5.85261 21.5198 6.02758 21.5326 6.21435C21.5453 6.40113 21.4867 6.58578 21.3686 6.731C21.2504 6.87623 21.0816 6.97119 20.8961 6.99671L20.7956 7.00361H20.0114L18.7504 19.8307C18.6872 20.4702 18.3988 21.0664 17.9366 21.5129C17.4744 21.9594 16.8686 22.227 16.2273 22.2681L16.0539 22.274H8.78918C8.14631 22.274 7.52439 22.0453 7.03457 21.629C6.54475 21.2126 6.21895 20.6356 6.11539 20.0012L6.09273 19.8297L4.83071 7.00361H4.04748C3.86893 7.0036 3.69642 6.93893 3.56185 6.82158C3.42729 6.70422 3.33977 6.5421 3.31549 6.36521L3.30859 6.26472C3.3086 6.08616 3.37326 5.91365 3.49062 5.77909C3.60798 5.64452 3.7701 5.55701 3.94699 5.53272L4.04748 5.52583H9.21971C9.21971 4.67664 9.55704 3.86224 10.1575 3.26178C10.758 2.66131 11.5724 2.32397 12.4216 2.32397ZM18.5268 7.00361H6.31538L7.56361 19.6849C7.59125 19.9679 7.71594 20.2325 7.91653 20.434C8.11711 20.6355 8.38123 20.7614 8.66406 20.7903L8.78918 20.7962H16.0539C16.645 20.7962 17.1465 20.3775 17.2608 19.809L17.2805 19.6849L18.5258 7.00361H18.5268ZM14.1456 9.71286C14.3242 9.71287 14.4967 9.77753 14.6313 9.89489C14.7658 10.0123 14.8533 10.1744 14.8776 10.3513L14.8845 10.4518V17.3481C14.8845 17.5353 14.8133 17.7155 14.6855 17.8523C14.5577 17.9891 14.3828 18.0722 14.196 18.085C14.0092 18.0978 13.8246 18.0391 13.6793 17.921C13.5341 17.8029 13.4392 17.634 13.4136 17.4485L13.4067 17.3481V10.4518C13.4067 10.2558 13.4846 10.0678 13.6232 9.92928C13.7617 9.79071 13.9497 9.71286 14.1456 9.71286ZM10.6975 9.71286C10.876 9.71287 11.0485 9.77753 11.1831 9.89489C11.3177 10.0123 11.4052 10.1744 11.4295 10.3513L11.4364 10.4518V17.3481C11.4363 17.5353 11.3652 17.7155 11.2374 17.8523C11.1096 17.9891 10.9346 18.0722 10.7478 18.085C10.5611 18.0978 10.3764 18.0391 10.2312 17.921C10.086 17.8029 9.99101 17.634 9.96549 17.4485L9.95859 17.3481V10.4518C9.95859 10.2558 10.0364 10.0678 10.175 9.92928C10.3136 9.79071 10.5015 9.71286 10.6975 9.71286ZM12.4216 3.80175C11.9889 3.80177 11.572 3.96448 11.2537 4.25758C10.9354 4.55068 10.739 4.95274 10.7034 5.38396L10.6975 5.52583H14.1456C14.1456 5.06857 13.964 4.63005 13.6407 4.30672C13.3173 3.9834 12.8788 3.80175 12.4216 3.80175Z"
                        fill="#5375FD"
                      />
                    </svg>
                  </div>
                  <span>Удалить </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
import Swal from "sweetalert2";
import { toast } from "vue3-toastify";
import { useResumeStore } from "~/store/resume";

const { $moment } = useNuxtApp();
const props = defineProps(["item", "id"]);
const item = computed(() => props.item);

const resumeStore = useResumeStore();
const { updateResume, getMyResumes } = resumeStore;

const hhProviderConnected = computed(() => {
  if (resumeStore.providers.hh) {
    return true;
  }
  return false;
});
const superjobProviderConnected = computed(() => {
  if (resumeStore.providers.superjob) {
    return true;
  }
  return false;
});
const hhProviderEnabled = computed(() => {
  if (item.value && item.value.providers) {
    return !!item.value.providers.find((prov) => prov.name == "hh");
  }
  return false;
});

const superjobProviderEnabled = computed(() => {
  if (item.value && item.value.providers) {
    return !!item.value.providers.find((prov) => prov.name == "superjob");
  }
  return false;
});

const canHHBeEnabled = computed(() => {
  if (item.value) {
    return resumeStore.providers.hh;
  }
  return false;
});
const pushStatus = ref(item.value?.push_notification ?? false);
const emailStatus = ref(item.value?.email_notification ?? false);
watch(
  () => item.value?.push_notification,
  (newValue) => {
    pushStatus.value = newValue;
  },
);
watch(
  () => item.value?.email_notification,
  (newValue) => {
    emailStatus.value = newValue;
  },
);
const onEmailToggle = async (e) => {
  e.preventDefault();
  const newValue = !emailStatus.value;
  const resData = await updateResume(item.value.id, {
    form_data: "NOTIFICATION_DATA",
    email_notification: newValue,
  });
  if (resData.status !== "success") {
    toast.info(resData.message);
    return;
  }
  emailStatus.value = newValue;
};
const onPushToggle = async (e) => {
  e.preventDefault();
  const newValue = !pushStatus.value;
  const resData = await updateResume(item.value.id, {
    form_data: "NOTIFICATION_DATA",
    push_notification: newValue,
  });
  if (resData.status !== "success") {
    toast.info(resData.message);
    return;
  }
  pushStatus.value = newValue;
};

const canSuperjobBeEnabled = computed(() => {
  if (item.value) {
    return resumeStore.providers.superjob;
  }
  return false;
});

const salaryAmount = computed(() => {
  if (props.item.salary) {
    return props.item.salary;
  }
  return 0;
});
const currency = computed(() => {
  if (props.item.salary) {
    const options = useCurrencyOptions();
    const found = options.find(
      (item) => item.value === props.item.salary_currency,
    );
    if (found) return found.symbol;
    return props.item.salary.currency;
  }
  return "RUB";
});

const cityAddress = computed(() => {
  const itemData = item.value;
  if (itemData.hasOwnProperty("city")) {
    return itemData.city.name;
  }
  return "no city";
});

const isContextMenuShown = ref(false);

const toggleContextMenu = () => {
  isContextMenuShown.value = !isContextMenuShown.value;
};

const closeContextMenu = (e) => {
  e.preventDefault();
  isContextMenuShown.value = false;
};
const employerLogo = computed(() => {
  if (item && item.logo) {
    return item.logo;
  } else return new URL("~/assets/img/logos/hh.svg", import.meta.url);
});

const published_date = computed(() =>
  $moment(item.value?.published_date).locale("ru"),
);

const createdDate = computed(() => {
  if (!item.value) return "";
  let date = $moment(item.value.published_date);

  date = "в " + date.format("D") + " " + date.format("MMMM");

  return date;
});

const { deleteResume } = resumeStore;
const onDelete = async (id) => {
  const resData = await deleteResume(id);

  if (resData.status !== "success") {
    Swal.fire({
      title: "Ошибка!",
      text: resData.message,
      icon: "error",
      confirmButtonText: "ОК",
    });
    return;
  }
  toast.info("Успешно удалено!", { autoClose: 3000 });
  await getMyResumes({ status: "active" });
};

const resetObject = computed(() => {
  return {
    superjob: superjobProviderEnabled.value,
    hh: hhProviderEnabled.value,
  };
});

const selectedProviders = ref(resetObject.value);

const isSuperjobLoading = ref(false);
const isHHLoading = ref(false);
const toggle = async (provider) => {
  if (provider === "hh") {
    isHHLoading.value = true;
  }
  if (provider === "superjob") {
    isSuperjobLoading.value = true;
  }
  selectedProviders.value[provider] = !selectedProviders.value[provider];
  const providerParams = [];

  if (selectedProviders.value.hh) {
    if (!hhProviderConnected.value) {
      toast.info("HH еще не подключен! ", { autoClose: 3000 });
      selectedProviders.value[provider] = !selectedProviders.value[provider];
      isSuperjobLoading.value = false;
      isHHLoading.value = false;

      return;
    }
    providerParams.push("hh");
  }

  if (selectedProviders.value.superjob) {
    if (!superjobProviderConnected.value) {
      toast.info("Superjob еще не подключен! ", { autoClose: 3000 });
      selectedProviders.value[provider] = !selectedProviders.value[provider];
      isSuperjobLoading.value = false;
      isHHLoading.value = false;
      return;
    }
    providerParams.push("superjob");
  }

  const data = {
    providers: providerParams,
  };
  data.form_data = "PROVIDERS_DATA";
  const resData = await updateResume(item.value.id, data);
  if (resData.status !== "success") {
    selectedProviders.value[provider] = !selectedProviders.value[provider];
    toast.info(resData.message, { autoClose: 3000 });
    isSuperjobLoading.value = false;
    isHHLoading.value = false;
    return;
  }

  await getMyResumes();
  isSuperjobLoading.value = false;
  isHHLoading.value = false;
};
const openProviderAuthUrl = (url) => {
  window.open(url);
};
</script>

<style scoped>
.push_and_context_wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

@media (max-width: 768px) {
  .option-group {
    justify-content: space-between;
    width: 100%;
    flex-direction: row;
  }

  .selector-group .option + .option {
    margin-top: unset;
  }
}

.theme-checker.disabled * {
  -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
  filter: grayscale(100%);
}

@keyframes placeHolderShimmer {
  0% {
    background-position: 0px 0;
  }
  100% {
    background-position: 100em 0;
  }
}

.animated {
  border-radius: 43px;
  padding: 3px;
  z-index: 9999;
  animation-duration: 20s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: #fff;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  height: calc(100% + 2px);
  width: calc(100% + 2px);
  position: absolute;
  //padding-top: 50px;
  -webkit-backface-visibility: hidden;
  left: -1px;
  right: 0;
  top: -1px;
  bottom: 0;
}
</style>
