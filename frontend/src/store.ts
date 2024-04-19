import { configureStore } from '@reduxjs/toolkit';
import CategoryReducer from './features/CategoryFeatures';
import PostReducer from './features/PostFeatures';
import UserReducer from './features/UserFeatures';
import CommentReducer from './features/CommentFeature';

const store = configureStore({
  reducer: {
    category: CategoryReducer,
    post: PostReducer,
    user: UserReducer,
    comment: CommentReducer
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
