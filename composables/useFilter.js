import { ref } from 'vue';
import {toast} from "vue3-toastify";
import {useCheckJSON} from "~/composables/useCheckJSON";
import {useAuthStore} from "~/store/auth";

export default function useFilter(defaultOptions = null) {

    const items = [];
    const filterBy = (items = [], options= null) => {
        if (options){
            const {by} = options;
            if (by === 'alpha'){
                return items.sort(function (a, b) {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                });
            }
        }
    }

    return { items, sort };
}
