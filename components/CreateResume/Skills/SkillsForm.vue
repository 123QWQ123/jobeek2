<template>
  <div class="row">
      <div class="col-10">
          <div class="input-wrapper">
              <input type="text" v-model="skill" />
          </div>
      </div>
      <div class="col-2">
          <div class="input-wrapper">
              <button class="btn btn-primary" v-if="props.isNew" type="button" @click="onSubmit">Добавить</button>
              <button class="btn btn-primary" v-else type="button" @click="onSubmit">Обновить</button>
          </div>
      </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['add', 'delete', 'update'])
const props = defineProps({
    isNew: {
        required: false,
        default: true
    },
    skill: {
        required: true,
    },
    id: {
        required: true,
    }
});

const isNew = ref(props.isNew);
const skill = ref(props.skill);

watchEffect(() => {
    skill.value = props.skill;
    isNew.value = props.isNew;
})

const onSubmit = () => {
    if  (skill.value){
        if (props.isNew){
            emit('add', skill.value);
        }else{
            emit('update', props.id, skill.value);
        }
    }
    skill.value = "";
}
const deleteItem = (id = null) => {
    emit('delete', props.id, skill.value);
}

onMounted(() => {
    if (props.id){
        isNew.value = false;
    }
})
</script>

<style scoped>
.absoluted_icon{
    position: absolute;
    left: -2rem;
    top: .5rem;
    font-size: 1rem;
    z-index: 1;
    cursor: pointer;
    max-width: 3rem;
}
.absoluted_icon svg{
    width: 24px;
    height: 24px;
}
</style>