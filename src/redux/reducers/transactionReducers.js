import {createSlice} from '@reduxjs/toolkit';

const initialState = {};

const transactionReducers = createSlice({
  name: 'trasaction',
  initialState,
  reducers: {
    transaction: (state, action) => {
      state.idUser = action.payload.user;
      state.idMovie = action.payload.movie;
      state.idPremier = action.payload.premier;
      state.idLocation = action.payload.location;
      state.date = action.payload.date;
      state.idTime = action.payload.time;
    },
    clearTransaction: () => {
      return initialState;
    },
  },
});

export const {transaction} = transactionReducers.actions;

export default transactionReducers.reducer;
