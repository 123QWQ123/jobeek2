<template>
  <div class="w-box">
    <div class="w-box-head">
      <h3 class="title">Образование</h3>
    </div>
    <div class="w-box-body">
        <div class="empty-area" v-if="isFirst">
            <div class="row">
                <div class="input-row">
                    <label for="position">Название специальность<b>*</b></label>
                    <div class="input-wrapper">
                        <input type="text" placeholder="Введите специальность" required>
                    </div>
                </div>
                <div class="input-row">
                    <label for="position">Название университета<b>*</b></label>
                    <div class="input-wrapper">
                        <input type="text" placeholder="Введите должность" required>
                    </div>
                </div>
                <div class="input-row">
                    <label for="position">Факультет<b>*</b></label>
                    <div class="input-wrapper">
                        <input type="text" placeholder="Введите факультет" required>
                    </div>
                </div>
            </div>
        </div>
        <div class="empty-area" v-else>
            <span>Здесь вы можете указать релевантный опыт в сфере которую вы выбарли</span>
            <button class="add" type="button" @click="isFirst = !isFirst">Добавить </button>
        </div>
    </div>
  </div>
</template>

<script setup>

const isFirst = ref(false);
// 'education.*.profession' => 'required|string|min:2|max:100',
// 'education.*.institute' => 'nullable|string|min:2|max:100',
// 'education.*.id_institute' => 'nullable|string|exists:institutes,id',
// 'education.*.faculty' => 'nullable|string',
// 'education.*.education_form' => 'nullable|string|exists:dictionaries,id',
// 'education.*.education_type' => 'nullable|string|exists:dictionaries,id',
// 'education.*.finish_year' => ['nullable|date_format:Y'],

const state = ref({
    profession: {
        val: "",
        isValid: null,
    },
    institute: {
        val: "",
        isValid: null,
    },
    id_institute: {
        val: "",
        isValid: null,
    },
    faculty: {
        val: "",
        isValid: null,
    },
    education_form: {
        val: "",
        isValid: null,
    },
    education_type: {
        val: "",
        isValid: null,
    },
    education_finish_year: {
        val: "",
        isValid: null,
    },
});
</script>

<style scoped>

</style>