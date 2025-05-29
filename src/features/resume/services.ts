import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { API_PATHS } from 'shared/api/paths';
import API from 'shared/api/service';
import { IEditResume } from './types';

export const getMyResume = createAsyncThunk(
  '@@resume/getMyResume',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`${API_PATHS.resumes}/my/resume`);
      return data.resume;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed get resume');
    }
  },
);

export const editResume = createAsyncThunk(
  '@@resume/editResume',
  async (editResumeData: IEditResume, { rejectWithValue }) => {
    const { id, ...resumeData } = editResumeData;
    try {
      const { data } = await API.patch(
        `${API_PATHS.resumes}/${id}`,
        resumeData,
      );
      return data.resume;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed Edit Resume');
    }
  },
);

export const getResumes = createAsyncThunk(
  '@@resume/getResumes',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(API_PATHS.resumes);
      return data.resumes;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed get resumes');
    }
  },
);

export const getResumeById = createAsyncThunk(
  '@@resume/getResumeById',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`${API_PATHS.resumes}/${id}`);
      return data.resume;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed get resume by id');
    }
  },
);
