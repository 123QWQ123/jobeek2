<template>
  <li >
    <div class="resume-card">
      <div class="resume-card-body">
        <div class="resume-card-body-col">
          <div class="photo">
            <img class="w-100" :src="employerLogo" alt="#" />
          </div>
          <div class="resume-card-name">
            <nuxt-link :to="{name: 'create-vacancy', query: {vacancy_id: item.id}}" class="title">
              {{item.name}}
            </nuxt-link>
            <span class="location">{{ cityAddress }} </span
            >
            <span v-if="salary_from && salary_to">
              <span class="price">{{vueNumberFormat(salary_from, {})}}</span>
              -
              <span class="price" >{{vueNumberFormat(salary_to, {})}} {{currency}}</span>
            </span>
            <span v-else>
              <span class="price" v-if="salary_from">От {{vueNumberFormat(salary_from, {})}} {{currency}}</span>
              <span class="price" v-else-if="salary_to">От {{vueNumberFormat(salary_to, {})}} {{currency}}</span>
            </span>

          </div>
        </div>
        <div class="resume-card-body-col">
          <div class="date">в {{ published_date.format('D') }} {{ published_date.format('MMMM') }}</div>
          <!--          <div class="date">с {{ published_date.format('D') }} {{ published_date.format('MMMM') }} по 24 марта</div>-->
          <div class="resume-counts">
            <div class="count cursor-pointer" @click.prevent="toggleViews">
              <strong class="js-view-stat">{{totalViewCount}}</strong><span>Показы</span>
            </div>
<!--            <div class="count">-->
<!--              <strong>{{item.new_views}}</strong><span>Просмотров</span>-->
<!--            </div>-->
            <!--            <div class="count">-->
            <!--              <strong>{{item.unread_responses}}</strong><span>Откликов</span>-->
            <!--            </div>-->
          </div>
        </div>

      </div>
      <div class="resume-card-stats active" v-if="isViewsShown">
        <div class="resume-card-stats-head">
          <div class="name">Показы</div>
          <button class="close close-stats" @click.preven="toggleViews">Скрыть</button>
        </div>
        <div class="resume-card-stats-body" >
          <div class="stat"> <strong>{{ totalViewCount }}</strong><a href="#">Все  </a></div>
          <div class="stat"> <strong>{{ hhTotalCount }}</strong><a href="#"><img src="~/assets/img/svg/hh.svg" alt="#">Hh.ru </a></div>
          <div class="stat"> <strong>{{superjobTotalCount}}</strong><a href="#"><img src="~/assets/img/svg/sb.svg" alt="#">Superjob.ru   </a></div>
        </div>
      </div>

      <div class="resume-card-options">
        <span class="status">Обновлено в {{ moment(item.updated_at).format('HH:mm') }}</span>
        <div class="option-group selector-group">
          <div class="option">
            <div class="custom-check-wrap">
              <div class="theme-checker theme-checker--blue">
                <input type="checkbox" id="sj" :checked="item.can_publish.hh" />
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
            <div class="custom-check-wrap">
              <div class="theme-checker theme-checker--blue">
                <input type="checkbox" id="sj" :checked="item.can_publish.superjob" />
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
        <div class="d-inline-flex ms-0 ms-lg-auto">
          <div class="d-inline-flex flex-column flex-lg-row mt-4 mt-lg-0 mt-md-0" >
            <div class="check-block mb-2 mb-lg-0 mb-md-0">
              <div class="checkbox">
                <input type="checkbox" id="enable-push" />
                <div class="checkbox-mask">
                  <img src="~/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <label for="enable-push"
              >Подключить Push-уведомления
              </label>
            </div>
            <div class="check-block">
              <div class="checkbox">
                <input
                    type="checkbox"
                    id="enable-email-notification"
                />
                <div class="checkbox-mask">
                  <img src="~/assets/img/svg/check.svg" alt="#" />
                </div>
              </div>
              <label for="enable-email-notification"
              >Подключить E-mail уведомления</label
              >
            </div>
          </div>
        </div>
        <div class="params-button-container ms-auto"  v-click-outside.once="closeContextMenu">
          <button class="resume-action params-button" @click="toggleContextMenu">
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

          <div class="params-box " style="left:unset;right:0" :style="{display: isContextMenuShown ? 'block' : 'none'}" >
            <div class="group">
              <button class="b-action"  @click="onCreateFromVacancy(item.id)">
                <div class="card-action">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
                    <path stroke="#5375FD" fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
                  </svg>
                </div>
                <span>
