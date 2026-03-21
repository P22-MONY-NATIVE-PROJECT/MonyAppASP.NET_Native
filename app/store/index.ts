import { configureStore } from '@reduxjs/toolkit';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "@/services/api";      // <-- єдиний apiSlice
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,

        // один reducer для всіх endpoints
        [api.reducerPath]: api.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            api.middleware
        )
});

setupListeners(store.dispatch);

// типи
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;