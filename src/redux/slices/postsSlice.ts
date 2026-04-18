import { Posts } from '@/screens/Home/HomeTab/Home';
import { createSlice } from '@reduxjs/toolkit';

interface PostsState {
  items: Posts[] | null;
}

const initialState: PostsState = {
  items: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action) {
      state.items = action.payload;
    },
  },
});

export default postsSlice.reducer;
export const { setPosts } = postsSlice.actions;
