import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, Button, Alert, ScrollView, KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function InfoPacienteScreen() {
  const [patientInfo, setPatientInfo] = useState({
    allergies: ['Gato', 'Abeja'],
    blood_type: 'A-',
    diseases: ['Asma'],
    age: 73,
    id: 2,
    lastname: 'Gómez',
    name: 'María',
  });

  const colorScheme = useColorScheme(); 
  const isDarkMode = colorScheme === 'dark';

  const pickerStyles = {
    backgroundColor: isDarkMode ? '#333' : '#fff',
    color: isDarkMode ? '#fff' : '#000',   
  };

  const handleSave = () => {
    console.log('Saved patient info:', patientInfo);
    Alert.alert('Changes Saved', 'The updated information has been saved.');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
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

          <Text style={styles.infoText}>Edad:</Text>
          <TextInput
            style={styles.editableInput}
            keyboardType="numeric"
            value={patientInfo.age.toString()}
            onChangeText={(value) =>
              setPatientInfo((prev) => ({
                ...prev,
                age: parseInt(value) || 0,
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
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Guardar cambios" onPress={handleSave} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export const config = {
  header: {
    title: 'Patient Information',
  },
};

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
