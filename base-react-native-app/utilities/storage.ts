import * as SecureStore from 'expo-secure-store';

export const saveTheme = async (theme: 'light' | 'dark') => {
    await SecureStore.setItemAsync('theme', theme);
};

export const getTheme = async () => {
    return await SecureStore.getItemAsync('theme') as 'light' | 'dark' | null;
};