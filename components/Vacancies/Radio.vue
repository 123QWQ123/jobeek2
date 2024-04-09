<template>
  <div>
    <div class="checkbox">
      <input
        type="radio"
        :value="props.value"
        v-model="modelValue"
        :name="props.name"
        @change="update"
        :id="props.id"
      />
      <div class="radio-mask">
        <img src="~/assets/img/svg/check.svg" alt="#" />
      </div>
    </div>
    <label :for="props.id" class="fs-14 l-wrap">
      {{ props.label }}
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
  label: String,
  value: {},
  id: String,
  modelValue: {
    default: undefined,
  },
  is_header: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const modelValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    modelValue.value = newValue;
  },
);

const emit = defineEmits(["update:modelValue"]);
const update = () => {
  emit("update:modelValue", modelValue.value);
};
</script>

<style scoped>
.checked .checkbox-mask img {
  opacity: 1;
}

.is_header label {
  font-weight: bold;
}
</style>
