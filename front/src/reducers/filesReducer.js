import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchFiles } from "../services/files.service";

const initialState = {
  files: [],
  isLoading: false,
  errorLoading: false
};

export const getFiles = createAsyncThunk(
  "files/getFiles",
  async (name = "", { dispatch }) => {
    const files = await fetchFiles(name);
    return files;
  }
);

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    setFiles(state, action) {
      state.files = action.payload;
    },

    setIsLoading(state, action) {
      state.isLoading = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getFiles.pending, (state, _action) => {
        state.isLoading = true;
        state.errorLoading = false;
      })
      .addCase(getFiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.files = action.payload;
      })
      .addCase(getFiles.rejected, (state, action) => {
        state.isLoading = false;
        state.errorLoading = true;
      });
  }
});

export const filesActions = filesSlice.actions;

export default filesSlice.reducer;
