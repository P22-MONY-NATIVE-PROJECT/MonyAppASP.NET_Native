import React, { useEffect } from 'react';
import { View } from "react-native";
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from "react-redux";

import "../global.css";
import { store, RootState } from "@/store";
import { useAppTheme } from "@/hooks/useAppTheme";
import { getToken } from "@/utilities/storage";
import {setAuth} from "@/store/authSlice";

SplashScreen.preventAutoHideAsync();

function AppContent() {
    const { isDark } = useAppTheme();
    const dispatch = useDispatch();

    const isAuthLoaded = useSelector((state: RootState) => state.auth.isLoaded);

    const [fontsLoaded, fontError] = useFonts({
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'LeagueSpartan-Regular': require('../assets/fonts/LeagueSpartan-Regular.ttf'),
        'LeagueSpartan-Light': require('../assets/fonts/LeagueSpartan-Light.ttf'),
        'LeagueSpartan-SemiBold': require('../assets/fonts/LeagueSpartan-SemiBold.ttf'),
    });

    useEffect(() => {
        async function initializeAuth() {
            try {
                const token = await getToken();
                if (token) {
                    dispatch(setAuth(token));
                } else {
                    dispatch(setAuth(null));
                }
            } catch (e) {
                console.error("Auth init error:", e);
                dispatch(setAuth(null));
            }
        }
        initializeAuth();
    }, [dispatch]);

    useEffect(() => {
        if ((fontsLoaded || fontError) && isAuthLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError, isAuthLoaded]);

    if (!fontsLoaded && !fontError || !isAuthLoaded) {
        return null;
    }

    return (
        <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
            <SafeAreaProvider>
                <View className="flex-1 bg-white dark:bg-[#020617]">
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            animation: 'fade',
                            contentStyle: {
                                backgroundColor: isDark ? "#020617" : "#ffffff"
                            },
                        }}
                    >
                        <Stack.Screen name="index" />
                    </Stack>
                    <StatusBar style={isDark ? "light" : "dark"} />
                </View>
            </SafeAreaProvider>
        </ThemeProvider>
    );
}

export default function RootLayout() {
    return (
        <Provider store={store}>
            <AppContent />
        </Provider>
    );
}