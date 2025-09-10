<template>
  <div class="row position-relative">
    <div>
      <span class="position-absolute absoluted_icon delete-icon-item" @click="remove(idx)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-x"
          viewBox="0 0 16 16"
        >
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </span>
    </div>

    <div class="input-wrapper mt-2" v-show="!state.type_id.is_hidden">
      <VeeCustomSelect
        :options="preferredContactTypeOptions"
        :name="`${name}[${idx}].type_id`"
        label="Выберите"
      />
    </div>

    <PhoneInputWithCaptchaAndConfirmation
      v-show="!state.phone.is_hidden"
      :name="`${name}[${idx}].phone`"
      :required="providers.hh"
    />

    <div class="row" v-show="!state.is_preferred.is_hidden">
      <ResumeCheckboxInput
        :name="`${name}[${idx}].is_preferred`"
        label="предпочтительным является"
      />
    </div>

    <div
      class="input-row mt-2"
      v-if="
        !state.end_available_time_phone.is_hidden &&
        !state.start_available_time_phone.is_hidden
      "
    >
      <label>Отвечу на звонки</label>

      <div class="start-to-end">
        <div
          class="hour_c2"
          v-show="!state.start_available_time_phone.is_hidden"
        >
          <VeeCustomSelect
            :options="useHourOptions()"
            :name="`${name}[${idx}].start_available_time_phone`"
            :label="'От'"
          />
        </div>
        <div class="hour_c2" v-show="!state.end_available_time_phone.is_hidden">
          <VeeCustomSelect
            :options="useHourOptions()"
            :name="`${name}[${idx}].end_available_time_phone`"
            :label="'До'"
          />
        </div>
      </div>
    </div>

    <div class="input-wrapper mt-2" v-show="!state.comment.is_hidden">
      <ResumeTextarea
        :name="`${name}[${idx}].comment`"
        :value="comment"
      ></ResumeTextarea>
    </div>
  </div>
</template>
<script setup>
import { useField } from "vee-validate";
import { useDictionaryStore } from "~/store/dictionary.js";
import useProviderFields from "~/composables/useProviderFields.js";
import useProviders from "~/composables/useProviders.js";
import PhoneInputWithCaptchaAndConfirmation from "./PhoneInputWithConfirmationAndCaptcha.vue";
import ResumeCheckboxInput from "~/components/CreateResume/ResumeCheckboxInput.vue";
import ResumeTextarea from "~/components/CreateResume/ResumeTextarea.vue";

const { idx, name, value } = defineProps(["idx", "name", "value"]);

const emit = defineEmits(["remove"]);

const { comment, start_available_time_phone } = value;

const dictionaryStore = useDictionaryStore();
const preferredContactTypeOptions = computed(() => {
  return dictionaryStore.preferred_contact_types.map((item) => ({
    name: item.name,
    value: item.id,
  }));
});

const { providers } = useProviders();

const state = reactive({
  type_id: {
    is_hidden: false,
  },
  phone: {
    is_hidden: false,
  },
  is_preferred: {
    is_hidden: false,
  },
  start_available_time_phone: {
    is_hidden: false,
  },
  end_available_time_phone: {
    is_hidden: false,
  },
  comment: {
    is_hidden: false,
  },
});

const fields = ref({
  hh: {
    type_id: true,
    phone: true,
    comment: false,
    is_preferred: false,
    start_available_time_phone: null,
    end_available_time_phone: null,
  },
  superjob: {
    type_id: null,
    phone: true,
    comment: null,
    is_preferred: null,
    start_available_time_phone: false,
    end_available_time_phone: false,
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
