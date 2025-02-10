<script setup>
import { useNuxtApp } from "#app";
import { useScamStore } from "~/store/scam";
import Swal from "sweetalert2";

const props = defineProps({
  phone: {
    default: {},
    required: false,
  },
  comments: {
    default: [],
    required: false,
  },
  categories: {
    default: [],
    required: false,
  },
});

const showForm = ref(false);
const { $format_phone } = useNuxtApp();
const phone = computed(() => props.phone.number);
const phone_id = computed(() => props.phone.id);
const address = computed(() => props.phone.address ?? "нет адреса");
const operator = computed(() => props.phone.operator);
const typePhone = computed(() => props.phone.type_phone);
const link_map = computed(
  () => `https://www.google.ru/maps/search/` + props.phone.address,
);
const comments = computed(() => props.phone.comments ?? []);
const categories = computed(() => props.phone.categories);
const frequencyValue = computed(() => props.phone.frequencyCall.cost);
const frequencyTitle = computed(() => props.phone.frequencyCall.title);
const ratingValue = computed(() => props.phone.rating.cost);
const ratingTitle = computed(() => props.phone.rating.title);
const isFavoured = computed(() => props.phone?.is_favored);
const scamStore = useScamStore();
const categoryOptions = computed(() =>
  scamStore.categories.map((item) => {
    return { name: item.name, value: item.id };
  }),
);
const format_phone = computed(() => $format_phone(phone.value));
const rateOptions = computed(() =>
  scamStore.rate_options.map((item) => {
    return { name: item.title, value: item.key };
  }),
);
const frequencyOptions = computed(() =>
  scamStore.frequency_options.map((item) => {
    return { name: item.title, value: item.key };
  }),
);

const { addFavorite, removeFavorite, saveComment } = useScamStore();
const toggleFavorite = async (is_favor) => {
  if (!is_favor) {
    const resData = await addFavorite({ phone_id: phone_id.value });
    if (resData.status === "success") {
      await Swal.fire({
        text: "Вы успешно подписались!",
        icon: "success",
      });
    }
  } else {
    const resData = await removeFavorite({ phone_id: phone_id.value });
    if (resData.status === "success") {
      await Swal.fire({
        text: "Вы успешно отписались!",
        icon: "success",
      });
    }
  }
};

const form = ref({
  category_ids: [],
  frequency_call: null,
  rating: null,
  comment: null,
});

const clearForm = () => {
  form.value.category_ids = [];
  form.value.frequency_call = null;
  form.value.rating = null;
  form.value.comment = null;
};

const onSubmit = async () => {
  const data = form.value;
  data.category_ids = data.category_ids.map((item) => parseInt(item));
  data.phone_id = phone_id.value;
  const resData = await saveComment(data);
  if (resData.status === "success") {
    await Swal.fire({
      text: "Ваш коммент успешно добавлено!",
      icon: "success",
    });
  }
};
</script>

