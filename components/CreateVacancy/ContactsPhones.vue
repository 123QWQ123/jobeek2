<template>
    <div class="right">
        <div class="accordion mb-2"
             v-if="selectedPhones.length"
        >
            <CreateVacancyContactsPhonesItem
                v-for="(item, index) in selectedPhones" :item="item"
                :index="index"
                :phone="item.phone"
                :comment="item.comment"
                @update="updateItem"
                @delete="deleteItem" />
        </div>

        <button class="btn btn-primary" v-else-if="selectedPhones.length === 0" @click="create">Добавить</button>
        <button class="btn btn-primary" v-if="selectedPhones.length !== 0" @click="create">Добавить еще</button>
    </div>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useVacancyStore} from "~/store/vacancy";
const vacancyStore = useVacancyStore();
const {getForeignLanguages, getLanguageLevels} = vacancyStore;
const {foreign_languages, language_levels} = storeToRefs(vacancyStore);

const selectedPhones = ref([ { phone: null, comment: null } ]);
const currentPhone = ref(0);
const reset = () => {
    selectedPhones.value = [ { phone: null, comment: null } ];
}
const create = () => {
    const newItems = selectedPhones.value;
    newItems.push({
        phone: null, comment: null
    });
    currentPhone.value = newItems.length - 1;
    selectedPhones.value = newItems;
}

const updateItem = (index, newItem) => {
    selectedPhones.value[index] = newItem;
}
const deleteItem = (index) => {
    const newItems = selectedPhones.value.filter((item, key) => key !== index);
    selectedPhones.value = newItems;
}
</script>

<style scoped>

</style>