<template>
  <div class="input-row input-row--checkboxes">
    <label>Подключенные сервисы *</label>
    <div class="input-wrapper input-wrapper--flex">
      <div class="custom-check-wrap">
        <div class="theme-checker theme-checker--blue">
          <input
            name="providers"
            type="checkbox"
            value="hh"
            :checked="hhProviderEnabled"
            @change="changeProviders"
          />
          <div class="theme-checker-ui">
            <div class="circle"></div>
          </div>
        </div>
        <label for="hh"
          ><img src="~/assets/img/logos/hhmini.svg" alt="#" /><span
            >Hh.ru</span
          ></label
        >
      </div>
      <div class="custom-check-wrap">
        <div class="theme-checker theme-checker--blue">
          <input
            id="superjob"
            name="providers"
            type="checkbox"
            value="superjob"
            :checked="superjobProviderEnabled"
            @change="changeProviders"
          />
          <div class="theme-checker-ui">
            <div class="circle"></div>
          </div>
        </div>
        <label for="superjob"
          ><img src="~/assets/img/logos/sj.svg" alt="#" /><span
            >Superjob.ru
          </span></label
        >
      </div>
    </div>
    <div class="text-danger row">
      <ErrorMessage name="providers" />
    </div>
  </div>
  <div class="input-row">
    <label for="search-words">Что искать</label>

    <div class="input-wrapper">
      <VeeCustomTextInput
        type="text"
        name="text"
        placeholder="Что искать"
        @input="searchWordsInput"
      />
      <div class="prompt">
        Слова через запятую: найдутся вакансии, где встречается хотя бы одно из
        указанных слов. Слова через пробел: найдутся вакансии, где встречаются
        все указанные слова.
      </div>
      <div
        v-for="item in vacancy_search_fields"
        :key="item.id"
        class="check-block"
      >
        <div class="checkbox">
          <input
            name="search_fields"
            :id="item.id"
            type="checkbox"
            :value="item.id"
            @change="toggleSearchFields(item.id)"
          />
          <div class="checkbox-mask">
            <img src="~/assets/img/svg/check.svg" alt="#" />
          </div>
        </div>
        <label :for="item.id">{{ item.name }}</label>
      </div>
      <div class="text-danger row">
        <ErrorMessage name="search_fields" />
      </div>
    </div>
  </div>
  <!--  <div class="input-row">-->
  <!--    <label for="exclude-words">Исключать из названия вакансии</label>-->
  <!--    <div class="input-wrapper">-->
  <!--      <VeeCustomTextInput-->
  <!--        type="text"-->
  <!--        name="exclude_words"-->
  <!--        @input="excludeWordsInput"-->
  <!--      />-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<script setup>
import { useSetFormValues, useFormValues } from "vee-validate";
import { useDictionaryStore } from "~/store/dictionary.js";

const setFormValues = useSetFormValues();
const formValues = useFormValues();
const { value, setValue } = useField("providers");
const { vacancy_search_fields } = storeToRefs(useDictionaryStore());
const superjobProviderEnabled = computed(() => {
  if (value.value) {
    return !!value.value.find((prov) => prov === "superjob");
  }
  return false;
});
const hhProviderEnabled = computed(() => {
  if (value.value) {
    return !!value.value.find((prov) => prov === "hh");
  }
  return false;
});

const excludeWordsInput = (event) => {
  setFormValues({ exclude_words: event.target.value });
};
const searchWordsInput = (event) => {
  setFormValues({ text: event.target.value });
};

const changeProviders = (event) => {
  const providers = value.value || [];
  if (event.target.checked) {
    providers.push(event.target.value);
  } else {
    const index = providers.indexOf(event.target.value);
    providers.splice(index, 1);
  }
  setFormValues({ providers: providers });
};
const toggleSearchFields = (id) => {
  const index = formValues.value.search_fields.indexOf(id);
  if (index > -1) {
    formValues.value.search_fields.splice(index, 1);
  } else {
    formValues.value.search_fields.push(id);
  }
};
</script>

<style scoped></style>