<template>
  <div class="favorites-card">
    <div class="favorites-card-head align-start">
      <div class="company">
        <div class="company-logo">
          <img
            :src="'/img/operators/' + operator?.toLowerCase() + '.svg'"
            :alt="operator?.toLowerCase()"
          />
        </div>
        <div class="company-name">
          <a :href="`tel:${phone}`">{{ format_phone }}</a>
          <span class="count">{{ operator || "Неизвестный оператор" }}</span>
        </div>

        <div class="company-info">
          <p>
            Тип телефона: <strong>{{ typePhone || "Не указан" }}</strong>
          </p>
          <p>
            Адрес: <strong>{{ address || "Не указан" }}</strong>
            <a
              v-if="address"
              class="show-on-map"
              :href="link_map"
              target="_blank"
              >Показать на карте</a
            >
          </p>
        </div>
      </div>

      <div class="subscribe-min-box">
        <p>Подписаться на изменения по данному номеру</p>
        <button
          class="group-action btn button-md"
          @click="toggleFavorite(isFavoured)"
        >
          {{ isFavoured ? "Отписаться" : "Подписаться" }}
        </button>
      </div>
    </div>

    <div class="favorites-card-body favorites-card-body--brd">
      <div class="call-cats-row">
        <span>Категория звонка:</span>
        <div class="call-cats" v-if="categories && categories.length">
          <div v-for="category in categories" :key="category" class="call-cat">
            {{ category }}
          </div>
        </div>
        <strong v-else>Нет информации</strong>
      </div>

      <div class="favorites-card-body__text">
        <p v-if="frequencyTitle">
          С телефона были
          <span
            :class="[
              'w-badge',
              frequencyValue < 0
                ? 'red'
                : frequencyValue > 0
                  ? 'green'
                  : 'gray',
            ]"
          >
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.7656 .875C13.5414 1.18325 15.7344 3.37325 16.0456 6.149"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M10.7656 3.53223C12.0939 3.79023 13.1319 4.82898 13.3906 6.15723"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.27364 8.35429C11.2654 11.3453 11.9441 7.88504 13.8489 9.78861C15.6854 11.6246 16.7417 11.9924 14.4141 14.3185C14.1227 14.5528 12.2709 17.3707 5.76335 10.8647C-.745055 4.358 2.07117 2.50433 2.30546 2.21296C4.63782 -.119616 5.00012 .942037 6.83654 2.778C8.7406 4.68237 5.2819 5.36331 8.27364 8.35429Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>

            {{ frequencyTitle }}
          </span>
        </p>
        <p v-if="ratingTitle">
          Оценки номера
          <span
            :class="[
              'w-badge',
              ratingValue < 0 ? 'red' : ratingValue > 0 ? 'green' : 'gray',
            ]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.748 3L9.92798 2.295C9.80903 2.26519 9.68686 2.25007 9.56423 2.25H6.55073C6.27211 2.25001 5.999 2.32762 5.76201 2.47413C5.52502 2.62064 5.33352 2.83026 5.20898 3.0795L2.58398 8.3295C2.4697 8.55819 2.41577 8.81229 2.42731 9.06768C2.43884 9.32307 2.51546 9.57127 2.64989 9.78873C2.78431 10.0062 2.97208 10.1857 3.19538 10.3102C3.41867 10.4346 3.67008 10.5 3.92573 10.5H7.49873H8.99873M12.748 3L12.7487 9.75L10.2047 13.566C9.90698 14.0122 9.74873 14.5358 9.74873 15.072C9.74873 15.4463 9.44498 15.75 9.06998 15.75H8.99798C8.60016 15.75 8.21862 15.592 7.93732 15.3107C7.65602 15.0294 7.49798 14.6478 7.49798 14.25V10.5M12.748 3H14.2487C14.6466 3 15.0281 3.15804 15.3094 3.43934C15.5907 3.72064 15.7487 4.10218 15.7487 4.5V9C15.7487 9.39782 15.5907 9.77936 15.3094 10.0607C15.0281 10.342 14.6466 10.5 14.2487 10.5H12.3737"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{ ratingTitle }}
          </span>
          <span v-if="ratingValue < 0"
            >Рекомендуем не брать трубку и не перезванивать.</span
          >
        </p>

        <div
          v-if="comments && comments.length"
          class="favorites-card-body__text-list-container"
        >
          <strong
            >О телефонном номере найдено {{ comments.length }} отзывов в
            сети.</strong
          >
          <p>
            Наш умный алгоритм их проанализировал и отобрал ключевые комментарии
          </p>
          <ul class="favorites-card-body__text-list">
            <li v-for="comment in comments" :key="comment">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.0714 19.0699C16.0152 22.1263 11.4898 22.7867 7.78642 21.074C7.23971 20.8539 6.79148 20.676 6.36537 20.676C5.17849 20.683 3.70117 21.8339 2.93336 21.067C2.16555 20.2991 3.31726 18.8206 3.31726 17.6266C3.31726 17.2004 3.14642 16.7602 2.92632 16.2124C1.21283 12.5096 1.87411 7.98269 4.93026 4.92721C8.8316 1.02443 15.17 1.02443 19.0714 4.9262C22.9797 8.83501 22.9727 15.1681 19.0714 19.0699Z"
                  stroke="#FD595E"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M15.9408 12.4131H15.9498"
                  stroke="#FD595E"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M11.9291 12.4131H11.9381"
                  stroke="#FD595E"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M7.92128 12.4131H7.93028"
                  stroke="#FD595E"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <span>{{ comment }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="favorites-card-footer">
      <div class="add-comment-header">
        <strong>Добавить информацию</strong>
        <button class="button-md" @click="showForm = !showForm">
          {{ showForm ? "Скрыть форму" : "Добавить комментарий" }}
        </button>
      </div>

      <form
        v-if="showForm"
        class="favorites-card-footer__add"
        @submit.prevent="onSubmit"
      >
        <div class="input-row">
          <label for="industry">Категория звонка</label>
          <div class="input-wrapper">
            <MultiSelectWithSearch
              label="Выберите"
              v-model="form.category_ids"
              :options="categoryOptions"
            />
          </div>
        </div>
        <div class="input-row">
          <label for="industry">Частота звонков</label>
          <div class="input-wrapper">
            <CustomSelect
              label="Выберите"
              v-model.number="form.frequency_call"
              :options="frequencyOptions"
            />
          </div>
        </div>
        <div class="input-row">
          <label for="industry">Ваша оценка номера</label>
          <div class="input-wrapper">
            <CustomSelect
              label="Выберите"
              v-model.number="form.rating"
              :options="rateOptions"
            />
          </div>
        </div>

        <div class="comment-section">
          <strong>Добавить комментарий</strong>
          <p>Поделитесь своим опытом взаимодействия с этим номером</p>
          <div class="input-wrap">
            <textarea name="comment" v-model="form.comment"></textarea>
          </div>
        </div>

        <div class="favorites-card-footer__add-actions">
          <button class="button-md" type="button" @click="clearForm">
            Очистить
          </button>
          <button class="button-accent" type="submit">Сохранить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
