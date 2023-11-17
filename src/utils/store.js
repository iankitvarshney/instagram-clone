import { configureStore } from "@reduxjs/toolkit";
import savedPostsSlice from "./savedPostsSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    savedPosts: savedPostsSlice,
    user: userSlice,
  },
});

export default store;
