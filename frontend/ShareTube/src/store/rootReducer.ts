import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import videoReducer from './videoSlice';
import entitiesVideos from './entities/videos';

// すべてのスライスを1つのrootReducerに結合
const rootReducer = combineReducers({
  auth: authReducer,
  video: videoReducer,
  entities: combineReducers({ videos: entitiesVideos }),
});

export default rootReducer;
