import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";

const initialState = {
  error: null as SerializedError | null,
  theme: localStorage.getItem("theme") || "light",
};

// Change theme action
export const changeTheme = createAsyncThunk<string, string>(
  "theme/change",
  async (theme, { rejectWithValue }) => {
    try {
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
      return theme;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeTheme.pending, (state) => {
        state.error = null;
      })
      .addCase(changeTheme.fulfilled, (state, action) => {
        state.error = null;
        state.theme = action.payload;
      })
      .addCase(changeTheme.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export default themeSlice.reducer;
