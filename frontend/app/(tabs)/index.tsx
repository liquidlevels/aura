import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { useSession } from "../../ctx";

export default function Index() {
  const { user, signOut } = useSession();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Inicio</Text>
      <View>
        <Text>Bienvenido, {user}</Text>
        <Button title="sign out" onPress={() => signOut()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#000",
  },
});
