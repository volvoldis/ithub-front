import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { API_PATHS } from 'shared/api/paths';
import API from 'shared/api/service';

export const getJobById = createAsyncThunk(
  '@@jobs/getJobById',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`${API_PATHS.jobs}/${id}`);
      return data.job;
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

export const getJobs = createAsyncThunk(
  '@@jobs/getJobs',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(API_PATHS.jobs);
      return data.jobs;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed get jobs');
    }
  },
);

export const applyToJob = createAsyncThunk(
  '@@jobs/applyToJob',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await API.post(`${API_PATHS.jobs}/apply-job/${id}`);
      return data.seekerId;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed get jobs');
    }
  },
);

export const getMyApplications = createAsyncThunk(
  '@@jobs/getMyApplications',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`${API_PATHS.jobs}/applications/my`);
      return data.applications;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed get jobs');
    }
  },
);
