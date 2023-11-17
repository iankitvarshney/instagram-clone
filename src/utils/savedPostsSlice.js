import { createSlice } from "@reduxjs/toolkit";

const savedPostsSlice = createSlice({
  name: "savedPosts",
  initialState: {
    posts: [],
  },
  reducers: {
    addPost: (state, action) => {
      const isPostUnique = () => {
        const postId = action.payload.id;

        for (const post of state.posts) {
          if (post.id === postId) {
            return false;
          }
        }

        return true;
      };

      if (isPostUnique()) {
        state.posts.push(action.payload);
      }
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

export const { addPost, removePost } = savedPostsSlice.actions;

export default savedPostsSlice.reducer;
