import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import 'react-native-reanimated';
import "../global.css";
import { store } from "@/store";

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Provider } from "react-redux";
import { SafeAreaProvider } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();

    const [loaded, error] = useFonts({
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'LeagueSpartan-Regular': require('../assets/fonts/LeagueSpartan-Regular.ttf'),
        'LeagueSpartan-Light': require('../assets/fonts/LeagueSpartan-Light.ttf'),
        'LeagueSpartan-SemiBold': require('../assets/fonts/LeagueSpartan-SemiBold.ttf'),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <Provider store={store}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <SafeAreaProvider>
                    <Stack
                        initialRouteName="index"
                        screenOptions={{
                            headerShown: false,
                            animation: 'fade',
                            contentStyle: {
                                backgroundColor: colorScheme === "dark" ? "#020617" : "#ffffff"
                            },
                        }}
                    />
                    <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
                </SafeAreaProvider>
            </ThemeProvider>
        </Provider>
    );
}