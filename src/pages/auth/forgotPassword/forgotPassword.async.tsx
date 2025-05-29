import { lazy } from 'react';

export const ForgotPasswordPageAsync = lazy(
  async () => import('./forgotPassword'),
);
