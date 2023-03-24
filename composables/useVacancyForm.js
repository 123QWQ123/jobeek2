import {useSalaryOptions} from "~/composables/useSalaryOptions";
import {useRoute} from "nuxt/app";
import {useFindSalary} from "~/composables/useFindSalary";
import {useFindCurrency} from "~/composables/useFindCurrency";

export function useVacancyForm(data = null, to_ = 'front') {
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

    let selectedSalary = null;
    if (data){
        selectedSalary = data.salary;
    }else{
        selectedSalary = useFindSalary(params?.salary, true);
    }


    let regions = [];
    let work_types = [];
    if (!data){
        if (params.regions){
            if (params.regions instanceof Array){
                regions = params.regions.map(item => parseInt(item));
            }else{
                regions = [parseInt(params.regions)];
            }
        }
        if (params.work_types){
            if (params.work_types instanceof Array){
                work_types = params.work_types.map(item => parseInt(item));
            }else{
                work_types = [parseInt(params.work_types)];
            }
        }
    }
    if (data){
        regions = Array.from(data.regions);
        work_types = Array.from(data.work_types);
    }


    const form_data = {
        name: data?.name ?? params?.name,
        country: data?.country ?? params?.country ?? 1,
        regions: regions,
        work_types: work_types,
        city: data?.city ?? params?.city ?? null,
        currency: data?.currency ?? params.currency ?? 'RUR',
        salary: selectedSalary,
        order_by: data?.order_by ?? params.order_by ?? 'relevance',
    };

    if (data === null){
        return form_data;
    }

    const back_params = {
        name: data.name ?? null,
        country: data.country?? null,
        regions: data.regions ?? null,
        city: data.city ?? null,
        currency: 'RUR',
        order_by: 'relevance',
        salary: {
            from: null,
            to: null,
        },
    };
    //
    const front_params = {
        name: null,
        country: null,
        city: null,
        regions: null,
        currency: null,
        salary: null,
        order_by: null,
    };

    if (to_ === 'front'){
        if (data.name){
            front_params.name = data.name;
        }
        if (data.name !== '') front_params.name = data.name;
        if (data.order_by !== '') front_params.order_by = data.order_by;
        if (data.currency !== '') front_params.currency = data.currency;
        if (data.country !== '') front_params.country = data.country;
        if (data.regions instanceof Array){
            front_params.regions = Array.from(data.regions);
        }
        if (data.work_types instanceof Array){
            front_params.work_types = Array.from(data.work_types);
        }

        if (data.city !== '') front_params.city = data.city;

        if (data.salary.from || data.salary.to){
            front_params.salary = data.salary.from + '-' + data.salary.to;
        }
        if (data.salary.id  === null || data.salary.id === 0) delete front_params.salary;

        return removeNull(front_params);
    }
    if (to_ === 'backend'){
        if (data.name){
            back_params.name = data.name;
        }
        if (data.country){
            back_params.country = data.country;
        }
        if (data.regions instanceof Array){
            back_params.regions = Array.from(data.regions);
        }
        if (data.work_types instanceof Array){
            back_params.work_types = Array.from(data.work_types);
        }
        if (data.city){
            back_params.city = data.city;
        }
        if (data.currency){
            back_params.currency = data.currency;
        }
        if (data.order_by){
            back_params.order_by = data.order_by;
        }

        if (data.salary.from){
            back_params.salary.from = data.salary.from;
        }
        if (data.salary.to){
            back_params.salary.to = data.salary.to;
        }
        console.log(back_params);
        return removeNull(back_params);
    }
}