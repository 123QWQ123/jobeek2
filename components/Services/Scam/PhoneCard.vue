<script setup>

import {useNuxtApp} from "#app";

const props = defineProps({
  phone: {
    default: {},
    required: false
  },
  comments: {
    default: [],
    required: false
  },
  categories: {
    default: [],
    required: false
  },
});

const {$format_phone} = useNuxtApp();
const phone = computed(() => props.phone.number);
const address = computed(() => props.phone.address ?? "нет адреса");
const operator = computed(() => props.phone.operator);
const typePhone = computed(() => props.phone.type_phone);
const link_map = computed(() => `https://www.google.ru/maps/search/` + props.phone.address );
const comments = computed(() => props.phone.comments ?? []);
const categories = computed(() => props.phone.categories);
const frequencyValue = computed(() => props.phone.frequency_call.cost);
const frequencyTitle = computed(() => props.phone.frequency_call.title);
const ratingValue = computed(() => props.phone.rating.cost);
const ratingTitle = computed(() => props.phone.rating.title);
</script>

<template>
  <div class="favorites-card">
    <div class="favorites-card-head align-start">
      <div class="company">
        <div class="company-logo">
          <img src="~/assets/img/logos/megafon.svg" alt="#">
        </div>
        <div class="company-name">
          <a href="#">{{$format_phone(phone)}}</a><span class="count">{{ operator }}</span>
        </div>

        <div class="company-info">
          <p>Тип телефона: <strong>{{ typePhone }}</strong></p>
          <p>
            Адрес: <strong>{{address}}</strong>
            <a class="show-on-map" :href="link_map">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.428 4.17282L15.45 2.22095L8.45156 4.19232L1.94339 2.3461C1.80393 2.30654 1.6572 2.29985 1.51472 2.32656C1.37224 2.35328 1.23789 2.41268 1.12224 2.50008C1.00659 2.58748 0.91279 2.70052 0.8482 2.83029C0.783611 2.96007 0.749997 3.10306 0.75 3.24803V19.2136C0.750709 19.4583 0.830844 19.6961 0.97835 19.8913C1.12586 20.0865 1.33276 20.2285 1.56792 20.2959L8.44997 22.2483L15.4515 20.2761L22.06 22.1246C22.1994 22.1636 22.3458 22.1698 22.488 22.1427C22.6301 22.1156 22.764 22.056 22.8793 21.9686C22.9945 21.8811 23.0879 21.7681 23.1523 21.6385C23.2166 21.5089 23.25 21.3662 23.25 21.2215V5.25624C23.2494 5.01085 23.1688 4.77235 23.0205 4.57685C22.8722 4.38136 22.6642 4.23952 22.428 4.17282ZM7.64062 20.4593L2.25 18.93V3.99226L7.64062 5.52151V20.4593ZM14.7007 18.9289L9.14062 20.4951V5.55657L14.7007 3.99038V18.9289ZM21.75 20.4801L16.2007 18.928V3.98846L21.75 5.54054V20.4801Z" fill="#5375FD"></path>
              </svg>
              Показать на карте
            </a>
          </p>
        </div>
      </div>

      <div class="subscribe-min-box">
        <p>Подписаться на изменения по данному номеру</p>
        <button class="group-action btn button-md">
          Подписаться
        </button>
      </div>
    </div>
    <div class="favorites-card-body favorites-card-body--brd">
      <div class="call-cats-row">
        <span>Категория звонка:</span>

        <div class="call-cats" v-if="categories.length > 0">
          <div class="call-cat" v-for="category in categories">{{ category }}</div>
        </div>

        <strong v-else>Нет информации</strong>
      </div>

      <div class="favorites-card-body__text" v-if="comments.length > 0">
        <p>
          С телефона были
          <span :class="{'w-badge': true, 'red': frequencyValue < 0, 'gray': frequencyValue === 0, 'green' : frequencyValue > 0}" >
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.7656 0.875C13.5414 1.18325 15.7344 3.37325 16.0456 6.149"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path
                            d="M10.7656 3.53223C12.0939 3.79023 13.1319 4.82898 13.3906 6.15723"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8.27364 8.35429C11.2654 11.3453 11.9441 7.88504 13.8489 9.78861C15.6854 11.6246 16.7417 11.9924 14.4141 14.3185C14.1227 14.5528 12.2709 17.3707 5.76335 10.8647C-0.745055 4.358 2.07117 2.50433 2.30546 2.21296C4.63782 -0.119616 5.00012 0.942037 6.83654 2.778C8.7406 4.68237 5.2819 5.36331 8.27364 8.35429Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round" />
                      </svg>
            {{frequencyTitle}}
          </span>
        </p>

        <p>
          Оценки номера
          <span :class="{'w-badge': true, 'red': ratingValue < 0, 'gray': ratingValue === 0, 'green' : ratingValue > 0}">
                      <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12.748 3L9.92798 2.295C9.80903 2.26519 9.68686 2.25007 9.56423 2.25H6.55073C6.27211 2.25001 5.999 2.32762 5.76201 2.47413C5.52502 2.62064 5.33352 2.83026 5.20898 3.0795L2.58398 8.3295C2.4697 8.55819 2.41577 8.81229 2.42731 9.06768C2.43884 9.32307 2.51546 9.57127 2.64989 9.78873C2.78431 10.0062 2.97208 10.1857 3.19538 10.3102C3.41867 10.4346 3.67008 10.5 3.92573 10.5H7.49873H8.99873M12.748 3L12.7487 9.75L10.2047 13.566C9.90698 14.0122 9.74873 14.5358 9.74873 15.072C9.74873 15.4463 9.44498 15.75 9.06998 15.75H8.99798C8.60016 15.75 8.21862 15.592 7.93732 15.3107C7.65602 15.0294 7.49798 14.6478 7.49798 14.25V10.5M12.748 3H14.2487C14.6466 3 15.0281 3.15804 15.3094 3.43934C15.5907 3.72064 15.7487 4.10218 15.7487 4.5V9C15.7487 9.39782 15.5907 9.77936 15.3094 10.0607C15.0281 10.342 14.6466 10.5 14.2487 10.5H12.3737"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round" />
                      </svg>
            {{ratingTitle}}
          </span
          >
          Рекомендуем не брать трубку и не перезванивать.
        </p>

        <div class="favorites-card-body__text-list-container">
          <strong
          >О телефонном номере найдено {{ comments.length }} отзыва в сети.</strong
          >
          <p>
            Наш умный алгоритм их проанализировал и отобрал ключевые
            комментарии
          </p>

          <ul class="favorites-card-body__text-list">
            <li v-for="comment in comments">
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
              <span>{{comment}}</span>
            </li>
          </ul>
        </div>
      </div>

