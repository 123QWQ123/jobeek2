import { ref } from 'vue';
import {toast} from "vue3-toastify";
import {useCheckJSON} from "~/composables/useCheckJSON";
import {useAuthStore} from "~/store/auth";

export default function useCursor(defaultOptions = null) {

    const items = [];
    const setCursor = (el = null, options= null) => {
        if (!el) return false;
        if (!options){
            const selection = window.getSelection();
            const range = document.createRange();
            selection.removeAllRanges();
            range.selectNodeContents(el);
            range.collapse(false);
            selection.addRange(range);
            el.focus();
        }
    }

    return { setCursor };
}
