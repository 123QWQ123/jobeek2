<template>
  <div
    class="provider_buttons d-lg-flex justify-content-between align-items-center"
  >
    <div class="d-inline-flex">
      <div class="sort mx-2 ms-auto">
        <span>Поставщик:</span>
        <!--          v-model="provider"-->

        <CustomSelect
          :options="providerOptions"
          @change="onProviderChange"
          v-model="provider"
          class="bg-white w-auto"
          :listStyles="listStyles"
        ></CustomSelect>
      </div>
    </div>

    <MyResumesListActionsNotifications />
  </div>
</template>

<script setup>
const props = defineProps(["name"]);
const emit = defineEmits(["onProviderChange"]);

const providerOptions = ref([
  { value: null, name: "Все" },
  { value: "hh", name: "HeadHunter" },
  { value: "superjob", name: "Superjob" },
]);

const providers = ref({
  hh: true,
  superjob: true,
});

const provider = ref(null);
const onProviderChange = async (provider) => {
  if (provider === "*") {
    providers.value.hh = true;
    providers.value.superjob = true;
  }
  if (provider === "hh") {
    providers.value.hh = true;
    providers.value.superjob = false;
  }
  if (provider === "superjob") {
    providers.value.hh = false;
    providers.value.superjob = true;
  }
  emit("onProviderChange", provider);
};

const listStyles = {
  left: 0,
  right: "unset",
  width: "auto !important",
};
</script>

<style scoped>
.provider_buttons {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
}

.theme-checker input ~ .theme-checker-ui .circle.left {
  transform: translate(3px, -50%);
}

.theme-checker input ~ .theme-checker-ui .circle.right {
  transform: translate(30px, -50%);
}
</style>