<!--      <div v-else class="favorites-card-body__text">-->
<!--        <div class="favorites-card-body__text-list-container">-->
<!--          <strong-->
<!--          >О телефонном номере найдено 0 отзывов в сети.</strong-->
<!--          >-->
<!--        </div>-->
<!--      </div>-->
    </div>
    <div class="favorites-card-footer">
      <strong>Добавить информацию и отзыв</strong>

      <form class="favorites-card-footer__add">
        <div class="input-row">
          <label for="industry">Категория звонка</label>
          <div class="input-wrapper">
            <CustomSelect :options="[]"/>
          </div>
        </div>
        <div class="input-row">
          <label for="industry">Частота звонков</label>
          <div class="input-wrapper">
            <CustomSelect :options="[]"/>
          </div>
        </div>
        <div class="input-row">
          <label for="industry">Ваша оценка номера</label>
          <div class="input-wrapper">
            <CustomSelect :options="[]"/>
          </div>
        </div>
        <br>
        <br>
        <strong>Добавить комментарий</strong>
        <p>Поделитесь своим опытом взаимодействия с этим номером</p>

        <div class="input-wrap">
          <textarea class="form-control" name="comment"> </textarea>
        </div>

        <div class="favorites-card-footer__add-actions justify-content-end">
          <button class="button-accent" type="submit">
            Сохранить
          </button>
        </div>
      </form>
    </div>


