import { useSalaryOptions } from "~/composables/useSalaryOptions";
import { useRoute } from "nuxt/app";
import { useFindSalary } from "~/composables/useFindSalary";
import { useFindCurrency } from "~/composables/useFindCurrency";

export function useMyVacancyForm(data = null, to_ = 'front') {
    // console.log(data, to_);
    // data is form_data by default or null if this is first of calling
    // to_ = front|backend
    const removeNull = (obj) => {
        Object.keys(obj).forEach(k =>
            (obj[k] && typeof obj[k] === 'object') && removeNull(obj[k]) ||
            (!obj[k] && obj[k] !== undefined) && delete obj[k]
        );
        return obj;
    };

    const route = useRoute();

    const params = route.query;

    let page = params.page;

    if (to_ === 'reset') {
        return {
            name: "",
            page: page,
            status: 'active',
            provider: '*',
            order_by: null,
            per_page: 10,
        };
    }

    const form_data = {
        name: data?.name ?? params?.name,
        page: data?.page ?? 1,
        per_page: data?.per_page ?? params.per_page ?? 10,
        order_by: data?.order_by ?? params.order_by ?? null,
        status: data?.status ?? params.status ?? 'active',
        provider: data?.provider ?? params.provider ?? '*',
    };

    if (data === null) {
        return form_data;
    }

    const back_params = {
        name: data.name ?? null,
        page: data.page ?? 1,
        order_by: null,
        status: 'active',
        provider: '*',
        per_page: 10,
    };
    //
    const front_params = {
        name: null,
        page: null,
        order_by: null,
        status: 'active',
        provider: null,
        per_page: 10,
    };

    if (to_ === 'front') {
        if (data.name) {
            front_params.name = data.name;
        }
        if (data.page) {
            front_params.page = data.page;
        }
        if (data.order_by !== '') front_params.order_by = data.order_by;
        if (data.status !== '') front_params.status = data.status;
        if (data.provider !== '') front_params.provider = data.provider;
        if (data.per_page !== '') front_params.per_page = data.per_page;
        return removeNull(front_params);
    }
    if (to_ === 'backend') {
        if (data.name) {
            back_params.name = data.name;
        }
        if (data.order_by) {
            back_params.order_by = data.order_by;
        }

        if (data.status) {
            back_params.status = data.status;
        }
        if (data.provider) {
            back_params.provider = data.provider;
        }

        if (data.per_page) {
            back_params.per_page = data.per_page;
        }

        return removeNull(back_params);
    }
}