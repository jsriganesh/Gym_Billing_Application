import { configureStore } from '@reduxjs/toolkit';
import footerReducer from '../slices/footerSlice';

export const store = configureStore({
  reducer: {
    footer: footerReducer,
    commonData:commonSlice
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import commonSlice from '../slices/commonSlice';
// import { RootState, AppDispatch } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