<!--    <div class="favorites-card-footer">-->
<!--      <div class="favorites-card-footer-row">-->
<!--        <div class="group">-->
<!--          <button class="group-action btn button-md">-->
<!--            Добавить комментарий-->
<!--          </button>-->
<!--          <button class="group-action btn button-md">-->
<!--            Похожие номера-->
<!--          </button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>


<!--  <div class="favorites-card">-->
<!--    <div class="favorites-card-head align-start">-->
<!--      <div class="company">-->
<!--        <div class="company-logo">-->
<!--          <img-->
<!--              src="~/assets/img/logos/megafon.svg"-->
<!--              alt="#" />-->
<!--        </div>-->
<!--        <div class="company-name">-->
<!--          <a href="#"> +7 992 932 32 12</a-->
<!--          ><span class="count">Мегафон</span>-->
<!--        </div>-->

<!--        <div class="company-info">-->
<!--          <p>Тип телефона: <strong>Мобильный</strong></p>-->
<!--          <p>-->
<!--            Адрес: <strong>Саратов, улица Зарубина, 167.</strong>-->
<!--            <button class="show-on-map">-->
<!--              <svg-->
<!--                  width="24"-->
<!--                  height="24"-->
<!--                  viewBox="0 0 24 24"-->
<!--                  fill="none"-->
<!--                  xmlns="http://www.w3.org/2000/svg">-->
<!--                <path-->
<!--                    d="M22.428 4.17282L15.45 2.22095L8.45156 4.19232L1.94339 2.3461C1.80393 2.30654 1.6572 2.29985 1.51472 2.32656C1.37224 2.35328 1.23789 2.41268 1.12224 2.50008C1.00659 2.58748 0.91279 2.70052 0.8482 2.83029C0.783611 2.96007 0.749997 3.10306 0.75 3.24803V19.2136C0.750709 19.4583 0.830844 19.6961 0.97835 19.8913C1.12586 20.0865 1.33276 20.2285 1.56792 20.2959L8.44997 22.2483L15.4515 20.2761L22.06 22.1246C22.1994 22.1636 22.3458 22.1698 22.488 22.1427C22.6301 22.1156 22.764 22.056 22.8793 21.9686C22.9945 21.8811 23.0879 21.7681 23.1523 21.6385C23.2166 21.5089 23.25 21.3662 23.25 21.2215V5.25624C23.2494 5.01085 23.1688 4.77235 23.0205 4.57685C22.8722 4.38136 22.6642 4.23952 22.428 4.17282ZM7.64062 20.4593L2.25 18.93V3.99226L7.64062 5.52151V20.4593ZM14.7007 18.9289L9.14062 20.4951V5.55657L14.7007 3.99038V18.9289ZM21.75 20.4801L16.2007 18.928V3.98846L21.75 5.54054V20.4801Z"-->
<!--                    fill="#5375FD" />-->
<!--              </svg>-->
<!--              Показать на карте-->
<!--            </button>-->
<!--          </p>-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="subscribe-min-box">-->
<!--        <p>Подписаться на изменения по данному номеру</p>-->
<!--        <button class="group-action btn button-md">-->
<!--          Подписаться-->
<!--        </button>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="favorites-card-body favorites-card-body&#45;&#45;brd">-->
<!--      <div class="call-cats-row">-->
<!--        <span>Категория звонка:</span>-->

<!--        <strong>Нет информации</strong>-->
<!--      </div>-->

<!--      <div class="favorites-card-body__text">-->
<!--        <div class="favorites-card-body__text-list-container">-->
<!--          <strong-->
<!--          >О телефонном номере найдено 0 отзывов в сети.</strong-->
<!--          >-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="favorites-card-footer">-->
<!--      <div class="favorites-card-footer-row">-->
<!--        <div class="group">-->
<!--          <button class="group-action btn button-md">-->
<!--            Добавить информацию-->
<!--          </button>-->
<!--          <button class="group-action btn button-md">-->
<!--            Добавить комментарий-->
<!--          </button>-->
<!--          <button class="group-action btn button-md">-->
<!--            Похожие номера-->
<!--          </button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<style scoped>

</style>