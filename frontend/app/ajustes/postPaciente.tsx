import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import API_URL from "@/apiConfig";

type PatientInfo = {
  name: string;
  lastname: string;
  dob: string;
  diseases: string[];
  allergies: string[];
  blood_type: string;
  keeper_id: number;
};

export default function PostPatientInfoScreen() {
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    name: "",
    lastname: "",
    dob: "",
    diseases: [],
    allergies: [],
    blood_type: "",
    keeper_id: 0,
  });

  const handleSave = async () => {
    try {
        const payload = {
            name: patientInfo.name,
            lastname: patientInfo.lastname,
            dob: patientInfo.dob, // asegurarse que es en formato YYYY-MM-DD
            diseases: patientInfo.diseases,
            allergies: patientInfo.allergies,
            blood_type: patientInfo.blood_type,
            keeper_id: patientInfo.keeper_id, // Reemplazar con el id de cuidador de sesion
          };

      await axios.post(`${API_URL}/patients`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      Alert.alert("Success", "Patient information has been saved.");
    } catch (error) {
      console.error("Error saving patient information:", error);
      Alert.alert("Error", "Failed to save patient information.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.infoContainer}>
          {/* Input fields for patient information */}
          <Text style={styles.infoText}>Nombre:</Text>
          <TextInput
            style={styles.editableInput}
            value={patientInfo.name}
            onChangeText={(value) =>
              setPatientInfo((prev) => ({ ...prev, name: value }))
            }
          />
          <Text style={styles.infoText}>Apellido:</Text>
          <TextInput
            style={styles.editableInput}
            value={patientInfo.lastname}
            onChangeText={(value) =>
              setPatientInfo((prev) => ({ ...prev, lastname: value }))
            }
          />
          <Text style={styles.infoText}>Fecha de Nacimiento (YYYY-MM-DD):</Text>
          <TextInput
            style={styles.editableInput}
            value={patientInfo.dob}
            onChangeText={(value) =>
              setPatientInfo((prev) => ({ ...prev, dob: value }))
            }
          />
          <Text style={styles.infoText}>Cuidador ID:</Text>
          <TextInput
            style={styles.editableInput}
            keyboardType="numeric"
            value={patientInfo.keeper_id.toString()}
            onChangeText={(value) =>
              setPatientInfo((prev) => ({
                ...prev,
                keeper_id: parseInt(value) || 0,
              }))
            }
          />
          <Text style={styles.infoText}>Alergias (separar con comas):</Text>
          <TextInput
            style={styles.editableInput}
            value={patientInfo.allergies.join(", ")}
            onChangeText={(value) =>
              setPatientInfo((prev) => ({
                ...prev,
                allergies: value.split(",").map((item) => item.trim()),
              }))
            }
          />
          <Text style={styles.infoText}>Enfermedades (separar con comas):</Text>
          <TextInput
            style={styles.editableInput}
            value={patientInfo.diseases.join(", ")}
            onChangeText={(value) =>
              setPatientInfo((prev) => ({
                ...prev,
                diseases: value.split(",").map((item) => item.trim()),
              }))
            }
          />
          <Text style={styles.infoText}>Tipo de Sangre:</Text>
          <Picker
            selectedValue={patientInfo.blood_type}
            onValueChange={(value) =>
              setPatientInfo((prev) => ({ ...prev, blood_type: value }))
            }
          >
            {["Selecciona tipo de sangre", "O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((type) => (
              <Picker.Item key={type} label={type} value={type} />
            ))}
          </Picker>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Guardar Datos" onPress={handleSave} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  infoContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  editableInput: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
