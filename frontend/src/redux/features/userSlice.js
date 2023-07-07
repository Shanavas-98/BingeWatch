/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  fullName: '',
  email: '',
  token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.id = action.payload.id;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    setUserLogout: (state) => {
      state.id = null;
      state.fullName = null;
      state.email = null;
      state.token = null;
    },
  },
});

export const { setUserDetails, setUserLogout } = userSlice.actions;

export default userSlice.reducer;
