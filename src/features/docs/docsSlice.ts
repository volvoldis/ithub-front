import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store/appStore';
import { getCompanyDocs, createDoc, editDoc, deleteDoc } from './services';

import { IDoc } from '../types';

const DEFAULT_DOC = {
  _id: '',
  owner: '',
  url: '',
  title: '',
  filename: '',
  size: '',
  type: '',
  updatedAt: '',
};

interface IDocsState {
  // List
  docsIsLoading: boolean;
  docsError: string | null;
  docs: IDoc[];

  // Document
  documentIsLoading: boolean;
  documentError: string | null;
  document: IDoc;
}

const initialState: IDocsState = {
  // List
  docsIsLoading: false,
  docsError: null,
  docs: [],

  // Document
  documentIsLoading: false,
  documentError: null,
  document: DEFAULT_DOC,
};

const docsSlice = createSlice({
  name: '@@docs',
  initialState,
  reducers: {
    setCurrentDoc: (state, action) => {
      state.document = state.docs.find((d) => d._id === action.payload) as IDoc;
    },
    resetCurrentDoc: (state) => {
      state.document = DEFAULT_DOC;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET DOCS
      .addCase(getCompanyDocs.pending, (state) => {
        state.docsIsLoading = true;
        state.docsError = null;
      })
      .addCase(getCompanyDocs.rejected, (state, action) => {
        state.docsIsLoading = false;
        state.docsError = action.payload as string;
      })
      .addCase(getCompanyDocs.fulfilled, (state, action) => {
        state.docsIsLoading = false;
        state.docsError = null;
        state.docs = action.payload;
      })
      // CREATE DOC
      .addCase(createDoc.pending, (state) => {
        state.documentIsLoading = true;
        state.documentError = null;
      })
      .addCase(createDoc.rejected, (state, action) => {
        state.documentIsLoading = false;
        state.documentError = action.payload as string;
      })
      .addCase(createDoc.fulfilled, (state, action) => {
        state.documentIsLoading = false;
        state.documentError = null;
        state.docs.unshift(action.payload);
      })
      // EDIT DOC
      .addCase(editDoc.pending, (state) => {
        state.documentIsLoading = true;
        state.documentError = null;
      })
      .addCase(editDoc.rejected, (state, action) => {
        state.documentIsLoading = false;
        state.documentError = action.payload as string;
      })
      .addCase(editDoc.fulfilled, (state, action) => {
        state.documentIsLoading = false;
        state.documentError = null;
        state.docs = state.docs.map((d) =>
          d?._id === action.payload._id ? action.payload : d,
        );
      })
      // DELETE DOC
      .addCase(deleteDoc.pending, (state) => {
        state.documentIsLoading = true;
        state.documentError = null;
      })
      .addCase(deleteDoc.rejected, (state, action) => {
        state.documentIsLoading = false;
        state.documentError = action.payload as string;
      })
      .addCase(deleteDoc.fulfilled, (state, action) => {
        state.documentIsLoading = false;
        state.documentError = null;
        state.docs = state.docs.filter((d) => d._id !== action.payload._id);
      });
  },
});

// Actions
export const { setCurrentDoc, resetCurrentDoc } = docsSlice.actions;

// Selectors
// List
export const selectDocs = (state: RootState) => state.docs.docs;
export const selectDocsIsLoading = (state: RootState) =>
  state.docs.docsIsLoading;
export const selectDocsError = (state: RootState) => state.docs.docsError;

// DOC
export const selectDocument = (state: RootState) => state.docs.document;
export const selectDocumentIsLoading = (state: RootState) =>
  state.docs.docsIsLoading;
export const selectDocumentError = (state: RootState) => state.docs.docsError;

// Reducer
export default docsSlice.reducer;
