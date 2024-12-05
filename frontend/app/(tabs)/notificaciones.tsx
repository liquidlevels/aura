import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import API_URL from "@/apiConfig";

interface Notificacion {
  color: string;
  data: string;
  date: string;
  level: number;
  message: string;
  time: string;
  title: string;
}

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);
  const [showEmergencyLevels, setShowEmergencyLevels] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}alerts`);
        if (response.status === 200) {
          // para evitar duplicados
          const newNotificaciones = response.data.filter(
            (newNotif: Notificacion) =>
              !notificaciones.some(
                (existingNotif: Notificacion) =>
                  existingNotif.data === newNotif.data
              )
          );
          setNotificaciones((prev) => [...newNotificaciones, ...prev]);
        } else {
          Alert.alert("Error", "No se pudieron cargar las notificaciones.");
        }
      } catch (error) {
        Alert.alert("Error", "Hubo un problema al cargar las notificaciones.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();

    // intervalo para obtener nuevas notificaciones
    const interval = setInterval(fetchNotifications, 60000); // Cada minuto

    return () => clearInterval(interval);
  }, [notificaciones]);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}alerts`);
      if (response.status === 200) {
        const newNotificaciones = response.data.filter(
          (newNotif: Notificacion) =>
            !notificaciones.some(
              (existingNotif: Notificacion) =>
                existingNotif.data === newNotif.data
            )
        );
        setNotificaciones(newNotificaciones); // nuevas notificaciones
      } else {
        Alert.alert("Error", "No se pudieron cargar las notificaciones.");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al cargar las notificaciones.");
    } finally {
      setLoading(false);
    }
  };

  const renderNotificacion = ({ item }: { item: Notificacion }) => (
    <View style={[styles.notification, { borderColor: item.color }]}>
      <Ionicons
        name="notifications-circle-outline"
        size={30}
        color={item.color}
      />
      <View style={styles.notificationText}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>
          {item.time} - {item.date}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* encabezado de niveles de emergencia */}
      <TouchableOpacity
        onPress={() => setShowEmergencyLevels(!showEmergencyLevels)}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Niveles de Emergencia</Text>
          <Ionicons
            name={showEmergencyLevels ? "arrow-up" : "arrow-down"}
            size={20}
            color="#2C3E50"
          />
        </View>
      </TouchableOpacity>

      {showEmergencyLevels && (
        <View style={styles.emergencyLevels}>
          <View style={styles.levelRow}>
            <TouchableOpacity
              style={[styles.levelCircle, { backgroundColor: "blue" }]}
              onPressIn={() => setHoveredLevel(1)}
              onPressOut={() => setHoveredLevel(null)}
            >
              <Ionicons name="ellipse" size={24} color="blue" />
            </TouchableOpacity>
            <View style={styles.levelDetails}>
              <Text style={styles.levelText}>1. Azul: Movimiento y sonido</Text>
              <View style={styles.levelStats}>
                <Text style={styles.levelStat}>Oxigenación: 95%-100%</Text>
                <Text style={styles.levelStat}>
                  Frecuencia cardiaca: 60-100 bpm
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.levelRow}>
            <TouchableOpacity
              style={[styles.levelCircle, { backgroundColor: "green" }]}
              onPressIn={() => setHoveredLevel(2)}
              onPressOut={() => setHoveredLevel(null)}
            >
              <Ionicons name="ellipse" size={24} color="green" />
            </TouchableOpacity>
            <View style={styles.levelDetails}>
              <Text style={styles.levelText}>
                2. Verde: Oxigenación estable, frecuencia cardiaca estable
              </Text>
              <View style={styles.levelStats}>
                <Text style={styles.levelStat}>Oxigenación: 90%-95%</Text>
                <Text style={styles.levelStat}>
                  Frecuencia cardiaca: 60-80 bpm
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.levelRow}>
            <TouchableOpacity
              style={[styles.levelCircle, { backgroundColor: "yellow" }]}
              onPressIn={() => setHoveredLevel(3)}
              onPressOut={() => setHoveredLevel(null)}
            >
              <Ionicons name="ellipse" size={24} color="yellow" />
            </TouchableOpacity>
            <View style={styles.levelDetails}>
              <Text style={styles.levelText}>
                3. Amarillo: Oxigenación baja, frecuencia cardiaca alta
              </Text>
              <View style={styles.levelStats}>
                <Text style={styles.levelStat}>Oxigenación: 80%-90%</Text>
                <Text style={styles.levelStat}>
                  Frecuencia cardiaca: 80-100 bpm
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.levelRow}>
            <TouchableOpacity
              style={[styles.levelCircle, { backgroundColor: "orange" }]}
              onPressIn={() => setHoveredLevel(4)}
              onPressOut={() => setHoveredLevel(null)}
            >
              <Ionicons name="ellipse" size={24} color="orange" />
            </TouchableOpacity>
            <View style={styles.levelDetails}>
              <Text style={styles.levelText}>
                4. Naranja: Oxigenación crítica, frecuencia cardiaca muy alta
              </Text>
              <View style={styles.levelStats}>
                <Text style={styles.levelStat}>Oxigenación: 70%-80%</Text>
                <Text style={styles.levelStat}>
                  Frecuencia cardiaca: 100-120 bpm
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.levelRow}>
            <TouchableOpacity
              style={[styles.levelCircle, { backgroundColor: "red" }]}
              onPressIn={() => setHoveredLevel(5)}
              onPressOut={() => setHoveredLevel(null)}
            >
              <Ionicons name="ellipse" size={24} color="red" />
            </TouchableOpacity>
            <View style={styles.levelDetails}>
              <Text style={styles.levelText}>5. Rojo: Emergencia crítica</Text>
              <View style={styles.levelStats}>
                <Text style={styles.levelStat}>Oxigenación: menor a 70%</Text>
                <Text style={styles.levelStat}>
                  Frecuencia cardiaca: mayor a 120 bpm
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Notificaciones */}
      <FlatList
        data={notificaciones}
        renderItem={renderNotificacion}
        keyExtractor={(item) => item.data}
        refreshing={loading}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

export default Notificaciones;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  emergencyLevels: {
    marginBottom: 20,
  },
  levelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  levelCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  levelDetails: {
    flex: 1,
  },
  levelText: {
    fontSize: 16,
    color: "#2C3E50",
  },
  levelStats: {
    marginTop: 5,
  },
  levelStat: {
    fontSize: 14,
    color: "#2C3E50",
  },
  notification: {
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
  notificationText: {
    flex: 1,
    marginLeft: 10,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#2C3E50",
  },
  notificationTime: {
    fontSize: 12,
    color: "#7F8C8D",
  },
});
