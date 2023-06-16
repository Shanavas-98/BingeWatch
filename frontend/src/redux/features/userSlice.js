/* eslint-disable linebreak-style */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  fullName: '',
  email: '',
  image: '',
  token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUserSignout, setUserDetails } = userSlice.actions;

export default userSlice.reducer;
