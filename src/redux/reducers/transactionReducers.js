import {createSlice} from '@reduxjs/toolkit';

const initialState = {};

const transactionReducers = createSlice({
  name: 'trasaction',
  initialState,
  reducers: {
    transaction: (state, action) => {
      state.idUser = action.payload.user;
      state.idMovie = action.payload.movie;
      state.idPremiere = action.payload.premier;
      state.idLocation = action.payload.location;
      state.dateAndTime = action.payload.date;
      state.idShowtime = action.payload.time;
    },
    addSeatTransaction: (state, action) => {
      state.seat = action.payload.seat;
      state.total = action.payload.total;
    },
    addPayment: (state, action) => {
      state.idPayment = action.payload.paymentMethod;
      state.fullName = action.payload.fullName;
      state.phone = action.payload.phone;
      state.email = action.payload.email;
    },
    clearTransaction: () => {
      return initialState;
    },
  },
});

export const {transaction, addSeatTransaction, addPayment, clearTransaction} =
  transactionReducers.actions;

export default transactionReducers.reducer;
