import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import videoReducer from './videoSlice';

// すべてのスライスを1つのrootReducerに結合
const rootReducer = combineReducers({
  auth: authReducer,
  video: videoReducer,
});

export default rootReducer;