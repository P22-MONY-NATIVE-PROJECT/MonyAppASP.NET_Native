import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

let _accessToken: string | null = null;
let _refreshToken: string | null = null;
let _theme: 'light' | 'dark' | null = null;

export async function initStorage(): Promise<void> {
    _accessToken  = await SecureStore.getItemAsync('accessToken');
    _refreshToken = await SecureStore.getItemAsync('refreshToken');
    const saved   = await SecureStore.getItemAsync('theme');
    _theme = (saved === 'dark' || saved === 'light') ? saved : null;
}

export interface User {
    id: number;
    name: string;
    email: string;
    image: string;
    token: string;
    refreshToken: string;
    roles: string[];
}

export const storage = {

    setAuth: (accessToken: string, refreshToken: string) => {
        _accessToken  = accessToken;
        _refreshToken = refreshToken;
        SecureStore.setItemAsync('accessToken',  accessToken);
        SecureStore.setItemAsync('refreshToken', refreshToken);
    },

    getAccessToken:  (): string | null => _accessToken,
    getRefreshToken: (): string | null => _refreshToken,

    clearAuth: () => {
        _accessToken  = null;
        _refreshToken = null;
        SecureStore.deleteItemAsync('accessToken');
        SecureStore.deleteItemAsync('refreshToken');
    },

    getUser: (): User | null => {
        if (!_accessToken || !_refreshToken) return null;
        try {
            const decoded: any = jwtDecode(_accessToken);

            let roles: string[] = [];
            const rawRoles =
                decoded['role'] ??
                decoded['roles'] ??
                decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            if (typeof rawRoles === 'string') roles = [rawRoles];
            else if (Array.isArray(rawRoles))  roles = rawRoles;

            const id = Number(
                decoded['id'] ?? decoded['sub'] ?? decoded['nameid'] ?? '0',
            );

            return {
                id,
                name:  decoded['name']  ?? decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']            ?? '',
                email: decoded['email'] ?? decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']   ?? '',
                image: decoded['image'] ?? '',
                token: _accessToken,
                refreshToken: _refreshToken,
                roles,
            };
        } catch {
            return null;
        }
    },

    setTheme: (theme: 'light' | 'dark') => {
        _theme = theme;
        SecureStore.setItemAsync('theme', theme);
    },
    getTheme: (): 'light' | 'dark' | undefined => _theme ?? undefined,
};