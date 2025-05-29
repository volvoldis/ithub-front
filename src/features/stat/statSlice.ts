import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store/appStore';
import {
  getTotalStat,
  getLevelStat,
  getDomainsStat,
  getEmploymentStat,
  getEnglishStat,
  getAverageSalaryExpectationStat,
} from './services';

import {
  ITotalStat,
  ILevelStat,
  IEmploymentStat,
  IDomainStat,
  IEnglishStat,
  ISalaryExpectation,
} from './types';

const ENGLISH_COLOS = [
  'indigo.5',
  'red.6',
  'teal.6',
  'blue.6',
  'cyan.5',
  'grape.5',
];

interface IStatState {
  // Total statistics
  totalStatLoading: boolean;
  totalStatError: string | null;
  totalStat: ITotalStat[];

  // Level statistics
  levelStatLoading: boolean;
  levelStatError: string | null;
  levelStat: ILevelStat[];

  // Employment statistics
  employmentStatLoading: boolean;
  employmentStatError: string | null;
  employmentStat: IEmploymentStat[];

  // Domains statistics
  domainsStatLoading: boolean;
  domainsStatError: string | null;
  domainsStat: IDomainStat[];

  // English
  englishStatLoading: boolean;
  englishStatError: string | null;
  englishStat: IEnglishStat;

  // Salary Expectation
  salaryExpectationLoading: boolean;
  salaryExpectationError: string | null;
  salaryExpectationStat: ISalaryExpectation[];
}

const initialState: IStatState = {
  // Total statistics
  totalStatLoading: false,
  totalStatError: null,
  totalStat: [],

  // Level statistics
  levelStatLoading: false,
  levelStatError: null,
  levelStat: [],

  // Employment statistics
  employmentStatLoading: false,
  employmentStatError: null,
  employmentStat: [],

  // Domains statistics
  domainsStatLoading: false,
  domainsStatError: null,
  domainsStat: [],

  // English statistics
  englishStatLoading: false,
  englishStatError: null,
  englishStat: {
    vacancies: [],
    candidates: [],
  },

  // Salary Expectation
  salaryExpectationLoading: false,
  salaryExpectationError: null,
  salaryExpectationStat: [],
};

const statSlice = createSlice({
  name: '@@stat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET TOTAL STAT
      .addCase(getTotalStat.pending, (state) => {
        state.totalStatLoading = true;
        state.totalStatError = null;
      })
      .addCase(getTotalStat.rejected, (state, action) => {
        state.totalStatLoading = false;
        state.totalStatError = action.payload as string;
      })
      .addCase(getTotalStat.fulfilled, (state, action) => {
        state.totalStatLoading = false;
        state.totalStatError = null;
        state.totalStat = action.payload;
      })
      // GET LEVEL STAT
      .addCase(getLevelStat.pending, (state) => {
        state.levelStatLoading = true;
        state.levelStatError = null;
      })
      .addCase(getLevelStat.rejected, (state, action) => {
        state.levelStatLoading = false;
        state.levelStatError = action.payload as string;
      })
      .addCase(getLevelStat.fulfilled, (state, action) => {
        state.levelStatLoading = false;
        state.levelStatError = null;
        state.levelStat = action.payload;
      })
      // GET EMPLOYMENT STAT
      .addCase(getEmploymentStat.pending, (state) => {
        state.employmentStatLoading = true;
        state.employmentStatError = null;
      })
      .addCase(getEmploymentStat.rejected, (state, action) => {
        state.employmentStatLoading = false;
        state.employmentStatError = action.payload as string;
      })
      .addCase(getEmploymentStat.fulfilled, (state, action) => {
        state.employmentStatLoading = false;
        state.employmentStatError = null;
        state.employmentStat = action.payload;
      })
      // GET DOMAINS STAT
      .addCase(getDomainsStat.pending, (state) => {
        state.domainsStatLoading = true;
        state.domainsStatError = null;
      })
      .addCase(getDomainsStat.rejected, (state, action) => {
        state.domainsStatLoading = false;
        state.domainsStatError = action.payload as string;
      })
      .addCase(getDomainsStat.fulfilled, (state, action) => {
        state.domainsStatLoading = false;
        state.domainsStatError = null;
        state.domainsStat = action.payload;
      })
      // GET ENGLISH STAT
      .addCase(getEnglishStat.pending, (state) => {
        state.englishStatLoading = true;
        state.englishStatError = null;
      })
      .addCase(getEnglishStat.rejected, (state, action) => {
        state.englishStatLoading = false;
        state.englishStatError = action.payload as string;
      })
      .addCase(getEnglishStat.fulfilled, (state, action) => {
        state.englishStatLoading = false;
        state.englishStatError = null;
        state.englishStat.vacancies = action.payload.vacancies.map(
          (el: { name: string; value: number }, idx: number) => ({
            ...el,
            color: ENGLISH_COLOS[idx],
          }),
        );
        state.englishStat.candidates = action.payload.candidates.map(
          (el: { name: string; value: number }, idx: number) => ({
            ...el,
            color: ENGLISH_COLOS[idx],
          }),
        );
      })
      // GET SALARY EXPECTATION STAT
      .addCase(getAverageSalaryExpectationStat.pending, (state) => {
        state.salaryExpectationLoading = true;
        state.salaryExpectationError = null;
      })
      .addCase(getAverageSalaryExpectationStat.rejected, (state, action) => {
        state.salaryExpectationLoading = false;
        state.salaryExpectationError = action.payload as string;
      })
      .addCase(getAverageSalaryExpectationStat.fulfilled, (state, action) => {
        state.salaryExpectationLoading = false;
        state.salaryExpectationError = null;
        state.salaryExpectationStat = action.payload;
      });
  },
});

// Actions

// Selectors
export const selectTotalStat = (state: RootState) => state.stat.totalStat;
export const selectTotalStatIsLoading = (state: RootState) =>
  state.stat.totalStatLoading;
export const selectTotalError = (state: RootState) => state.stat.totalStatError;

// Level
export const selectLevelStat = (state: RootState) => state.stat.levelStat;
export const selectLevelStatIsLoading = (state: RootState) =>
  state.stat.levelStatLoading;
export const selectLevelError = (state: RootState) => state.stat.levelStatError;

// Employment
export const selectEmploymentStat = (state: RootState) =>
  state.stat.employmentStat;
export const selectEmploymentStatIsLoading = (state: RootState) =>
  state.stat.employmentStatLoading;
export const selectEmploymentError = (state: RootState) =>
  state.stat.employmentStatError;

// Domains
export const selectDomainsStat = (state: RootState) => state.stat.domainsStat;
export const selectDomainsStatIsLoading = (state: RootState) =>
  state.stat.domainsStatLoading;
export const selectDomainsError = (state: RootState) =>
  state.stat.domainsStatError;

// English
export const selectEnglishStat = (state: RootState) => state.stat.englishStat;
export const selectEnglishStatIsLoading = (state: RootState) =>
  state.stat.englishStatLoading;
export const selectEnglishError = (state: RootState) =>
  state.stat.englishStatError;

// Average Salary Expectation
export const selectSalaryExpectationStat = (state: RootState) =>
  state.stat.salaryExpectationStat;
export const selectSalaryExpectationLoading = (state: RootState) =>
  state.stat.salaryExpectationLoading;
export const selectSalaryExpectationError = (state: RootState) =>
  state.stat.salaryExpectationError;

// Reducer
export default statSlice.reducer;
