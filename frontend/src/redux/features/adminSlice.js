/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  email: '',
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminDetails: (state, action) => {
      state.id = action.payload._id;
      state.email = action.payload.email;
    },
    setAdminLogout: (state) => {
      state.id = null;
      state.email = null;
    },
  },
});

export const { setAdminDetails, setAdminLogout } = adminSlice.actions;

export default adminSlice.reducer;
