import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import multipleReducer from './slices/multipleSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    multiple: multipleReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
