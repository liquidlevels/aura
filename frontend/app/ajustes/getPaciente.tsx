import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Alert, ScrollView } from "react-native";
import axios from "axios";
import API_URL from "@/apiConfig";

type PatientInfo = {
  name: string;
  lastname: string;
  dob: string;
  age: number;
  diseases: string[];
  allergies: string[];
  blood_type: string;
  keeper_id: number;
};

export default function GetPatientInfoScreen() {
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const response = await axios.get(`${API_URL}patients/3`); //replace with to-be-created patient id
        if (response.data) {
          setPatientInfo(response.data);
        } else {
          Alert.alert("Info", "Info no disponible");
        }
      } catch (error) {
        console.error("Error trayendo info del paciente:", error);
        Alert.alert("Error", "Carga de info de paciente fallida.");
      }
    };

    fetchPatientInfo();
  }, []);

  if (!patientInfo) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Nombre:</Text>
        <Text style={styles.editableText}>{patientInfo.name}</Text>
        <Text style={styles.infoText}>Apellido:</Text>
        <Text style={styles.editableText}>{patientInfo.lastname}</Text>
        <Text style={styles.infoText}>Fecha de Nacimiento:</Text>
        <Text style={styles.editableText}>{patientInfo.dob}</Text>
        <Text style={styles.infoText}>Edad:</Text>
        <Text style={styles.editableText}>{patientInfo.age}</Text>
        <Text style={styles.infoText}>Alergias:</Text>
        <Text style={styles.editableText}>
          {patientInfo.allergies.length
            ? patientInfo.allergies.join(", ")
            : "N/A"}
        </Text>
        <Text style={styles.infoText}>Enfermedades:</Text>
        <Text style={styles.editableText}>
          {patientInfo.diseases.length
            ? patientInfo.diseases.join(", ")
            : "N/A"}
        </Text>
        <Text style={styles.infoText}>Tipo de Sangre:</Text>
        <Text style={styles.editableText}>{patientInfo.blood_type}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
    width: "100%",
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
    fontWeight: "bold",
    marginBottom: 10,
  },
});
