import * as React from "react";
import { useSession } from "../../ctx";
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import api from '@/api';

interface Nota {
  nota: string;
  fecha: string;
}

const Inicio = () => {
  const { user } = useSession();
  const [nota, setNota] = useState('');
  const [notas, setNotas] = useState<Nota[]>([]);
  const [saturacion, setSaturacion] = useState(
    Math.floor(Math.random() * (100 - 90 + 1)) + 90
  );
  const [frecuencia, setFrecuencia] = useState(
    Math.floor(Math.random() * (100 - 60 + 1)) + 60
  );

  // Función para obtener las notas del servidor
  const fetchNotas = async () => {
    try {
      const response = await api.get('/notas');
      console.log('Notas obtenidas del servidor:', response.data); 
      setNotas(response.data);
    } catch (error) {
      console.error('Error al obtener notas:', error);
    }
  };

  // Función para enviar una nota al servidor
  const enviarNota = async (nuevaNota: Nota) => {
    try {
      console.log('Enviando nota al servidor:', nuevaNota); 
      const response = await api.post('/notas', nuevaNota);
      console.log('Respuesta del servidor al guardar nota:', response.data); 

      if (response.status === 201 || response.status === 200) {
        console.log('Nota guardada con éxito:', response.data); 
        return true; 
      } else {
        console.error('Error inesperado al guardar la nota:', response.status);
        return false;
      }
    } catch (error) {
      console.error('Error al enviar la nota:', error);
      return false; 
    }
  };

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        // Aquí puedes hacer una solicitud a tu API para obtener los datos reales
        const response = await api.get('/mediciones');
        setSaturacion(response.data.saturacion);
        setFrecuencia(response.data.frecuencia);
      } catch (error) {
        console.error('Error al obtener datos de medición:', error);
      }
    };
  
    obtenerDatos(); 
    // Si quieres hacer esta llamada periódicamente, puedes agregar un intervalo
    const interval = setInterval(obtenerDatos, 5000);
  
    return () => clearInterval(interval);
  }, []); // Solo se ejecuta una vez al montar el componente
  

  const agregarNota = async () => {
    if (nota.trim() !== '') {
      const nuevaNota = { nota, fecha: new Date().toLocaleString() };
      
      // Actualiza el estado de notas de forma más segura
      setNotas((prevNotas) => [nuevaNota, ...prevNotas]);
  
      setNota('');
  
      // Enviar la nota al servidor
      const guardadaConExito = await enviarNota(nuevaNota);
      if (guardadaConExito) {
        console.log('Nota guardada correctamente en el servidor.');
        // Aquí no es necesario hacer un fetchNotas nuevamente si ya se actualizó el estado
      } else {
        console.log('Hubo un problema al guardar la nota.');
      }
    } else {
      alert('Por favor ingresa una nota válida.');
    }
  };
  
  const renderNota = ({ item }: { item: Nota }) => (
    <View style={styles.note}>
      <Text style={styles.noteText}>{item.nota}</Text>
      <Text style={styles.noteDate}>{item.fecha}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <FlatList
        data={notas}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Bienvenido, {user} ✌</Text>


            {/* Información de video */}
            <TouchableOpacity style={styles.iconContainer}
              onPress={() => router.push('/video/videoStream')}
            >
              <Ionicons name="videocam" size={30} color="#61678B" />
              <Text style={styles.iconText}>Video en vivo</Text>
            </TouchableOpacity>

            {/* Información de temperatura y humedad */}
            <View style={styles.infoContainer}>
              <View style={styles.infoItem}>
                <Ionicons name="thermometer" size={40} color="#61678B" />
                <Text style={styles.infoText}>Temperatura: 22°C   </Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="water" size={40} color="#61678B" />
                <Text style={styles.infoText}>Humedad: 60% </Text>
              </View>
            </View>

            {/* Tarjetas de saturación y frecuencia */}
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push('/saturacion')}
            >
              <Text style={styles.cardTitle}>Saturación de oxígeno</Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color=""
                style={styles.arrowIcon}
              />
              <Text style={styles.cardText}>
                🌳 Saturación de oxígeno: {saturacion}%
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push('/frecuencia')}
            >
              <Text style={styles.cardTitle}>🩺 Frecuencia cardiaca</Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color="#61678B"
                style={styles.arrowIcon}
              />
              <Text style={styles.cardText}>
                Frecuencia cardiaca: {frecuencia} ppm
              </Text>
            </TouchableOpacity>

            {/* Campo para agregar nota */}
            <View style={styles.notesContainer}>
              <Text style={styles.subtitle}>Agregar Nota ✍</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={nota}
                  onChangeText={setNota}
                  style={styles.input}
                  placeholder="Escribe tu nota"
                  placeholderTextColor="#B0BEC5"
                />
                <Button
                  title="Agregar nota"
                  onPress={agregarNota}
                  color="#61678B"
                />
              </View>
            </View>
          </>
        }
        renderItem={renderNota}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay notas aún.</Text>
        }
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: '#D2F0F8',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
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
    
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#E9E9FA',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  arrowIcon: {
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
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#BDC3C7',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginRight: 10,
  },
  note: {
    backgroundColor: '#F4E1FD',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  noteText: {
    fontSize: 16,
    color: '#2C3E50',
  },
  noteDate: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 6,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#BDC3C7',
    marginTop: 20,
  },
});

export default Inicio;