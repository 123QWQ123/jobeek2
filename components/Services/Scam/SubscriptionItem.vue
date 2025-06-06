<script setup>
import { useNuxtApp } from "#app";
import { useScamStore } from "~/store/scam";
import Swal from "sweetalert2";

const props = defineProps({
  phone: {
    default: [],
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

const { $format_phone } = useNuxtApp();
const phone = computed(() => props.phone);
const phone_id = computed(() => props.phone?.id);
const phone_number = computed(() => props.phone?.number);
const comment = computed(() => props.phone?.comments);
const isFavoured = computed(() => props.phone?.is_favorite);

const operatorLogo = computed(() => {
  if (props.phone?.operator) {
    return `/img/operators/${props.phone?.operator.toLowerCase()}.svg`;
  } else return "/img/operators/undefined.svg";
});
const { addFavorite, removeFavorite } = useScamStore();
const toggleFavorite = async (is_favor) => {
  if (!is_favor) {
    const resData = await addFavorite({ phone_id: phone_id.value });
    if (resData.status === "success") {
      Swal.fire({
        text: "Вы успешно подписались!",
        icon: "success",
      });
    }
  } else {
    const resData = await removeFavorite({ phone_id: phone_id.value });
    if (resData.status === "success") {
      Swal.fire({
        text: "Вы успешно отписались!",
        icon: "success",
      });
    }
  }
};
</script>

<template>
  <div class="favorites-card favorites-card--min">
    <div class="favorites-card-head">
      <div class="company">
        <div class="company-logo">
          <img :src="operatorLogo" alt="#" />
        </div>
        <div class="company-name">
          <nuxt-link
            :to="{
              name: 'services-search-phone',
              query: { phone: phone_number },
            }"
          >
            {{ $format_phone(phone_number) }}
          </nuxt-link>
          <span class="count">{{ phone?.company }}</span>
        </div>
      </div>
    </div>
    <div v-if="comment" class="favorites-card-body">
      <p>
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
          />
          <path
            d="M15.9408 12.4131H15.9498"
            stroke="#FD595E"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11.9291 12.4131H11.9381"
            stroke="#FD595E"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.92128 12.4131H7.93028"
            stroke="#FD595E"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        {{ comment }}
      </p>

      <button
        class="group-action btn button-md"
        :class="{ 'btn--green': !isFavoured, 'btn--light': isFavoured }"
        @click="toggleFavorite(true)"
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_727_6122)">
            <circle
              cx="9.4987"
              cy="9.49992"
              r="7.91667"
              stroke="white"
              stroke-width="1.5"
            />
            <path
              d="M6.73047 9.89575L8.3138 11.4791L12.2721 7.52075"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_727_6122">
              <rect width="19" height="19" fill="white" />
            </clipPath>
          </defs>
        </svg>

        Вы подписаны
        <!--        {{isFavoured ? 'Отписаться' : '' }}-->
      </button>
    </div>
  </div>
</template>

<style scoped></style>
