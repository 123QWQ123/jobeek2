<template>
  <div class="input-row input-row--checkboxes">
    <label>Подключенные сервисы</label>
    <div class="input-wrapper input-wrapper--flex">
      <div class="custom-check-wrap">
        <div class="theme-checker theme-checker--blue" @click="onClickProvider('hh')">
          <input type="checkbox" id="hh" :checked="HHProviderChecked">
          <div class="theme-checker-ui">
            <div class="circle"> </div>
          </div>
        </div>
        <label for="hh"><img src="~/assets/img/logos/hhmini.svg" alt="#"><span>Hh.ru</span></label>
      </div>
      <div class="custom-check-wrap">
        <div class="theme-checker theme-checker--blue" @click="onClickProvider('superjob')">
          <input type="checkbox" id="sj" :checked="SuperjobProviderChecked">
          <div class="theme-checker-ui">
            <div class="circle"> </div>
          </div>
        </div>
        <label for="sj"><img src="~/assets/img/logos/sj.svg" alt="#"><span>Superjob.ru</span></label>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  providers: {
    required: true,
    type: Object
  }
})
const providers = ref([
  {name: 'hh', checked: true},
  {name: 'superjob', checked: false},
]);

const keywords = ref([]);

const onClickProvider = (provider_name) => {
  const item = providers.value.find((item) => item.name === provider_name);
  if (item) item.checked = !item.checked;
}

const HHProviderChecked = computed(() => {
  return providers.value.find((item) => item.name === 'hh')?.checked;
});
const SuperjobProviderChecked = computed(() => {
  return providers.value.find((item) => item.name === 'superjob')?.checked;
});

</script>

<style scoped>

</style>