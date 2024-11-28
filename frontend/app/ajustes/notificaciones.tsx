import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import { Text, View, StyleSheet, Switch } from "react-native";
import React = require("react");

export default function NotificacionesAjustesScreen() {
  const [heartRate, setHeartRate] = useState(false);
  const [respiratoryRate, setRespiratoryRate] = useState(false);
  const [sound, setSound] = useState(false);
  const [movement, setMovement] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Ionicons name="heart-half" size={24} color="#7C7FEA" />
        <Text style={styles.text}> Frecuencia cardiaca</Text>
        <Switch onValueChange={setHeartRate} value={heartRate} />
      </View>
      <View style={styles.row}>
        <FontAwesome5 name="lungs" size={20} color="#7C7FEA" />
        <Text style={styles.text}> Saturación de oxígeno</Text>
        <Switch onValueChange={setMovement} value={movement} />
      </View>
      <View style={styles.row}>
        <Ionicons name="volume-high" size={24} color="#7C7FEA" />
        <Text style={styles.text}> Sonido anormal</Text>
        <Switch onValueChange={setRespiratoryRate} value={respiratoryRate} />
      </View>
      <View style={styles.row}>
        <Ionicons name="walk" size={24} color="#7C7FEA" />
        <Text style={styles.text}> Movimiento anormal</Text>
        <Switch onValueChange={setSound} value={sound} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingVertical: 20,
  },
  text: {
    fontSize: 20,
    color: "#000",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
});
