import * as React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity, Button } from "react-native";
import { useSession } from "@/ctx";

export default function AjustesScreen() {
  const { user, signOut } = useSession();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.row}
        onPress={() => router.push("/ajustes/usuario")}
      >
        <Ionicons name="person-circle" size={24} color={"#7C7FEA"} />
        <Text style={styles.text}> Información del cuidador</Text>
        <Ionicons name="chevron-forward" size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.row}
        onPress={() => router.push("/ajustes/postPaciente")}
      >
        <Ionicons name="document" size={24} color={"#7C7FEA"} />
        <Text style={styles.text}> Registrar paciente</Text>
        <Ionicons name="chevron-forward" size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.row}
        onPress={() => router.push("/ajustes/getPaciente")}
      >
        <Ionicons name="medical" size={24} color={"#7C7FEA"} />
        <Text style={styles.text}> Ver información del paciente</Text>
        <Ionicons name="chevron-forward" size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.row}
        onPress={() => router.push("/ajustes/notificaciones")}
      >
        <Ionicons name="notifications" size={24} color={"#7C7FEA"} />
        <Text style={styles.text}> Notificaciones</Text>
        <Ionicons name="chevron-forward" size={24} />
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        {/*         <Text>Usuario {user} </Text>
        <Text>Cerrar sesion</Text> */}
        <Button title="Cerrar Sesión" onPress={() => signOut()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    color: "#000",
    fontSize: 20,
    flex: 1, // Pushes text to the left
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Positions icon to the right
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    width: "100%", // Full width for each row
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
