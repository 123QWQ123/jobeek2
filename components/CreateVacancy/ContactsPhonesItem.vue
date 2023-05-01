<template>
    <div class="row position-relative">
      <span class="position-absolute absoluted_icon" @click="deleteItem">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
      </span>
      <div class="col-12">
          <div class="c1">
              <div class="input-wrapper">
                  <input type="phone" v-model="phone" placeholder="+71651651131" />
              </div>
          </div>
      </div>
      <div class="col-12 mt-2">
          <div class="c1">
              <div class="input-wrapper">
                  <textarea type="text" class="form-control"  v-model="comment" placeholder="Коммента́рия" > </textarea>
              </div>
          </div>
      </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['add', 'delete', 'update'])
const props = defineProps({
    isNew: {
        required: false,
        default: false
    },
    phone: {
        required: true,
        default: null
    },
    comment: {
        required: true,
        default: ""
    }
});


const isNew = ref(props.isNew);
const phone = ref(props.phone);
const comment = ref(props.comment)

const deleteItem = (id = null) => {
    // emit('delete', phone.value);
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