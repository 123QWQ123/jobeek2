<template>
  <div class="input-row">
    <label for="remote-work">Контакты</label>
      <div class="c2">
          <div class="input-wrapper">
              <input type="text" v-model="contacts.name.val" placeholder="Имя">
              <div :style="{display: 'none'}" class="text-danger" :class="{'d-block': (!contacts.name.isValid && contacts.name.isChecked)}">
                  Введите имя
              </div>

          </div>
          <div class="input-wrapper">
              <input type="email" v-model="contacts.email.val" placeholder="Email">
              <div :style="{display: 'none'}" class="text-danger" :class="{'d-block': (!contacts.email.isValid && contacts.email.isChecked)}">
                  Введите Email
              </div>
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
const props = defineProps(['is_valid']);
const isValid = computed(() => props.is_valid);


const contacts = reactive({
    email: {
        val: "",
        isChecked: false,
        isValid: false,
    },
    name: {
        val: "",
        isChecked: false,
        isValid: false,
    },
    phones: {
        val: [],
        isChecked: false,
        isValid: false,
    },
    // isValid: isValid
});

const validate = () => {
    contacts.name.isChecked = true;
    if (contacts.name.val.length > 0){
        contacts.name.isValid = true;
    }else{
        contacts.name.isValid = false;
    }
    contacts.email.isChecked = true;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(contacts.email.val)) {
        contacts.name.isValid = true;
    } else {
        contacts.name.isValid = false;
    }
    contacts.phones.isChecked = true;
    if (contacts.phones.val.length >= 0) {
        contacts.phones.isValid = true;
    } else {
        contacts.phones.isValid = false;
    }
    console.log(contacts.name.val, )
    emit('set', 'contacts', {name: contacts.name.val, email: contacts.email.val});
}
watch(() => contacts.name.val, (newValue) => {
    reset('name', newValue);
});
watch(() => contacts.email.val, (newValue) => {
    reset('email', newValue);
});
const reset = (prop) => {
    contacts[prop].isValid = true;
}

defineExpose({validate});
</script>

<style scoped>

</style>