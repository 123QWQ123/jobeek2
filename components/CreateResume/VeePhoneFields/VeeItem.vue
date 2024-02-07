<template>
  <div class="row position-relative">
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

    <div class="input-wrapper">
      <VeeCustomSelect
        :options="preferredContactTypeOptions"
        :name="`${name}[${idx}].type_id`"
        label="Выберите"
      />
    </div>

    <ResumePhoneInputWithConfirmationAndCaptcha
      :name="`${props.name}[${idx}].phone`"
    />

    <div class="row">
      <ResumeCheckboxInput
        name="is_preferred"
        :name="`${props.name}[${idx}].is_preferred`"
        label="предпочтительным является"
      />
    </div>

    <div class="input-row mt-2">
      <label>Отвечу на звонки</label>

      <div class="start-to-end">
        <div class="hour_c2">
          <VeeCustomSelect
            :options="useHourOptions()"
            :name="`${props.name}[${idx}].start_available_time_phone`"
            :label="'От'"
          />
        </div>
        <div class="hour_c2">
          <VeeCustomSelect
            :options="useHourOptions()"
            :name="`${props.name}[${idx}].end_available_time_phone`"
            :label="'До'"
          />
        </div>
      </div>
    </div>

    <div class="input-wrapper mt-2">
      <ResumeTextarea :name="`${props.name}[${idx}].comment`"></ResumeTextarea>
    </div>
  </div>
</template>
<script setup>
import { useField } from "vee-validate";
import { useDictionaryStore } from "~/store/dictionary.js";
import ResumeTextarea from "~/components/CreateResume/ResumeTextarea.vue";
import ResumeCheckboxInput from "~/components/CreateResume/ResumeCheckboxInput.vue";
import { useHourOptions } from "~/composables/useHourOptions.js";
import ResumePhoneInputWithConfirmationAndCaptcha from "~/components/CreateResume/VeePhoneFields/PhoneInputWithConfirmationAndCaptcha.vue";

const props = defineProps(["idx", "name"]);
const { idx, name } = toRefs(props);
const emit = defineEmits(["remove"]);

const { value, errorMessage } = useField(
  () => props.name + "[" + props.idx + "].phone",
);
const dictionaryStore = useDictionaryStore();
const preferredContactTypeOptions = computed(() => {
  return dictionaryStore.preferred_contact_types.map((item) => ({
    name: item.name,
    value: item.id,
  }));
});

const remove = (id) => {
  emit("remove", id);
};
</script>

<style></style>

<style scoped>
.start-to-end {
  display: inline-flex;
  flex: 1 1;
  gap: 1rem;
}

.hour_c2 {
  flex-basis: fit-content;
  flex: 1;
}
</style>
