export function useMyVacanciesFilterOptions() {
    return [
        {value: 'active', name: 'активные'},
        {value: 'drafted', name: 'в черновик'},
        {value: 'archived', name: 'в архиве'},
    ]
}