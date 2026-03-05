import { configureStore } from '@reduxjs/toolkit';
import {type TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {setupListeners} from "@reduxjs/toolkit/query";
import {categoriesService} from "@/services/categoriesService";
import { balancesService } from "@/services/balancesService";
import authReducer from './authSlice';
import {authService} from "@/services/authService";


export const store = configureStore({
    reducer: {
        auth: authReducer,

        [authService.reducerPath]: authService.reducer,
        [categoriesService.reducerPath]: categoriesService.reducer,
        [balancesService.reducerPath]: balancesService.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authService.middleware,
            categoriesService.middleware,
            balancesService.middleware
        )
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
