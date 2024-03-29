<template>
  <div class="row position-relative empty-area">
    <span class="position-absolute absoluted_icon" @click="deleteItem">
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
          <label for="position">Уровен образование 2<b>*</b></label>
          <div class="input-wrapper">
            <CustomSelect
              :options="educationLevelOptions"
              :label="'Выберите'"
              v-model="state.type_id.val"
              @focusin="() => (errors.type_id = '')"
            />

            <div class="text-danger d-block" v-if="errors.type_id">
              {{ errors.type_id }}
            </div>
          </div>
        </div>

        <div v-if="isMoreFields" class="mt-4">
          <div class="input-row" v-if="!isSchoolGraduate">
            <label for="position">Название специальность</label>
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
            <label for="position">Название заведения<b>*</b></label>
            <div class="input-wrapper">
              <input
                type="text"
                placeholder="Введите заведения"
                required
                v-model="state.institute.val"
                @focusin="() => (errors.institute = '')"
              />

              <div class="text-danger d-block" v-if="errors.institute">
                {{ errors.institute }}
              </div>
            </div>
          </div>

          <div class="input-row">
            <label for="position">Год окончание<b>*</b></label>
            <div class="input-wrapper">
              <CustomSelect
                :options="yearOptions"
                v-model="state.end_year.val"
                :label="'Укажите'"
                @focusin="() => (errors.end_year = '')"
              />
              <div class="text-danger d-block" v-if="errors.end_year">
                {{ errors.end_year }}
              </div>
            </div>
          </div>

          <div class="input-row" v-if="!isSchoolGraduate">
            <label for="position">Формат учебы</label>
            <div class="input-wrapper">
              <CustomSelect
                :options="educationFormatOptions"
                v-model="state.form_id.val"
                :label="'Выберите'"
                @focusin="() => (errors.form_id = '')"
              />
              <div class="text-danger d-block" v-if="errors.form_id">
                {{ errors.form_id }}
              </div>
            </div>
          </div>

          <div class="input-row" v-if="!isSchoolGraduate">
            <label for="position">Факультет</label>
            <div class="input-wrapper">
              <input
                type="text"
                placeholder="Введите факультет"
                required
                v-model="state.faculty.val"
                @focusin="() => (errors.faculty = '')"
              />
              <div class="text-danger d-block" v-if="errors.faculty">
                {{ errors.faculty }}
              </div>
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
import useProviderFields from "~/composables/useProviderFields";

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
  type_id: {
    required: true,
    default: null,
  },
  profession: {
    required: false,
    default: null,
  },
  institute: {
    required: false,
    default: null,
  },
  faculty: {
    required: false,
    default: null,
  },
  form_id: {
    required: false,
    default: null,
  },
  parent_type_id: {
    required: true,
    default: null,
  },
  end_year: {
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
  providers: {
    default: {
      hh: false,
      superjob: false,
    },
    required: true,
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
watch(
  () => props.parent_type_id,
  (newParentTypeId) => {
    console.log(newParentTypeId);
    state.type_id.val = state.type_id.val
      ? state.type_id.val
      : props.parent_type_id;
  },
);

const deleteItem = (id = null) => {
  emit("delete", props.id);
};

const state = reactive({
  id: {
    val: props.id,
    isValid: null,
    is_hidden: false,
  },
  type_id: {
    val: props.type_id ?? props.parent_type_id,
    isValid: null,
    is_hidden: false,
  },
  profession: {
    val: props.profession,
    isValid: null,
    is_hidden: false,
  },
  institute: {
    val: props.institute,
    isValid: null,
    is_hidden: false,
  },
  faculty: {
    val: props.faculty,
    isValid: null,
    is_hidden: false,
  },
  form_id: {
    val: props.form_id,
    isValid: null,
    is_hidden: false,
  },
  start_year: {
    val: props.start_year,
    isValid: null,
    is_hidden: false,
  },
  end_year: {
    val: props.end_year,
    isValid: null,
    is_hidden: false,
  },
});
const fields = ref({
  hh: {},
  superjob: {
    form_id: false,
    type_id: true,
  },
});
// const fields = ref({
//   hh: {
//     form_id: ["required", "string"],
//     type_id: ["optional", "string"],
//     institute: ["required", "integer"],
//     faculty: ["optional", "string"],
//     profession: ["optional", "string"],
//     end_year: ["required", "string"],
//   },
//   superjob: {
//     form_id: ["optional", "string"],
//     type_id: ["required", "string"],
//     institute: ["optional", "integer"],
//     faculty: ["optional", "string"],
//     profession: ["optional", "string"],
//     end_year: ["optional", "string"],
//   },
// });
const { walkThroughFields } = useProviderFields(state, fields);
const providers = ref(props.providers ?? []);
watch(
  () => props.providers,
  () => {
    walkThroughFields(props.providers);
  },
);

const isMoreFields = computed(() => state.type_id.val != 115);
const isSchoolGraduate = computed(() => state.type_id.val == 116);

const educationLevelOptions = computed(() => {
  return dictionaryStore.resume_educations.map((item) => ({
    name: item.name,
    value: item.id,
  }));
});
const educationFormatOptions = computed(() => {
  return dictionaryStore.resume_education_forms.map((item) => ({
    name: item.name,
    value: item.id,
  }));
});
const yearOptions = computed(() =>
  useYearOptions(1950, new Date().getUTCFullYear() + 5),
);

onMounted(() => {
  if (props.index) {
    isNew.value = false;
  }
});
const save = () => {
  console.log("ID" + props.id);
  emit("update", props.id, useFormData(state));
};
watch(() => useWatchStateValues(state, true, true), save);
</script>

<style scoped>
.absoluted_icon {
  position: absolute;
  left: -0.5rem;
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

.input-row + .input-row {
  margin-top: 2rem;
}
</style>
