import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { API_PATHS } from 'shared/api/paths';
import API from 'shared/api/service';
import type { RootState } from 'store/appStore';
import { TOKEN_LOCALSTORAGE_KEY } from 'shared/constants';
import type {
  RegisterDataType,
  LoginDataType,
  VerifyEmailDataType,
  ForgotPasswordDataType,
  ResetPasswordDataType,
  EditSeekerData,
  EditEmployerData,
  EditCompanyData,
} from './types';

export const userRegister = createAsyncThunk(
  '@@user/register',
  async (registerData: RegisterDataType, { rejectWithValue }) => {
    try {
      const { data } = await API.post(API_PATHS.register, registerData);

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

      return rejectWithValue('Failed user register');
    }
  },
);

export const userLogin = createAsyncThunk(
  '@@user/login',
  async (loginData: LoginDataType, { rejectWithValue }) => {
    try {
      const { data } = await API.post(API_PATHS.login, loginData);
      const { user, token } = data;

      localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, token);
      return user;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed user login');
    }
  },
);

export const userVerifyEmail = createAsyncThunk(
  '@@user/verifyEmail',
  async (verifyData: VerifyEmailDataType, { rejectWithValue }) => {
    try {
      const { data } = await API.post(API_PATHS.verifyEmail, verifyData);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed user verify email');
    }
  },
  {
    condition: (_, { getState }) => {
      const { user } = getState() as RootState;
      if (user.authIsLoading) {
        return false;
      }
      return true;
    },
  },
);

export const userForgotPassword = createAsyncThunk(
  '@@user/forgotPassword',
  async (forgotPasswordData: ForgotPasswordDataType, { rejectWithValue }) => {
    try {
      const { data } = await API.post(
        API_PATHS.forgotPassword,
        forgotPasswordData,
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed user forgot password');
    }
  },
);

export const userResetPassword = createAsyncThunk(
  '@@user/resetPassword',
  async (resetPasswordData: ResetPasswordDataType, { rejectWithValue }) => {
    try {
      const { data } = await API.post(
        API_PATHS.resetPassword,
        resetPasswordData,
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed user forgot password');
    }
  },
);

export const userGetProfile = createAsyncThunk(
  '@@user/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(API_PATHS.getMe);
      return data.user;
    } catch (error: unknown) {
      return rejectWithValue('Failed get profile');
    }
  },
  {
    condition: (_, { getState }) => {
      const { user } = getState() as RootState;
      if (user.getProfileIsLoading) {
        return false;
      }
      return true;
    },
  },
);

export const userEditSeeker = createAsyncThunk(
  '@@user/editSeeker',
  async (editSeekerData: EditSeekerData, { rejectWithValue }) => {
    const {
      id,
      searchStatus,
      firstName,
      lastName,
      avatar,
      phone,
      linkedin,
      github,
      portfolio,
      skype,
      telegram,
      image,
    } = editSeekerData;
    try {
      const form = new FormData();

      form.append('searchStatus', String(searchStatus));
      form.append('firstName', firstName);
      form.append('lastName', lastName);
      form.append('avatar', avatar);
      form.append('phone', phone);
      form.append('linkedin', linkedin);
      form.append('github', github);
      form.append('portfolio', portfolio);
      form.append('skype', skype);
      form.append('telegram', telegram);

      if (image) {
        form.append('file', image);
      }

      const { data } = await API.patch(`${API_PATHS.seekers}/${id}`, form);

      return data.user;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed seker update');
    }
  },
);

export const userEditEmployer = createAsyncThunk(
  '@@user/editEmployer',
  async (editEmployerData: EditEmployerData, { rejectWithValue }) => {
    const {
      id,
      firstName,
      lastName,
      userPosition,
      avatar,
      phone,
      linkedin,
      image,
    } = editEmployerData;
    try {
      const form = new FormData();

      form.append('firstName', firstName);
      form.append('lastName', lastName);
      form.append('avatar', avatar);
      form.append('phone', phone);
      form.append('linkedin', linkedin);
      form.append('userPosition', userPosition);

      if (image) {
        form.append('file', image);
      }

      const { data } = await API.patch(`${API_PATHS.employers}/${id}`, form);
      return data.user;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed employer update');
    }
  },
);

export const userEditCompany = createAsyncThunk(
  '@@user/editCompany',
  async (editCompanyData: EditCompanyData, { rejectWithValue }) => {
    const {
      id,
      companyDescription,
      companyDouPage,
      companyEmployeesCount,
      companyLogo,
      companyName,
      companyOffices,
      companyWebSite,
      image,
    } = editCompanyData;
    try {
      const form = new FormData();

      form.append('companyDescription', companyDescription);
      form.append('companyDouPage', companyDouPage);
      form.append('companyEmployeesCount', String(companyEmployeesCount));
      form.append('companyLogo', companyLogo);
      form.append('companyName', companyName);
      form.append('companyOffices', companyOffices);
      form.append('companyWebSite', companyWebSite);

      if (image) {
        form.append('file', image);
      }

      const { data } = await API.patch(
        `${API_PATHS.employers}/company/${id}`,
        form,
      );
      return data.user;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed employer company update');
    }
  },
);
