import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { deleteToken } from "@/utilities/storage";

interface User {
    id: number;
    name: string;
    email: string;
    image: string;
    token: string;
    roles: string[];
}

interface AuthState {
    user: User | null;
    isLoaded: boolean;
}

export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded: any = jwtDecode(token);
        if (!decoded.exp) return false; // no expiry = treat as valid
        return decoded.exp * 1000 < Date.now();
    } catch {
        return true;
    }
};

export const getUserFromToken = (token: string): User | null => {
    try {
        if (isTokenExpired(token)) {
            deleteToken();
            return null;
        }

        const decoded: any = jwtDecode(token);

        let roles: string[] = [];
        const rawRoles = decoded["role"] ?? decoded["roles"] ?? decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        if (typeof rawRoles === "string") roles = [rawRoles];
        else if (Array.isArray(rawRoles)) roles = rawRoles;

        const id = Number(decoded["id"] ?? decoded["sub"] ?? decoded["nameid"] ?? "0");

        return {
            id,
            name: decoded["name"] ?? decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ?? "",
            email: decoded["email"] ?? decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] ?? "",
            image: decoded["image"] ?? "",
            token,
            roles,
        };
    } catch {
        return null;
    }
};

const initialState: AuthState = {
    user: null,
    isLoaded: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<string | null>) => {
            if (action.payload) {
                state.user = getUserFromToken(action.payload);
            } else {
                state.user = null;
            }
            state.isLoaded = true;
        },
        logout: (state) => {
            state.user = null;
            state.isLoaded = true;
            deleteToken();
        },
    },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
