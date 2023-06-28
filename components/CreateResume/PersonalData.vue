<template>
    <div class="w-box w-box--main w-box-resume pb-4" v-click-outside="save">
        <div class="w-box-head">
            <h1 class="title">{{ formTitle }}</h1>
            <div class="descr">Получайте уведомления о новых вакансиях по созданному запросу</div>
        </div>

        <div class="w-box-body" >
<!--                  <CreateResumeSocialNetworks></CreateResumeSocialNetworks>-->
<!--            <CreateResumeProviders></CreateResumeProviders>-->

            <div class="input-row" v-if="!draftID">
                <label for="name">Название<b>*</b></label>
                <div class="input-wrapper">
                    <div class="c1 mt-1">
                        <input type="text" placeholder="Название" v-model="state.title.val">
                    </div>
                </div>
            </div>
            <div class="input-row">
                <label for="photo">Фото</label>
                <div class="dwld-photo">
                    <div class="photo">
                        <input ref="photoElement" @change="handleUploadFile" type="file" name="photo" id="photo">
                        <img :src="photoUrl" alt="#">
                        <div class="photo-actions">
                            <button class="photo-action redact" type="button" @click="openFileBrowser">
                                <svg  width="28" height="28" viewBox="0 0 28 28" fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.5 24.5H24.5" stroke="#D2D2D2" stroke-width="1.5"
                                          stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.2583 6.79933L20.0333 12.5743M14.2583 6.79933L17.5577 3.5L23.3327 9.275L20.0333 12.5743L14.2583 6.79933ZM14.2583 6.79933L7.71683 13.3408C7.49803 13.5596 7.37507 13.8563 7.375 14.1657V19.4577H12.667C12.9764 19.4576 13.2731 19.3346 13.4918 19.1158L20.0333 12.5743L14.2583 6.79933Z"
                                          stroke="#D2D2D2" stroke-width="1.5" stroke-linecap="round"
                                          stroke-linejoin="round" />
                                </svg>
                            </button>
                            <button class="photo-action delete" @click="clearPhotoUrl" type="button">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.0007 2.04175C14.9691 2.04168 15.901 2.41223 16.6049 3.07737C17.3089 3.7425 17.7317 4.65181 17.7865 5.61875L17.7923 5.83342H23.9173C24.139 5.83348 24.3524 5.9177 24.5144 6.06905C24.6764 6.2204 24.7749 6.4276 24.79 6.64878C24.8051 6.86995 24.7357 7.08862 24.5958 7.2606C24.4559 7.43257 24.2559 7.54503 24.0363 7.57525L23.9173 7.58342H22.9887L21.4953 22.7734C21.4205 23.5307 21.0789 24.2367 20.5316 24.7655C19.9843 25.2942 19.2669 25.6111 18.5075 25.6597L18.3022 25.6667H9.69915C8.93786 25.6667 8.20138 25.396 7.62132 24.9029C7.04127 24.4099 6.65546 23.7266 6.53282 22.9753L6.50598 22.7722L5.01148 7.58342H4.08398C3.87254 7.58341 3.66825 7.50683 3.5089 7.36785C3.34955 7.22887 3.24591 7.03689 3.21715 6.82742L3.20898 6.70842C3.20899 6.49697 3.28557 6.29268 3.42455 6.13333C3.56352 5.97398 3.75551 5.87034 3.96498 5.84158L4.08398 5.83342H10.209C10.209 4.8278 10.6085 3.86338 11.3195 3.1523C12.0306 2.44123 12.995 2.04175 14.0007 2.04175ZM21.2305 7.58342H6.76965L8.24782 22.6007C8.28055 22.9358 8.42821 23.2493 8.66575 23.4879C8.90328 23.7265 9.21605 23.8755 9.55098 23.9097L9.69915 23.9167H18.3022C19.0022 23.9167 19.596 23.4209 19.7313 22.7477L19.7547 22.6007L21.2293 7.58342H21.2305ZM16.0423 10.7917C16.2538 10.7918 16.4581 10.8683 16.6174 11.0073C16.7768 11.1463 16.8804 11.3383 16.9092 11.5477L16.9173 11.6667V19.8334C16.9173 20.0551 16.833 20.2685 16.6817 20.4305C16.5303 20.5925 16.3231 20.691 16.102 20.7061C15.8808 20.7212 15.6621 20.6518 15.4901 20.5119C15.3182 20.372 15.2057 20.172 15.1755 19.9524L15.1673 19.8334V11.6667C15.1673 11.4347 15.2595 11.2121 15.4236 11.048C15.5877 10.8839 15.8103 10.7917 16.0423 10.7917ZM11.959 10.7917C12.1704 10.7918 12.3747 10.8683 12.5341 11.0073C12.6934 11.1463 12.7971 11.3383 12.8258 11.5477L12.834 11.6667V19.8334C12.8339 20.0551 12.7497 20.2685 12.5983 20.4305C12.447 20.5925 12.2398 20.691 12.0186 20.7061C11.7974 20.7212 11.5788 20.6518 11.4068 20.5119C11.2348 20.372 11.1224 20.172 11.0922 19.9524L11.084 19.8334V11.6667C11.084 11.4347 11.1762 11.2121 11.3403 11.048C11.5044 10.8839 11.7269 10.7917 11.959 10.7917ZM14.0007 3.79175C13.4883 3.79177 12.9946 3.98445 12.6177 4.33154C12.2408 4.67864 12.0081 5.15476 11.966 5.66541L11.959 5.83342H16.0423C16.0423 5.29193 15.8272 4.77263 15.4443 4.38974C15.0614 4.00685 14.5421 3.79175 14.0007 3.79175Z" fill="#D2D2D2" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="input-row">
                <label for="name">Имя и фамилия <b>*</b></label>
                <div class="input-wrapper">
                    <div class="c2">
                        <div class="input-wrapper">
                            <input type="text" placeholder="Имя" v-model="state.first_name.val">
                        </div>
                        <div class="input-wrapper">
                            <input type="text" placeholder="Фамилия" v-model="state.last_name.val">
                        </div>
                    </div>
                    <div class="c1 mt-1">
                        <input type="text" placeholder="Отчество" v-model="state.middle_name.val">
                    </div>
                </div>
            </div>
            <div class="input-row">
                <label>Дата рождения <b>*</b></label>
                <div class="input-wrapper">
                    <div class="mb-1">
                        <BirthDatePicker v-model.lazy="state.birth_date.val" :value="state.birth_date.val"></BirthDatePicker>
                    </div>
                    <div class="check-block mt-2">
                        <div class="checkbox">
                            <input type="checkbox" id="hide_birthday" v-model.number="state.hide_birthday.val">
                            <div class="checkbox-mask">
                                <img src="~/assets/img/svg/check.svg" alt="#" />
                            </div>
                        </div>
                        <label for="hide_birthday" class="fs-14">Не показать даты рождения</label>
                    </div>
                    <div class="text-danger d-block" v-if="errors.birth_date">
                        {{ errors.birth_date }}
                    </div>
                    <div class="text-danger d-block" v-if="errors.hide_birthday">
                        {{ errors.hide_birthday }}
                    </div>
                </div>
            </div>
            <div class="input-row">
                <label>Город проживания <b>*</b></label>
                <div class="input-wrapper mt-2">
                    <SelectWithSearch :options="cityOptions" v-model.number="state.city_id.val" :placeholder="'Ишите город'" @input="updateCityInput"></SelectWithSearch>

                    <div class="check-block mt-2">
                        <div class="checkbox">
                            <input type="checkbox" id="ready-to-relocate" v-model.number="state.is_relocatable.val">
                            <div class="checkbox-mask">
                                <img src="~/assets/img/svg/check.svg" alt="#" />
                            </div>
                        </div>
                        <label for="ready-to-relocate" class="fs-14">Готов к переезду</label>

                    </div>

                    <div class="text-danger d-block" v-if="errors.city_id">
                        Вам нужно выбрать город проживания!
                    </div>

                    <div class="text-danger d-block" v-if="errors.is_relocatable">
                        {{ errors.is_relocatable }}
                    </div>
                </div>

            </div>

            <div class="input-row">
                <label for="phone">Телефон</label>
                <div class="input-wrapper">
                    <div class="c">

                        <div>
                            <input type="text" placeholder="Телефон" id="phone" ref="phoneInputElement">
                        </div>
                        <div class="from-to-block">
                            <label>Отвечу на звонки</label>
                            <div class="c2">

                                <div>
                                    <CustomSelect :options="useHourOptions()" v-model="state.phone_time_start.val"  :label="'От'"></CustomSelect>

                                    <div class="text-danger d-block" v-if="errors.phone_time_start">
                                        {{ errors.phone_time_start }}
                                    </div>
                                </div>
                                <div>
                                    <CustomSelect :options="useHourOptions()" v-model="state.phone_time_end.val" :label="'До'"></CustomSelect>

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
                </div>
            </div>
            <div class="input-row">
                <label for="resume_email">Электронная почта</label>
                <div class="input-wrapper">
                    <input id="resume_email" type="email" placeholder="Электронная почта" v-model="state.email.val">
                    <div class="text-danger d-block" v-if="errors.email">
                        {{errors.email}}
                    </div>
                </div>
            </div>
            <transition>
        <span v-if="isSaved" class="d-inline-flex justify-content-center align-items-center" style="color:#0c0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="me-2">
                <path fill="#0c0" d="M10.041 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591zm5.959 7v-2h-8v2h8zm0-24v2h-8v-2h8zm2 0h1c2.762 0 5 2.239 5 5v1h-2v-1c0-1.654-1.346-3-3-3h-1v-2zm6 16h-2v-8h2v8zm-18 8h-1c-2.762 0-5-2.239-5-5v-1h2v1c0 1.654 1.346 3 3 3h1v2zm18-6v1c0 2.761-2.238 5-5 5h-1v-2h1c1.654 0 3-1.346 3-3v-1h2zm-24-12v-1c0-2.761 2.238-5 5-5h1v2h-1c-1.654 0-3 1.346-3 3v1h-2zm0 2h2v8h-2v-8z"/>
            </svg>
            Сохранен
        </span>
            </transition>
        </div>
    </div>
