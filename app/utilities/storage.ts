import { MMKV } from 'react-native-mmkv';
import { jwtDecode } from 'jwt-decode';

export const mmkv = new MMKV();

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
    // Auth
    setAuth: (accessToken: string, refreshToken: string) => {
        mmkv.set('accessToken', accessToken);
        mmkv.set('refreshToken', refreshToken);
    },
    getAccessToken: () => mmkv.getString('accessToken'),
    getRefreshToken: () => mmkv.getString('refreshToken'),
    clearAuth: () => {
        mmkv.delete('accessToken');
        mmkv.delete('refreshToken');
    },
    getUser: (): User | null => {
        const token = mmkv.getString('accessToken');
        const refreshToken = mmkv.getString('refreshToken');
        if (!token || !refreshToken) return null;

        try {
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
                refreshToken,
                roles,
            };
        } catch {
            return null;
        }
    },

    // Theme
    setTheme: (theme: 'light' | 'dark') => mmkv.set('theme', theme),
    getTheme: () => mmkv.getString('theme') as 'light' | 'dark' | undefined,
};