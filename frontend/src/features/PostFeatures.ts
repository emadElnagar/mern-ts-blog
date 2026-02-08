import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_POST_URL } from "../Api";
import { RootState } from "../store";
import { authHeader } from "./UserFeatures";

const url = API_POST_URL;

export interface Post {
  _id?: string;
  title: string;
  slug: string;
  author: object;
  description: string;
  image: string;
  likes?: object[];
}

interface NewPostData {
  data: FormData;
}

interface PostUpdatePayload {
  _id: string;
  data: FormData;
}

interface PostState {
  posts: Post[];
  searchResults: Post[];
  post: Post | null;
  similarPosts: Post[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  searchResults: [],
  post: null,
  similarPosts: [],
  isLoading: false,
  error: null,
};

// Create a new
export const NewPost = createAsyncThunk<
  Post,
  NewPostData,
  { state: RootState; rejectValue: string }
>("posts/new", async (data: NewPostData, { getState, rejectWithValue }) => {
  try {
    const token = getState().user.token;
    const response = await axios.post(url, data.data, authHeader(token));
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return rejectWithValue(message);
  }
});

// Get all posts
export const GetAllPosts = createAsyncThunk<
  Post[],
  void,
  { rejectValue: string }
>("posts/all", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return rejectWithValue(message);
  }
});

// Get single post
export const GetSinglePost = createAsyncThunk<
  Post,
  string,
  { rejectValue: string }
>("posts/single", async (slug: string, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/${slug}`);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return rejectWithValue(message);
  }
});

// Get similar posts
export const GetSimilarPosts = createAsyncThunk<
  Post[],
  string,
  { rejectValue: string }
>("posts/similar", async (slug: string, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/${slug}/similar`);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return rejectWithValue(message);
  }
});

// Update post
export const UpdatePost = createAsyncThunk<
  Post,
  PostUpdatePayload,
  { state: RootState; rejectValue: string }
>(
  "posts/update",
  async (data: PostUpdatePayload, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.token;
      const response = await axios.put(
        `${url}/${data._id}`,
        data,
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

// Delete post
export const DeletePost = createAsyncThunk<
  Post,
  string,
  { state: RootState; rejectValue: string }
>("posts/delete", async (id: string, { getState, rejectWithValue }) => {
  try {
    const token = getState().user.token;
    const response = await axios.delete(`${url}/${id}`, authHeader(token));
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return rejectWithValue(message);
  }
});

// Search posts
export const SearchPost = createAsyncThunk<
  Post[],
  string,
  { rejectValue: string }
>("posts/search", async (query: string, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/search?query=${query}`);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return rejectWithValue(message);
  }
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add a new post
      .addCase(NewPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(NewPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.posts.push(action.payload);
      })
      .addCase(NewPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get all posts
      .addCase(GetAllPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.posts = action.payload;
      })
      .addCase(GetAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get single post
      .addCase(GetSinglePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetSinglePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.post = action.payload;
      })
      .addCase(GetSinglePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get similar posts
      .addCase(GetSimilarPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetSimilarPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.similarPosts = action.payload;
      })
      .addCase(GetSimilarPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update post
      .addCase(UpdatePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(UpdatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          state.posts = state.posts.map((item) =>
            item._id === _id ? action.payload : item,
          );
        }
      })
      .addCase(UpdatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete post
      .addCase(DeletePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(DeletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const id = action.meta.arg;
        if (id) {
          state.posts = state.posts.map((post) =>
            post._id === id ? { ...post, deleted: true } : post,
          );
        }
      })
      .addCase(DeletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Search posts
      .addCase(SearchPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(SearchPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.searchResults = action.payload;
      })
      .addCase(SearchPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default postSlice.reducer;
