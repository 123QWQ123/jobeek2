<template>
  <div class="input-row" >
    <label >Поиск по ключевому слову:</label>
    <div class="input-wrapper mt-2">

      <div class="right">
        <div class="accordion mb-2"
             v-if="selectedKeywords.length"
        >
          <CreateVacancySubscriptionKeywordItem
              v-for="(item, index) in selectedKeywords" :item="item"
              :key="index"
              :index="index"
              :keyword="item.keyword"
              :srws="item.srws"
              :skwc="item.skwc"
              :errors="item.errors"
              @update="updateItem"
              @delete="deleteItem" />
        </div>

        <button class="btn btn-primary" v-else-if="selectedKeywords.length === 0" @click="create">Добавить</button>
        <button class="btn btn-primary" v-if="selectedKeywords.length !== 0" @click.prevent="create">Добавить еще</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue']);

const defaultOption = { srws: null, skwc: null, keyword: null, };
const selectedKeywords = ref([ defaultOption ]);
const currentKeyword = ref(0);

const reset = () => {
  selectedKeywords.value = [ defaultOption ];
}
const create = (e) => {
  const newItems = selectedKeywords.value;
  newItems.push(defaultOption);
  currentKeyword.value = newItems.length - 1;
  selectedKeywords.value = newItems;
}

const updateItem = (index, newItem) => {
  selectedKeywords.value[index] = newItem;
}
const deleteItem = (index) => {
  const newItems = selectedKeywords.value.filter((item, key) => key !== index);
  selectedKeywords.value = newItems;
}

watch(selectedKeywords.value, (newValues) => {
  emit('update:modelValue', selectedKeywords.value);
})
</script>

<style scoped>
.accordion-button {
  background-color: unset !important;
}
</style>