</template>

<script setup>
import {useResumeStore} from "~/store/resume";

import {useProfileStore} from "~/store/profile";
import {useHourOptions} from "~/composables/useHourOptions";
import IMask from "imask";
import {useFormData} from "~/composables/useFormData";
import {useRuntimeConfig} from "#app";
import useFormValidation from "~/composables/useFormValidation";
import {storeToRefs} from "pinia";
import {useWatchStateValues} from "~/composables/useWatchStateValues";
const resumeStore = useResumeStore();
const profileStore = useProfileStore();
const CONFIG = useRuntimeConfig();
const route = useRoute();

const draftID = computed(() => route.query.draft_id);

const {seeker} = profileStore;
const {resume} = storeToRefs(resumeStore);
const formTitle = computed(() => {
    if (resume.value){
        return "Обновить резюме";
    }

    return "Создание резюме";
});

const isSaved = ref(false);
const isChanged = ref(false);
const isFirst = ref(true);
onMounted(() => {
    if (draftID.value){
        isFirst.value = false;
    }
})

const photoUrl = computed(() => {
  if (state.photo.base64){
    return state.photo.base64;
  } else if (state.photo_url.val){
    return CONFIG.public.base + state.photo_url.val;
  } else return CONFIG.public.base + '/assets/images/avatar.png';
});

