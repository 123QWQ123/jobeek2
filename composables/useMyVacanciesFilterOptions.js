export function useMyVacanciesFilterOptions() {
    return [
        {value: 'active', name: 'Активные'},
        {value: 'published', name: 'Опубликованные'},
        {value: 'private', name: 'Скрытые'},
        {value: 'in_moderation', name: 'В модерации'},
        {value: 'declined', name: 'Отклоненные'},
        {value: 'archived', name: 'В архиве'},
        {value: 'deleted', name: 'Удаленные'},
    ]
}