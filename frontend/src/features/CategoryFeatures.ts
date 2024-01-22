import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://localhost:5000/api/categories';

export interface Category {
  _id?: object;
  title: string;
  author: object;
}

interface CategoryState {
  categories: Category[],
  category: Category | null,
  isLoading: boolean,
  error: object | null
}

const initialState: CategoryState = {
  categories: [],
  category: null,
  isLoading: false,
  error: null
}

// Create a new category
export const NewCategory: any = createAsyncThunk("categories/new", async (category: object, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${url}/new`, category);
    return response.data;
  } catch (error: any) {    
    return rejectWithValue(error.message);
  }
});

// Get all categories
export const GetAllCategories: any = createAsyncThunk("categories/all", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/all`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Update category
export const UpdateCategory: any = createAsyncThunk("categories/single", async (category: any, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${url}/${category._id}/update`, {
      title: category.title
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Delete category
export const DeleteCategory: any = createAsyncThunk("category/delete", async (id: any, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${url}/${id}/delete`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// CATEGORY SLICE
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Create a new category
    .addCase(NewCategory.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(NewCategory.fulfilled, (state, action) =>{
      state.isLoading = false;
      state.categories.push(action.payload);
    })
    .addCase(NewCategory.rejected, (state, action) =>{
      state.isLoading = false;
      state.error = action.error;
    })
    // Get all categories
    .addCase(GetAllCategories.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(GetAllCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    })
    .addCase(GetAllCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    })
    // Update category
    .addCase(UpdateCategory.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(UpdateCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      const {
        arg: { _id },
      } = action.meta;
      if (_id) {
        state.categories = state.categories.map((item) =>
          item._id === _id ? action.payload : item
        );
      }
    })
    .addCase(UpdateCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    })
    // Delete category
    .addCase(DeleteCategory.pending, (state, _) => {
      state.isLoading = true;
    })
    .addCase(DeleteCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      const {
        arg: { _id },
      } = action.meta;
      if (_id) {
        state.categories = state.categories.filter((category) => category._id !== action.payload)
      }
    })
    .addCase(DeleteCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    })
  }
});

export default categorySlice.reducer;
