<template>
  <div class="col-lg-12 col-xs-12">
    <div class="input-wrapper">
      <input
        type="text"
        v-model="skill"
        @keyup.enter.prevent="onSubmit"
        placeholder="Введите"
      />

      <button
        class="btn btn-primary mt-2"
        v-if="props.isNew"
        type="button"
        @click="onSubmit"
      >
        Добавить
      </button>
      <button
        class="btn btn-primary mt-2"
        v-else
        type="button"
        @click="onSubmit"
      >
        Обновить
      </button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["add", "delete", "update"]);
const props = defineProps({
  isNew: {
    required: false,
    default: true,
  },
  skill: {
    required: true,
  },
  id: {
    required: true,
  },
});

const isNew = ref(props.isNew);
const skill = ref(props.skill);

watchEffect(() => {
  skill.value = props.skill;
  isNew.value = props.isNew;
});

const onSubmit = () => {
  if (skill.value) {
    if (props.isNew) {
      emit("add", skill.value);
    } else {
      emit("update", props.id, skill.value);
    }
  }
  skill.value = "";
};
const deleteItem = (id = null) => {
  emit("delete", props.id, skill.value);
};

onMounted(() => {
  if (props.id) {
    isNew.value = false;
  }
});
</script>

<style scoped>
.input-wrapper {
}

.absoluted_icon svg {
  width: 24px;
  height: 24px;
}
</style>
