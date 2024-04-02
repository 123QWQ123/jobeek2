<template>
  <div
    class="check-block"
    @click="toggle"
    :class="{ is_header: props.is_header }"
  >
    <div class="checkbox" v-if="!props.is_header">
      <input
        type="checkbox"
        :name="props.name"
        :id="props.name"
        :checked="props.checked"
      />
      <div class="checkbox-mask" :class="{ checked: props.checked }">
        <img src="~/assets/img/svg/check.svg" alt="#" />
      </div>
    </div>
    <label :for="props.name" class="fs-14 l-wrap">
      {{ props.label }}
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
  label: String,
  checked: {
    type: Boolean,
    required: true,
    default: false,
  },
  is_header: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const emit = defineEmits(["change"]);
const toggle = () => {
  emit("change", !props.checked);
};
const checked = computed(() => {
  return props.checked;
});
</script>

<style scoped>
.checked .checkbox-mask img {
  opacity: 1;
}

.is_header label {
  font-weight: bold;
}
</style>
