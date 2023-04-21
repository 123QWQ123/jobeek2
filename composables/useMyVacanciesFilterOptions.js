export function useMyVacanciesFilterOptions() {
    return [
        {value: 'active', name: 'Активные'},
        {value: 'in_moderation', name: 'в модерации'},
        {value: 'archived', name: 'В архиве'},
        {value: 'deleted', name: 'Удаленные'},
    ]
}