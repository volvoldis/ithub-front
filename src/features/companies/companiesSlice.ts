import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store/appStore';
import { ROLES } from 'shared/constants';
import { getCompanies, getCompanyById } from './services';

import { ICompany, IJob, IDoc } from '../types';

const DEFAULT_COMPANY: ICompany = {
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  emailVerified: false,
  avatar: '',
  role: ROLES.employer,
  phone: '',
  linkedin: '',
  createdAt: '',
  userPosition: '',
  companyName: '',
  companyHiresCount: 0,
  companyWebSite: '',
  companyDouPage: '',
  companyLogo: '',
  companyEmployeesCount: 0,
  companyDescription: '',
  companyOffices: '',
};

interface ICompaniesState {
  // Companies List
  companiesListLoading: boolean;
  companiesListError: string | null;
  companiesList: ICompany[];

  // Company Page
  companyPageLoading: boolean;
  companyPageError: string | null;
  companyPage: {
    data: ICompany;
    jobs: IJob[];
    docs: IDoc[];
  };
}

const initialState: ICompaniesState = {
  companiesListLoading: false,
  companiesListError: null,
  companiesList: [],

  companyPageLoading: false,
  companyPageError: null,
  companyPage: {
    data: DEFAULT_COMPANY,
    jobs: [],
    docs: [],
  },
};

const companiesSlice = createSlice({
  name: '@@companies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET COMPANIES
      .addCase(getCompanies.pending, (state) => {
        state.companiesListLoading = true;
        state.companiesListError = null;
      })
      .addCase(getCompanies.rejected, (state, action) => {
        state.companiesListLoading = false;
        state.companiesListError = action.payload as string;
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.companiesListLoading = false;
        state.companiesListError = null;
        state.companiesList = action.payload;
      })
      // GET COMPANY BY ID
      .addCase(getCompanyById.pending, (state) => {
        state.companyPageLoading = true;
        state.companyPageError = null;
      })
      .addCase(getCompanyById.rejected, (state, action) => {
        state.companyPageLoading = false;
        state.companyPageError = action.payload as string;
      })
      .addCase(getCompanyById.fulfilled, (state, action) => {
        state.companyPageLoading = false;
        state.companyPageError = null;
        state.companyPage.data = action.payload.user;
        state.companyPage.jobs = action.payload.jobs;
        state.companyPage.docs = action.payload.docs;
      });
  },
});

// Selectors
// Companies list
export const selectCompanies = (state: RootState) =>
  state.companies.companiesList;
export const selectCompaniesIsLoading = (state: RootState) =>
  state.companies.companiesListLoading;
export const selectCompaniesError = (state: RootState) =>
  state.companies.companiesListError;

// Company Page
export const selectCompany = (state: RootState) => state.companies.companyPage;
export const selectCompanyIsLoading = (state: RootState) =>
  state.companies.companyPageLoading;
export const selectCompanyError = (state: RootState) =>
  state.companies.companyPageError;

// Reducer
export default companiesSlice.reducer;
