import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store/appStore';
import { getMyChats, createChat, getChat, sendMessage } from './services';

import { IChat } from '../types';

const DEFAULT_CHAT = {
  _id: '',
  members: [],
  messages: [],
};

interface IChatsState {
  // Online Users
  onlineUsers: string[];

  // Chats list
  chatsLoading: boolean;
  chatsError: string | null;
  chats: IChat[];

  // Active chat
  activeChatLoading: boolean;
  activeChatError: string | null;
  activeChat: IChat;

  // Create chat
  createChatLoading: boolean;
  createChatError: string | null;

  // Send message
  sendMessageLoading: boolean;
  sendMessageError: string | null;
}

const initialState: IChatsState = {
  // Online Users
  onlineUsers: [],

  // Chats list
  chatsLoading: false,
  chatsError: null,
  chats: [],

  // Active chat
  activeChatLoading: false,
  activeChatError: null,
  activeChat: DEFAULT_CHAT,

  // Create chat
  createChatLoading: false,
  createChatError: null,

  // Send message
  sendMessageLoading: false,
  sendMessageError: null,
};

const chatsSlice = createSlice({
  name: '@@chats',
  initialState,
  reducers: {
    resetActiveChat: (state) => {
      state.activeChat = DEFAULT_CHAT;
    },
    receiveMessage: (state, action) => {
      state.activeChat.messages.push(action.payload);
    },
    updateChatItemMessage: (state, { payload }) => {
      state.chats = state.chats.map((ch) => {
        if (ch._id === payload.chatId) {
          return {
            ...ch,
            messages: [
              {
                chatId: payload.chatId as string,
                senderId: payload.senderId as string,
                content: payload.content as string,
                _id: payload._id as string,
                createdAt: String(new Date()),
              },
            ],
          };
        }

        return ch;
      });
    },
    // set online users
    setOnlineUsers: (state, { payload }) => {
      state.onlineUsers = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET CHATS
      .addCase(getMyChats.pending, (state) => {
        state.chatsLoading = true;
        state.chatsError = null;
      })
      .addCase(getMyChats.rejected, (state, action) => {
        state.chatsLoading = false;
        state.chatsError = action.payload as string;
      })
      .addCase(getMyChats.fulfilled, (state, action) => {
        state.chatsLoading = false;
        state.chatsError = null;
        state.chats = action.payload;
      })
      // CREATE CHAT
      .addCase(createChat.pending, (state) => {
        state.createChatLoading = true;
        state.createChatError = null;
      })
      .addCase(createChat.rejected, (state, action) => {
        state.createChatLoading = false;
        state.createChatError = action.payload as string;
      })
      .addCase(createChat.fulfilled, (state) => {
        state.createChatLoading = false;
        state.createChatError = null;
      })
      // GET ACTIVE CHAT
      .addCase(getChat.pending, (state) => {
        state.activeChatLoading = true;
        state.activeChatError = null;
      })
      .addCase(getChat.rejected, (state, action) => {
        state.activeChatLoading = false;
        state.activeChatError = action.payload as string;
      })
      .addCase(getChat.fulfilled, (state, action) => {
        state.activeChatLoading = false;
        state.activeChatError = null;
        state.activeChat = action.payload;
      })
      // SEND MESSAGE
      .addCase(sendMessage.pending, (state) => {
        state.sendMessageLoading = true;
        state.sendMessageError = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sendMessageLoading = false;
        state.sendMessageError = action.payload as string;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sendMessageLoading = false;
        state.sendMessageError = null;
        state.activeChat.messages.push(action.payload);
        state.chats = state.chats.map((ch) => {
          if (ch._id === action.payload.chatId) {
            return {
              ...ch,
              messages: [action.payload],
            };
          }
          return ch;
        });
      });
  },
});

// Actions
export const {
  resetActiveChat,
  receiveMessage,
  setOnlineUsers,
  updateChatItemMessage,
} = chatsSlice.actions;

// Selectors
// Online users
export const selectOnlineUsers = (state: RootState) => state.chats.onlineUsers;

// Chats
export const selectChats = (state: RootState) => state.chats.chats;
export const selectChatsLoading = (state: RootState) =>
  state.chats.chatsLoading;
export const selectChatsError = (state: RootState) => state.chats.chatsError;

// Active Chat
export const selectActiveChat = (state: RootState) => state.chats.activeChat;
export const selectActiveChatLoading = (state: RootState) =>
  state.chats.activeChatLoading;
export const selectActiveChatError = (state: RootState) =>
  state.chats.activeChatError;

// Create Chat
export const selectCreateChatLoading = (state: RootState) =>
  state.chats.createChatLoading;
export const selectCreateChatError = (state: RootState) =>
  state.chats.createChatError;

// Send Message
export const selectSendMessageLoading = (state: RootState) =>
  state.chats.sendMessageLoading;
export const selectSendMessageError = (state: RootState) =>
  state.chats.sendMessageError;

// Reducer
export default chatsSlice.reducer;
