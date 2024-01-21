import { configureStore } from '@reduxjs/toolkit';
import CategoryReducer from './features/CategoryFeatures';

const store = configureStore({
  reducer: {
    category: CategoryReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
