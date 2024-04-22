const public_routes = [
  "index",
  "vacancy",
  "resume",
  "sign-up",
  "sign-up-confirm",
  "sign-in",
  "forgot-password",
  "search-resumes",
  "search-vacancies",
  "vacancies-slug",
];

const protected_routes = [
  "my-resumes",
  "create-resume",
  "my-vacancies",
  "create-vacancy",
  "favorite-vacancies",
  "favorite-resumes",
  "profile-negotiations",
  "my-subscriptions",
  "services-search-phone",
];
const search_exception_routes = ["index", "search-vacancies", "search-resumes"];
const employer_routes = [
  "my-vacancies",
  "favorite/vacancies",
  "your-responses",
];
const seeker_routes = [
  "my-resumes",
  "my-subscriptions",
  "favorite-vacancies",
  "profile-negotiations",
  "your-favorites",
  "your-responses",
];

export {
  public_routes,
  protected_routes,
  employer_routes,
  seeker_routes,
  search_exception_routes,
};
