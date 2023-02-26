import { combineReducers, configureStore } from '@reduxjs/toolkit';
import serverListSlice from '../redux/myniverse';

export const rootReducer = combineReducers({ myniverse: serverListSlice });
export const store = configureStore({
  reducer: rootReducer,
});
