import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "../global.css";
import { store } from "@/store";

import { useColorScheme } from '@/hooks/use-color-scheme';
import {Provider} from "react-redux";

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
      <Provider store={store}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack>
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen
                      name="(modals)/category-modal"
                      options={{ presentation: "modal", title: "Category" }}
                  />
              </Stack>
              <StatusBar style="auto" />
          </ThemeProvider>
      </Provider>
  );
}
