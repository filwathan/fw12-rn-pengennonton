import {createSlice} from '@reduxjs/toolkit';
import {loginAction, registerAction} from '../actions/authAction';

const initialState = {
  token: null,
  loading: false,
  error: null,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
  },
  extraReducers: build => {
    build.addCase(loginAction.rejected, (state, action) => {
      state.error = action.error.message;
    });
    build.addCase(loginAction.fulfilled, (state, action) => {
      state.error = null;
      state.token = action.payload.results.token;
    });
    build.addCase(registerAction.rejected, (state, action) => {
      state.error = action.error.message;
    });
    build.addCase(registerAction.fulfilled, (state, action) => {
      state.error = null;
      state.token = action.payload.results.token;
    });
  },
});

export const {logout: logoutAction} = auth.actions;

export default auth.reducer;
