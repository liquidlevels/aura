import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet, Button, Alert, ScrollView, KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Define types for the patient's information
type PatientInfo = {
  allergies: string[];
  blood_type: string;
  diseases: string[];
  dob: string; // dob as a string in DD/MM/YYYY format
  id: number;
  lastname: string;
  name: string;
};

export default function InfoPacienteScreen() {
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    allergies: ['Agua', 'Penicilina'],
    blood_type: 'AB+',
    diseases: ['Diabetes', 'Hipertensión'],
    dob: '15/06/1985', // dob as a string
    id: 1,
    lastname: 'Pérez',
    name: 'Juan',
  });

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const pickerStyles = {
    backgroundColor: isDarkMode ? '#333' : '#fff',
    color: isDarkMode ? '#fff' : '#000',
  };

  // Simulating reading from the database
  useEffect(() => {
    const fetchPatientInfo = async () => {
      const dataFromDb = {
        allergies: ['Agua', 'Penicilina'],
        blood_type: 'AB+',
        diseases: ['Diabetes', 'Hipertensión'],
        dob: '15/06/1985', // Date format is DD/MM/YYYY
        id: 1,
        lastname: 'Pérez',
        name: 'Juan',
      };

      setPatientInfo(dataFromDb); // No need to parse dob
    };

    fetchPatientInfo();
  }, []);

  // Handle save by directly using dob as a string
  const handleSave = () => {
    console.log('Info de paciente guardada:', patientInfo);
    Alert.alert('Cambios guardados', 'La información actualizada se guardó');
  };

  // Handle changes to the DOB input field
  const handleInputChange = (value: string) => {
    setPatientInfo((prev) => ({
      ...prev,
      dob: value, // Directly set dob as a string
    }));
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Nombre:</Text>
          <TextInput
            style={styles.editableInput}
            value={patientInfo.name}
            onChangeText={(value) =>
              setPatientInfo((prev) => ({ ...prev, name: value }))
            }
          />

          <Text style={styles.infoText}>Apellido(s):</Text>
          <TextInput
            style={styles.editableInput}
            value={patientInfo.lastname}
            onChangeText={(value) =>
              setPatientInfo((prev) => ({ ...prev, lastname: value }))
            }
          />

          {/* Date of Birth as a single input field */}
          <Text style={styles.infoText}>Fecha de Nacimiento:</Text>
          <TextInput
            style={styles.editableInput}
            value={patientInfo.dob}
            onChangeText={handleInputChange}
            placeholder="DD/MM/YYYY"
          />

          <Text style={styles.infoText}>Alergias:</Text>
          <TextInput
            style={styles.editableInput}
            value={patientInfo.allergies.join(', ')}
            onChangeText={(value) =>
              setPatientInfo((prev) => ({
                ...prev,
                allergies: value.split(',').map((item) => item.trim()),
              }))
            }
          />

          <Text style={styles.infoText}>Enfermedades:</Text>
          <TextInput
            style={styles.editableInput}
            value={patientInfo.diseases.join(', ')}
            onChangeText={(value) =>
              setPatientInfo((prev) => ({
                ...prev,
                diseases: value.split(',').map((item) => item.trim()),
              }))
            }
          />

          <Text style={styles.infoText}>Tipo de Sangre:</Text>
          <View style={{ ...pickerStyles, flex: 1, borderRadius: 5, overflow: 'hidden' }}>
            <Picker
              selectedValue={patientInfo.blood_type}
              onValueChange={(value) =>
                setPatientInfo((prev) => ({ ...prev, blood_type: value }))
              }
              style={pickerStyles}
            >
              {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((type) => (
                <Picker.Item key={type} label={type} value={type} style={{ color: pickerStyles.color }} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Guardar cambios" onPress={handleSave} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  infoContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  editableInput: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
