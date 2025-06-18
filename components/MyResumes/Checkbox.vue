<template>
  <div>
    <div class="check-block">
      <label :for="props.name" class="fs-14">
        <div class="checkbox">
          <input
            type="checkbox"
            :name="props.name"
            :id="props.name"
            :checked="value"
            @change="toggle"
          />
          <div class="checkbox-mask" :class="{ checked }">
            <img src="~/assets/img/svg/check.svg" alt="#" />
          </div>
        </div>

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

const toggle = (e) => {
  setValue(!value.value);
  emit("change", e);
};
const checked = computed(() => {
  return !!value.value;
});
</script>

<style scoped>
.checked .checkbox-mask img {
  opacity: 1;
}
.check-block .checkbox input[type="checkbox"] {
  width: 0px;
}
</style>
