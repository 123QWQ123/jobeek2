<template>
  <div>
    <div class="check-block" @click="toggle">
      <div class="checkbox">
        <input
          type="checkbox"
          :name="props.name"
          :id="props.name"
          :checked="value"
        />
        <div class="checkbox-mask" :class="{ checked }">
          <img src="~/assets/img/svg/check.svg" alt="#" />
        </div>
      </div>
      <label :for="props.name" class="fs-14">
        {{ props.label }}
      </label>
    </div>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  name: String,
  label: String,
});
const emit = defineEmits(["change"]);

// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { value, setValue, errorMessage } = useField(() => props.name);

const toggle = () => {
  setValue(!value.value);
  emit("change", !value.value);
};
const checked = computed(() => {
  return !!value.value;
});
</script>

<style scoped>
.checked .checkbox-mask img {
  opacity: 1;
}
</style>
