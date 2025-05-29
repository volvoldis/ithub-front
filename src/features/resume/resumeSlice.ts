import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store/appStore';
import { getMyResume, editResume, getResumes, getResumeById } from './services';

import { IResume } from '../types';

const DEFAULT_RESUME_DATA = {
  _id: '',
  owner: '',
  position: '',
  category: '',
  skills: [],
  workExperience: 0,
  experienceLevel: '',
  salaryExpectations: 0,
  country: '',
  city: '',
  relocation: false,
  englishLevel: '',
  summary: '',
  employment: [],
  dontConsider: [],
  createdAt: '',
  updatedAt: '',
  isPublished: false,
};

interface IResumeState {
  // Resumes List
  resumesListLoading: boolean;
  resumesListError: string | null;
  resumesList: IResume[];

  // Resume Page
  resumePageLoading: boolean;
  resumePageError: string | null;
  resumePage: IResume;

  // My Resume
  myResumeLoading: boolean;
  myResumeError: string | null;
  myResume: IResume;

  myResumeUpdateLoading: boolean;
}

const initialState: IResumeState = {
  // All resumes (candidates)
  resumesListLoading: false,
  resumesListError: null,
  resumesList: [],

  // Resume Page (Candidate)
  resumePageLoading: false,
  resumePageError: null,
  resumePage: DEFAULT_RESUME_DATA,

  // My Resume
  myResumeLoading: false,
  myResumeError: null,
  myResume: DEFAULT_RESUME_DATA,

  myResumeUpdateLoading: false,
};

const resumeSlice = createSlice({
  name: '@@resume',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET MY RESUME
      .addCase(getMyResume.pending, (state) => {
        state.myResumeLoading = true;
        state.myResumeError = null;
      })
      .addCase(getMyResume.rejected, (state, action) => {
        state.myResumeLoading = false;
        state.myResumeError = action.payload as string;
      })
      .addCase(getMyResume.fulfilled, (state, action) => {
        state.myResumeLoading = false;
        state.myResumeError = null;
        state.myResume = action.payload;
      })
      // EDIT MY RESUME
      .addCase(editResume.pending, (state) => {
        state.myResumeUpdateLoading = true;
        state.myResumeError = null;
      })
      .addCase(editResume.rejected, (state, action) => {
        state.myResumeUpdateLoading = false;
        state.myResumeError = action.payload as string;
      })
      .addCase(editResume.fulfilled, (state, action) => {
        state.myResumeUpdateLoading = false;
        state.myResumeError = null;
        state.myResume = action.payload;
      })
      // GET RESUMES (CANDIDATES)
      .addCase(getResumes.pending, (state) => {
        state.resumesListLoading = true;
        state.resumesListError = null;
      })
      .addCase(getResumes.rejected, (state, action) => {
        state.resumesListLoading = false;
        state.resumesListError = action.payload as string;
      })
      .addCase(getResumes.fulfilled, (state, action) => {
        state.resumesListLoading = false;
        state.resumesListError = null;
        state.resumesList = action.payload;
      })
      // GET RESUME BY ID
      .addCase(getResumeById.pending, (state) => {
        state.resumePageLoading = true;
        state.resumePageError = null;
      })
      .addCase(getResumeById.rejected, (state, action) => {
        state.resumePageLoading = false;
        state.resumePageError = action.payload as string;
      })
      .addCase(getResumeById.fulfilled, (state, action) => {
        state.resumePageLoading = false;
        state.resumePageError = null;
        state.resumePage = action.payload;
      });
  },
});

// Actions

// Selectors
// Resumes list
export const selectResumes = (state: RootState) => state.resume.resumesList;
export const selectResumesIsLoading = (state: RootState) =>
  state.resume.resumesListLoading;
export const selectResumesError = (state: RootState) =>
  state.resume.resumesListError;

// Resume Page
export const selectResume = (state: RootState) => state.resume.resumePage;
export const selectResumeIsLoading = (state: RootState) =>
  state.resume.resumePageLoading;
export const selectResumeError = (state: RootState) =>
  state.resume.resumePageError;

// My Resume
export const selectMyResume = (state: RootState) => state.resume.myResume;
export const selectMyResumeIsLoading = (state: RootState) =>
  state.resume.myResumeLoading;
export const selectMyResumeError = (state: RootState) =>
  state.resume.myResumeError;

export const selectMyResumeUpdateIsLoading = (state: RootState) =>
  state.resume.myResumeUpdateLoading;

// Reducer
export default resumeSlice.reducer;
