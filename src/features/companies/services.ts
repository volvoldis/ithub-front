import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { API_PATHS } from 'shared/api/paths';
import API from 'shared/api/service';

export const getCompanies = createAsyncThunk(
  '@@companies/getCompanies',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(API_PATHS.employers);
      return data.employers;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed get companies');
    }
  },
);

export const getCompanyById = createAsyncThunk(
  '@@companies/getCompanyById',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`${API_PATHS.employers}/${id}`);
      return data;
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
