import { configureStore } from '@reduxjs/toolkit';
import taxReducer from './taxSlice';

const store = configureStore({
  reducer: {
    tax: taxReducer
  }
});

export default store;
