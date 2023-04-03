<template>
  <form class="w-box-body" @submit.prevent="handleSubmit" :style="{overflowY: 'hidden'}">
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
          <input type="text" placeholder="Имя" id="name" required v-model="state.first_name.val">
          <input type="text" placeholder="Фамилия" id="surname" required v-model="state.last_name.val">
        </div>
      </div>

      <div class="text-danger d-block" v-if="errors.first_name || errors.last_name">
        {{ errors.first_name + ' ' + errors.last_name }}
      </div>
    </div>
    <div class="input-row">
      <label>Дата рождения <b>*</b></label>
      <div class="input-wrapper">
        <div class="c3">
          <BirthDatePicker v-model="state.birth_date.val"></BirthDatePicker>
        </div>
        <div class="text-danger d-block" v-if="errors.birth_date">
          {{ errors.birth_date }}
        </div>
      </div>
    </div>
    <div class="input-row">
      <label for="country">Город проживания <b>*</b></label>
      <div class="input-wrapper">
        <SelectWithSearch :options="countryOptions" v-model="state.pub_country_id.val"></SelectWithSearch>
      </div>
      <br/>
      <div class="input-wrapper mt-2">
        <SelectWithSearch :options="cityOptions" v-model="state.pub_city_id.val"></SelectWithSearch>
      </div>
      <div class="text-danger d-block" v-if="errors.pub_city_id || errors.pub_country_id">
        Вам нужно выбрать город проживания!
      </div>
    </div>
    <div class="input-row">
      <label for="phone">Телефон</label>
      <div class="input-wrapper">
        <input type="text" ref="phoneInputElement" disabled placeholder="Телефон" id="phone" v-model="state.phone.val" />
      </div>
    </div>
    <div class="input-row">
      <label for="email">Электронная почта<b>*</b></label>
      <div class="input-wrapper position-relative">
        <input type="email" placeholder="Электронная почта" id="email" v-model="state.email.val" v-if="!state.email_to_verify.val" />
        <input type="email" placeholder="Электронная почта" id="email_to_verify" v-else v-model="state.email_to_verify.val" />
        <a v-if="isConfirmButton" @click="onEmailConfirm" class="badge bg-primary position-absolute fs-6 end-0 top-0 p-2 px-2 mt-2 me-2">Потверждать</a>
        <a v-else-if="isCheckButton" @click="checkEmailConfirmation" if="isConfirmButton" class="badge bg-primary btn-sm fs-6 position-absolute end-0 top-0 p-2 px-2 mt-2 me-2">Проверить</a>
        <span v-else class="badge bg-success fs-6 position-absolute end-0 top-0 p-2 px-2 mt-2 me-2">Потвержден</span>
      </div>
      <div class="text-success d-block" v-if="state.email.is_sent">
        {{ "Вам выслано емейл с код подтверждением, подтвердите ваш емейл." }}
      </div>
      <div class="text-danger d-block" v-if="errors.email">
        {{ errors.email }}
      </div>
    </div>
    <div class="input-row">
      <label for="password">Пароль<b>*</b></label>
      <div class="input-wrapper position-relative">
        <input type="password" id="password" v-model="state.password.val" />
      </div>
      <div class="text-danger d-block" v-if="errors.password">
        {{ errors.password }}
      </div>
    </div>
    <div class="input-row">
      <div class="input-wrapper">
        <base-button type="submit">Сохранить</base-button>
      </div>
    </div>
  </form>
</template>

<script setup>
import {useProfileStore} from "../../store/profile";
const CONFIG = useRuntimeConfig();

// const {emit} = defineEmits('input');
import {storeToRefs} from "pinia";
import moment from "moment";
import Swal from "sweetalert2";
import {useRuntimeConfig} from "nuxt/app";
import IMask from "imask";
const profileStore = useProfileStore();

const {getUser} = profileStore;

const {seeker} = storeToRefs(profileStore);

