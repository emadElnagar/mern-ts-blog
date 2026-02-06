import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_CATEGORY_URL } from "../Api";
import { RootState } from "../store";
import { authHeader } from "./UserFeatures";

const url = API_CATEGORY_URL;

export interface Category {
  _id?: string;
  title: string;
  author?: object;
  deleted?: boolean;
}

interface CategoryState {
  categories: Category[];
  category: Category | null;
  isLoading: boolean;
  error: string | null;
}

interface CategoryUpdate {
  _id: string;
  title?: string;
}

const initialState: CategoryState = {
  categories: [],
  category: null,
  isLoading: false,
  error: null,
};

// Create a new category
export const NewCategory = createAsyncThunk<
  Category,
  Category,
  { state: RootState; rejectValue: string }
>(
  "categories/new",
  async (category: Category, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.token;
      if (!token) {
        return rejectWithValue("Unauthorized");
      }

      const response = await axios.post(url, category, authHeader(token));
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
export const GetAllCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("categories/all", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return rejectWithValue(message);
  }
});

// Update category
export const UpdateCategory = createAsyncThunk<
  Category,
  CategoryUpdate,
  { state: RootState; rejectValue: string }
>(
  "category/update",
  async (category: CategoryUpdate, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.token;
      if (!token) {
        return rejectWithValue("Unauthorized");
      }

      const response = await axios.put(
        `${url}/${category._id}`,
        {
          title: category.title,
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

// Delete category
export const DeleteCategory = createAsyncThunk<
  string,
  string,
  { state: RootState; rejectValue: string }
>("category/delete", async (id: string, { getState, rejectWithValue }) => {
  try {
    const token = getState().user.token;
    if (!token) {
      return rejectWithValue("Unauthorized");
    }
    const response = await axios.delete(`${url}/${id}`, authHeader(token));
    console.log("Id:", id);
    console.log("Delete response:", response.data);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return rejectWithValue(message);
  }
});

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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
      })
      // Delete category
      .addCase(DeleteCategory.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(DeleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const id = action.meta.arg;
        if (id) {
          state.categories = state.categories.map((category) =>
            category._id === id ? { ...category, deleted: true } : category,
          );
        }
      })
      .addCase(DeleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
