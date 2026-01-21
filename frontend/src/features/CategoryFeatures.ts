import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_CATEGORY_URL } from "../Api";

const url = API_CATEGORY_URL;

export interface Category {
  _id?: object;
  title: string;
  author: object;
}

interface CategoryState {
  categories: Category[];
  category: Category | null;
  isLoading: boolean;
  error: object | null;
}

const initialState: CategoryState = {
  categories: [],
  category: null,
  isLoading: false,
  error: null,
};

// Create a new category
export const NewCategory: any = createAsyncThunk(
  "categories/new",
  async (category: object, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(`${url}`, category, config);
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

// Get all categories
export const GetAllCategories: any = createAsyncThunk(
  "categories/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}`);
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

// Update category
export const UpdateCategory: any = createAsyncThunk(
  "category/update",
  async (category: any, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `${url}/${category._id}`,
        {
          title: category.title,
        },
        config,
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

// Delete category
export const DeleteCategory: any = createAsyncThunk(
  "category/delete",
  async (id: any, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(`${url}/${id}`, config);
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

// CATEGORY SLICE
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create a new category
      .addCase(NewCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(NewCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.categories.push(action.payload);
      })
      .addCase(NewCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get all categories
      .addCase(GetAllCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.categories = action.payload;
      })
      .addCase(GetAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update category
      .addCase(UpdateCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(UpdateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          state.categories = state.categories.map((item) =>
            item._id === _id ? action.payload : item,
          );
        }
      })
      .addCase(UpdateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete category
      .addCase(DeleteCategory.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(DeleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          state.categories = state.categories.filter(
            (category) => category._id !== action.payload,
          );
        }
      })
      .addCase(DeleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
