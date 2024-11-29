import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function InfoUsuarioScreen() {
  const userInfo = {
    phone: "+526461234567",
    id: 2,
    lastname: "García",
    name: "Osvaldo",
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Nombre:</Text>
        <Text style={styles.editableText}>{userInfo.name}</Text>
        <Text style={styles.infoText}>Apellido(s):</Text>
        <Text style={styles.editableText}>{userInfo.lastname}</Text>
        <Text style={styles.infoText}>Número de teléfono:</Text>
        <Text style={styles.editableText}>{userInfo.phone}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
    width: "100%",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    backgroundColor: "white",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  editableText: {
    fontSize: 16,
    fontWeight: "bold", // Make editable text stand out
    marginBottom: 10,
  },
});
