<template>
  <div class="custom-select" :class="{ open: isOpen }" v-click-outside="close">
    <div class="custom-select__trigger" @click="isOpen = !isOpen">
      <span>{{ label }}</span>
      <div class="radio_arrow" :class="{ open: isOpen }"></div>
    </div>
    <div class="custom-options">
      <div
        class="custom-option"
        v-for="item in options"
        @click.prevent="onSelect(item.value)"
      >
        <input
          type="radio"
          :id="item.value"
          v-model="selectedValue"
          :value="item.value"
          name="random_radio_"
        />
        <label :for="item.value">
          {{ item.name }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomSelectWithRadio",
};
</script>

<script setup>
const props = defineProps(["options", "modelValue", "label"]);
const emit = defineEmits(["change", "update:modelValue"]);
const isOpen = ref(false);
const options = computed(() => props.options);
const id = useId();
const label = computed(() => {
  if (selectedOption.value) {
    return selectedOption.value.name;
  }
  return props.label;
});

const selectedValue = ref(null);
watch(
  () => selectedValue.value,
  (newValue) => {
    emit("update:modelValue", newValue);
    emit("change", newValue);
  },
);
const selectedOption = ref(null);
const reApply = (newValue) => {};

watch(() => props.modelValue, reApply);
watch(() => props.options, reApply);

onMounted(() => {
  reApply();
});

function onSelect(value) {
  selectedValue.value = value;
  const selectedItem = props.options.find(
    (item) => selectedValue.value === item.value,
  );
  if (selectedItem) {
    selectedOption.value = selectedItem;
  }
  close();
}

function close() {
  isOpen.value = false;
}
</script>

<style scoped>
.custom-select {
  position: relative;
  display: flex;
  flex-direction: column;
}

.custom-select__trigger {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
  min-width: 180px;
  border-radius: 6px;
  height: 43px;
  font-family: "Open Sans", sans-serif;
}

.radio_arrow {
  margin-left: 10px;
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

.custom-select.open .custom-options {
  display: block;
}

.custom-options {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border: 1px solid #ccc;
  border-top: none;
  background: #fff;
  z-index: 2;
}

.custom-option {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
}

.custom-option label {
  margin-left: 8px;
}

.radio_arrow.open {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}
@media (max-width: 768px) {
	.custom-select__trigger {
	    height: 34px;
	}
}
</style>
