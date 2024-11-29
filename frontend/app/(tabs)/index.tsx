import * as React from "react";
import { useSession } from "../../ctx";
import { useState, useEffect } from "react";
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface Nota {
  nota: string;
  fecha: string;
}

const Inicio = () => {
  const { user } = useSession();
  const [nota, setNota] = useState("");
  const [notas, setNotas] = useState<Nota[]>([]);

  const [saturacion, setSaturacion] = useState(
    Math.floor(Math.random() * (100 - 90 + 1)) + 90
  );
  const [frecuencia, setFrecuencia] = useState(
    Math.floor(Math.random() * (100 - 60 + 1)) + 60
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSaturacion(Math.floor(Math.random() * (100 - 90 + 1)) + 90);
      setFrecuencia(Math.floor(Math.random() * (100 - 60 + 1)) + 60);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const agregarNota = () => {
    if (nota.trim() !== "") {
      setNotas([{ nota, fecha: new Date().toLocaleString() }, ...notas]);
      setNota("");
    } else {
      alert("Por favor ingresa una nota válida.");
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
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80} // Ajusta según el diseño
    >
      <FlatList
        data={notas}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Bienvenido, {user} ✌</Text>

            {/* Información de video */}
            <View style={styles.iconContainer}>
              <Ionicons name="videocam" size={30} color="#FF6347" />
              <Text style={styles.iconText}>Video en vivo</Text>
            </View>

            {/* Información de temperatura y humedad */}
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

            {/* Tarjetas de saturación y frecuencia */}
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push("/saturacion")}
            >
              <Text style={styles.cardTitle}>Saturación de oxígeno</Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color="#3498DB"
                style={styles.arrowIcon}
              />
              <Text style={styles.cardText}>
                🌳 Saturación de oxígeno: {saturacion}%
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push("/frecuencia")}
            >
              <Text style={styles.cardTitle}>🩺 Frecuencia cardiaca</Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color="#E74C3C"
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
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F8F5",
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
  },
  iconText: {
    fontSize: 18,
    color: "#16A085",
    marginLeft: 10,
  },
  infoContainer: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    color: "#7F8C8D",
    marginLeft: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 10,
  },
  arrowIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  cardText: {
    fontSize: 16,
    color: "#7F8C8D",
  },
  notesContainer: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#34495E",
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#BDC3C7",
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: "#F5F5F5",
  },
  note: {
    backgroundColor: "#ECF0F1",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  noteText: {
    fontSize: 16,
    color: "#2C3E50",
  },
  noteDate: {
    fontSize: 12,
    color: "#95A5A6",
    marginTop: 6,
  },
  emptyText: {
    textAlign: "center",
    color: "#7F8C8D",
    fontStyle: "italic",
    marginTop: 20,
  },
});

export default Inicio;
