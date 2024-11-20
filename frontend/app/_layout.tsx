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
        <Slot />
      </Stack>
    </SessionProvider>
  );
}
