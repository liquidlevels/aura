import { Slot, Stack } from "expo-router";
import { setStatusBarStyle } from "expo-status-bar";
import { useEffect } from "react";
import { SessionProvider } from "../ctx";

export default function RootLayout() {
  useEffect(() => {
    setStatusBarStyle("dark");
  }, []);

  return (
    <SessionProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth/index" options={{ headerShown: false }} />
        <Stack.Screen name="auth/login" options={{ title: "Iniciar Sesión" }} />
        <Stack.Screen name="auth/register" options={{ title: "Registro" }} />
        <Stack.Screen
          name="auth/validation"
          options={{ title: "Verificación" }}
        />
      </Stack>
    </SessionProvider>
  );
}
