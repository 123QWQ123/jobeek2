<template>
  <div class="input-row input-row--checkboxes">
    <label>Куда получать уведомления *</label>
    <div class="checkboxes-row">
      <div class="check-block">
        <div class="checkbox">
          <input
            type="checkbox"
            id="push_notification"
            name="push_notification"
            @change="toggle"
          />
          <div class="text-danger">
            <ErrorMessage name="push_notification" />
          </div>
          <div class="checkbox-mask">
            <img src="~/assets/img/svg/check.svg" alt="#" />
          </div>
        </div>
        <label for="push_notification">Push-уведомления</label>
      </div>
      <div class="check-block">
        <div class="checkbox">
          <input
            type="checkbox"
            id="email_notification"
            name="email_notification"
            @change="toggle"
          />
          <div class="text-danger">
            <ErrorMessage name="email_notification" />
          </div>
          <div class="checkbox-mask">
            <img src="~/assets/img/svg/check.svg" alt="#" />
          </div>
        </div>
        <label for="email_notification">E-mail уведомления</label>
      </div>
    </div>
    <div class="text-danger row">
      <ErrorMessage name="" />
    </div>
  </div>
</template>

<script setup>
import { useSetFormValues } from "vee-validate";

const setFormValues = useSetFormValues();

const toggle = (event) => {
  let obj = {};
  obj[event.target.name] = event.target.checked;
  setFormValues(obj);
};
</script>

<style scoped></style>
