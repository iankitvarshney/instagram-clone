import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
  },
  reducers: {
    updateUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { updateUsername } = userSlice.actions;

export default userSlice.reducer;
