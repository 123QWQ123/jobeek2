<template>
  <div class="input-row">
    <label for="remote-work">Контакты</label>
    <div class="input-wrapper">
        <div class="c2">
            <input type="text" v-model="contacts.name" placeholder="Имя">
            <input type="email" v-model="contacts.email" placeholder="Email">
        </div>
    </div>
  </div>
  <div class="input-row">
    <label for="remote-work"></label>
    <div class="input-wrapper">
        <CreateVacancyContactsPhones  v-model="contacts.phones"/>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['set']);

const contacts = reactive({
    email: "",
    name: "",
    phones: []
});

watch(contacts, (newValues) => {
    console.log(newValues);
    emit('set', 'contacts', contacts);
})
</script>

<style scoped>

</style>