const photoElement = ref();

const openFileBrowser = () => {
  photoElement.value.click();
}
const clearPhotoUrl = () => {
  state.photo_url.val = "";
}
const handleUploadFile = async (e) => {
  state.photo.val = photoElement.value.files[0];
  const file = photoElement.value.files;
  if (file && file[0]) {
    let reader = new FileReader
    reader.onload = e => {
      state.photo.base64 = e.target.result
    }
    reader.readAsDataURL(file[0])
  }
}

const {getResume} = resumeStore;

const state = reactive({
    title: {
        val: "",
        isValid: true,
    },
    first_name: {
        val: "",
        isValid: true,
    },
    last_name: {
        val: "",
        isValid: true,
    },
    middle_name: {
        val: "",
        isValid: true,
    },
    birth_date: {
        val: null,
        isValid: true,
    },
    city_id: {
        val: null,
        isValid: true,
    },
    photo: {
        val: "",
        isValid: true,
        base64: "",
    },
    photo_url: {
        val: "",
        isValid: true,
    },
    phone_time_start: {
        val: "",
        isValid: true,
    },
    phone_time_end: {
        val: "",
        isValid: true,
    },
    phone: {
        val: "",
        isValid: true,
    },
    email: {
        val: "",
        isValid: true,
    },
    email_to_verify: {
        val: "",
        isValid: true,
    },
    password: {
        val: "",
        isValid: true,
    },
    hide_birthday: {
        val: false,
        isValid: true
    },
    is_relocatable: {
        val: false,
        isValid: true
    },
    isFormValid: true,
    isNew: true,
    isLoading: false,
    error: null,
    success: null,
});
watch(() => useWatchStateValues(state), () => {
    isChanged.value = true;
});
watch(() => resumeStore.resume, (newResume) => {
    if (newResume){
        state['first_name'].val = newResume['first_name'];
        state['last_name'].val = newResume['last_name'];
        state['middle_name'].val = newResume['middle_name'];
        state['is_relocatable'].val = newResume['is_relocatable'];
        state['hide_birthday'].val = newResume['hide_birthday'];
        state['city_id'].val = newResume['city_id'];
        getCities(state.city_id.val);
        state['birth_date'].val = newResume['birth_date'];
        state['email'].val = newResume['email'];
        state['phone'].val = newResume['phone'];
        phoneInputElement.value.value = newResume['phone'] ?? '';
        state['phone_time_start'].val = newResume['phone_time_start'];
        state['phone_time_end'].val = newResume['phone_time_end'];
    }
})

