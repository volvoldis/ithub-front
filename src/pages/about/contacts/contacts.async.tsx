import { lazy } from 'react';

export const ContactsPageAsync = lazy(async () => import('./contacts'));
