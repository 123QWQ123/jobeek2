<template>
  <div class="w-100">
    <div class="text-danger d-block p-4" v-if="props.message">
      {{ props.message }}
    </div>

    <div class="row">
      <div class="col-lg-6 col-xs-12">
        <div class="selection selected-options" v-if="fields.length > 0">
          <ul class="selected-options" id="select2--container">
            <li
              class="multi-select_selected-item"
              v-for="(item, index) in fields"
              @click="setCurrent(index)"
            >
              <button
                type="button"
                class="select2-selection__choice__remove"
                @click.stop="remove(index)"
              >
                <span aria-hidden="true">×</span>
              </button>
              <span class="select2-selection__choice__display">
                {{ item.value }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row">
      <LazyCreateResumeKnowledgeAndSkillsInputWrapper
        :is-new="isNew"
        :id="currentSkillId"
        :skill="currentSkill"
        @add="addItem"
        @update="updateItem"
        @delete="deleteItem"
      />
    </div>
  </div>
</template>

<script setup>
import { useFieldArray } from "vee-validate";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  name: {
    required: true,
    default: "name",
  },
});

// const { errorMessage } = useField(() => props.name);
const { remove, push, fields, update } = useFieldArray(() => props.name);

const isNew = ref(true);
const currentSkillId = ref(null);
const currentSkill = ref(null);
const setCurrent = (index) => {
  isNew.value = false;
  currentSkillId.value = index;
  currentSkill.value = fields.value[index]?.value;
};
const addItem = (newItem) => {
  push(newItem);
};

const updateItem = (id, newItem) => {
  update(currentSkillId.value, newItem);
  currentSkillId.value = null;
  currentSkill.value = null;
  isNew.value = true;
};
const deleteItem = (deleteItem) => {
  console.log(deleteItem);
  remove(deleteItem);
};
onMounted(() => {
  // if (!props.modelValue.length) {
  //   reset();
  // }
});
</script>

<style scoped>
.absoluted_icon {
  position: absolute;
  left: -1.8rem;
  top: 0.5rem;
  font-size: 1rem;
  z-index: 1;
  cursor: pointer;
  max-width: 3rem;
}

.absoluted_icon svg {
  width: 24px;
  height: 24px;
}
</style>

<style scoped>
.selection {
  border-radius: 4px;
  left: 0;
}

.selected-options {
  margin-top: 0.5rem;
  flex-wrap: wrap;
  display: flex;
  padding: 0 0.1rem 0.2rem;
  gap: 0.5rem;
}

.multi-select_selected-item {
  border: 1px solid;
  border-radius: 4px;
  padding: 2px;
  padding-right: 4px;
}
</style>
