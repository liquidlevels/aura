import { Slot, Stack } from "expo-router";
import { setStatusBarStyle } from "expo-status-bar";
import { useEffect } from "react";
import { SessionProvider } from "./ctx";

export default function RootLayout() {
  useEffect(() => {
    setStatusBarStyle("dark");
  }, []);

  return (
    <SessionProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen
          name="ajustes"
          options={{
            title: "Ajustes",
          }}
        />
        <Stack.Screen
          name="ajustes/usuario"
          options={{
            title: "Información del Usuario",
          }}
        />
        <Stack.Screen
          name="ajustes/paciente"
          options={{
            title: "Información del Paciente",
          }}
        />
        <Stack.Screen
          name="ajustes/notificaciones"
          options={{
            title: "Notificaciones",
          }}
        />
        <Stack.Screen
          name="video/videoStream"
          options={{
            title: "Video en vivo",
          }}
        />

        <Slot />
      </Stack>
    </SessionProvider>
  );
}
