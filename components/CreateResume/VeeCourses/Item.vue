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
    <div class="input-row" v-show="!state.organization.is_hidden">
      <label for="position">Название<b>*</b></label>
      <div class="input-wrapper">
        <ResumeTextInput
          :name="`${name}[${idx}].title`"
          placeholder="Введите"
        />
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

    <div class="input-row" v-show="!state.certificate_url.is_hidden">
      <label for="position">Ссылка на сертификат</label>
      <div class="input-wrapper">
        <ResumeTextInput
          :name="`${name}[${idx}].certificate_url`"
          placeholder="Введите"
        />
      </div>
    </div>

    <div class="input-row" v-show="!state.end_year.is_hidden">
      <label for="position">Год окончание<b>*</b></label>
      <div class="input-wrapper">
        <VeeCustomSelect
          :options="yearOptions"
          :name="`${name}[${idx}].end_year`"
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
  title: {
    is_hidden: false,
  },
  organization: {
    is_hidden: false,
  },
  end_year: {
    is_hidden: false,
  },
  profession: {
    is_hidden: false,
  },
  certificate_url: {
    is_hidden: false,
  },
});

const fields = ref({
  hh: {
    title: true,
    organization: true,
    end_year: true,
    profession: false,
    certificate_url: null,
  },
  superjob: {
    title: false,
    organization: true,
    end_year: true,
    profession: null,
    certificate_url: false,
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
<style scoped></style>
