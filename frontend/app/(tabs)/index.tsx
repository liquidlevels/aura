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
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useSession } from '../../ctx'; // Asegúrate de tener el contexto configurado
import { Ionicons } from '@expo/vector-icons'; // Para los iconos
import { useNavigation } from '@react-navigation/native';

// Definir el tipo Nota
interface Nota {
  nota: string;
  fecha: string;
}

const App = () => {
  const navigation = useNavigation(); // Hook para navegar entre pantallas
  const { user, signOut } = useSession(); // Obtén el usuario y la función signOut del contexto

  // Tipos para las notas, frecuencia y saturación
  const [nota, setNota] = useState<string>(''); // Asegurarse de que nota sea de tipo string
  const [notas, setNotas] = useState<Nota[]>([]); // Array de notas de tipo Nota
  const [mostrarNota, setMostrarNota] = useState<boolean>(false); // Control de visibilidad de la nota

  const [saturacion, setSaturacion] = useState<number>(Math.floor(Math.random() * (100 - 90 + 1)) + 90); // Saturación de oxígeno
  const [frecuencia, setFrecuencia] = useState<number>(Math.floor(Math.random() * (100 - 60 + 1)) + 60); // Frecuencia cardíaca

  // Simulación de cambios en saturación y frecuencia cardíaca cada 5 segundos
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
      alert('Por favor ingresa una nota válida.');
    }
  };

  const eliminarNota = (index: number) => {
    const nuevasNotas = notas.filter((_, i) => i !== index);
    setNotas(nuevasNotas);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bienvenido, {user} ✌</Text>

      {/* Contenedor de video */}
      <View style={styles.iconContainer}>
        <Ionicons name="videocam" size={30} color="#FF6347" />
        <Text style={styles.iconText}>Video en vivo</Text>
      </View>

      {/* Contenedor de temperatura, humedad y datos */}
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

      {/* Saturación de oxígeno */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Saturación de oxígeno</Text>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.cardText}>🌳 Saturación de oxígeno: {saturacion}%</Text>
        </TouchableOpacity>
      </View>

      {/* Frecuencia cardiaca */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🩺 Frecuencia cardiaca</Text>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => navigation.navigate('FrecuenciaCardiaca')} // Navegar a la pantalla de frecuencia cardiaca
        >
          <Ionicons name="chevron-forward" size={24} color="#E74C3C" />
        </TouchableOpacity>
        <Text style={styles.cardText}>Frecuencia cardiaca: {frecuencia} ppm</Text>
      </View>

      {/* Sección de notas */}
      <View style={styles.notesContainer}>
        <Text style={styles.subtitle}>Agregar Nota ✍</Text>

        {/* Lista de notas */}
        <FlatList
          data={notas}
          renderItem={({ item, index }) => (
            <View style={styles.note}>
              <Text style={styles.noteText}>{item.nota}</Text>
              <Text style={styles.noteDate}>{item.fecha}</Text>
              <TouchableOpacity onPress={() => eliminarNota(index)}>
                <Ionicons name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        {/* Campo de texto para agregar una nueva nota */}
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

// Estilos
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconText: {
    fontSize: 18,
    marginLeft: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    marginLeft: 5,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  arrowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
  },
  notesContainer: {
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  note: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noteText: {
    fontSize: 16,
    flex: 1,
  },
  noteDate: {
    fontSize: 12,
    color: '#999',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#B0BEC5',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default App;
