<template>
  <div class="row position-relative empty-area">
    <span
      class="position-absolute absoluted_icon delete-icon-item"
      @click="deleteItem"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    </span>
    <div class="col-12">
      <div class="row">
        <div class="input-row">
          <label for="position">Название заведения<b>*</b></label>
          <div class="input-wrapper">
            <input
              type="text"
              placeholder="Введите заведения"
              required
              v-model="state.organization.val"
              @focusin="() => (errors.organization = '')"
            />

            <div class="text-danger d-block" v-if="errors.organization">
              {{ errors.organization }}
            </div>
          </div>
        </div>

        <div class="input-row">
          <label for="position">Название<b>*</b></label>
          <div class="input-wrapper">
            <input
              type="text"
              placeholder="Введите"
              required
              v-model="state.name.val"
              @focusin="() => (errors.name = '')"
            />
            <div class="text-danger d-block" v-if="errors.name">
              {{ errors.name }}
            </div>
          </div>
        </div>

        <div class="input-row">
          <label for="position">Специальность</label>
          <div class="input-wrapper">
            <input
              type="text"
              placeholder="Введите специальность"
              required
              v-model="state.profession.val"
              @focusin="() => (errors.profession = '')"
            />
            <div class="text-danger d-block" v-if="errors.profession">
              {{ errors.profession }}
            </div>
          </div>
        </div>

        <div class="input-row">
          <label for="position">Год окончание<b>*</b></label>
          <div class="input-wrapper">
            <CustomSelect
              :options="yearOptions"
              v-model="state.year.val"
              :label="'Выберите'"
              @focusin="() => (errors.year = '')"
            />
            <div class="text-danger d-block" v-if="errors.year">
              {{ errors.year }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDictionaryStore } from "~/store/dictionary";
import { useWatchStateValues } from "~/composables/useWatchStateValues";

const emit = defineEmits(["delete", "update"]);
const props = defineProps({
  isNew: {
    required: false,
    default: false,
  },
  id: {
    required: true,
    default: null,
  },
  profession: {
    required: false,
    default: null,
  },
  organization: {
    required: false,
    default: null,
  },
  name: {
    required: false,
    default: null,
  },
  year: {
    required: false,
    default: null,
  },
  errors: {
    required: true,
    default: {},
  },
});

const dictionaryStore = useDictionaryStore();

const isNew = ref(props.isNew);

const errors = ref(props.errors);
watch(
  () => props.errors,
  (newErrors) => {
    errors.value = newErrors;
  },
);

const deleteItem = (id = null) => {
  emit("delete", props.id);
};

onMounted(() => {
  if (props.index) {
    isNew.value = false;
  }
});

const state = reactive({
  id: {
    val: props.id,
    isValid: null,
  },
  organization: {
    val: props.organization,
    isValid: null,
  },
  year: {
    val: props.year,
    isValid: null,
  },
  name: {
    val: props.name,
    isValid: null,
  },
  profession: {
    val: props.profession,
    isValid: null,
  },
});

const yearOptions = computed(() => useYearOptions());
const save = () => {
  emit("update", props.id, useFormData(state));
};
watch(() => useWatchStateValues(state, true, true), save);
</script>

<style scoped>
.input-row + .input-row {
  margin-top: 2rem;
}
</style>
