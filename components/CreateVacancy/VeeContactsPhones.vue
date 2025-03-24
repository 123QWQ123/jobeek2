<template>
  <div>
    <div class="input-row">
      <label>Телефон:</label>
      <div class="input-wrapper mt-2">
        <CreateVacancyPhoneInput name="contacts.phones.phone" />
      </div>
    </div>

    <div class="input-row mt-0">
      <label>Коммент к телефон:</label>
      <div class="input-wrapper mt-2">
        <CreateVacancyTextarea name="contacts.phones.phone_comment" />
        <button
          class="btn btn-primary mt-2 btn-sm"
          v-if="!isAdditionalPhoneShown"
          @click.prevent="isAdditionalPhoneShown = true"
        >
          Добавить еще
        </button>
      </div>
    </div>

    <div class="row" v-if="isAdditionalPhoneShown">
      <div class="input-row">
        <label>Доп. телефон:</label>
        <div class="input-wrapper mt-2">
          <CreateVacancyPhoneInput name="contacts.phones.additional_phone" />
        </div>
      </div>

      <div class="input-row mt-0">
        <label>Коммент к телефон:</label>
        <div class="input-wrapper mt-2">
          <CreateVacancyTextarea
            name="contacts.phones.additional_phone_comment"
          />
          <button
            class="btn btn-primary mt-2 btn-sm"
            v-if="isAdditionalPhoneShown"
            @click.prevent="isAdditionalPhoneShown = false"
          >
            Отменить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useVacancyStore } from "~/store/vacancy";
import { useProfileStore } from "~/store/profile";
import { useDictionaryStore } from "~/store/dictionary";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  name: {
    default: "phones",
    required: false,
  },
});

const phone = ref(null);

const vacancyStore = useVacancyStore();
const profileStore = useProfileStore();
const route = useRoute();

const errors = ref(props.errors);
watch(
  () => props.errors,
  (newValue) => {
    errors.value = newValue;
  },
);

const draftID = computed(() => route.query.draft_id);
const vacancyID = computed(() => route.query.vacancy_id);
const { updateVacancy, updateDraft, getMyVacancy, getMyDraft } = vacancyStore;

const { employer } = profileStore;
const my_vacancy = computed(() => vacancyStore.my_vacancy);

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isUpdated = ref(false);

const isAdditionalPhoneShown = ref(false);

const state = ref({
  phone: {
    val: null,
    isValid: true,
    is_hidden: false,
  },
  phone_comment: {
    val: null,
    isValid: true,
    is_hidden: false,
  },
  additional_phone: {
    val: null,
    isValid: true,
    is_hidden: true,
  },
  additional_phone_comment: {
    val: null,
    isValid: true,
    is_hidden: true,
  },
});
const dictionaryStore = useDictionaryStore();
const onFocusInput = (key) => {
  if (errors.value instanceof Object) {
    errors.value[key] = "";
  }
};
</script>

<style>
.from-to-block {
}
</style>
