<template>
  <div class="w-box w-box--main w-box-position">
    <div class="w-box-head">
      <h3 class="title">Должность и доход</h3>
    </div>
    <div class="w-box-body">
      <div class="input-row">
        <label >Какую должность вы хотите занимать? <b>*</b></label>
        <div class="input-wrapper">
          <input type="text" placeholder="Укажите должность" id="position" v-model="state.profession.val">
        </div>
      </div>
        <CreateResumeSalary v-model="state.salary.val" :currency="state.salary.val.currency" :amount="state.salary.val.amount"/>
      <div class="input-row">
        <label>Занятость <b>*</b></label>
        <div class="input-wrapper">
            <CustomSelect :options="employmentOptions" v-model="state.employment.val"  />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {useDictionaryStore} from "~/store/dictionary";

const dictionaryStore = useDictionaryStore();
const state = reactive({
    profession: {
        val: "",
        isValid: true
    },
    salary: {
        val: {
            amount: null,
            currency: "RUB"
        },
        isValid: true
    },
    employment: {
        val: 81,
        isValid: true
    },
})
const {getWorkTypes} = dictionaryStore;
await getWorkTypes();
const employmentOptions = computed(() => {
    return dictionaryStore.work_types.map(item => ({name: item.name,value: item.id}));
});
</script>

<style scoped>

</style>