<template>
<!--      <PageLoader v-if="isLoading"/>-->
  <div class="content">

      <Suspense>
        <template #default>
          <div>
            default
            <ul class="favorites-list">
              <VacanciesItem v-for="item in vacanciesItems" :key="item.id" />
            </ul>

            <button ref="loadMoreButton" v-if="isMore" id="load_more_button" class="create-button show-more" @click="loadMore">
              Показать еще
              <div v-if="isLoading" class="ms-2 spinner-grow spinner-grow-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <img v-else src="~/assets/img/svg/Arrow-Down2.svg" alt="#">
            </button>
          </div>
        </template>
        <template #fallback>
          <div>
            fallback
            <ul class="favorites-list">
              <SkeletonCard v-for="item in 10" />
            </ul>

            <button ref="loadMoreButton" v-if="isMore" id="load_more_button" class="create-button show-more" @click="loadMore">
              Показать еще
              <div v-if="isLoading" class="ms-2 spinner-grow spinner-grow-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <img v-else src="~/assets/img/svg/Arrow-Down2.svg" alt="#">
            </button>

          </div>

        </template>

      </Suspense>

  </div>

</template>

<script>

import {useVacancyStore} from "../../store/vacancy";
import {storeToRefs} from "pinia";
import {useVacancyForm} from "../../composables/useVacancyForm";
import Swal from "sweetalert2";
const loadVacancyList = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 100,
          provider: 'hh',
          title: 'Matt Maribojoc',
          company_logo: 'https://cdn-images-1.medium.com/fit/c/100/100/2*EcZb9cndrhTF7_d74dv2Fg.png',
          bio: 'I run a VueJS community over at https://learnvue.co, develop web sites, and post whatever I find cool on the Internet.',
        }
      ])
    }, 4000)
  })
}

// const loadVacancyList = async () => {
//   return new Promise((resolve) => {
//     setTimeout(async() => {
//
//         const params = useVacancyForm(form.value, 'backend');
//         const res = await getVacancies({...params});
//       resolve(res)
//     }, 4000)
//   })
// }

export default {
  async setup() {
    // onMounted(async() => {
    //   isLoading.value = true;
    //   const params = useVacancyForm(form.value, 'backend');
    //   const res = await getVacancies({...params});
    //   console.log(res);
    //   if (res?.status !== 'success'){
    //     isLoading.value = false;
    //   }
    //   isLoading.value = false;
    // })

    const vacancyStore = useVacancyStore();
    const {getVacancies} = vacancyStore;
    const {vacancies, current_page} = storeToRefs(vacancyStore);
    const form = ref(useVacancyForm());

    const params = useVacancyForm(form.value, 'backend');
    // const res = await getVacancies({...params});
    const vacanciesItems = ref(await getVacancies({...params}));

    const loadMoreButton = ref();
    const isLoading = ref(false);
    const isMore = ref(false);

    const route = useRoute();
    watch(vacancies, (newValues) => {
      vacanciesItems.value = newValues;
      if (newValues.length > 0){
        isMore.value = true;
      }
    })
    const loadMore = async() => {
      isLoading.value = true;
      const params = useVacancyForm(form.value, 'backend');
      const res = await getVacancies({...params, page: parseInt(current_page.value) + 1}, true);
      console.log(res);
      if (res.items.length < 1){
        isMore.value = false;
        Swal.fire({
          title: 'Больше вакансий не найдено!',
          icon: "success",
        });
      }
      isLoading.value = false;

      loadMoreButton.value.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    return {isMore, loadMore, vacanciesItems, isLoading}
  }
}



</script>
<style scoped>

</style>