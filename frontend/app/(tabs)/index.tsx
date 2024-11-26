// import { Text, View, StyleSheet, Button } from "react-native";
// import { useSession } from "../../ctx";

// export default function Index() {
//   const { user, signOut } = useSession();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Inicio</Text>
//       <View>
//         <Text>Bienvenido, {user}</Text>
//         <Button title="sign out" onPress={() => signOut()} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#D9D9D9",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   text: {
//     color: "#000",
//   },
// });
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSession } from '../../ctx'; 

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Nota {
  nota: string;
  fecha: string;
}

const App = () => {
  const { user, signOut } = useSession(); // Obtén el usuario y la función signOut del contexto
  const [nota, setNota] = useState('');
  const [notas, setNotas] = useState<Nota[]>([]); 
  
  const [mostrarNota, setMostrarNota] = useState(false);

  const [saturacion, setSaturacion] = useState(Math.floor(Math.random() * (100 - 90 + 1)) + 90);
  const [frecuencia, setFrecuencia] = useState(Math.floor(Math.random() * (100 - 60 + 1)) + 60);

 
  useEffect(() => {
    const interval = setInterval(() => {
      setSaturacion(Math.floor(Math.random() * (100 - 90 + 1)) + 90);
      setFrecuencia(Math.floor(Math.random() * (100 - 60 + 1)) + 60);
    }, 5000); // Actualiza cada 5 segundos

    return () => clearInterval(interval); // Limpiar el intervalo cuando se desmonte el componente
  }, []);

  const agregarNota = () => {
    if (nota.trim() !== '') {
      setNotas([...notas, { nota, fecha: new Date().toLocaleString() }]);
      setNota('');
      setMostrarNota(false);
    } else {
      alert("Por favor ingresa una nota válida.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bienvenido, {user} ✌</Text>

    
      <View style={styles.iconContainer}>
        <Ionicons name="videocam" size={30} color="#FF6347" />
        <Text style={styles.iconText}>Video en vivo</Text>
      </View>
      
         <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Ionicons name="thermometer" size={30} color="#3498DB" />
          <Text style={styles.infoText}>Temperatura: 22°C</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="water" size={30} color="#1ABC9C" />
          <Text style={styles.infoText}>Humedad: 60%</Text>
        </View>
      </View>


      <View style={styles.card}>
        <Text style={styles.cardTitle}>Saturación de oxígeno</Text>
        <TouchableOpacity style={styles.arrowButton}onPress={() =>router.push("/saturacion")}>
          <Ionicons name="chevron-forward" size={24} color="#3498DB" />
        </TouchableOpacity>
        <Text style={styles.cardText}>🌳Saturación de oxígeno: {saturacion}%</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🩺Frecuencia cardiaca</Text>
        <TouchableOpacity style={styles.arrowButton} onPress={() =>router.push("/frecuencia")}>
          <Ionicons name="chevron-forward" size={24} color="#E74C3C" />
        </TouchableOpacity>
        <Text style={styles.cardText}>Frecuencia cardiaca: {frecuencia} ppm</Text>
      </View>

     
      <View style={styles.notesContainer}>
        <Text style={styles.subtitle}>Agregar Nota ✍</Text>
        {notas.map((nota, index) => (
          <View key={index} style={styles.note}>
            <Text style={styles.noteText}>{nota.nota}</Text>
            <Text style={styles.noteDate}>{nota.fecha}</Text>
          </View>
        ))}

        {mostrarNota ? (
          <View style={styles.inputContainer}>
            <TextInput
              value={nota}
              onChangeText={setNota}
              style={styles.input}
              placeholder="Escribe tu nota"
              placeholderTextColor="#B0BEC5"
            />
            <Button title="Agregar nota" onPress={agregarNota} color="#C8A8EB" />
          </View>
        ) : (
          <Button title="Agregar nota" onPress={() => setMostrarNota(true)} color="#C8A8EB" />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F8F5',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#BDC3C7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  iconText: {
    fontSize: 18,
    color: '#16A085',
    marginLeft: 10,
  },
  infoContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#7F8C8D',
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#BDC3C7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
    flex: 1,
  },
  arrowButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  notesContainer: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#BDC3C7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 15,
  },
  note: {
    backgroundColor: '#ECF0F1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#BDC3C7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  noteText: {
    fontSize: 16,
    color: '#2C3E50',
  },
  noteDate: {
    fontSize: 12,
    color: '#95A5A6',
    marginTop: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  input: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#BDC3C7',
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#F5F5F5',
  },
});

export default App;
