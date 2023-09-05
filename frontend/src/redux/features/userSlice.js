/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  name: '',
  email: '',
  picture: '',
  token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.picture = action.payload.picture;
      state.token = action.payload.token;
    },
    setUserLogout: () => initialState,
  },
});

export const { setUserDetails, setUserLogout } = userSlice.actions;
export default userSlice.reducer;
export const selectUser = (state) => state.user;
