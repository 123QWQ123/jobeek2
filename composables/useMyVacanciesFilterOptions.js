export function useMyVacanciesFilterOptions() {
    return [
        {value: 'active', name: 'активные'},
        {value: 'draft', name: 'в черновик'},
        {value: 'archived', name: 'в архиве'},
    ]
}