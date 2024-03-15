import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";

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
    const response = await axios.post(`${url}/register`, user);
    const data = jwtDecode<JwtPayload>(response.data.token);
    sessionStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  } catch (error: any) {
    rejectWithValue(error.message);
  }
});

// User login
export const Login: any = createAsyncThunk("usres/login", async (user: object, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${url}/login`, user);
    const data = jwtDecode<JwtPayload>(response.data.token);
    sessionStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  } catch (error: any) {
    rejectWithValue(error.message);
  }
});

// User logout
export const Logout: any = createAsyncThunk("users/logout", async (_, { rejectWithValue }) => {
  try {
    sessionStorage.removeItem('userInfo');
  } catch (error: any) {
    rejectWithValue(error.message);
  }
});

// Get all users
export const GetAllUsers: any = createAsyncThunk("users/all", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/all`);
    return response.data;
  } catch (error: any) {
    rejectWithValue(error.message);
  }
});

// Delete user
export const DeleteUser: any = createAsyncThunk("user/delete", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${url}/${id}/delete`);
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
    // User register
    .addCase(UserRegister.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(UserRegister.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users.push(action.payload);
      state.user = action.payload;
    })
    .addCase(UserRegister.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    })
    // User login
    .addCase(Login.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(Login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    })
    .addCase(Login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    })
    // User logout
    .addCase(Logout.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(Logout.fulfilled, (state) => {
      state.isLoading = false;
      state.user = null;
    })
    .addCase(Logout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    })
    // Get all users
    .addCase(GetAllUsers.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(GetAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    })
    .addCase(GetAllUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    })
    // Delete user ( By Admin )
    .addCase(DeleteUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(DeleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      const {
        arg: { _id }
      } = action.meta;
      if (_id) {
        state.users = state.users.filter((user) => user._id !== action.payload);
      }
    })
    .addCase(DeleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    })
  }
});

export default userSlice.reducer;
