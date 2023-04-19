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

    console.log(params);

    let regions = [];
    let countries = [1];
    let cities = [];
    let page = params.page;

    if (to_ === 'reset') {
        return {
            name: "",
            page: page,
            countries: countries,
            regions: regions,
            cities: cities,
            order_by: null,
            per_page: 10,
        };
    }
    if (!data) {

        if (params.countries) {
            if (params.countries instanceof Array) {
                countries = params.countries.map(item => parseInt(item));
            } else {
                countries = [parseInt(params.countries)];
            }
        }
        if (params.regions) {
            if (params.regions instanceof Array) {
                regions = params.regions.map(item => parseInt(item));
            } else {
                regions = [parseInt(params.regions)];
            }
        }

        if (params.cities) {
            if (params.cities instanceof Array) {
                cities = params.cities.map(item => parseInt(item));
            } else {
                cities = [parseInt(params.cities)];
            }
        }
        if (params.page) {
            page = params.page;
        }
    }
    if (data) {
        countries = Array.from(data.countries);
        regions = Array.from(data.regions);
        if (regions.length === 1) {
            cities = Array.from(data.cities);
        }
    }else{
    }

    const form_data = {
        name: data?.name ?? params?.name,
        page: data?.page ?? 1,
        countries: countries,
        regions: regions,
        cities: cities,
        per_page: data?.per_page ?? params.per_page ?? 10,
        order_by: data?.order_by ?? params.order_by ?? null,
    };

    if (data === null) {
        return form_data;
    }

    const back_params = {
        name: data.name ?? null,
        page: data.page ?? 1,
        countries: data.countries ?? null,
        regions: data.regions ?? null,
        cities: data.cities ?? null,
        order_by: null,
        per_page: 10,
    };
    //
    const front_params = {
        name: null,
        page: null,
        country: null,
        city: null,
        regions: null,
        cities: null,
        order_by: null,
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
        if (data.per_page !== '') front_params.per_page = data.per_page;
        if (data.countries instanceof Array) {
            front_params.countries = Array.from(data.countries);
        }
        if (data.regions instanceof Array) {
            front_params.regions = Array.from(data.regions);
        }
        if (front_params.regions.length === 1 && data.cities instanceof Array) {
            front_params.cities = Array.from(data.cities);
        }

        return removeNull(front_params);
    }
    if (to_ === 'backend') {
        if (data.name) {
            back_params.name = data.name;
        }
        if (data.country) {
            back_params.countries = data.country;
        }
        if (data.regions instanceof Array) {
            back_params.regions = Array.from(data.regions);
        }
        if (data.cities instanceof Array) {
            back_params.cities = Array.from(data.cities);
        }
        if (data.order_by) {
            back_params.order_by = data.order_by;
        }

        if (data.per_page) {
            back_params.per_page = data.per_page;
        }

        return removeNull(back_params);
    }
}