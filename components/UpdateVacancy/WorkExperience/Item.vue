<template>
    <div class="row position-relative empty-area">
      <span class="position-absolute absoluted_icon delete-icon-item" @click="deleteItem">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
      </span>
        <div class="col-12">
            <div class="row">

                <div class="input-row">
                    <label for="position">Должность<b>*</b></label>
                    <div class="input-wrapper">
                        <input type="text" placeholder="Введите специальность" required v-model="state.profession.val" @focusin="() => errors.profession = ''">

                        <div class="text-danger d-block" v-if="errors.profession">
                            {{ errors.profession }}
                        </div>
                    </div>
                </div>

                <div class="input-row">
                    <label for="position">Название компании<b>*</b></label>
                    <div class="input-wrapper">
                        <input type="text" placeholder="Введите заведения" required v-model="state.company.val" @focusin="() => errors.company = ''">

                        <div class="text-danger d-block" v-if="errors.company">
                            {{ errors.company }}
                        </div>
                    </div>
                </div>

                <div class="input-row">
                    <label for="position">О компании</label>
                    <div class="input-wrapper">
                        <textarea class="form-control" type="text" placeholder="Как можно подробнее расскажите о конкретных результатах вашей работы" v-model="state.industry.val" @focusin="() => errors.industry = ''"></textarea>

                        <div class="text-danger d-block" v-if="errors.industry">
                            {{ errors.industry }}
                        </div>
                    </div>
                </div>
                <div class="input-row">
                    <label for="position">Ссылка на сайт компании<b>*</b></label>
                    <div class="input-wrapper">
                        <input type="text" placeholder="Введите факультет" required v-model="state.company_url.val" @focusin="() => errors.company_url = ''">

                        <div class="text-danger d-block" v-if="errors.company_url">
                            {{ errors.company_url }}
                        </div>
                    </div>
                </div>
                <div class="input-row">
                    <label for="position">Даты<b>*</b></label>
                    <div class="input-wrapper">

                        <div class="c2">
                            <div>
                                <CustomSelect :options="yearOptions" v-model="state.start_year.val" :label="'Начало года'" @focusin="() => errors.start_year = ''"/>
                                <div class="alert alert-warning" v-if="state.start_year.isValid">Начало должен быть меньше чем окончания</div>

                                <div class="text-danger d-block" v-if="errors.start_year">
                                    {{ errors.start_year }}
                                </div>
                            </div>
                            <div>
                                <CustomSelect :options="monthOptions" v-model="state.start_month.val" :label="'Начало месяца '" @focusin="() => errors.start_month = ''"/>

                                <div class="text-danger d-block" v-if="errors.start_month">
                                    {{ errors.start_month }}
                                </div>
                            </div>
                        </div>
                        <div class="c2 mt-2" v-if="!state.until_today.val === true">
                            <div>
                                <CustomSelect :options="yearOptions" v-model="state.end_year.val" :label="'Окончание года'" @focusin="() => errors.end_year = ''"/>
                                <div class="alert alert-warning" v-if="state.end_year.isValid">Окончание должен быть больше чем начало</div>

                                <div class="text-danger d-block" v-if="errors.end_year">
                                    {{ errors.end_year }}
                                </div>
                            </div>
                            <div>
                                <CustomSelect :options="monthOptions" v-model="state.end_month.val" :label="'Окончание месяца '" @focusin="() => errors.end_month = ''" />

                                <div class="text-danger d-block" v-if="errors.end_month">
                                    {{ errors.end_month }}
                                </div>
                            </div>
                        </div>
                        <div class="check-block mt-2">
                            <div class="checkbox">
                                <input type="checkbox" id="until_today" v-model="state.until_today.val" :checked="state.until_today.val" @focusin="() => errors.until_today = ''">
                                <div class="checkbox-mask">
                                    <img src="~/assets/img/svg/check.svg" alt="#" />
                                </div>

                                <div class="text-danger d-block" v-if="errors.until_today">
                                    {{ errors.until_today }}
                                </div>
                            </div>
                            <label for="until_today">Работаю по настоящее время</label>
                        </div>
                    </div>
                </div>

                <div class="input-row">
                    <label for="position">Обязанности</label>
                    <div class="input-wrapper">
                        <textarea class="form-control" type="text" placeholder="Опишите, какие обязанности у вас были в этой компании, что именно вы делали" v-model="state.responsibilities.val" @focusin="() => errors.responsibilities = ''"></textarea>
                    </div>
                </div>
                <div class="input-row">
                    <label for="position">Достижения</label>
                    <div class="input-wrapper">
                        <textarea class="form-control" type="text" placeholder="Как можно подробнее расскажите о конкретных результатах вашей работы" v-model="state.achievements.val" @focusin="() => errors.achievements = ''"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import {useDictionaryStore} from "~/store/dictionary";
import {useWatchStateValues} from "~/composables/useWatchStateValues";

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
    profession: {
        required: true,
        default: null
    },
    company: {
        required: true,
        default: null
    },
    company_url: {
        required: true,
        default: null
    },
    type: {
        required: true,
        default: null
    },
    start_month: {
        required: true,
        default: null
    },
    end_month: {
        required: true,
        default: null
    },
    start_year: {
        required: true,
        default: null
    },
    end_year: {
        required: true,
        default: null
    },
    responsibilities: {
        required: true,
        default: null
    },
    achievements: {
        required: true,
        default: null
    },
    industry: {
        required: true,
        default: null
    },
    until_today: {
        required: true,
        type: Boolean,
        default: false
    },
    errors: {
        required: true,
        default: {}
    },
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
    id: {
        val: props.id,
        isValid: false,
    },
    profession: {
        val: props.profession,
        isValid: false,
    },
    company: {
        val: props.company,
        isValid: false,
    },
    company_url: {
        val: props.company_url,
        isValid: false,
    },
    industry: {
        val: props.industry,
        isValid: false,
    },
    start_month: {
        val: props.start_month,
        isValid: false,
    },
    end_month: {
        val: props.end_month,
        isValid: false,
    },
    start_year: {
        val: props.start_year,
        isValid: false,
    },
    until_today: {
        val: props.until_today,
        isValid: false,
    },
    end_year: {
        val: props.end_year,
        isValid: false,
    },
    responsibilities: {
        val: props.responsibilities,
        isValid: false,
    },
    achievements: {
        val: props.achievements,
        isValid: false,
    },
});

watch(() => state.until_today.val, (newUntilToday) => {
  if (newUntilToday === true){
      state.end_year.val = (new Date).getFullYear();
      state.end_month.val = (new Date).getMonth();
  }
})
watch(() => state.start_year.val, (newStartYear) => {
  if (state.end_year.val){
      if (newStartYear >= state.end_year.val){
          state.start_year.isValid = true;
          state.end_year.isValid = true;
      }else{
          state.start_year.isValid = false;
      }
  }
})

watch(() => state.end_year.val, (newEndYear) => {
  if (state.start_year.val){
      if (state.start_year.val >= newEndYear){
          state.end_year.isValid = true;
          state.start_year.isValid = true;
      }else{
          state.end_year.isValid = false;
      }

  }
})


const yearOptions = computed(() => useYearOptions())
const monthOptions = computed(() => useMonthOptions())
const save = () => {
    emit('update', props.id, useFormData(state));
}
watch(() => useWatchStateValues(state), save);

</script>

<style scoped>

</style>