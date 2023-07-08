/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  fullName: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.id = action.payload._id;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
    },
    setUserLogout: () => initialState,
  },
});

export const { setUserDetails, setUserLogout } = userSlice.actions;

export default userSlice.reducer;
