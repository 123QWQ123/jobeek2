<template>
  <div>
    <legend>User #{{ idx }}</legend>
    <label :for="`name_${idx}`">Name</label>
    <ResumeTextInput
      :name="`users[${idx}].name`"
      placeholder="Enter your name"
    />
    <!--    <Field :id="`name_${idx}`" :name="`users[${idx}].name`" />-->
    <!--    <div class="text-danger">-->
    <!--      <ErrorMessage :name="`users[${idx}].name`" />-->
    <!--    </div>-->

    <label :for="`email_${idx}`">Email</label>
    <ResumeTextInput
      :name="`users[${idx}].email`"
      placeholder="Enter your email"
    />
    <!--    <Field :id="`email_${idx}`" :name="`users[${idx}].email`" type="email" />-->
    <!--    <div class="text-danger">-->
    <!--      <ErrorMessage :name="`users[${idx}].email`" />-->
    <!--    </div>-->
    <button class="btn btn-primary btn-sm" type="button" @click="remove(idx)">
      X
    </button>
    <br />
    <button type="button" class="btn btn-light" @click="confirmEmail">
      Confirm Email
    </button>
  </div>
</template>
<script setup>
import ResumeTextInput from "~/components/CreateResume/ResumeTextInput.vue";
import { useField } from "vee-validate";

const props = defineProps(["idx"]);
const { idx } = toRefs(props);
const emit = defineEmits(["remove"]);

const { value, errorMessage } = useField(`users[${props.idx}].email`);
const confirmEmail = () => {
  value.value = "@mail.uz";
};

const remove = (id) => {
  emit("remove", id);
};
</script>

<style>
input {
  display: block;
}

span {
  display: block;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-top: 20px;
}

button {
  display: block;
}

button[type="submit"] {
  margin-top: 10px;
}

.InputGroup {
  padding: 10px;
  border: 2px dotted black;
  margin-bottom: 30px;
  position: relative;
}

.InputGroup button {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
