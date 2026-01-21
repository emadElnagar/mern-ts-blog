import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_COMMENT_URL } from "../Api";

const url = API_COMMENT_URL;

export interface Comment {
  _id?: object;
  body: string;
  author: object;
  replies?: object[];
}

interface PostState {
  comments: Comment[];
  isLoading: boolean;
  error: object | null;
}

const initialState: PostState = {
  comments: [],
  isLoading: false,
  error: null,
};

// create a new comment
export const NewComment: any = createAsyncThunk(
  "comments/new",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/new`, {
        post: data.post,
        author: data.author,
        body: data.body,
      });
      return response.data;
    } catch (error: any) {
      rejectWithValue(error.message);
    }
  },
);

// Get post comments
export const GetComments: any = createAsyncThunk(
  "comments/all",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/${id}`);
      return response.data;
    } catch (error: any) {
      rejectWithValue(error.message);
    }
  },
);

// Delete comment
export const DeleteComment: any = createAsyncThunk(
  "comments/delete",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${url}/${id}`);
      return response.data;
    } catch (error: any) {
      rejectWithValue(error.message);
    }
  },
);

// Update comment
export const UpdateComment: any = createAsyncThunk(
  "comments/update",
  async (comment: any, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${url}/${comment._id}`, {
        body: comment.body,
      });
      return response.data;
    } catch (error: any) {
      rejectWithValue(error.message);
    }
  },
);

const commentSlice = createSlice({
  name: "post",
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
        state.error = null;
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
        state.error = null;
        state.comments = action.payload;
      })
      .addCase(GetComments.rejected, (state, action) => {
        state.isLoading = false;
        state.comments = action.error;
      })
      // Delete comment
      .addCase(DeleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          state.comments = state.comments.filter(
            (comment) => comment._id !== action.payload,
          );
        }
      })
      .addCase(DeleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      // Update comment
      .addCase(UpdateComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          state.comments = state.comments.map((comment) =>
            comment._id === _id ? action.payload : comment,
          );
        }
      })
      .addCase(UpdateComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export default commentSlice.reducer;
