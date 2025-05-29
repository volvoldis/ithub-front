import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store/appStore';
import { getMyNotifications, readNotification } from './services';

import { INotification } from './types';

interface INotificationsState {
  // Notifications list
  notificationsLoading: boolean;
  notificationsError: string | null;
  notifications: INotification[];

  // Read notification
  readNotificationLoading: boolean;
  readNotificationError: string | null;
}

const initialState: INotificationsState = {
  // Notifications list
  notificationsLoading: false,
  notificationsError: null,
  notifications: [],

  // Read notification
  readNotificationLoading: false,
  readNotificationError: null,
};

const notificationsSlice = createSlice({
  name: '@@notifications',
  initialState,
  reducers: {
    receiveNotification: (state, { payload }) => {
      state.notifications = [payload, ...state.notifications];
    },
  },
  extraReducers: (builder) => {
    builder
      // GET NOTIFICATIONS
      .addCase(getMyNotifications.pending, (state) => {
        state.notificationsLoading = true;
        state.notificationsError = null;
      })
      .addCase(getMyNotifications.rejected, (state, action) => {
        state.notificationsLoading = false;
        state.notificationsError = action.payload as string;
      })
      .addCase(getMyNotifications.fulfilled, (state, action) => {
        state.notificationsLoading = false;
        state.notificationsError = null;
        state.notifications = action.payload;
      })
      // READ NOTIFICATIONS
      .addCase(readNotification.pending, (state) => {
        state.readNotificationLoading = true;
        state.readNotificationError = null;
      })
      .addCase(readNotification.rejected, (state, action) => {
        state.readNotificationLoading = false;
        state.readNotificationError = action.payload as string;
      })
      .addCase(readNotification.fulfilled, (state, action) => {
        state.readNotificationLoading = false;
        state.readNotificationError = null;
        state.notifications = state.notifications.map((n) => {
          if (n._id === action.payload) {
            return {
              ...n,
              isWatched: true,
            };
          }
          return n;
        });
      });
  },
});

// Actions
export const { receiveNotification } = notificationsSlice.actions;

// Selectors
// Notifications
export const selectMyNotifications = (state: RootState) =>
  state.notifications.notifications;
export const selectMyNotificationsLoading = (state: RootState) =>
  state.notifications.notificationsLoading;
export const selectMyNotificationsError = (state: RootState) =>
  state.notifications.notificationsError;

// Read notification
export const selectReadNotificationLoading = (state: RootState) =>
  state.notifications.readNotificationLoading;
export const selectReadNotificationError = (state: RootState) =>
  state.notifications.readNotificationError;

// UnWatched notifications
export const selectUnWatchedCount = (state: RootState) =>
  state.notifications.notifications.filter((n) => n.isWatched === false).length;

// Reducer
export default notificationsSlice.reducer;
