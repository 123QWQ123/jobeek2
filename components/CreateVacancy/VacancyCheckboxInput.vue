<template>
  <div>
    <div class="check-block">
      <div class="checkbox">
        <input
          type="checkbox"
          :name="props.name"
          :id="props.name"
          v-model.number="value"
        />
        <div class="checkbox-mask">
          <img src="~/assets/img/svg/check.svg" alt="#" />
        </div>
      </div>
      <label :for="props.name" class="fs-14">
        {{ props.label }}
      </label>
    </div>

    <div class="text-danger d-block">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ResumeCheckboxInput",
};
</script>

<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  name: String,
  label: String,
});

// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { value, errorMessage } = useField(() => props.name);
</script>
