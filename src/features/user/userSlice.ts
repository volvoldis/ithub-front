import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store/appStore';
import { ROLES, TOKEN_LOCALSTORAGE_KEY } from 'shared/constants';
import {
  userRegister,
  userLogin,
  userVerifyEmail,
  userForgotPassword,
  userResetPassword,
  userGetProfile,
  userEditSeeker,
  userEditEmployer,
  userEditCompany,
} from './service';

import { ISeekerAccount, IEmployerAccount } from '../types';

interface IUserState {
  // Auth
  authIsLoading: boolean;
  authError: string | null;

  // User
  userIsLoading: boolean;
  userError: string | null;
  userData: ISeekerAccount | IEmployerAccount | null;

  // Get Profile
  getProfileIsLoading: boolean;
  getProfileError: string | null;
}

const initialState: IUserState = {
  // Auth
  authIsLoading: false,
  authError: null,

  // User
  userIsLoading: false,
  userError: null,
  userData: null,

  // Get Profile
  getProfileIsLoading: false,
  getProfileError: null,
};

const userSlice = createSlice({
  name: '@@user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY);
      state.userIsLoading = false;
      state.userError = null;
      state.userData = null;
    },
    setUser: (state, { payload }) => {
      state.userData = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // AUTH
      // REGISTER
      .addCase(userRegister.pending, (state) => {
        state.authIsLoading = true;
        state.authError = null;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.authIsLoading = false;
        state.authError = action.payload as string;
      })
      .addCase(userRegister.fulfilled, (state) => {
        state.authIsLoading = false;
        state.authError = null;
      })
      // LOGIN
      .addCase(userLogin.pending, (state) => {
        state.authIsLoading = true;
        state.authError = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.authIsLoading = false;
        state.authError = action.payload as string;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.authIsLoading = false;
        state.authError = null;
        state.userData = action.payload;
      })
      // VERIFY EMAIL
      .addCase(userVerifyEmail.pending, (state) => {
        state.authIsLoading = true;
        state.authError = null;
      })
      .addCase(userVerifyEmail.rejected, (state, action) => {
        state.authIsLoading = false;
        state.authError = action.payload as string;
      })
      .addCase(userVerifyEmail.fulfilled, (state) => {
        state.authIsLoading = false;
        state.authError = null;
      })
      //  FORGOT PASSWORD
      .addCase(userForgotPassword.pending, (state) => {
        state.authIsLoading = true;
        state.authError = null;
      })
      .addCase(userForgotPassword.rejected, (state, action) => {
        state.authIsLoading = false;
        state.authError = action.payload as string;
      })
      .addCase(userForgotPassword.fulfilled, (state) => {
        state.authIsLoading = false;
        state.authError = null;
      })
      //  RESET PASSWORD
      .addCase(userResetPassword.pending, (state) => {
        state.authIsLoading = true;
        state.authError = null;
      })
      .addCase(userResetPassword.rejected, (state, action) => {
        state.authIsLoading = false;
        state.authError = action.payload as string;
      })
      .addCase(userResetPassword.fulfilled, (state) => {
        state.authIsLoading = false;
        state.authError = null;
      })
      // GET PROFILE
      .addCase(userGetProfile.pending, (state) => {
        state.getProfileIsLoading = true;
        state.getProfileError = null;
      })
      .addCase(userGetProfile.rejected, (state, action) => {
        state.getProfileIsLoading = false;
        state.getProfileError = action.payload as string;
      })
      .addCase(userGetProfile.fulfilled, (state, action) => {
        state.getProfileIsLoading = false;
        state.getProfileError = null;
        state.userData = action.payload;
      })
      // USER
      // EDIT SEEKER
      .addCase(userEditSeeker.pending, (state) => {
        state.userIsLoading = true;
        state.userError = null;
      })
      .addCase(userEditSeeker.rejected, (state, action) => {
        state.userIsLoading = true;
        state.userError = action.payload as string;
      })
      .addCase(userEditSeeker.fulfilled, (state, action) => {
        state.userIsLoading = false;
        state.userError = null;
        state.userData = action.payload;
      })
      // EDIT EMPLOYER
      .addCase(userEditEmployer.pending, (state) => {
        state.userIsLoading = true;
        state.userError = null;
      })
      .addCase(userEditEmployer.rejected, (state, action) => {
        state.userIsLoading = true;
        state.userError = action.payload as string;
      })
      .addCase(userEditEmployer.fulfilled, (state, action) => {
        state.userIsLoading = false;
        state.userError = null;
        state.userData = action.payload;
      })
      // EDIT EMPLOYER COMPANY
      .addCase(userEditCompany.pending, (state) => {
        state.userIsLoading = true;
        state.userError = null;
      })
      .addCase(userEditCompany.rejected, (state, action) => {
        state.userIsLoading = true;
        state.userError = action.payload as string;
      })
      .addCase(userEditCompany.fulfilled, (state, action) => {
        state.userIsLoading = false;
        state.userError = null;
        state.userData = action.payload;
      });
  },
});

// Actions
export const { logout, setUser } = userSlice.actions;

// Selectors
// Auth
export const selectAuthIsLoading = (state: RootState) =>
  state.user.authIsLoading;
export const selectAuthError = (state: RootState) => state.user.authError;

// Get Profile
export const selectGetProfileIsLoading = (state: RootState) =>
  state.user.getProfileIsLoading;
export const selectGetProfileError = (state: RootState) =>
  state.user.getProfileError;

// User
export const selectUser = (state: RootState) => state.user.userData;
export const selectIsAuthorized = (state: RootState) => !!state.user.userData;
export const selectUserIsLoading = (state: RootState) =>
  state.user.userIsLoading;
export const selectUserError = (state: RootState) => state.user.userError;

export const selectIsAdmin = (state: RootState) =>
  state.user.userData?.role === ROLES.admin;

// Reducer
export default userSlice.reducer;
