import * as SecureStore from 'expo-secure-store';

export const saveToken = async (token: string) => {
    await SecureStore.setItemAsync('token', token);
};

export const getToken = async () => {
    return await SecureStore.getItemAsync('token');
};

export const deleteToken = async () => {
    await SecureStore.deleteItemAsync('token');
};

export const saveRefreshToken = async (refreshToken: string) => {
    await SecureStore.setItemAsync('refreshToken', refreshToken);
};

export const getRefreshToken = async () => {
    return await SecureStore.getItemAsync('refreshToken');
};

export const deleteRefreshToken = async () => {
    await SecureStore.deleteItemAsync('refreshToken');
};

export const saveAuthTokens = async (accessToken: string, refreshToken: string) => {
    await Promise.all([
        saveToken(accessToken),
        saveRefreshToken(refreshToken),
    ]);
};

export const deleteAuthTokens = async () => {
    await Promise.all([
        deleteToken(),
        deleteRefreshToken(),
    ]);
};

export const saveTheme = async (theme: 'light' | 'dark') => {
    await SecureStore.setItemAsync('theme', theme);
};

export const getTheme = async () => {
    return await SecureStore.getItemAsync('theme') as 'light' | 'dark' | null;
};