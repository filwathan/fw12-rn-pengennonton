import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from './authReducers';
import transaction from './transactionReducers';

const authConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const transactionConfig = {
  key: 'transaction',
  storage: AsyncStorage,
};

const reducer = combineReducers({
  auth: persistReducer(authConfig, auth),
  transaction: persistReducer(transactionConfig, transaction),
});

export default reducer;
