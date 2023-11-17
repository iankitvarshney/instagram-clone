import { configureStore } from "@reduxjs/toolkit";
import savedPostsSlice from "./savedPostsSlice";

const store = configureStore({
  reducer: {
    savedPosts: savedPostsSlice,
  },
});

export default store;
