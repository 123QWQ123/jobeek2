
<template>
    <div class="accordion-item" v-click-outside="close">
        <h2 class="accordion-header position-relative" id="headingOne">
            <button class="accordion-button" type="button" :class="{collapsed: isShown}" @click="clickOnButton">
                <div class="input-wrapper me-2">
                  {{ keyword }}
                </div>
            </button>
            <span class="position-absolute absoluted_icon delete-icon-item" @click="deleteItem">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </span>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse" :class="{show: isShown}">
            <div class="accordion-body">

                <div class="input-row" >
                  <label>Ключевое слово:</label>
                  <div class="input-wrapper mt-2">
                    <input type="text" class="form-control"  v-model="keyword" placeholder="Введите" />
                    <div class="text-danger d-block" v-if="errors.keyword">
                      {{ errors.keyword }}
                    </div>
                  </div>
                </div>
                <div class="input-row" >
                  <label>Где искать:</label>

                  <div class="input-wrapper mb-1">
                    <CustomSelect :options="subscription_keywords_srwsOptions" v-model="srws" :label="'Выберите'" @focusin="() => errors.srws = ''"></CustomSelect>
                    <div class="text-danger d-block" v-if="errors.srws">
                      {{ errors.srws }}
                    </div>
                  </div>
                </div>
                <div class="input-row" >
                  <label>Как искать:</label>


                  <div class="input-wrapper mb-1">

                    <CustomSelect :options="subscription_keywords_skwcOptions" v-model="skwc" :label="'Выберите'" @focusin="() => errors.skwc = ''"></CustomSelect>
                    <div class="text-danger d-block" v-if="errors.skwc">
                      {{ errors.skwc }}
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import IMask from "imask";
import {useDictionaryStore} from "~/store/dictionary";

const emit = defineEmits(['add', 'delete', 'update'])
const props = defineProps({
    isNew: {
        required: false,
        default: false
    },
    index: {
        required: false,
        default: false
    },
    errors: {
        required: true,
        default: {}
    },
    keyword: {
        required: true,
        default: null
    },
    srws: {
        required: true,
        default: ""
    },
    skwc: {
        required: true,
        default: ""
    },
});

const errors = computed(() => props.errors);
const isNew = ref(props.isNew);
const keyword = ref(props.keyword);
const srws = ref(props.srws)
const skwc = ref(props.skwc)
const dictionaryStore = useDictionaryStore();
const subscription_keywords_srwsOptions = computed(() => {
  return dictionaryStore.subscription_keywords_srws.map((item) => ({name: item.name, value: item.id}));
});
const subscription_keywords_skwcOptions = computed(() => {
  return dictionaryStore.subscription_keywords_skwc.map((item) => ({name: item.name, value: item.id}));
});

const isShown = ref(true);

const open = (() => isShown.value = true);
const close = (() => isShown.value = false);
const clickOnButton = ((e) => {
    if (e.target.classList.contains('accordion-button')){
        isShown.value = !isShown.value;
    }
});

watch(() => keyword.value, (newValue) => {
    if (newValue){
        emit('update', props.index, {keyword: newValue, srws: srws.value, skwc: skwc.value});
    }
});

watch(() => srws.value, (newValue) => {
    if (newValue){
        emit('update', props.index, {keyword: keyword.value, srws: newValue, skwc: skwc.value});
    }
})
watch(() => skwc.value, (newValue) => {
    if (newValue){
        emit('update', props.index, {keyword: keyword.value, srws: srws.value, skwc: newValue});
    }
})
const deleteItem = () => {
    emit('delete', props.index);
}

onMounted(() => {
    if (props.id){
        isNew.value = false;
    }
})
</script>

<style scoped>

.accordion-button{
  background-color: unset;
}

</style>