const {searchCities} = profileStore;
const {getCountryCities} = profileStore;
const cityOptions = ref([]);

const phoneInputElement = ref();
const phoneMask = ref(null);

const updateCityInput = async (newValue = '') => {
    const items = await searchCities({search: newValue}) ?? [];
    cityOptions.value = items.map(item => ({value: item.city_id, name: item.city_name}));
}

const getCities = async (newValue = '') => {
    if (newValue){
        const items = await getCountryCities({city_id: newValue}) ?? [];
        cityOptions.value = items.map(item => ({value: item.id, name: item.name}));
    }
}

onMounted(( ) => {

    phoneMask.value = new IMask(phoneInputElement.value, {
        mask: "+{7}(000)000-00-00",
    });
    phoneInputElement.value.addEventListener("input", (e) => {
        state.phone.val = phoneMask.value.unmaskedValue;
    });
});

const {updateResume, createResume} = resumeStore;

const {errors, handleErrorResponse} = useFormValidation();

const save = async () => {

    if (isChanged.value){
        console.log(0);
        state.isLoading = true;
        // validate();
        errors.value = {};
        state.errorMessage = "";
        let resData = {};
        if (draftID.value){
            const formData = useFormData(state, 'form_data')
            formData.append('form_data', 'personal_data');
            formData.delete('title');
            resData = await updateResume(draftID.value, formData, 'put');
            console.log(resData);
        }else{
            const formData = useFormData(state)
            // const formData = useFormData(state, 'form_data')
            // formData.append('form_data', 'personal_data')
            formData.form_data = 'personal_data';
            console.log(formData);
            resData = await createResume(formData);
            console.log(resData);
            if (resData.status === 'success'){
                const resume_id = resData.data.data.id;
                state.isNew = false;
                setTimeout(() => {
                    console.log('redirecting...')
                    navigateTo({name: 'create-resume', query: {draft_id: resume_id}})
                }, 100);
            }
        }


        if (resData.status !== 'success'){
            return handleErrorResponse(resData.data);
        }
        isSaved.value = true;
        isChanged.value = false;
        setTimeout(() => {
            isSaved.value = false;
        }, 3000);

    }
}

</script>

<style>

.from-to-block{

}

</style>