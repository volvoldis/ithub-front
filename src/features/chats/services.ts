import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { API_PATHS } from 'shared/api/paths';
import API from 'shared/api/service';
import { ICreateMessageData } from './types';

export const getMyChats = createAsyncThunk(
  '@@chats/getMyChats',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`${API_PATHS.chats}`);
      return data.chats;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed get myChats');
    }
  },
);

export const createChat = createAsyncThunk(
  '@@chats/createChat',
  async (recipientId: string, { rejectWithValue }) => {
    try {
      const { data } = await API.post(API_PATHS.chats, { recipientId });
      return data.chatId;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed create chat');
    }
  },
);

export const getChat = createAsyncThunk(
  '@@chats/getChat',
  async (chatId: string, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`${API_PATHS.chats}/${chatId}`);
      return data.chat;
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

export const sendMessage = createAsyncThunk(
  '@@chats/createMessage',
  async (messageData: ICreateMessageData, { rejectWithValue }) => {
    try {
      const { chatId, ...msg } = messageData;

      const { data } = await API.post(`${API_PATHS.messages}/${chatId}`, msg);

      return data.message;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed get chat messages');
    }
  },
);
