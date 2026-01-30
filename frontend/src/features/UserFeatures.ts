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
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return rejectWithValue(message);
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
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return rejectWithValue(message);
  }
});

// Get me
export const GetMe = createAsyncThunk<
  User,
  void,
  { state: { user: UserState }; rejectValue: string }
>("user/me", async (_, { getState, rejectWithValue }) => {
  const token = getState().user.token;

  if (!token) return rejectWithValue("Unauthorized");

  try {
    const res = await axios.get(`${url}/me`, authHeader(token));
    return res.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return rejectWithValue(message);
  }
});

// Get all users
export const GetAllUsers = createAsyncThunk<User[]>(
  "users/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<User[]>(`${url}`);
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message);
    }
  },
);

// Get single user
export const GetSingleUser = createAsyncThunk<User, string>(
  "users/profile",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get<User>(`${url}/${id}`);
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message);
    }
  },
);

// Change user role
export const ChangeUserRole = createAsyncThunk<
  { message: string; user: User },
  { _id: string; newRole: string },
  { state: { user: UserState }; rejectValue: string }
>("user/role", async ({ _id, newRole }, { getState, rejectWithValue }) => {
  const token = getState().user.token;

  if (!token) return rejectWithValue("Unauthorized");

  try {
    const response = await axios.patch<{
      message: string;
      user: User;
    }>(`${url}/${_id}/update/role`, { role: newRole }, authHeader(token));
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";

    return rejectWithValue(message);
  }
});

// Delete user
export const DeleteUser = createAsyncThunk<
  { message: string },
  string,
  { state: { user: UserState }; rejectValue: string }
>("user/delete", async (id, { getState, rejectWithValue }) => {
  try {
    const token = getState().user.token;
    if (!token) {
      return rejectWithValue("Unauthorized");
    }

    const response = await axios.delete<{ message: string }>(
      `${url}/${id}`,
      authHeader(token),
    );
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return rejectWithValue(message);
  }
});

// Change user email
export const changeEmail = createAsyncThunk<
  { message: string },
  { _id: string; email: string },
  { state: { user: UserState }; rejectValue: string }
>(
  "users/emailchange",
  async (
    user: { _id: string; email: string },
    { getState, rejectWithValue },
  ) => {
    try {
      const token = getState().user.token;
      if (!token) {
        return rejectWithValue("Unauthorized");
      }

      const response = await axios.patch<{ message: string }>(
        `${url}/change-email`,
        {
          email: user.email,
        },
        authHeader(token),
      );
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message);
    }
  },
);

// Change User Password
export const ChangePassword = createAsyncThunk<
  { message: string },
  { _id: string; currentPassword: string; newPassword: string },
  { state: { user: UserState }; rejectValue: string }
>("users/password/change", async (user: any, { getState, rejectWithValue }) => {
  try {
    const token = getState().user.token;
    if (!token) {
      return rejectWithValue("Unauthorized");
    }

    const response = await axios.patch<{ message: string }>(
      `${url}/change-password`,
      {
        currentPassword: user.currentPassword,
        newPassword: user.newPassword,
      },
      authHeader(token),
    );
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return rejectWithValue(message);
  }
});

// Change user image
export const ChagneImage = createAsyncThunk<
  { message: string },
  { id: string; formData: any },
  { state: { user: UserState }; rejectValue: string }
>("users/image/change", async (data: any, { getState, rejectWithValue }) => {
  try {
    const token = getState().user.token;
    if (!token) {
      return rejectWithValue("Unauthorized");
    }

    const response = await axios.patch<{ message: string }>(
      `${url}/update/image`,
      data.formData,
      authHeader(token),
    );
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return rejectWithValue(message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
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
        state.error = action.payload as any;
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
        state.error = action.payload as any;
      })
      // Get me
      .addCase(GetMe.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(GetMe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as any;
      })
      // Get all users
      .addCase(GetAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.users = action.payload;
      })
      .addCase(GetAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as any;
      })
      // Get single user
      .addCase(GetSingleUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetSingleUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.profile = action.payload;
      })
      .addCase(GetSingleUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as any;
      })
      // Change user role
      .addCase(ChangeUserRole.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(ChangeUserRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          state.users = state.users.map((user) =>
            user._id === _id ? action.payload.user : user,
          );
        }
      })
      .addCase(ChangeUserRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as any;
      })
      // Delete user ( By Admin )
      .addCase(DeleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(DeleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const id = action.meta.arg;
        state.users = state.users.filter((user) => user._id !== id);
      })
      .addCase(DeleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as any;
      })
      // Change user email
      .addCase(changeEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changeEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const {
          arg: { _id, email },
        } = action.meta;
        if (_id) {
          state.users = state.users.map((user) =>
            user._id === _id ? { ...user, email } : user,
          );
        }
      })
      .addCase(changeEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as any;
      })
      // Change user password
      .addCase(ChangePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(ChangePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          // Password change doesn't return user data, so keep the user unchanged
        }
      })
      .addCase(ChangePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as any;
      })
      // Change user image
      .addCase(ChagneImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(ChagneImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.users = state.users.map((user) =>
            user._id === id ? { ...user } : user,
          );
        }
      })
      .addCase(ChagneImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as any;
      });
  },
});

export const { Logout } = userSlice.actions;
export default userSlice.reducer;
