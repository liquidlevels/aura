import { View, Button, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function AuthHome() {
  return (
    <View style={styles.container}>
      <Button
        title="Iniciar Sesión"
        onPress={() => router.push("/auth/login")}
      />
      <Button
        title="Registrarse"
        onPress={() => router.push("/auth/register")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
