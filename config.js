const public_routes = [
    '/sign-up',
    '/sign-up/confirm',
    '/sign-in',
];

const protected_routes = [
    '/profile',
    '/your-resumes',
    '/your-favorites',
    '/my-vacancies',
];
const search_exception_routes = [
    'index',
    'your-resumes',
    'your-vacancies',
];
const employer_routes = [
    '/my-vacancies',
];
const seeker_routes = [
    '/your-resumes',
];

export {public_routes, protected_routes, employer_routes, seeker_routes, search_exception_routes};