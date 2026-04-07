import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

let _accessToken: string | null = null;
let _theme: 'light' | 'dark' | null = null;

export async function initStorage(): Promise<void> {
    _accessToken  = await SecureStore.getItemAsync('accessToken');
    const saved   = await SecureStore.getItemAsync('theme');
    _theme = (saved === 'dark' || saved === 'light') ? saved : null;
}

export interface User {
    id: number;
    name: string;
    email: string;
    image: string;
    token: string;
    roles: string[];
}

export const storage = {

    setAuth: (accessToken: string) => {
        _accessToken  = accessToken;
        SecureStore.setItemAsync('accessToken',  accessToken);
    },

    getAccessToken:  (): string | null => _accessToken,

    clearAuth: () => {
        _accessToken  = null;
        SecureStore.deleteItemAsync('accessToken');
    },

    getUser: (): User | null => {
        if (!_accessToken) return null;
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