<!--                  <nuxt-link :to="{name: 'create-vacancy', query: {draft_id: item.id}}" class="title">-->
                      Создать копию
<!--                  </nuxt-link>-->
                </span>
              </button>
              <button class="b-action" @click="onArchive(item.id)">
                <div class="card-action" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
                    <path stroke="#5375FD" d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                  </svg>
                </div>
                <span>Архивировать </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
import moment from "moment";
import 'moment/locale/ru';
import {useVacancyStore} from "~/store/vacancy";
import Swal from "sweetalert2";
import {toast} from "vue3-toastify";

const props = defineProps(['item']);
const {item} = props;

const hhIncluded = computed(() => {
  if (props.item.providers.length){
    return !!props.item.providers.find((item) => {
      return item.name==='hh';
    });
  }
  return false;
});
const hhTotalCount = computed(() => {
  let total = 0;
  if (props.item.providers.length){
    total += props.item.providers.reduce((acc, item) => {
      return item.name==='hh' ? acc + item.views_count : acc;
    }, 0) ;
  }
  return total;
});
const superjobTotalCount = computed(() => {
  let total = 0;
  if (props.item.providers.length){
    total += props.item.providers.reduce((acc, item) => {
      return item.name==='superjob' ? acc + item.views_count : acc;
    }, 0) ;
  }
  return total;
});
const totalViewCount = computed(() => {
  return superjobTotalCount.value + hhTotalCount.value;
});
const salary_from = computed(() => {
  if (props.item.salary && props.item.salary.hasOwnProperty('from')){
    return props.item.salary.from;
  }
  return false;
});
const salary_to = computed(() => {
  if (props.item.salary && props.item.salary.hasOwnProperty('to')){
    return props.item.salary.to;
  }
  return false;
});
const currency = computed(() => {
  if (props.item.salary && props.item.salary.hasOwnProperty('currency')){
    const options = useCurrencyOptions();
    const found = options.find((item) => item.value === props.item.salary.currency);
    if (found) return found.symbol;
    return props.item.salary.currency;
  }
  return 'RUB';
});
const cityAddress = computed(() => {
  if (item.hasOwnProperty('cities')){
    if (item.cities.length === 1){
      return item.cities[0].name;
    }else{
      return item.cities.reduce((acc, item) => acc + item.name + ', ', "").replace(/,*\s$/, '');
    }
  }return "no city";
})

const isContextMenuShown = ref(false);
const isViewsShown = ref(false);
const toggleViews = () => {
  isViewsShown.value = !isViewsShown.value;
}

const toggleContextMenu = () => {
  isContextMenuShown.value = !isContextMenuShown.value;
}

const closeContextMenu = (e) => {
  e.preventDefault();
  isContextMenuShown.value = false;
};
const employerLogo = computed(() => {
  if (item && item.logo){
    return item.logo;
  }else {
    if (hhIncluded.value){
      return new URL("~/assets/img/logos/hh.svg", import.meta.url)
    } return new URL("~/assets/img/logos/superjob.svg", import.meta.url)
  }
});


const published_date = moment(item?.published_date).locale('ru');

const {getMyVacancies, getMyDrafts, archiveActiveVacancy, createDraftFromActiveVacancy} = useVacancyStore();

const onArchive = async(id) => {
  const resData = await archiveActiveVacancy(id, {providers: ['hh', 'superjob']});
  if(resData.status !== 'success'){
    Swal.fire({
      title: 'Ошибка!',
      text: resData.message,
      icon: "error",
      confirmButtonText: 'ОК'
    });
    return;
  }

  toast.info("Успешно архивировано!", {autoClose: 3000});
  await getMyVacancies({status: 'active'});

}

const onCreateFromVacancy = async(id) => {
  const resData = await createDraftFromActiveVacancy(id);
  console.log(resData);
  if(resData.status !== 'success'){
    Swal.fire({
      title: 'Ошибка!',
      text: resData.message,
      icon: "error",
      confirmButtonText: 'ОК'
    });
    return;
  }

  toast.info("Успешно создано!", {autoClose: 3000});

  navigateTo({name: 'my-vacancies', query: {status: 'draft'}});

}


</script>

<style scoped>

</style>