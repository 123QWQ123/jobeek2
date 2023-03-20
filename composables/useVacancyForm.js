import {useSalaryOptions} from "~/composables/useSalaryOptions";

export function useVacancyForm(form, to_form = false) {
    const salaryOptions = useSalaryOptions();

    const form_data = {
        name: form.name,
        country: form.country,
        region: form.region,
        city: form.city,
        salary: {
            currency: 'Rub',
            id: 0,
            min: null,
            max: null,
        },
    };

    const url_data = {
        name: form.name,
        country: form.country,
        city: form.city,
        salary: null,
    };
    if (!!!form && to_form){
        return form_data;
    }
    if (!!!form && !to_form){
        return url_data;
    }

    if (to_form){
        if (form.salary && form.salary !== ""){
            if (form.salary.includes('-')){
                const salary_values = form.salary.split("-");
                const min = parseInt(salary_values[0]);
                const max = parseInt(salary_values[1]);

                let selectedSalaryOptionID = salaryOptions.findIndex(item => item.min === min && item.max === max);
                if (selectedSalaryOptionID === -1){
                    selectedSalaryOptionID = salaryOptions.findIndex((item) => {
                        if (item.hasOwnProperty('max') && item.hasOwnProperty('min')){
                            if (item.min >= min || item.max <= max){
                                return true;
                            }
                        }
                    });
                }
                let selectedSalaryOption = null;
                if (selectedSalaryOptionID !== -1){
                    selectedSalaryOption = salaryOptions[selectedSalaryOptionID]
                }

                form_data.salary.min = min;
                form_data.salary.max = max;
                form_data.salary.id = selectedSalaryOptionID;
            }else{
                form_data.salary = {
                    min: parseInt(form.salary),
                    max: null
                };
            }
        }
    }

    if (!to_form){
        if (form.salary.hasOwnProperty('min' && form.salary.min)){
            url_data.salary = form.salary.min + '-';
        }
        if (form.salary.hasOwnProperty('max') && form.salary.max){
            url_data.salary = '-' + form.salary.max;
        }

        if (form.salary.hasOwnProperty('min') && form.salary.min && form.salary.hasOwnProperty('max') && form.salary.max){
            url_data.salary = form.salary.min + '-' + form.salary.max;
        }
    }
    if (to_form){
        return form_data;
    }
    return url_data;
}