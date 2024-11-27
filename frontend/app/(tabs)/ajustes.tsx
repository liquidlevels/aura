import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function AjustesScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.row} onPress={() => router.push("/ajustes/usuario")}>
        <Ionicons name="person-circle" size={24} color={'#7C7FEA'}/>
        <Text style={styles.text}>  Información del Usuario</Text>
        <Ionicons name="chevron-forward" size={24} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.row} onPress={() => router.push("/ajustes/paciente")}>
        <Ionicons name="medical" size={24} color={'#7C7FEA'}/>
        <Text style={styles.text}>  Información del Paciente</Text>
        <Ionicons name="chevron-forward" size={24} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.row} onPress={() => router.push("/ajustes/notificaciones")}>
        <Ionicons name="notifications" size={24} color={'#7C7FEA'}/>
        <Text style={styles.text}>  Notificaciones</Text>
        <Ionicons name="chevron-forward" size={24} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.row} onPress={() => router.push("/video/videoStream")}>
        <Ionicons name="videocam" size={24} color={'#7C7FEA'}/>
        <Text style={styles.text}>  Video en vivo</Text>
        <Ionicons name="chevron-forward" size={24} />
      </TouchableOpacity>
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
});