onMounted(async() => {
  await getUser();
});
const state = reactive({
  first_name: {
    val: "",
    isValid: true,
  },
  last_name: {
    val: "",
    isValid: true,
  },
  birth_date: {
    val: moment(),
    isValid: true,
  },
  pub_country_id: {
    val: "",
    isValid: true,
  },
  pub_city_id: {
    val: "",
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
  isFormValid: true,
  isLoading: true,
  error: null,
  success: null,
});
const phoneInputElement = ref();
const phoneMask = ref(null);
watch(seeker, (new_value) => {
  for (const [key, value] of Object.entries(new_value)) {
    if (state.hasOwnProperty(key)){
      if (key === 'birth_date'){
        const formatted = moment(value, "YYYY-MM-DD");
        state[key].val = formatted;
        continue;
      }
      if (key === 'phone'){
        state[key].val = value;
        setTimeout(() => {
          phoneMask.value = new IMask(phoneInputElement.value, {
            mask: "+{7}(000)000-00-00",
          });
        }, 0)
        continue;
      }
      state[key].val = value;
    }
  }
})

// const {getCountries, getPublicCities} = profileStore;
// // await getPublicCountries();

const {countryOptions, cityOptions} = storeToRefs(profileStore);

const country = computed(() => state.pub_country_id.val);
const photoUrl = computed(() => {
  if (state.photo.base64){
    return state.photo.base64;
  } else if (state.photo_url.val){
    return CONFIG.public.base + state.photo_url.val;
  } else return CONFIG.public.base + '/assets/images/avatar.png';
});



watch(country, (new_value) => {
  // getPublicCities({country_id: new_value});
});

const photoElement = ref();

const openFileBrowser = () => {
  console.log(1);
  console.log(photoElement);
  photoElement.value.click();
}
const clearPhotoUrl = () => {
  state.photo_url.val = "";
}

const {upload} = profileStore;
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

const validate = () => {
  if (state.email.val === "") {
    state.email.isValid = false;
    state.isFormValid = false;
  }
  if (state.first_name.val === "") {
    state.first_name.isValid = false;
    state.isFormValid = false;
  }
  if (state.last_name.val === "") {
    state.last_name.isValid = false;
    state.isFormValid = false;
  }
  if (state.birth_date.val === '') {
    state.birth_date.isValid = false;
    state.isFormValid = false;
  }

  if (state.password.val === "" || state.password.val.length < 8) {
    state.password.isValid = false;
    state.isFormValid = false;
  }
}
const errors = ref({});
const {updateSeeker} = profileStore;
const handleSubmit = async (e) => {
  validate();
  errors.value = {};

  const email = state.email_to_verify.val ? state.email_to_verify.val : state.email.val;


  const formData = new FormData();
  formData.append("photo", state.photo.val);
  formData.append("first_name", state.first_name.val);
  formData.append("last_name", state.last_name.val);
  formData.append("email", email);
  formData.append("pub_country_id", state.pub_country_id.val);
  formData.append("pub_city_id", state.pub_city_id.val);
  formData.append("birth_date", moment(state.birth_date.val).format("YYYY-MM-DD"));
  formData.append("password", state.password.val);
  formData.append("password_confirmation", state.password.val);
  formData.append("_method", 'put');

  const resData = await updateSeeker(formData);

  if (resData.status === 'success'){
    await getUser();
    Swal.fire({
      title: 'Успешно!',
      text: resData.message,
      icon: 'success',
      confirmButtonText: 'ОК'
    });
  }else{
    console.log(resData.errors);
    if (resData?.errors){
      errors.value = {...resData.errors};
    }
    Swal.fire({
      title: 'Ошибка!',
      text: resData.message,
      icon: 'error',
      confirmButtonText: 'ОК'
    });
  }
  console.log(resData);

}

const isConfirmButton = ref(true);
const isCheckButton = ref(false);

const {confirmEmail, checkEmailConfirmation} = profileStore;
const onEmailConfirm = async() => {
  const email = state.email_to_verify.val ? state.email_to_verify.val : state.email.val;
  const resData = await confirmEmail({email});
  if (resData.status === 'success'){
    Swal.fire({
      title: 'Успешно!',
      text: resData.message,
      icon: 'success',
      confirmButtonText: 'ОК'
    });
    isConfirmButton.value = false;
    isCheckButton.value = true;
  }

}
</script>

<style>
input[type="text"]:disabled {
  background: #ccc;
}
</style>

<style scoped>

#photo{
  cursor: pointer;
}


</style>