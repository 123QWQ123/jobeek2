export function useSortingOptions() {
    return [
        {value: null, name: 'По соответствию'},
        {value: 'date_asc', name: 'От старых к новым'},
        {value: 'date_desc', name: 'От новых к старым'},
        {value: 'salary_asc', name: 'По убыванию зарплат'},
        {value: 'salary_desc', name: 'По возрастанию зарплаты'},
    ]
}