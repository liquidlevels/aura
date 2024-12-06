import { Slot, Stack } from "expo-router";
import { setStatusBarStyle } from "expo-status-bar";
import { useEffect } from "react";
import { SessionProvider } from "../ctx";
import React from "react";

export default function RootLayout() {
  useEffect(() => {
    setStatusBarStyle("dark");
  }, []);

  return (
    <SessionProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ title: "Atrás", headerShown: false }} />
        <Stack.Screen name="auth/index" options={{ title: "Login", headerShown: false }} />
        <Stack.Screen name="auth/login" options={{ title: "Iniciar Sesión" }} />
        <Stack.Screen name="auth/register" options={{ title: "Registro" }} />

        <Stack.Screen
          name="auth/validation"
          options={{ title: "Verificación" }}
        />
        <Stack.Screen
          name="ajustes/usuario"
          options={{
            title: "Información del cuidador",
          }}
        />
        <Stack.Screen
          name="ajustes/getPaciente"
          options={{
            title: "Información del paciente",
          }}
        />
        <Stack.Screen
          name="ajustes/postPaciente"
          options={{
            title: "Registrar paciente",
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
      </Stack>
    </SessionProvider>
  );
}
