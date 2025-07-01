import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

import { ToastProvider } from "react-native-toast-notifications";
import { AuthProvider } from "@/provider/authprovider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ToastProvider>
      <AuthProvider>
        <ThemeProvider
          value={colorScheme === "light" ? DefaultTheme : DarkTheme}>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: "#f4511e",
              },
              headerTintColor: "#fff",

              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}>
            <Stack.Screen
              name="(shop)"
              options={{ headerShown: false, title: "Shop" }}
            />
            <Stack.Screen
              name="categories"
              options={{ headerShown: false, title: "Categories" }}
            />
            <Stack.Screen
              name="products"
              options={{ headerShown: false, title: "products" }}
            />
            <Stack.Screen
              name="cart"
              options={{
                presentation: "modal",
                headerShown: true,
                title: "Shopping Cart",
              }}
            />
            <Stack.Screen
              name="auth"
              options={{ headerShown: true }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
