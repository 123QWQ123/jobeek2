
<template>
    <div class="accordion-item" v-click-outside="close">
        <h2 class="accordion-header position-relative" id="headingOne">
            <button class="accordion-button" type="button" :class="{collapsed: isShown}" @click="clickOnButton">
                <div class="input-wrapper me-2">
                    <input ref="phoneInputElement" type="phone" placeholder="+71651651131" @focusin="open" />
                </div>
            </button>
            <span class="position-absolute absoluted_icon" @click="deleteItem">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </span>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse" :class="{show: isShown}">
            <div class="accordion-body">
                <div class="input-wrapper">
                    <textarea type="text" class="form-control"  v-model="comment" placeholder="Коммента́рия" > </textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import IMask from "imask";

const emit = defineEmits(['add', 'delete', 'update'])
const props = defineProps({
    isNew: {
        required: false,
        default: false
    },
    index: {
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

const isShown = ref(true);

const open = (() => isShown.value = true);
const close = (() => isShown.value = false);
const clickOnButton = ((e) => {
    if (e.target.classList.contains('accordion-button')){
        isShown.value = !isShown.value;
    }
});

watch(() => phone.value, (newPhone) => {
    if (newPhone){
        emit('update', props.index, {phone: newPhone, comment: comment.value});
    }
});

watch(() => comment.value, (newComment) => {
    if (newComment && phone.value){
        emit('update', props.index, {phone: phone.value, comment: newComment});
    }
})
const deleteItem = () => {
    emit('delete', props.index);
}

const phoneInputElement = ref();
const phoneMask = ref(null);
onMounted(() => {

    phoneMask.value = new IMask(phoneInputElement.value, {
        mask: "+{7}(000)000-00-00",
    });
    phoneInputElement.value.addEventListener("input", (e) => {
        phone.value = phoneMask.value.unmaskedValue
    });

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