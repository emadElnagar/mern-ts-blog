import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_COMMENT_URL } from "../Api";
import { RootState } from "../store";
import { authHeader } from "./UserFeatures";

const url = API_COMMENT_URL;

export interface Comment {
  _id?: string;
  content: string;
  post: string;
  author: object;
  user?: object;
  replies?: object[];
  likes?: string[];
}

interface CommentState {
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
}

interface CommentUpdatePayload {
  _id: string;
  content: string;
}

const initialState: CommentState = {
  comments: [],
  isLoading: false,
  error: null,
};

// create a new comment
export const NewComment = createAsyncThunk<
  Comment,
  Comment,
  { state: RootState; rejectValue: string }
>("comments/new", async (data: Comment, { getState, rejectWithValue }) => {
  try {
    const token = getState().user.token;
    const response = await axios.post(url, data, authHeader(token));
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return rejectWithValue(message);
  }
});

// Get post comments
export const GetComments = createAsyncThunk<
  Comment[],
  string,
  { rejectValue: string }
>("comments/all", async (id: string, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/${id}`);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return rejectWithValue(message);
  }
});

// Delete comment
export const DeleteComment = createAsyncThunk<
  string,
  string,
  { state: RootState; rejectValue: string }
>("comments/delete", async (id: string, { getState, rejectWithValue }) => {
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

// Update comment
export const UpdateComment = createAsyncThunk<
  Comment,
  CommentUpdatePayload,
  { state: RootState; rejectValue: string }
>(
  "comments/update",
  async (comment: CommentUpdatePayload, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.token;
      const response = await axios.patch(
        `${url}/${comment._id}`,
        {
          content: comment.content,
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

// Like comment
export const LikeComment = createAsyncThunk<
  Comment,
  string,
  { state: RootState; rejectValue: string }
>("comments/like", async (id: string, { getState, rejectWithValue }) => {
  try {
    const token = getState().user.token;
    const user = getState().user.user;
    const response = await axios.post(
      `${url}/like/${id}`,
      {},
      authHeader(token),
    );
    return {
      ...response.data,
      user,
    };
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return rejectWithValue(message);
  }
});

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create a new comment
      .addCase(NewComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(NewComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.comments.push(action.payload);
      })
      .addCase(NewComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get post comments
      .addCase(GetComments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.comments = action.payload;
      })
      .addCase(GetComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete comment
      .addCase(DeleteComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(DeleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const id = action.meta.arg;
        if (id) {
          state.comments = state.comments.map((comment) =>
            comment._id === id ? { ...comment, deleted: true } : comment,
          );
        }
      })
      .addCase(DeleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update comment
      .addCase(UpdateComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
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
        state.error = action.payload as string;
      })
      // Like comment
      .addCase(LikeComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(LikeComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        if (action.payload.user === null) return;
        state.comments = state.comments.map((comment) =>
          comment._id === action.payload._id ? action.payload : comment,
        );
      })
      .addCase(LikeComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default commentSlice.reducer;
