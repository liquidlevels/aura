
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

// Tipos de datos
interface OxygenSaturationData {
  label: string; // Etiqueta para el día, hora o mes
  saturation: number; // Porcentaje de saturación
}

// Datos iniciales
const dayData: OxygenSaturationData[] = [
  { label: '00:00', saturation: 95 },
  { label: '06:00', saturation: 92 },
  { label: '12:00', saturation: 96 },
  { label: '18:00', saturation: 94 },
  { label: '24:00', saturation: 93 },
];

const weekData: OxygenSaturationData[] = [
  { label: 'Lunes', saturation: 94 },
  { label: 'Martes', saturation: 95 },
  { label: 'Miércoles', saturation: 96 },
  { label: 'Jueves', saturation: 93 },
  { label: 'Viernes', saturation: 95 },
  { label: 'Sábado', saturation: 96 },
  { label: 'Domingo', saturation: 94 },
];

const monthData: OxygenSaturationData[] = [
  { label: 'Enero', saturation: 95 },
  { label: 'Febrero', saturation: 94 },
  { label: 'Marzo', saturation: 96 },
  { label: 'Abril', saturation: 93 },
  { label: 'Mayo', saturation: 95 },
  { label: 'Junio', saturation: 96 },
  { label: 'Julio', saturation: 94 },
  { label: 'Agosto', saturation: 95 },
  { label: 'Septiembre', saturation: 94 },
  { label: 'Octubre', saturation: 96 },
  { label: 'Noviembre', saturation: 93 },
  { label: 'Diciembre', saturation: 95 },
];

// Colores para el gráfico
const COLORS = ['#8A2BE2', '#9370DB', '#BA55D3', '#DDA0DD', '#EE82EE', '#DA70D6', '#E6E6FA'];

const OxygenSaturationScreen = () => {
  const [data, setData] = useState(dayData); // Datos actuales según la vista
  const [view, setView] = useState<'day' | 'week' | 'month'>('day'); // Vista seleccionada
  const [averageSaturation, setAverageSaturation] = useState(0); // Valor promedio de saturación

  // Calcula el promedio de saturación
  useEffect(() => {
    const mostFrequent = Object.entries(
      data.reduce((acc, { saturation }) => {
        acc[saturation] = (acc[saturation] || 0) + 1;
        return acc;
      }, {} as Record<number, number>)
    ).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
    setAverageSaturation(Number(mostFrequent));
  }, [data]);

  // Cambia los datos según la vista
  const handleChangeView = (newView: 'day' | 'week' | 'month') => {
    setView(newView);
    if (newView === 'day') {
      setData(dayData);
    } else if (newView === 'week') {
      setData(weekData);
    } else {
      setData(monthData);
    }
  };

  // Prepara los datos para el gráfico de pastel
  const chartData = data.map((item, index) => ({
    name: item.label,
    saturation: item.saturation,
    color: COLORS[index % COLORS.length],
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Saturación de Oxígeno</Text>

      {/* Controles para cambiar la vista */}
      <View style={styles.viewControls}>
        <TouchableOpacity style={styles.viewButton} onPress={() => handleChangeView('day')}>
          <Text style={styles.viewButtonText}>Por Día</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewButton} onPress={() => handleChangeView('week')}>
          <Text style={styles.viewButtonText}>Por Semana</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewButton} onPress={() => handleChangeView('month')}>
          <Text style={styles.viewButtonText}>Por Mes</Text>
        </TouchableOpacity>
      </View>

      {/* Gráfico de pastel */}
      <View style={styles.chartContainer}>
        <PieChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          accessor="saturation"
          backgroundColor="transparent"
          paddingLeft="15"
          chartConfig={{
            color: () => `rgba(0, 0, 0, 0.5)`,
          }}
        />
        <Text style={styles.averageText}>Promedio de saturación: {averageSaturation}%</Text>
      </View>

      {/* Tabla de datos */}
      <Text style={styles.subtitle}>Datos de Saturación</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.label}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.label}</Text>
            <Text style={styles.tableCell}>{item.saturation}%</Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  viewControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  viewButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  averageText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    padding: 8,
    fontSize: 16,
  },
});

export default OxygenSaturationScreen;
