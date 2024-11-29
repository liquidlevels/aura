import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Notificacion {
  id: string;
  tipo: string;
  valor: string;
  fecha: string;
}

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);

  useEffect(() => {
    // Simula la llegada de datos dinámicos cada 5 segundos
    const interval = setInterval(() => {
      const tipos = [
        {
          tipo: "frecuencia",
          icon: "heart",
          valor: `${Math.floor(Math.random() * (100 - 60 + 1)) + 60} ppm`,
        },
        {
          tipo: "saturacion",
          icon: "leaf",
          valor: `${Math.floor(Math.random() * (100 - 90 + 1)) + 90}%`,
        },
        {
          tipo: "sonido",
          icon: "volume-high",
          valor: "Detectado",
        },
        { tipo: "movimiento", icon: "walk", valor: "Detectado" },
      ];
      const nuevaNotificacion = tipos[Math.floor(Math.random() * tipos.length)];
      setNotificaciones((prev) => [
        {
          id: Date.now().toString(),
          tipo: nuevaNotificacion.tipo,
          valor: nuevaNotificacion.valor,
          fecha: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);
    }, 100000);

    return () => clearInterval(interval);
  }, []);

  const renderNotificacion = ({ item }: { item: Notificacion }) => (
    <View style={styles.notification}>
      <Ionicons name={getIcon(item.tipo)} size={30} color="#7C7FEA" />
      <View style={styles.notificationText}>
        <Text style={styles.notificationTitle}>
          {getTitle(item.tipo)}: {item.valor}
        </Text>
        <Text style={styles.notificationTime}>{item.fecha}</Text>
      </View>
    </View>
  );

  const getIcon = (tipo: string) => {
    switch (tipo) {
      case "frecuencia":
        return "heart";
      case "saturacion":
        return "leaf";
      case "sonido":
        return "volume-high";
      case "movimiento":
        return "walk";
      default:
        return "notifications";
    }
  };

  const getTitle = (tipo: string) => {
    switch (tipo) {
      case "frecuencia":
        return "Frecuencia Cardiaca";
      case "saturacion":
        return "Saturación de Oxígeno";
      case "sonido":
        return "Sonido";
      case "movimiento":
        return "Movimiento";
      default:
        return "Notificación";
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notificaciones}
        keyExtractor={(item) => item.id}
        renderItem={renderNotificacion}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Sin notificaciones .</Text>
        }
      />
    </View>
  );
};

export default Notificaciones;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 20,
  },
  notification: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECF0F1",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  notificationText: {
    marginLeft: 15,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  notificationTime: {
    fontSize: 12,
    color: "#7F8C8D",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#95A5A6",
    fontStyle: "italic",
  },
});
