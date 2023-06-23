<template>
  <div class="input-row input-row--checkboxes">
    <label>Подключенные сервисы</label>
      <div class="c2">
          <div class="input-wrapper input-wrapper--flex">
              <div class="form-check  d-inline-flex" >
                  <input class="form-check-input" type="checkbox" id="hh" v-model="hh">
                  <label class="form-check-label" for="hh">
                      <img src="~/assets/img/logos/hhmini.svg" alt="#"><span>Hh.ru</span>
                  </label>
              </div>
          </div>
          <div class="input-wrapper input-wrapper--flex">
              <div class="form-check d-inline-flex">
                  <input class="form-check-input" type="checkbox" id="superjob" v-model="superjob">
                  <label class="form-check-label" for="superjob">
                      <img src="~/assets/img/logos/sj.svg" alt="#"><span>Superjob.ru</span>
                  </label>
              </div>
          </div>
      </div>
      <div :style="{display: 'none'}" class="text-danger" :class="{'d-block': !isValid}">
          Выберите один из сервисов
      </div>
  </div>
  {{props}}
</template>

<script setup>
const emit = defineEmits(['set']);
const isValid = computed(() => props.is_valid);
const props = defineProps({
  is_valid: {
      required: true,
  },
  hh: {
    required: true,
  },
  superjob: {
    required: true,
  }
})

const hh = ref(props.hh);
const superjob = ref(props.superjob);


watch(hh, (newValue) => {
    emit('set', 'providers', {hh: newValue, superjob: superjob.value});
});
watch(superjob, (newValue) => {
    emit('set', 'providers', {hh: hh.value, superjob: newValue});
});

</script>

<style>
.form-check{
    gap: 1rem;
    justify-content: center;
    align-items: center;
}
.form-check-input[type=checkbox] {
    width: 1.5em;
    height: 2em;
    background-position: center;
    background-repeat: no-repeat;
}
.form-check-label{
    display: inline-flex;
    align-items: center;
}
.form-check-label img{
    margin-right: 0.2rem;
}
</style>