const public_routes = [
    'sign-up',
    'sign-up-confirm',
    'sign-in',
];

const protected_routes = [
    'profile',
    'my-resumes',
    'your-favorites',
    'my-vacancies',
    'create-vacancy',
    'create-resume',
];
const search_exception_routes = [
    'index',
    'search-vacancies',
    'search-resumes',
];
const employer_routes = [
    'my-vacancies',
    'your-favorites',
    'your-subscriptions',
    'your-responses'
];
const seeker_routes = [
    'my-resumes',
    'your-favorites',
    'your-responses',
    'advice',
];

export {public_routes, protected_routes, employer_routes, seeker_routes, search_exception_routes};