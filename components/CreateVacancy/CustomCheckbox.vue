<template>
  <div class="input-row" >
    <label >{{label}}:</label>
    <div class="input-wrapper mt-2">

      <div class="check-block mt-2">
        <div class="checkbox">
          <input type="checkbox" :id="forLabel" v-model="modelValue" @focusin="() => errors.accept_kids = ''">
          <div class="checkbox-mask">
            <img src="~/assets/img/svg/check.svg" alt="#" />
          </div>
        </div>
        <label :for="forLabel" class="fs-14">{{description}}</label>
      </div>
      {{errors.accept_kids}}
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomCheckbox",
}
</script>

<script setup>
  const props = defineProps(['errors', 'modelValue', 'label', 'description', 'listStyles', 'class']);
  const emit = defineEmits(['change', 'update:modelValue']);
  const isOpen = ref(false);
  const errors = ref(props.errors ?? {});

  const label = computed(() => props.label ?? "-");
  const forLabel = computed(() => props.for ?? "-");
  const description = computed(() => props.description ?? "-");

  const modelValue = ref(props.modelValue);

  watch(() => modelValue.value, (newValue) => {
    emit("update:modelValue", newValue);
  })
  function close(){
    isOpen.value = false;
  }
</script>

<style scoped>
</style>