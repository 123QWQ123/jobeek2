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
    <div class="input-row" v-show="!state.name.is_hidden">
      <label for="position">Название<b>*</b></label>
      <div class="input-wrapper">
        <ResumeTextInput :name="`${name}[${idx}].name`" placeholder="Введите" />
      </div>
    </div>

    <div class="input-row" v-show="!state.organization.is_hidden">
      <label for="organization">Название заведения<b>*</b></label>
      <div class="input-wrapper">
        <ResumeTextInput
          :name="`${name}[${idx}].organization`"
          placeholder="Введите"
        />
      </div>
    </div>

    <div class="input-row" v-show="!state.profession.is_hidden">
      <label for="position">Специальность</label>
      <div class="input-wrapper">
        <ResumeTextInput
          :name="`${name}[${idx}].profession`"
          placeholder="Введите"
        />
      </div>
    </div>

    <div class="input-row" v-show="!state.year.is_hidden">
      <label for="position">Год окончание<b>*</b></label>
      <div class="input-wrapper">
        <VeeCustomSelect
          :options="yearOptions"
          :name="`${name}[${idx}].year`"
          label="Выберите"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { useDictionaryStore } from "~/store/dictionary.js";
import ResumeTextInput from "~/components/CreateResume/ResumeTextInput.vue";
import useProviders from "~/composables/useProviders.js";
import useProviderFields from "~/composables/useProviderFields.js";

const props = defineProps(["idx", "name"]);
const { idx, name } = toRefs(props);
const emit = defineEmits(["remove"]);

const yearOptions = computed(() =>
  useYearOptions(1950, new Date().getUTCFullYear() + 5),
);

const dictionaryStore = useDictionaryStore();

const { providers } = useProviders();

const state = reactive({
  name: {
    is_hidden: false,
  },
  organization: {
    is_hidden: false,
  },
  year: {
    is_hidden: false,
  },
  profession: {
    is_hidden: false,
  },
});

const fields = ref({
  hh: {
    name: true,
    organization: true,
    year: true,
    profession: null,
  },
  superjob: {
    name: true,
    profession: null,
    organization: true,
    year: true,
  },
});

const { walkThroughFields } = useProviderFields(state, fields);
watch(
  () => providers.value,
  () => {
    walkThroughFields(providers.value);
  },
);
onMounted(() => {
  walkThroughFields(providers.value);
});
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
