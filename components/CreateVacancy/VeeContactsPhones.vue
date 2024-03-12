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
          class="btn btn-primary mt-2"
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
            class="btn btn-primary mt-2"
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
    required: true,
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

// const isHidden = computed(() => {
//   if (!!props.providers.hh) {
//     return false;
//   }
//   return true;
// });
// watch(props.providers, (newProviders) => {
//   if (!isHidden.value) {
//     reconfigurePhoneFields();
//   }
// });

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
// const emitChanges = (key, value) => {
//   console.log(key, value);
//   const passData = {
//     phone: state.value["phone"].val,
//     phone_comment: state.value["phone_comment"].val,
//     additional_phone: state.value["additional_phone"].val,
//     additional_phone_comment: state.value["additional_phone_comment"].val,
//   };
//   if (!isAdditionalPhoneShown.value) {
//     delete passData["additional_phone"];
//     delete passData["additional_phone_comment"];
//   }
//
//   emit("update:modelValue", passData);
// };

// watch(() => useWatchStateValues(state.value, true), emitChanges);

const additional_phone_element = ref();
const additional_phone_mask = ref();

// const reconfigurePhoneFields = () => {
//   nextTick(() => {
//     phone_mask.value = new IMask(phone_element.value, {
//       mask: "+{7}(000)000-00-00",
//     });
//     phone_element.value.addEventListener("input", (e) => {
//       state.value.phone.val = phone_mask.value.unmaskedValue;
//     });
//
//     const newValue = props.modelValue;
//     phone_mask.value.value = (newValue.phone ?? "").replace("+", "");
//     state.value.phone.val = (newValue.phone ?? "").replace("+", "");
//     state.value.phone_comment.val = newValue.phone_comment;
//     if (newValue.additional_phone) {
//       isAdditionalPhoneShown.value = true;
//       if (additional_phone_mask.value) {
//         additional_phone_mask.value.value = (
//           newValue.additional_phone ?? ""
//         ).replace("+", "");
//       }
//       state.value.additional_phone.val = (
//         newValue.additional_phone ?? ""
//       ).replace("+", "");
//       state.value.additional_phone_comment.val =
//         newValue.additional_phone_comment;
//     }
//   });
// };
// onMounted(() => {
//   if (!isHidden.value) {
//     reconfigurePhoneFields();
//   }
// });

// watch(
//   () => isAdditionalPhoneShown.value,
//   (newIsAdditionalPhoneShown) => {
//     if (newIsAdditionalPhoneShown) {
//       nextTick(() => {
//         additional_phone_mask.value = new IMask(
//           additional_phone_element.value,
//           {
//             mask: "+{7}(000)000-00-00",
//           },
//         );
//         if (state.value.additional_phone.val) {
//           additional_phone_element.value.addEventListener("input", (e) => {
//             state.value.additional_phone.val =
//               additional_phone_mask.value.unmaskedValue;
//           });
//           additional_phone_mask.value.value =
//             state.value.additional_phone.val.toString();
//         } else {
//           additional_phone_element.value.addEventListener("input", (e) => {
//             state.value.additional_phone.val =
//               additional_phone_mask.value.unmaskedValue;
//           });
//         }
//       });
//     } else {
//       state.value.additional_phone.val =
//         additional_phone_mask.value.unmaskedValue;
//     }
//   },
// );
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
