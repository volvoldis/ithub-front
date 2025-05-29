export const ROUTES = {
  home: '/',

  // About pages
  aboutUs: '/about-us',
  contacts: '/about-us/contacts',
  conditions: '/about-us/conditions',
  faq: '/about-us/faq',

  // account
  account: '/account',
  accountTabs: '/account/:tab',

  profile: '/account/profile',
  notifications: '/account/notifications',

  // seeker profile
  profileResume: '/account/resume',
  profileApplications: '/account/applications',

  // employer profile
  profileAddEditVacancy: '/account/add-edit-vacancy',
  profileVacancies: '/account/vacancies',
  profileCompany: '/account/company',
  profileCompanyDocs: '/account/company-docs',

  // auth
  signin: '/auth/signin',
  signup: '/auth/signup',
  verifyEmail: '/auth/verify-email/:code',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password/:code',

  // companies
  companies: '/companies',
  company: '/companies/:companyid',

  // jobs
  jobs: '/jobs',
  job: '/jobs/:jobid',

  // cresumes
  resumes: '/resumes',
  resume: '/resumes/:resumeid',

  chats: '/chats',
  chat: '/chats/:chatId',

  // statistics
  statistics: '/statistics',

  // not found
  notFound: '*',
};
