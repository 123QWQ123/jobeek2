<template>
    <div class="w-box"  @focusout="save">
        <div class="w-box-head">
            <h3 class="title">Владение иностранными языками</h3>
        </div>
        <div class="w-box-body">
            <div class="" v-if="isFirst">
                <div class="row">
                  <SharedComponentsForeignLanguagesWrapper ref="componentElement" v-model="foreign_languages" />
                </div>
            </div>
            <div class="empty-area" v-else>
                <span>Здесь вы можете указать</span>
                <button class="add" type="button" @click="isFirst = !isFirst">Добавить </button>
            </div>
        </div>
    </div>
</template>

<script setup>

const isFirst = ref(false);
const componentElement = ref(false);

const foreign_languages = ref([]);


const save = () => {
    console.log(foreign_languages.value);
    // emit('update:modelValue', foreign_languages.value);
}
watch(() => foreign_languages.value,  save);

</script>

<style scoped>

</style>