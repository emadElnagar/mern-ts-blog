import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://localhost:5000/api/users';

export interface User {
  _id?: object;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  image?: string;
}

interface UserState {
  users: User[],
  user: User | null,
  isLoading: boolean,
  error: object | null
}

const initialState: UserState = {
  users: [],
  user: null,
  isLoading: false,
  error: null
}

// User register
export const UserRegister: any = createAsyncThunk("useres/register", async (user: object, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${url}/register`, {
      user
    });
    return response.data;
  } catch (error: any) {
    rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(UserRegister.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(UserRegister.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users.push(action.payload);
    })
    .addCase(UserRegister.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    })
  }
});

export default userSlice.reducer;
