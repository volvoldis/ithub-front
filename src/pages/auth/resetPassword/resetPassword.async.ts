import { lazy } from 'react';

export const ResetPasswordPageAsync = lazy(
  async () => import('./resetPassword'),
);
