export function useMyVacancySortingOptions() {
    return [
        {value: null, name: 'По умолчанию'},
        {value: 'name_asc', name: 'по заголовку'},
        {value: 'name_desc', name: 'по заголовку, в обратном порядке'},
        {value: 'expiration_date_asc', name: 'по дате'},
        {value: 'expiration_date_desc', name: 'по убыванию даты'},
    ]
}