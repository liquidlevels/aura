import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function Frecuencia() {
  // Datos de ejemplo 
  const data = {
    labels: ["Lunes", "Martes", "Miércoles", "Sábado", "Domingo"], // Todas las etiquetas deben ser strings.
    datasets: [
      {
        data: [75, 80, 76, 70, 78], // Datos numéricos válidos.
        color: () => "#A03A8C", // Color debe ser una función que devuelva un string.
        strokeWidth: 2, // Valor numérico para el grosor de la línea.
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Frecuencia Cardíaca</Text>
      </View>

      {/* Gráfico */}
      <View style={styles.chartContainer}>
        <LineChart
          data={data}
          width={screenWidth * 0.9}
          height={200}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            color: () => "#A03A8C", // Asegúrate de devolver un string.
            labelColor: () => "#333", // Asegúrate de devolver un string.
            style: { borderRadius: 16 },
            propsForDots: { r: "3", strokeWidth: "1", stroke: "#A03A8C" }, // Props con valores válidos como strings.
          }}
          bezier
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      </View>

      {/* Tabla de Datos */}
      <View style={styles.table}>
        <Text style={styles.tableHeader}>Frecuencia Normal</Text>
        <View style={styles.tableRow}>
          <Text style={styles.tableColumn}>Fecha</Text>
          <Text style={styles.tableColumn}>Rango</Text>
          <Text style={styles.tableColumn}>Porcentaje</Text>
        </View>
        {/* Ejemplo de datos */}
        <View style={styles.tableRow}>
          <Text style={styles.tableColumn}>27/10/2024</Text>
          <Text style={styles.tableColumn}>80-100pm</Text>
          <Text style={styles.tableColumn}>80%</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableColumn}>28/10/2024</Text>
          <Text style={styles.tableColumn}>60-90pm</Text>
          <Text style={styles.tableColumn}>27%</Text>
        </View>
      </View>

      {/* Sección de Notas */}
      <View style={styles.notesSection}>
        <Text style={styles.notesHeader}>Notas</Text>
        <Text style={styles.noteText}>
          💓 Frecuencia Cardiaca Baja: Ingrese su estado de frecuencia cardiaca.
        </Text>
        <Text style={styles.noteText}>
          📊 Informe y Descanso: Envíe datos de frecuencia a sus doctores.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    padding: 16,
    backgroundColor: "#F7F7F7",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  chartContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  table: {
    margin: 16,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    padding: 8,
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  tableColumn: {
    fontSize: 14,
    flex: 1,
    textAlign: "center",
  },
  notesSection: {
    margin: 16,
    padding: 8,
    backgroundColor: "#F1F1F1",
    borderRadius: 8,
  },
  notesHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  noteText: {
    fontSize: 14,
    marginBottom: 4,
  },
});
