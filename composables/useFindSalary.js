import {useSalaryOptions} from "~/composables/useSalaryOptions";

export function useFindSalary(salary = null, from_query = true) {
    const salaryOptions = useSalaryOptions();
    const salaryObject = {
        id: 0,
        from: null,
        to: null
    }
    if (!salary) return salaryObject;

    let min = null;
    let max = null;
    if (from_query){
        const salaries = salary.split("-");
        min = parseInt(salaries[0]);
        max = parseInt(salaries[1]);
    }else{
        min = parseInt(salary.from);
        max = parseInt(salary.to);
    }
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

    if (selectedSalaryOption){
        return {id: selectedSalaryOption.value, from: selectedSalaryOption.min, to: selectedSalaryOption.max};
    }
    return salaryObject;
}