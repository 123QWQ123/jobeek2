const public_routes = [
    '/sign-up',
    '/sign-up/confirm',
    '/sign-in',
];

const protected_routes = [
    '/profile',
    '/my-resumes',
    '/your-favorites',
    '/my-vacancies',
];
const search_exception_routes = [
    'index',
    'my-resumes',
    'my-vacancies',
];
const employer_routes = [
    '/my-vacancies',
];
const seeker_routes = [
    '/my-resumes',
];

export {public_routes, protected_routes, employer_routes, seeker_routes, search_exception_routes};