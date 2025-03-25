<template>
  <div class="input-row">
    <label>Социалные сети</label>
    <div class="input-wrapper mt-2">
      <div class="social_network_form">
        <div
          class="row position-relative mt-2"
          v-for="(field, idx) in fields"
          :key="field.key"
        >
          <span
            class="position-absolute absoluted_icon cursor-pointer"
            @click="remove(idx)"
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

          <div>
            <Field
              :name="props.name + '[' + [idx] + ']'"
              :rules="{ url: true }"
            />
          </div>
        </div>

        <button
          type="button"
          class="btn btn-primary btn-sm mt-3"
          v-if="fields.length === 0"
          @click="push('https://')"
        >
          Добавить
        </button>
        <button
          type="button"
          class="btn btn-primary mt-3 btn-sm"
          v-if="fields.length > 0"
          @click="push('https://')"
        >
          Добавить еще
        </button>
      </div>

      <div class="text-danger d-block" v-if="errorMessage">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useField, useFieldArray } from "vee-validate";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  name: {
    required: true,
    default: "name",
  },
});

const { errorMessage } = useField(() => props.name);
const { remove, push, fields } = useFieldArray(() => props.name);

onMounted(() => {
  // if (!props.modelValue.length) {
  //   reset();
  // }
});
</script>

<style scoped>



</style>
