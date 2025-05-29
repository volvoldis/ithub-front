import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { API_PATHS } from 'shared/api/paths';
import API from 'shared/api/service';
import { ICreateDocData, IEditDocData } from './types';

export const getCompanyDocs = createAsyncThunk(
  '@@docs/getCompanyDocs',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`${API_PATHS.docs}`);
      return data.docs;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed get company docs');
    }
  },
);

export const createDoc = createAsyncThunk(
  '@@chats/createDoc',
  async (createData: ICreateDocData, { rejectWithValue }) => {
    try {
      const { docUrl, title, file } = createData;

      const form = new FormData();

      form.append('title', title);

      if (file) {
        form.append('file', file);
        form.append('filename', file.name);
        form.append('type', file.type);
        form.append('size', String(file.size));
      } else {
        form.append('docUrl', docUrl);
      }

      const { data } = await API.post(API_PATHS.docs, form);
      return data.doc;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed create doc');
    }
  },
);

export const editDoc = createAsyncThunk(
  '@@docs/editDoc',
  async (editData: IEditDocData, { rejectWithValue }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { _id, title, file, docUrl } = editData;

      const form = new FormData();

      form.append('title', title);

      if (file) {
        form.append('file', file);
        form.append('filename', file.name);
        form.append('type', file.type);
        form.append('size', String(file.size));
      } else {
        form.append('docUrl', docUrl);
      }

      const { data } = await API.patch(`${API_PATHS.docs}/${_id}`, form);
      return data.doc;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed update doc');
    }
  },
);

export const deleteDoc = createAsyncThunk(
  '@@docs/deleteDoc',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await API.delete(`${API_PATHS.docs}/${id}`);
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

      return rejectWithValue('Failed delete doc');
    }
  },
);
