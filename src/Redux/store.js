import { configureStore } from '@reduxjs/toolkit';
import partnerReducer from './slices/partnerSlice';

const store = configureStore({
  //root reducer
  reducer: {
    partner: partnerReducer
  }
});

export default store;
