import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-svg-charts';
import { Circle } from 'react-native-svg'; // Para los puntos en la línea

const HeartRateScreen = () => {
  // Datos de ejemplo para el gráfico de línea
  const [heartRateData, setHeartRateData] = useState([
    { day: 'Lunes', heartRate: 60 },
    { day: 'Martes', heartRate: 70 },
    { day: 'Miércoles', heartRate: 65 },
    { day: 'Jueves', heartRate: 75 },
    { day: 'Viernes', heartRate: 70 },
    { day: 'Sábado', heartRate: 65 },
    { day: 'Domingo', heartRate: 60 },
  ]);

  // Prepara los datos para el gráfico de línea (solo valores de frecuencia cardiaca)
  const lineData = heartRateData.map(data => data.heartRate);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Frecuencia Cardiaca Semanal</Text>

      <View style={styles.chartContainer}>
        <LineChart
          style={{ height: 300, width: '100%' }}
          data={lineData}
          svg={{ stroke: '#8884d8', strokeWidth: 2 }}
          contentInset={{ top: 20, bottom: 20 }}
        >
          <Circle cx="10" cy="10" r="10" stroke="rgb(134, 65, 244)" fill="white" />
        </LineChart>
      </View>

      <View style={styles.tableContainer}>
        <Text style={styles.text}>Frecuencia Cardiaca Diaria</Text>
        <View style={styles.table}>
          {heartRateData.map((data, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{data.day}</Text>
              <Text style={styles.tableCell}>{data.heartRate}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chartContainer: {
    marginBottom: 30,
  },
  tableContainer: {
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default HeartRateScreen;
