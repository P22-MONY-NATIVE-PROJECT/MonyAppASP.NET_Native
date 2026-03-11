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

export const saveTheme = async (theme: 'light' | 'dark') => {
    await SecureStore.setItemAsync('theme', theme);
};

export const getTheme = async () => {
    return await SecureStore.getItemAsync('theme') as 'light' | 'dark' | null;
};