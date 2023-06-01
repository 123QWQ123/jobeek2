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
    // '/create-vacancy',
];
const search_exception_routes = [
    'index',
    'my-resumes',
    'my-vacancies',
];
const employer_routes = [
    'my-vacancies',
    'your-favorites',
    'your-responses'
];
const seeker_routes = [
    'my-resumes',
    'your-favorites',
    'your-responses',
    'advice',
];

export {public_routes, protected_routes, employer_routes, seeker_routes, search_exception_routes};