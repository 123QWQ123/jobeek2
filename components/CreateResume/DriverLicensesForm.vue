<template>
      <div class="form_content">
          <div class="checkboxes-row" >
              <div class="check-block" v-for="item in driving_license_item_options">
                  <div class="checkbox" @click="toggle(item.id)">
                      <input type="checkbox" :id="item.id" :checked="check(item.id)"/>
                      <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
                  </div>
                  <label :for="item.id">{{ item.name }}</label>
              </div>
          </div>
      </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    required: false,
    default: [],
  },
  errors: {
    required: false,
    default: {}
  }
})
import {useDictionaryStore} from "~/store/dictionary";
const educationElement = ref(false);
const route = useRoute();
const dictionaryStore = useDictionaryStore();

const selectedItems = ref(props.modelValue ?? []);
watch(() => props.modelValue, (newData) => {
  selectedItems.value = newData;
})

const driving_license_item_options = ref([]);

watch(() => dictionaryStore.driver_licenses, (newValues) => {
  driving_license_item_options.value = newValues;
});

const driver_licenses = ref(selectedItems.value ?? []);
const {getDriverLicenses} = dictionaryStore;
onMounted(() => {
  setTimeout(async() => {
    await getDriverLicenses();
  })
})


const check = (id) => {
    return selectedItems.value.includes(id);
}
const toggle = (id) => {
    const IDs = [...selectedItems.value];
    if (!IDs.includes(id)){
        IDs.push(id);
    }else{
        const deleteIndex = IDs.indexOf(id);
        IDs.splice(deleteIndex, 1);
    }
  driver_licenses.value = IDs;
}

const isShown = ref(props.modelValue.length > 0 ? true : false);
const isChanged = ref(false);

watch(() => driver_licenses.value, (newData) => {
    isChanged.value = true;
    emit('update:modelValue', newData.filter(item => item));
});

</script>

<style scoped>
.checkboxes-row{
    width: -webkit-fill-available;
}
</style>