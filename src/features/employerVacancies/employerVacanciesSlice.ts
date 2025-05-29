import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store/appStore';
import { getVacancies, createVacancy, updateVacancy } from './services';

import { IVacancy } from '../types';

const DEFAULT_VACANCY_DATA = {
  _id: '',
  author: '',
  title: '',
  category: '',
  domain: '',
  skills: [],
  workExperience: 0,
  experienceLevel: '',
  salaryRange: '',
  country: '',
  city: '',
  englishLevel: '',
  summary: '',
  companyType: '',
  employment: [],
  viewsCount: 0,
  applications: [],
  isArchive: false,
  createdAt: '',
  updatedAt: '',
};

interface IEmployerVacanciesState {
  // List
  vacanciesIsLoading: boolean;
  vacanciesError: string | null;
  vacancies: IVacancy[];

  // Vacancy
  vacancyIsLoading: boolean;
  vacancyError: string | null;
  vacancy: IVacancy;
}

const initialState: IEmployerVacanciesState = {
  // List
  vacanciesIsLoading: false,
  vacanciesError: null,
  vacancies: [],

  // Vacancy
  vacancyIsLoading: false,
  vacancyError: null,
  vacancy: DEFAULT_VACANCY_DATA,
};

const employerVacanciesSlice = createSlice({
  name: '@@employerVacancies',
  initialState,
  reducers: {
    setVacancy: (state, { payload }) => {
      state.vacancy = state.vacancies.find(
        (vac) => vac._id === payload,
      ) as IVacancy;
    },
    resetVacancy: (state) => {
      state.vacancy = DEFAULT_VACANCY_DATA;
    },
  },
  extraReducers: (builder) => {
    builder
      // ADD VACANCY
      .addCase(createVacancy.pending, (state) => {
        state.vacancyIsLoading = true;
        state.vacancyError = null;
      })
      .addCase(createVacancy.rejected, (state, action) => {
        state.vacancyIsLoading = false;
        state.vacancyError = action.payload as string;
      })
      .addCase(createVacancy.fulfilled, (state, action) => {
        state.vacancyIsLoading = false;
        state.vacancyError = null;
        state.vacancies.push(action.payload);
      })
      // EDIT VACANCY
      .addCase(updateVacancy.pending, (state) => {
        state.vacancyIsLoading = true;
        state.vacancyError = null;
      })
      .addCase(updateVacancy.rejected, (state, action) => {
        state.vacancyIsLoading = false;
        state.vacancyError = action.payload as string;
        state.vacancy = DEFAULT_VACANCY_DATA;
      })
      .addCase(updateVacancy.fulfilled, (state, { payload }) => {
        state.vacancyIsLoading = false;
        state.vacancy = DEFAULT_VACANCY_DATA;
        state.vacancies = state.vacancies.map((vac) =>
          vac?._id === payload._id ? payload : vac,
        );
      })
      // GET VACANCIES
      .addCase(getVacancies.pending, (state) => {
        state.vacanciesIsLoading = true;
        state.vacanciesError = null;
      })
      .addCase(getVacancies.rejected, (state, action) => {
        state.vacanciesIsLoading = false;
        state.vacanciesError = action.payload as string;
      })
      .addCase(getVacancies.fulfilled, (state, action) => {
        state.vacanciesIsLoading = false;
        state.vacanciesError = null;
        state.vacancies = action.payload;
      });
  },
});

// Actions
export const { setVacancy, resetVacancy } = employerVacanciesSlice.actions;

// Selectors
// List
export const selectVacanciesIsLoading = (state: RootState) =>
  state.employerVacancies.vacanciesIsLoading;
export const selectVacanciesError = (state: RootState) =>
  state.employerVacancies.vacanciesError;
export const selectVacancies = (state: RootState) =>
  state.employerVacancies.vacancies;

// Vacancy
export const selectVacancyIsLoading = (state: RootState) =>
  state.employerVacancies.vacancyIsLoading;
export const selectVacancyError = (state: RootState) =>
  state.employerVacancies.vacancyError;
export const selectVacancy = (state: RootState) =>
  state.employerVacancies.vacancy;

// Reducer
export default employerVacanciesSlice.reducer;
