import { Redirect, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSession } from "../../ctx";

export default function TabLayout() {
  const { session } = useSession();

  if (!session) {
    return <Redirect href="/auth" />;
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#7C7FEA",
        headerStyle: {
          backgroundColor: "#D9D9D9",
        },
        headerShadowVisible: false,
        headerTintColor: "#000",
        tabBarStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notificaciones"
        options={{
          title: "Notificaciones",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "notifications" : "notifications-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ajustes"
        options={{
          title: "Ajustes",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "cog" : "cog-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
