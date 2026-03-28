import React, { useEffect} from 'react';
import { View } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import '../global.css';
import { RootState } from '@/store';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Colors } from '@/constants/theme';
import OfflineScreen from '@/screens/Network/OfflineScreen';
import {useNetwork} from "@/context/NetworkContext";

import { useNotifications } from '@/hooks/useNotifications';

SplashScreen.preventAutoHideAsync();

const AppContent = () => {
    useNotifications();
    const { isDark } = useAppTheme();
    const user = useSelector((state: RootState) => state.auth.user);

    const [fontsLoaded, fontError] = useFonts({
        'Poppins-Regular':        require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Medium':         require('../assets/fonts/Poppins-Medium.ttf'),
        'Poppins-SemiBold':       require('../assets/fonts/Poppins-SemiBold.ttf'),
        'LeagueSpartan-Regular':  require('../assets/fonts/LeagueSpartan-Regular.ttf'),
        'LeagueSpartan-Light':    require('../assets/fonts/LeagueSpartan-Light.ttf'),
        'LeagueSpartan-SemiBold': require('../assets/fonts/LeagueSpartan-SemiBold.ttf'),
    });

    const { isConnected } = useNetwork();

    useEffect(() => {
        console.log('[AppContent] Fonts status:', { fontsLoaded, fontError });
        if (fontsLoaded || fontError) {
            console.log('[AppContent] Hiding splash screen...');
            SplashScreen.hideAsync().catch(err => console.log('Error hiding splash screen:', err));
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        console.log('[AppContent] Waiting for fonts, rendering null');
        return null;
    }

    if (isConnected === false) {
        return <OfflineScreen />;
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
                    <StatusBar style={isDark ? 'light' : 'dark'} />
                </View>
            </SafeAreaProvider>
        </ThemeProvider>
    );
}

export default AppContent;
