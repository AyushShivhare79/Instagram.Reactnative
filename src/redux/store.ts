import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import postsReducer from './slices/postsSlice';
import ViewProfileReducer from './slices/userPostsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    viewProfile: ViewProfileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
