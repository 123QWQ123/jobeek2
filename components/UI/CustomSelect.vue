<template>
  <div
    v-click-outside="close"
    onfocusout="close"
    class="nice-select n-select d-select"
    :style="props.style"
    :class="{ open: isOpen }"
    tabindex="0"
    @click.prevent="onClick"
  >
    <span class="current">{{ label }}</span>
    <transition>
      <ul class="list" :style="listStyles" v-if="isOpen">
        <li
          v-for="item in options"
          :key="item.value"
          :data-value="item.value"
          class="option"
          @click="updateValue(item.value)"
        >
          {{ item.name }} <span v-if="!isNullOrUndefined(item.min)" class="rub">₽</span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: "CustomSelect",
};
</script>

<script setup>
import { isNullOrUndefined } from "@tinymce/tinymce-vue/lib/es2015/main/ts/Utils.js";
import { ref } from "vue";
import { defineEmits } from "vue";

const props = defineProps({
  options: {
    default: [],
  },
  modelValue: {},
  label: {},
  listStyles: {},
});
const isOpen = ref(false);
const emit = defineEmits(["update:modelValue", "change"]);
const options = computed(() => props.options);

const label = computed(() => {
  if (selectedOption.value) {
    return selectedOption.value.name;
  }
  return props.label;
});

const selectedOption = ref(null);

const reApply = (newValue) => {
  const selectedItem = props.options.find(
    (item) => String(props.modelValue) === String(item.value),
  );
  if (selectedItem) {
    selectedOption.value = selectedItem;
  }
};
reApply();
watch(() => props.modelValue, reApply);
watch(() => props.options, reApply);

function onClick(e) {
  if (
    e.target.classList.contains("current") ||
    e.target.classList.contains("nice-select")
  ) {
    isOpen.value = !isOpen.value;
  }
}

function updateValue(value) {
  isOpen.value = false;
  emit("change", value ?? null);
  emit("update:modelValue", value ?? null);
}

function close() {
  isOpen.value = false;
}
</script>

<style scoped>
.current {
  color: #0a2540;
}

.d-select {
  padding-right: 3.125rem;
  width: auto;
}

.nice-select:after {
  content: "";
  display: block;
  margin-top: -4px;
  pointer-events: none;
  position: absolute;
  transform-origin: 66% 66%;
  transform: rotate(45deg);
  transition: all 0.15s ease-in-out;
  width: 10px;
  height: 10px;
  top: 44%;
  right: 24px;
  border-width: 1.5px;
  border-color: #78757e;
}

.nice-select.open:after {
  transform: rotate(225deg);
}
</style>
