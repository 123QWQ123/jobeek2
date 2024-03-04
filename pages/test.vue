<script setup>
import { useForm } from "vee-validate";

const { values } = useForm({
  initialValues: {
    content:
      "<p>gdfgdfg</p><ol><li><p>451451</p></li></ol><p></p><hr><ol><li><p><em>5415641</em></p></li><li><p></p></li></ol><p><strong>fghfghf</strong></p><p></p>",
  },
});

const { value, setValue } = useField("content");
const change = () => {
  setValue("<p>changed</p>");
};
</script>

<template>
  <button @click.prevent="change">Change</button>
  <VeeTipTapRichEditor name="content" />
</template>

<style scoped></style>
