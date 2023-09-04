<template>
        <div class="row position-relative mt-4">

            <span class="position-absolute absoluted_icon" @click="deleteItem">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </span>
            <div class="input-row">
                <div class="add-row-select">
                    <CustomSelect :options="contactOptions" v-model="state.type.val"></CustomSelect>

                </div>

              <div class="input-wrapper col-12">
                <div class="c">

                  <div>
                    <input type="text" placeholder="Телефон" id="phone" ref="phoneInputElement">
                  </div>
                  <div class="from-to-block" v-if="state.type.val === 'phone'">
                    <label>Отвечу на звонки</label>
                    <div class="c2">

                      <div>
                        <CustomSelect :options="useHourOptions()" v-model="state.phone_time_start.val"  :label="'От'" @focusin="() => errors.phone_time_start = ''"></CustomSelect>

                        <div class="text-danger d-block" v-if="errors.phone_time_start">
                          {{ errors.phone_time_start }}
                        </div>
                      </div>
                      <div>
                        <CustomSelect :options="useHourOptions()" v-model="state.phone_time_end.val" :label="'До'" @focusin="() => errors.phone_time_end = ''"></CustomSelect>

                        <div class="text-danger d-block" v-if="errors.phone_time_end">
                          {{ errors.phone_time_end }}
                        </div>
                      </div>
                    </div>

                  </div>
                  <div class="text-danger d-block" v-if="errors.phone">
                    {{ errors.phone }}
                  </div>

                </div>

                <div class="с mt-4">
                  <textarea type="text" class="form-control" placeholder="Коммент" v-model="state.comment.val" > </textarea>
                  <div class="text-danger d-block" v-if="errors.comment">
                    {{errors.comment}}
                  </div>
                </div>
              </div>
            </div>
        </div>
</template>

<script setup>
import {useDictionaryStore} from "~/store/dictionary";
import {useWatchStateValues} from "~/composables/useWatchStateValues";
import {useContactOptions} from "~/composables/useContactOptions";
import {useHourOptions} from "~/composables/useHourOptions";
import IMask from "imask";

const emit = defineEmits(['delete', 'update'])
const props = defineProps({
    isNew: {
        required: false,
        default: false
    },
    id: {
        required: true,
        default: null
    },
    type: {
        required: true,
        default: null
    },
    value: {
        required: true,
        default: null
    },
    errors: {
        required: true,
        default: {}
    },
});

const contactOptions = useContactOptions();

const contacts = ref([]);

const phoneInputElement = ref();
const phoneMask = ref(null);

onMounted(( ) => {
  phoneMask.value = new IMask(phoneInputElement.value, {
    mask: "+{7}(000)000-00-00",
  });
  phoneInputElement.value.addEventListener("input", (e) => {
    console.log(state.type.val);
    if (state.type.val === 'phone'){
      state.value.val = phoneMask.value.unmaskedValue;
    }else{
      state.value.val = e.target.value;
    }
  });
});


const errors = ref(props.errors);
watch(() => props.errors, (newErrors) => {
    errors.value = newErrors;
});

const dictionaryStore = useDictionaryStore();

const isNew = ref(props.isNew);

const deleteItem = (id = null) => {
    emit('delete', props.id);
}

onMounted(() => {
    if (props.index){
        isNew.value = false;
    }
});

const state = reactive({
    type: {
        val: props.type,
        isValid: null,
    },
    value: {
        val: props.value,
        isValid: null,
    },
    phone_time_start: {
        val: props.phone_time_start,
        isValid: null,
    },
    phone_time_end: {
        val: props.phone_time_start,
        isValid: null,
    },
    comment: {
        val: props.phone_time_start,
        isValid: null,
    },
});

watch(() => state.type.val, (newType) => {
  console.log(newType);
  if (newType === 'phone'){
    phoneMask.value = new IMask(phoneInputElement.value, {
      mask: "+{7}(000)000-00-00",
    });
  }else{
    phoneMask.value.destroy();
  }
})
const save = () => {
    emit('update', props.id, {type: state.type.val, value: state.value.val, id: props.id});
}
// watch(() => useWatchStateValues(state), save);
watch(() => state.type.val, save);
watch(() => state.value.val,save);
</script>

<style scoped>

.absoluted_icon{
    position: absolute;
    left: -1.8rem;
    top: 0.5rem;
    font-size: 1rem;
    z-index: 1;
    cursor: pointer;
    max-width: 3rem;
}
.absoluted_icon svg{
    width: 24px;
    height: 24px;
}
</style>