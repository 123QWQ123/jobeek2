<template>
  <div class="input-row">
    <label for="industry">Отрасль</label>
    <div class="input-wrapper">
      <Select2 v-model="myValue" :options="myOptions" :settings="{ multiple: true }" @change="myChangeEvent($event)" @select="mySelectEvent($event)" />
    </div>
  </div>
  <div class="input-row">
    <label for="locations">Города, области, страны</label>
    <div class="input-wrapper">
      <Select2 v-model="myValue2" :options="myOptions2" :settings="{ multiple: true }" @change="myChangeEvent($event)" @select="mySelectEvent($event)" />
    </div>
  </div>
</template>

<script setup>

const myChangeEvent = (event) => {
  console.log("myChangeEvent: ", event);
}
const mySelectEvent = (e) => {
  console.log("mySelectEvent: ", event);
}
const myOptions = [
  {id: 1, text: 'apple'},
  {id: 2, text: 'berry'},
  {id: 3, text: 'cherry'},
]
const myOptions2 = [
  {id: 1, text: 'apple'},
  {id: 2, text: 'berry'},
  {id: 3, text: 'cherry'},
]
const myValue = ref();
const myValue2 = ref();
</script>

<style>


</style>