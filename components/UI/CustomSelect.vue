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
        >
          {{ item.name }}
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
const props = defineProps([
  "options",
  "modelValue",
  "label",
  "vacancy",
  "listStyles",
  "class",
]);
const emit = defineEmits(["change", "update:modelValue"]);
const isOpen = ref(false);
const options = computed(() => props.options);

const label = computed(() => {
  if (selectedOption.value) {
    return selectedOption.value.name;
  }
  return props.label;
});

// const classes = computed(() => {
//     let classes = props.class;
//     if (isOpen.value){
//         classes.open = isOpen.value;
//     }
//
//     return classes;
// });
const selectedValue = computed(() => props.modelValue);
const selectedOption = ref(null);

const reApply = (newValue) => {
  const selectedItem = props.options.find(
    (item) => String(props.modelValue) === String(item.value),
  );
  if (selectedItem) {
    selectedOption.value = selectedItem;
  }
};

watch(() => props.modelValue, reApply);
watch(() => props.options, reApply);

onMounted(() => {
  reApply();
});

function onClick(e) {
  if (
    e.target.classList.contains("current") ||
    e.target.classList.contains("nice-select")
  ) {
    isOpen.value = !isOpen.value;
  }
  if (e.target.classList.contains("option")) {
    isOpen.value = false;
    emit("change", e.target.dataset.value ?? null);
    emit("update:modelValue", e.target.dataset.value ?? null);
  }
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
</style>
