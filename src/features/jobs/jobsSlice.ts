import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store/appStore';
import { getJobs, getJobById, applyToJob, getMyApplications } from './services';

import { IJob } from '../types';

const DEFAULT_JOB_DATA = {
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

interface IJobsState {
  // Jobs list
  jobsListLoading: boolean;
  jobsListError: string | null;
  jobsList: IJob[];

  // Job page
  jobPageLoading: boolean;
  jobPageError: string | null;
  jobPage: IJob;

  // My applications
  myApplicationsLoading: boolean;
  myApplicationsError: string | null;
  myApplications: IJob[];
}

const initialState: IJobsState = {
  // Jobs list
  jobsListLoading: false,
  jobsListError: null,
  jobsList: [],

  // Job page
  jobPageLoading: false,
  jobPageError: null,
  jobPage: DEFAULT_JOB_DATA,

  // My applications
  myApplicationsLoading: false,
  myApplicationsError: null,
  myApplications: [],
};

const jobsSlice = createSlice({
  name: '@@jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET JOBS LIST
      .addCase(getJobs.pending, (state) => {
        state.jobsListLoading = true;
        state.jobsListError = null;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.jobsListLoading = false;
        state.jobsListError = action.payload as string;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.jobsListLoading = false;
        state.jobsListError = null;
        state.jobsList = action.payload;
      })
      // GET JOB BY ID
      .addCase(getJobById.pending, (state) => {
        state.jobPageLoading = true;
        state.jobPageError = null;
      })
      .addCase(getJobById.rejected, (state, action) => {
        state.jobPageLoading = false;
        state.jobPageError = action.payload as string;
      })
      .addCase(getJobById.fulfilled, (state, action) => {
        state.jobPageLoading = false;
        state.jobPageError = null;
        state.jobPage = action.payload;
      })
      // APPLY TO JOB
      .addCase(applyToJob.fulfilled, (state, action) => {
        state.jobPage.applications.push(action.payload);
      })
      // GET MY APPLICATIONS
      .addCase(getMyApplications.pending, (state) => {
        state.myApplicationsLoading = true;
        state.myApplicationsError = null;
      })
      .addCase(getMyApplications.rejected, (state, action) => {
        state.myApplicationsLoading = false;
        state.myApplicationsError = action.payload as string;
      })
      .addCase(getMyApplications.fulfilled, (state, action) => {
        state.myApplicationsLoading = false;
        state.myApplicationsError = null;
        state.myApplications = action.payload;
      });
  },
});

// Selectors

// All Jobs
export const selectJobs = (state: RootState) => state.jobs.jobsList;
export const selectJobsIsLoading = (state: RootState) =>
  state.jobs.jobsListLoading;
export const selectJobsError = (state: RootState) => state.jobs.jobsListError;

// Job Page
export const selectJob = (state: RootState) => state.jobs.jobPage;
export const selectJobIsLoading = (state: RootState) =>
  state.jobs.jobPageLoading;
export const selectJobError = (state: RootState) => state.jobs.jobPageError;

// My Applications
export const selectMyApplications = (state: RootState) =>
  state.jobs.myApplications;

export const selectMyApplicationsIsLoading = (state: RootState) =>
  state.jobs.myApplicationsLoading;
export const selectMyApplicationsError = (state: RootState) =>
  state.jobs.myApplicationsError;

// Reducer
export default jobsSlice.reducer;
