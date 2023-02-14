<template>
  <ul class="articles-grid">
    <li v-for="i in quantity">
      <NuxtLink class="article-card" :active-class="'advice'" :to="{name: 'advice-category-slug', params: {category: route.params.category, slug: i}}">
        <div class="article-card-photo"> <img src="~/assets/img/unsplash_jrh5lAq-mIs.jpg" alt="#"></div>
        <div class="article-card-body"> <span class="cat">Резюме</span><span
            class="title">Adipiscing volutpat porttitor urna ac sed vitae dolor, massa sem ac
                                      sed vitae dolor, massa sem dapibus.</span>
          <p class="descr">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu in gravida
            orci, ac sed vitae dolor, massa sem.</p>
          <div class="views a-count"> <img src="~/assets/img/svg/eye.svg" alt="#"><span>1 234</span></div>
        </div>
      </NuxtLink>
    </li>

    <paginate
        :page-count="20"
        :click-handler="onPageChange"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
    >
    </paginate>
  </ul>
</template>

<script setup>
import Paginate from "vuejs-paginate-next";
definePageMeta({
  layout: "advice",
});
const onPageChange = () => {

}
// const props = defineProps(['category']);

// console.log(props);

const route = useRoute();
console.log(route.params.category);
const quantity = ref(3);
</script>

<style scoped>

.router-link-exact-active{
  color: var(--bs-link-hover-color);
}
</style>