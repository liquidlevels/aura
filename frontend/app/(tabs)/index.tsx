
import * as React from "react";
import { View, Text, TextInput, Modal, Button, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import axios from "axios"; // Asegúrate de tener axios instalado
import API_URL from "@/apiConfig";
import { useSession } from "@/ctx";

type User = {
  id: string; // Asegúrate de que `id` es de tipo string
};

type Nota = {
  nota: string;
  fecha: string;
};

const Inicio = () => {
  const { user } = useSession();
  const [nota, setNota] = useState("");
  const [notas, setNotas] = useState<Nota[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [saturacion, setSaturacion] = useState(Math.floor(Math.random() * (100 - 90 + 1)) + 90);
  const [frecuencia, setFrecuencia] = useState(Math.floor(Math.random() * (100 - 60 + 1)) + 60);
  const [temperatura, setTemperatura] = useState<number | null>(null);
  const [humedad, setHumedad] = useState<number | null>(null);

  useEffect(() => {
    // Obtener datos de temperatura y humedad
    const fetchTemperatura = async () => {
      try {
        const response = await axios.get(`${API_URL}/sensors/dht22`);
        setTemperatura(response.data.value[0]);
        setHumedad(response.data.value[1]);
      } catch (error) {
        console.error("Error al obtener datos de temperatura y humedad:", error);
      }
    };

    // Obtener notas de la API
    const fetchNotas = async () => {
      try {
        const response = await axios.get(`${API_URL}/notes`); 
        setNotas(response.data);
      } catch (error) {
        console.error("Error al obtener las notas:", error);
      }
    };

    // Intervalo para actualización en tiempo real
    const interval = setInterval(() => {
      setSaturacion(Math.floor(Math.random() * (100 - 90 + 1)) + 90);
      setFrecuencia(Math.floor(Math.random() * (100 - 60 + 1)) + 60);
    }, 5000);

    fetchTemperatura();
    fetchNotas();

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Método POST para agregar una nota
  const agregarNota = async () => {
    if (nota.trim() === "") {
      Alert.alert("Error", "Por favor ingresa una nota válida.");
      return;
    }

    if (!user?.id) {
      Alert.alert("Error", "No se ha encontrado un usuario válido.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/notes`, {
        nota,
        patient_id: user.id, // Asegúrate de que `user.id` sea válido
      });

      if (response.status === 200) {
        Alert.alert("Éxito", "Nota agregada exitosamente.");
        setNotas((prevNotas) => [
          ...prevNotas,
          { nota, fecha: new Date().toLocaleString() }, // Usando la fecha local para visualización
        ]);
        setNota(""); // Limpiar el campo de la nota
        setModalVisible(false); // Cerrar el modal
      } else {
        Alert.alert("Error", "Hubo un problema al agregar la nota.");
      }
    } catch (error) {
      console.error("Error al agregar la nota:", error);
      Alert.alert("Error", "Ocurrió un error al agregar la nota.");
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
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <FlatList
            data={notas}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={
              <>
                <Text style={styles.title}>Bienvenido, {user} ✌🏻👩🏻‍⚕️</Text>

                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => router.push("/video/videoStream")}
                >
                  <Ionicons name="videocam" size={30} color="#839eff" />
                  <Text style={styles.iconText}>Video en vivo</Text>
                </TouchableOpacity>

                <View style={styles.infoContainer}>
                  <View style={styles.infoItem}>
                    <Ionicons name="thermometer" size={30} color="#839eff" />
                    <Text style={styles.infoText}>Temperatura: {temperatura}°C</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Ionicons name="water" size={30} color="#839eff" />
                    <Text style={styles.infoText}>Humedad: {humedad}%</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.card}
                  onPress={() => router.push("/saturacion")}
                >
                  <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                    <FontAwesome5
                      style={{ marginRight: 10 }}
                      name="lungs"
                      size={30}
                      color="#839eff"
                    />
                    <Text style={styles.cardTitle}>Oxigenación SpO2</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={30}
                    color="#839eff"
                    style={styles.arrowIcon}
                  />
                  <Text style={styles.cardText}>Oxigenación SpO2: {saturacion}%</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.card}
                  onPress={() => router.push("/frecuencia")}
                >
                  <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                    <Ionicons
                      style={{ marginRight: 5 }}
                      name="heart-half"
                      size={30}
                      color="#839eff"
                    />
                    <Text style={styles.cardTitle}>Frecuencia cardiaca</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color="#839eff"
                    style={styles.arrowIcon}
                  />
                  <Text style={styles.cardText}>
                    Frecuencia cardiaca: {frecuencia} ppm
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles.addButtonText}>Agregar Nota</Text>
                </TouchableOpacity>
              </>
            }
            renderItem={renderNota}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No hay notas aún.</Text>
            }
          />

          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Escribe tu nota</Text>
                <TextInput
                  value={nota}
                  onChangeText={setNota}
                  style={styles.modalInput}
                  multiline
                  placeholder="Escribe aquí tu nota"
                />
                <View style={styles.modalButtons}>
                  <Button
                    title="Cancelar"
                    color="#61678B"
                    onPress={() => setModalVisible(false)}
                  />
                  <Button title="Guardar" color="#61678B" onPress={agregarNota} />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
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
    backgroundColor: "#e7f5ff",
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  iconText: {
    fontSize: 18,
    color: "#3498db",
    marginLeft: 10,
  },
  infoContainer: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    color: "#7F8C8D",
    marginLeft: 5,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  arrowIcon: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  cardText: {
    fontSize: 16,
    color: "#7F8C8D",
  },
  addButton: {
    backgroundColor: "#61678B",
    padding: 15,
    marginBottom: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 18,
    color: "#fff",
  },
  emptyText: {
    fontSize: 18,
    color: "#7F8C8D",
    textAlign: "center",
    marginTop: 20,
  },
  note: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 1,
  },
  noteText: {
    fontSize: 16,
    color: "#2C3E50",
  },
  noteDate: {
    fontSize: 12,
    color: "#7F8C8D",
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInput: {
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Inicio;

