<template>
      <div class="form_content" v-if="isShown">
          <div class="checkboxes-row" >
              <div class="check-block" v-for="item in driving_license_options">
                  <div class="checkbox" @click="toggle(item.id)">
                      <input type="checkbox" :id="item.id" :checked="check(item.id)"/>
                      <div class="checkbox-mask"><img src="~/assets/img/svg/check.svg" alt="#"></div>
                  </div>
                  <label :for="item.id">{{ item.name }}</label>
              </div>
          </div>
      </div>
      <div class="empty-area" v-else>
          <span>Здесь вы можете выбрать права</span>
          <button class="add" type="button" @click="isShown = !isShown">Добавить </button>
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
const draftID = computed(() => route.query.draft_id);

const driving_license_options = computed(() => dictionaryStore.driver_licenses);

const driver_licenses_ids = props.modelValue.map((item) => {
  const res = driving_license_options.value.find(sub => sub.name === item);
  if (res) return res.id;
})

const driver_licenses = ref(driver_licenses_ids ?? []);
const {getDriverLicenses} = dictionaryStore;
onMounted(() => {
  setTimeout(async() => {
    await getDriverLicenses();
  })
})
const check = (id) => {
    return driver_licenses.value.includes(id);
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
    emit('update:modelValue', newData);
});

</script>

<style scoped>
.checkboxes-row{
    width: -webkit-fill-available;
}
</style>