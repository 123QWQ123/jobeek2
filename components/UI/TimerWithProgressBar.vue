<template>
  <div class="progress" style="height: 15px">
    <div
      class="progress-bar"
      role="progressbar"
      :style="{ width: currentPercentage + '%' }"
      :aria-valuenow="currentPercentage"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      {{ currentValueFormatted }}
    </div>
  </div>
</template>

<script setup>
import useResumeHooks from "~/hooks/useResumeHooks";

const props = defineProps({
  modelValue: {
    required: true,
    default: 0,
  },
  max: {
    required: false,
  },
});
const { max } = toRefs(props);

const { formatSeconds } = useResumeHooks();
const currentValue = ref(
  props.modelValue > props.max ? props.max : props.modelValue
);
const currentValueFormatted = computed(() => formatSeconds(currentValue.value));
const currentPercentage = computed(
  () => (100 / max.value) * currentValue.value
);

watch(
  () => props.modelValue,
  (newValue) => (currentValue.value = newValue)
);
</script>

<style scoped></style>
