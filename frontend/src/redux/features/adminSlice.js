/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  email: '',
  token: '',
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminDetails: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    setAdminLogout: () => initialState,
  },
});

export const { setAdminDetails, setAdminLogout } = adminSlice.actions;

export default adminSlice.reducer;

export const selectAdmin = (state) => state.admin;
