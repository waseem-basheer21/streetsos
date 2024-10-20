import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,  // Initial state of userId
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;  // Store userId in the state
    },
    clearUserId: (state) => {
      state.userId = null;  // Clear userId when logged out
    },
  },
});

export const { setUserId, clearUserId } = userSlice.actions;
export default userSlice.reducer;
