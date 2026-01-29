import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_USER_URL } from "../Api";

const url = API_USER_URL;

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  image?: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface UserState {
  users: User[];
  user: User | null;
  profile: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  user: null,
  profile: null,
  token: null,
  isLoading: false,
  error: null,
};

// helper
const authHeader = (token: string | null) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// User register
export const UserRegister = createAsyncThunk<
  AuthResponse,
  { firstName: string; lastName: string; email: string; password: string },
  { rejectValue: string }
>("user/register", async (userData, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${url}/register`, userData);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Register failed");
  }
});

// User login
export const Login = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: string }
>("user/login", async (credentials, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${url}/login`, credentials);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Login failed");
  }
});

// Get me
export const GetMe = createAsyncThunk<
  User,
  void,
  { state: { user: UserState }; rejectValue: string }
>("user/me", async (_, { getState, rejectWithValue }) => {
  const token = getState().user.token;

  if (!token) return rejectWithValue("No token");

  try {
    const res = await axios.get(`${url}/me`, authHeader(token));
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Unauthorized");
  }
});

// Get all users
export const GetAllUsers: any = createAsyncThunk(
  "users/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}`);
      return response.data;
    } catch (error: any) {
      rejectWithValue(error.message);
    }
  },
);

// Get single user
export const GetSingleUser: any = createAsyncThunk(
  "users/profile",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/${id}`);
      return response.data;
    } catch (error: any) {
      rejectWithValue(error.message);
    }
  },
);

// Change user role
export const ChangeUserRole: any = createAsyncThunk(
  "user/role",
  async (user: any, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${url}/${user._id}/update/role`,
        user.newRole,
      );
      return response.data;
    } catch (error: any) {
      rejectWithValue(error.message);
    }
  },
);

// Delete user
export const DeleteUser: any = createAsyncThunk(
  "user/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${url}/${id}/delete`);
      return response.data;
    } catch (error: any) {
      rejectWithValue(error.message);
    }
  },
);

// Change user email
export const changeEmail: any = createAsyncThunk(
  "users/emailchange",
  async (user: any, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${url}/${user._id}/change-email`, {
        email: user.email,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Change User Password
export const ChangePassword: any = createAsyncThunk(
  "users/password/change",
  async (user: any, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${url}/${user._id}/change-password`, {
        currentPassword: user.currentPassword,
        newPassword: user.newPassword,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Change user image
export const ChagneImage: any = createAsyncThunk(
  "users/image/change",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${url}/${data.id}/update/image`,
        data.formData,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // User register
      .addCase(UserRegister.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(UserRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.token = action.payload.token;
      })
      .addCase(UserRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!;
      })
      // User login
      .addCase(Login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.token = action.payload.token;
      })
      .addCase(Login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!;
      })
      // Get me
      .addCase(GetMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(GetMe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload!;
      })
      // Get all users
      .addCase(GetAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.users = action.payload;
      })
      .addCase(GetAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      // Get single user
      .addCase(GetSingleUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetSingleUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.profile = action.payload;
      })
      .addCase(GetSingleUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      // Change user role
      .addCase(ChangeUserRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ChangeUserRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          state.users = state.users.map((user) =>
            user._id === _id ? action.payload : user,
          );
        }
      })
      .addCase(ChangeUserRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      // Delete user ( By Admin )
      .addCase(DeleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const id = action.meta.arg;
        state.users = state.users.filter((user) => user._id !== id);
      })
      .addCase(DeleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      // Change user email
      .addCase(changeEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          state.users = state.users.map((user) =>
            user._id === _id ? action.payload : user,
          );
        }
      })
      .addCase(changeEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      // Change user password
      .addCase(ChangePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ChangePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          state.users = state.users.map((user) =>
            user._id === _id ? action.payload : user,
          );
        }
      })
      .addCase(ChangePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      // Change user image
      .addCase(ChagneImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ChagneImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          state.users = state.users.map((user) =>
            user._id === _id ? action.payload : user,
          );
        }
      })
      .addCase(ChagneImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const { Logout } = userSlice.actions;
export default userSlice.reducer;
