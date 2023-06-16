/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  fullName: '',
  email: '',
  image: '',
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
    setUserLogout: (state) => {
      state.id = null;
      state.fullName = null;
      state.email = null;
    },
  },
});

export const { setUserDetails, setUserLogout } = userSlice.actions;

export default userSlice.reducer;
