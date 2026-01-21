import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { API_USER_URL } from "../Api";

const url = API_USER_URL;

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
  users: User[];
  user: User | null;
  profile: User | null;
  isLoading: boolean;
  error: object | null;
}

const initialState: UserState = {
  users: [],
  user: null,
  profile: null,
  isLoading: false,
  error: null,
};

// User register
export const UserRegister: any = createAsyncThunk(
  "useres/register",
  async (user: object, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/register`, user);
      const data = jwtDecode<JwtPayload>(response.data.token);
      sessionStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error: any) {
      rejectWithValue(error.message);
    }
  },
);

// User login
export const Login: any = createAsyncThunk(
  "usres/login",
  async (user: object, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/login`, user);
      const data = jwtDecode<JwtPayload>(response.data.token);
      sessionStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error: any) {
      rejectWithValue(error.message);
    }
  },
);

// User logout
export const Logout: any = createAsyncThunk(
  "users/logout",
  async (_, { rejectWithValue }) => {
    try {
      sessionStorage.removeItem("userInfo");
    } catch (error: any) {
      rejectWithValue(error.message);
    }
  },
);

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
  reducers: {},
  extraReducers: (builder) => {
    builder
      // User register
      .addCase(UserRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UserRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
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
        state.error = null;
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
        state.error = null;
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
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          state.users = state.users.filter(
            (user) => user._id !== action.payload,
          );
        }
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

export default userSlice.reducer;
