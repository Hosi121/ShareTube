import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// すべてのスライスを1つのrootReducerに結合
const rootReducer = combineReducers({
  auth: authReducer,
  video: videoReducer,
});

export default rootReducer;