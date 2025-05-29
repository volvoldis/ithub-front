import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { API_PATHS } from 'shared/api/paths';
import API from 'shared/api/service';

export const getMyNotifications = createAsyncThunk(
  '@@notifications/getMyNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`${API_PATHS.notifications}`);
      return data.notifications;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed get my notifications');
    }
  },
);

export const readNotification = createAsyncThunk(
  '@@notifications/readNotification',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await API.post(`${API_PATHS.notifications}/read`, {
        notificationId: id,
      });
      return data.watchedId;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed read notification');
    }
  },
);
