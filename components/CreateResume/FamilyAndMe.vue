<template>
  <div class="w-box">
    <div class="w-box-head">
      <h3 class="title">Об мне и семья</h3>
    </div>
    <div class="w-box-body">
        <div class="form_content" v-if="isShown">
            <div class="row w-100">
                <div class="col-12">
                    <label for="about_me">Об мне</label>
                    <textarea class="form-control" v-model="state.about_me.val"> </textarea>
                </div>
            </div>
            <div class="row w-100 mt-2">
                <div class="input-row">
                    <label for="remote-work">Семейное положение</label>
                    <div class="input-wrapper">
                        <CustomSelect :options="maritalStatusOptions" v-model="state.marital_status.val"></CustomSelect>

<!--                        <div :style="{display: 'none'}" class="text-danger" :class="{'d-block': !isValid}">-->
<!--                            Выберите-->
<!--                        </div>-->
                    </div>
                </div>
            </div>

            <div class="row w-100 mt-4">
                <div class="input-row">
                    <label for="remote-work">Есть дети?</label>
                    <div class="d-block text-start">
                            <input type="checkbox" :style="{height: '2rem', width: '2rem'}" v-model="state.has_children.val" />
                        <!--                    <div :style="{display: 'none'}" class="text-danger" :class="{'d-block': !isValid}">-->
                        <!--                        Выберите-->
                        <!--                    </div>-->
                    </div>
                </div>
            </div>
        </div>
        <div class="empty-area" v-else>
            <span>Здесь вы можете указать страну</span>
            <button class="add" type="button" @click="add">Добавить  </button>
        </div>
    </div>
  </div>
</template>

<script setup>

import {useDictionaryStore} from "~/store/dictionary";
import {storeToRefs} from "pinia";

const emit = defineEmits(['set']);
const isShown = ref(false);
const hasChanged = ref(false);

const state = reactive({
    about_me: {
        val: null,
        isValid: true
    },
    has_children: {
        val: false,
        isValid: true
    },
    marital_status: {
        val: 18,
        isValid: true
    },
})

const props = defineProps(['is_valid']);
const isValid = computed(() => props.is_valid);

const dictionaryStore = useDictionaryStore();
const {getMaritalStatus} = dictionaryStore;
await getMaritalStatus();

console.log(dictionaryStore.marital_statuses);

const maritalStatusOptions = computed(() => dictionaryStore.marital_statuses.map(item => ({value: item.id, name: item.name})));
console.log(maritalStatusOptions);


watch(() => state.marital_status, (newValues) => {
    emit('set', 'marital_status', newValues);
})
const add  = () => {
    isShown.value = !isShown.value;
    hasChanged.value = true;
}

const updateState = (name, value) => {
    console.log(name, value);
    emit('set', name, value);
};
</script>

<style scoped>

</style>