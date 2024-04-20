import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://localhost:5000/api/comments';

export interface Comment {
  _id?: object;
  body: string;
  author: object,
  replies?: object[];
}

interface PostState {
  comments: Comment[],
  isLoading: boolean,
  error: object | null
}

const initialState: PostState = {
  comments: [],
  isLoading: false,
  error: null
}

// create a new comment
export const NewComment: any = createAsyncThunk("comments/new", async (data: any, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${url}/new`, {
      post: data.post,
      author: data.author,
      body: data.body
    });
    return response.data;
  } catch (error: any) {
    rejectWithValue(error.message);
  }
});

// Get post comments
export const GetComments: any = createAsyncThunk("comments/all", async(id: any, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/${id}`);
    return response.data;
  } catch (error: any) {
    rejectWithValue(error.message);
  }
});

const commentSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // create a new comment
    .addCase(NewComment.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(NewComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments.push(action.payload);
    })
    .addCase(NewComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    })
    // Get post comments
    .addCase(GetComments.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(GetComments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    })
    .addCase(GetComments.rejected, (state, action) => {
      state.isLoading = false;
      state.comments = action.error;
    })
  }
});

export default commentSlice.reducer;
