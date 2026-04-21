import { Posts } from '@/types/post';
import { createSlice } from '@reduxjs/toolkit';

interface PostsState {
  items: Posts[] | null;
  userPosts: Posts[] | null;
}

const initialState: PostsState = {
  items: null,
  userPosts: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action) {
      state.items = action.payload;
    },
    setUserPosts(state, action) {
      state.userPosts = action.payload;
    },
    addPosts(state, action) {
      state.items?.unshift(action.payload);
    },
    toggleLike(state, action) {
      const { postId, userId } = action.payload;

      const post = state.items?.find(p => p.id === postId);
      if (!post) return;

      const alreadyLiked = post.likes.includes(userId);

      if (alreadyLiked) {
        post.likes = post.likes.filter(id => id !== userId);
      } else {
        post.likes.push(userId);
      }
    },
  },
});

export default postsSlice.reducer;
export const { setPosts, setUserPosts, addPosts, toggleLike } =
  postsSlice.actions;
