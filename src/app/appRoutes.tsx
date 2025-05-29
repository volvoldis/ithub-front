import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from 'pages/home';
import { NotFoundPage } from 'pages/notFound';
import { SigninPage } from 'pages/auth/signin';
import { SignupPage } from 'pages/auth/signup';
import { ForgotPasswordPage } from 'pages/auth/forgotPassword';
import { ResetPasswordPage } from 'pages/auth/resetPassword';
import { VerifyEmailPage } from 'pages/auth/verifyEmail';
import { JobsPage } from 'pages/jobs';
import { JobPage } from 'pages/job';
import { CompanyPage } from 'pages/company';
import { CompaniesPage } from 'pages/companies';
import { AboutUsPage } from 'pages/about/aboutUs';
import { ContactsPage } from 'pages/about/contacts';
import { ConditionsPage } from 'pages/about/conditions';
import { ResumesPage } from 'pages/resumes';
import { ResumePage } from 'pages/resume';
import { FaqPage } from 'pages/about/faq';
import { AccountPage } from 'pages/account';
import { ChatsPage } from 'pages/chats';
import { StatisticsPage } from 'pages/statistics';

import { ROUTES } from 'shared/routes';
import { AuthGuard, GuestGuard } from 'features/user';
import { RootLayout } from 'layouts/rootLayout';
import { AuthLayout } from 'layouts/authLayout';

import { ErrorPage } from 'components';

export const appRouter = () =>
  createBrowserRouter([
    {
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: ROUTES.home,
          element: <HomePage />,
        },
        {
          path: ROUTES.job,
          element: <JobPage />,
        },
        {
          path: ROUTES.jobs,
          element: <JobsPage />,
        },
        {
          path: ROUTES.company,
          element: <CompanyPage />,
        },
        {
          path: ROUTES.companies,
          element: <CompaniesPage />,
        },
        {
          path: ROUTES.resumes,
          element: <ResumesPage />,
        },
        {
          path: ROUTES.resume,
          element: <ResumePage />,
        },
        {
          path: ROUTES.statistics,
          element: <StatisticsPage />,
        },
        {
          path: ROUTES.accountTabs,
          element: (
            <GuestGuard>
              <AccountPage />
            </GuestGuard>
          ),
        },
        {
          path: ROUTES.chats,
          element: (
            <GuestGuard>
              <ChatsPage />
            </GuestGuard>
          ),
        },
        {
          path: ROUTES.chat,
          element: (
            <GuestGuard>
              <ChatsPage />
            </GuestGuard>
          ),
        },
        // About pages
        {
          path: ROUTES.faq,
          element: <FaqPage />,
        },
        {
          path: ROUTES.conditions,
          element: <ConditionsPage />,
        },
        {
          path: ROUTES.contacts,
          element: <ContactsPage />,
        },
        {
          path: ROUTES.aboutUs,
          element: <AboutUsPage />,
        },
        // not found
        {
          path: ROUTES.notFound,
          element: <NotFoundPage />,
        },
      ],
    },
    {
      element: <AuthLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: ROUTES.signin,
          element: (
            <AuthGuard>
              <SigninPage />
            </AuthGuard>
          ),
        },
        {
          path: ROUTES.signup,
          element: (
            <AuthGuard>
              <SignupPage />
            </AuthGuard>
          ),
        },
        {
          path: ROUTES.forgotPassword,
          element: (
            <AuthGuard>
              <ForgotPasswordPage />
            </AuthGuard>
          ),
        },
        {
          path: ROUTES.resetPassword,
          element: (
            <AuthGuard>
              <ResetPasswordPage />
            </AuthGuard>
          ),
        },
        {
          path: ROUTES.verifyEmail,
          element: <VerifyEmailPage />,
        },
      ],
    },
  ]);
