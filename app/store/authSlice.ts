import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { storage, User } from '@/utilities/storage';

interface AuthState {
    user: User | null;
}

const initialState: AuthState = {
    user: storage.getUser(), // Synchronous init!
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ accessToken: string; refreshToken: string } | null>) => {
            if (action.payload) {
                storage.setAuth(action.payload.accessToken, action.payload.refreshToken);
                state.user = storage.getUser();
            } else {
                storage.clearAuth();
                state.user = null;
            }
        },
        logout: (state) => {
            storage.clearAuth();
            state.user = null;
        },
    },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;