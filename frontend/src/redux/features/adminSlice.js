/* eslint-disable linebreak-style */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  login: '',
  token: '',
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminDetails: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setAdminSignout, setAdminDetails } = adminSlice.actions;

export default adminSlice.reducer;
