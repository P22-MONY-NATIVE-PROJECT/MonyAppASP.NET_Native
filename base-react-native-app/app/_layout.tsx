import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "../global.css";
import { store } from "@/store";

import { useColorScheme } from '@/hooks/use-color-scheme';
import {Provider} from "react-redux";
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
      <Provider store={store}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <SafeAreaProvider>
                  <Stack screenOptions={{ headerShown: false }} />
                  <StatusBar style="auto" />
              </SafeAreaProvider>
          </ThemeProvider>
      </Provider>
  );
}
