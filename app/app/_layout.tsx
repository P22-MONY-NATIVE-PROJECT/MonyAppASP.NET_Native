import React, { useEffect } from 'react';
import { View } from "react-native";
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from "react-redux";
import "../global.css";
import { store, RootState } from "@/store";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Colors } from "@/constants/theme";
import {NetworkProvider, useNetwork} from "@/context/NetworkContext";
import OfflineScreen from "@/screens/Network/OfflineScreen";
// import {GoogleSignin} from "@react-native-google-signin/google-signin";

SplashScreen.preventAutoHideAsync();

function AppContent() {
    const { isDark } = useAppTheme();
    const user = useSelector((state: RootState) => state.auth.user);

    const [fontsLoaded, fontError] = useFonts({
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'LeagueSpartan-Regular': require('../assets/fonts/LeagueSpartan-Regular.ttf'),
        'LeagueSpartan-Light': require('../assets/fonts/LeagueSpartan-Light.ttf'),
        'LeagueSpartan-SemiBold': require('../assets/fonts/LeagueSpartan-SemiBold.ttf'),
    });

    const {isConnected} = useNetwork();

    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    if(isConnected === false) {
        return <OfflineScreen/>
    }

    return (
        <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
            <SafeAreaProvider>
                <View
                    style={{ flex: 1, backgroundColor: isDark ? Colors.dark.background : Colors.light.background }}
                >
                    {!user && <Redirect href="/login" />}
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            animation: 'fade',
                            contentStyle: {
                                backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
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
            <NetworkProvider>
                <AppContent />
            </NetworkProvider>
        </Provider>
    );
}
