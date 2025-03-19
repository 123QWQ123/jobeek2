<template>
  <div class="row position-relative empty-area">
    <span class="position-absolute absoluted_icon" @click="remove(idx)">
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

    <div class="input-row" v-show="!state.type_id.is_hidden">
      <label for="position">Уровен образование 2<b>*</b></label>
      <div class="input-wrapper">
        <VeeCustomSelect
          :options="educationLevelOptions"
          :name="`${name}[${idx}].type_id`"
          label="Выберите"
        />
      </div>
    </div>
    <div v-show="!state.profession.is_hidden" class="mt-2">
      <div class="input-row" v-if="isMoreFields">
        <label for="position">Название специальность<b>*</b></label>
        <div class="input-wrapper">
          <ResumeTextInput
            :name="`${name}[${idx}].profession`"
            placeholder="Введите специальность"
          />
        </div>
      </div>
    </div>

    <div class="input-row mt-2" v-show="!state.institute.is_hidden">
      <label for="position">Название заведения<b>*</b></label>
      <div class="input-wrapper">
        <ResumeTextInput
          :name="`${name}[${idx}].institute`"
          placeholder="Введите заведения"
        />
      </div>
    </div>

    <div class="input-row mt-2" v-show="!state.faculty.is_hidden">
      <label for="position">Факультет<b>*</b></label>
      <div class="input-wrapper">
        <ResumeTextInput
          :name="`${name}[${idx}].faculty`"
          placeholder="Введите факультет"
        />
      </div>
    </div>

    <div v-show="!state.form_id.is_hidden" class="mt-2">
      <div class="input-row" v-if="!isSchoolGraduate">
        <label for="position">Формат учебы</label>
        <div class="input-wrapper">
          <VeeCustomSelect
            :options="educationFormatOptions"
            :name="`${name}[${idx}].form_id`"
            label="Выберите"
          />
        </div>
      </div>
    </div>
    <div class="input-row mt-2" v-show="!state.end_year.is_hidden">
      <label for="position">Год окончание<b>*</b></label>
      <div class="input-wrapper">
        <VeeCustomSelect
          :options="yearOptions"
          :name="`${name}[${idx}].end_year`"
          name="end_year"
          label="Выберите"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { useField } from "vee-validate";
import { useDictionaryStore } from "~/store/dictionary.js";
import ResumeTextInput from "~/components/CreateResume/ResumeTextInput.vue";
import useProviders from "~/composables/useProviders.js";
import useProviderFields from "~/composables/useProviderFields.js";

const props = defineProps(["idx", "name"]);
const { idx, name } = toRefs(props);
const emit = defineEmits(["remove"]);

const { value: type_id } = useField(
  () => props.name + "[" + props.idx + "]" + "type_id",
);
const yearOptions = computed(() =>
  useYearOptions(1950, new Date().getUTCFullYear() + 5),
);

const isMoreFields = computed(() => type_id.value !== 115);
const isSchoolGraduate = computed(() => type_id.value === 116);

const dictionaryStore = useDictionaryStore();
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

const { providers } = useProviders();

const state = reactive({
  type_id: {
    is_hidden: false,
  },
  profession: {
    is_hidden: false,
  },
  end_year: {
    is_hidden: false,
  },
  faculty: {
    is_hidden: false,
  },
  institute: {
    is_hidden: false,
  },
  form_id: {
    is_hidden: false,
  },
});

const fields = ref({
  hh: {
    type_id: null,
    profession: false,
    end_year: true,
    faculty: false,
    institute: false,
    form_id: false,
  },
  superjob: {
    type_id: true,
    profession: false,
    end_year: true,
    faculty: false,
    institute: true,
    form_id: null,
  },
});

const { walkThroughFields } = useProviderFields(state, fields);
watch(
  () => providers.value,
  () => {
    walkThroughFields(providers.value);
  },
);

walkThroughFields(providers.value);
const remove = (id) => {
  emit("remove", id);
};
</script>

<style></style>

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
</style>
