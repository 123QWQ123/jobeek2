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
<!--      <div class="empty-area" v-else>-->
<!--          <span>Здесь вы можете выбрать права</span>-->
<!--          <button class="add" type="button" @click="isShown = !isShown">Добавить </button>-->
<!--      </div>-->
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
const draftID = computed(() => route.query.draft_id);

const selectedItems = ref(props.modelValue ?? []);

const driving_license_item_options = ref([]);

const driver_licenses_ids = computed(() => {
  return selectedItems.value.map((item) => {
    const res = dictionaryStore.driver_licenses.find(sub => sub.name === item.toString());
    if (res) return res.id;
  })
});



watch(() => dictionaryStore.driver_licenses, (newValues) => {
  driving_license_item_options.value = newValues;
});

watch(() => driver_licenses_ids.value, (newValues) => {
  driver_licenses.value = newValues;
});

const driver_licenses = ref(driver_licenses_ids.value ?? []);
const {getDriverLicenses} = dictionaryStore;
onMounted(() => {
  setTimeout(async() => {
    await getDriverLicenses();
  })
})
const check = (id) => {
    return driver_licenses_ids.value.includes(id);
}
const toggle = (id) => {
    const IDs = [...driver_licenses.value];
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