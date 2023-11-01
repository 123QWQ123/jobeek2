<template>

  <div v-if="!isHidden">
    <div class="input-row" >
      <label>Телефон:</label>
      <div class="input-wrapper mt-2">
        <input ref="phone_element"  @focusin="onFocusInput('phone')"/>
        <div class="text-danger d-block" v-if="errors.phone">
          {{errors.phone}}
        </div>
      </div>
    </div>

    <div class="input-row mt-0" >
      <label>Коммент к телефон:</label>
      <div class="input-wrapper mt-2">
        <textarea class="form-control"  v-model="state.phone_comment.val"  @focusin="onFocusInput('phone_comment')" > </textarea>
        <div class="text-danger d-block" v-if="errors.phone_comment">
          {{errors.phone_comment}}
        </div>
        <button class="btn btn-primary mt-2" v-if="!isAdditionalPhoneShown" @click.prevent="isAdditionalPhoneShown = true">Добавить еще</button>
      </div>
    </div>

    <div class="row" v-if="isAdditionalPhoneShown">

      <div class="input-row" >
        <label>Доп. телефон:</label>
        <div class="input-wrapper mt-2">
          <input ref="additional_phone_element" @focusin="onFocusInput('additional_phone')"/>
          <div class="text-danger d-block" v-if="errors.additional_phone">
            {{errors.additional_phone}}
          </div>
        </div>
      </div>

      <div class="input-row mt-0" >
        <label>Коммент к телефон:</label>
        <div class="input-wrapper mt-2">
          <textarea class="form-control" v-model="state.additional_phone_comment.val"  @focusin="onFocusInput('additional_phone_comment')" > </textarea>
          <div class="text-danger d-block" v-if="errors.additional_phone_comment">
            {{errors.additional_phone_comment}}
          </div>
          <button class="btn btn-primary mt-2" v-if="isAdditionalPhoneShown" @click.prevent="isAdditionalPhoneShown = false">Отменить</button>
        </div>
      </div>

    </div>

  </div>

</template>

<script setup>
import {useVacancyStore} from "~/store/vacancy";

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    default: {},
    required: true,
  },
  errors: {
    default: {},
    required: true,
  },
  providers: {
    default: {
      hh: false,
      superjob: false,
    },
    required: true,
  },
});

import {useProfileStore} from "~/store/profile";
import {useDictionaryStore} from "~/store/dictionary";
import IMask from "imask";
import {useWatchStateValues} from "~/composables/useWatchStateValues";
const vacancyStore = useVacancyStore();
const profileStore = useProfileStore();
const route = useRoute();

const errors = ref(props.errors);
watch(() => props.errors, (newValue) => {
  errors.value = newValue;
})

const draftID = computed(() => route.query.draft_id);
const vacancyID = computed(() => route.query.vacancy_id);
const {updateVacancy, updateDraft, getMyVacancy, getMyDraft} = vacancyStore;

const {employer} = profileStore;
const my_vacancy = computed(() => vacancyStore.my_vacancy);

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
const isUpdated = ref(false);

const isHidden = computed(() => {
  if (!!props.providers.hh){
    return false;
  }
  return true;
})
watch(props.providers, (newProviders) => {
  if (!isHidden.value){
    reconfigurePhoneFields();
  }
})



const isAdditionalPhoneShown = ref(false);

const state = ref({
  phone: {
    val:  null,
    isValid: true,
    is_hidden: false,
  },
  phone_comment: {
    val:  null,
    isValid: true,
    is_hidden: false,
  },
  additional_phone: {
    val:  null,
    isValid: true,
    is_hidden: true,
  },
  additional_phone_comment: {
    val:  null,
    isValid: true,
    is_hidden: true,
  },
})
const emitChanges = (key, value) => {
  console.log(key, value);
  const passData = {
    phone: '+' + state.value['phone'].val,
    phone_comment: state.value['phone_comment'].val,
    additional_phone: '+' + state.value['additional_phone'].val,
    additional_phone_comment: state.value['additional_phone_comment'].val,
  };
  if (!isAdditionalPhoneShown.value){
    delete passData['additional_phone'];
    delete passData["additional_phone_comment"];
  }

  emit('update:modelValue', passData);
}

watch(() => useWatchStateValues(state.value, true), emitChanges);

const phone_element = ref();
const phone_mask = ref();
const additional_phone_element = ref();
const additional_phone_mask = ref();


const reconfigurePhoneFields = () => {

  nextTick(() => {
    phone_mask.value = new IMask(phone_element.value, {
      mask: "+{7}(000)000-00-00",
    });
    phone_element.value.addEventListener("input", (e) => {
      state.value.phone.val = phone_mask.value.unmaskedValue;
    });

    const newValue = props.modelValue;
    phone_mask.value.value = (newValue.phone ?? "").replace('+', '');
    state.value.phone.val = (newValue.phone ?? "").replace('+', '');
    state.value.phone_comment.val = newValue.phone_comment;
    if (newValue.additional_phone){
      isAdditionalPhoneShown.value = true;
      if (additional_phone_mask.value){
        additional_phone_mask.value.value = (newValue.additional_phone ?? "").replace('+', '');
      }
      state.value.additional_phone.val = (newValue.additional_phone ?? "").replace('+', '');
      state.value.additional_phone_comment.val = newValue.additional_phone_comment;
    }
  })
}
onMounted(() => {
  if (!isHidden.value){
    reconfigurePhoneFields();
  }
});

watch(() => isAdditionalPhoneShown.value, (newIsAdditionalPhoneShown) => {
  if (newIsAdditionalPhoneShown){
    nextTick(() => {
      additional_phone_mask.value = new IMask(additional_phone_element.value, {
        mask: "+{7}(000)000-00-00",
      });
      if (state.value.additional_phone.val){
        additional_phone_element.value.addEventListener("input", (e) => {
          state.value.additional_phone.val = additional_phone_mask.value.unmaskedValue;
        });
        additional_phone_mask.value.value = state.value.additional_phone.val.toString();
      }else{
        additional_phone_element.value.addEventListener("input", (e) => {
          state.value.additional_phone.val = additional_phone_mask.value.unmaskedValue;
        });
      }
    })
  }else{
    state.value.additional_phone.val = additional_phone_mask.value.unmaskedValue;
  }
})
const dictionaryStore = useDictionaryStore();
const onFocusInput = (key) => {
  if (errors.value instanceof Object){
    errors.value[key] = '';
  }
}

</script>

<style>

.from-to-block{

}

</style>