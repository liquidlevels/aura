import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { PieChart } from 'react-native-svg-charts';

interface OxygenSaturationData {
  label: string; // Cambiado de 'day' para permitir horas, días o meses según vista
  saturation: number;
}

const dayData: OxygenSaturationData[] = [
  { label: '00:00', saturation: 95 },
  { label: '06:00', saturation: 92 },
  { label: '12:00', saturation: 96 },
  { label: '18:00', saturation: 94 },
  { label: '24:00', saturation: 93 },
];

const weekData = [
  { label: 'Lunes', saturation: 94 },
  { label: 'Martes', saturation: 95 },
  { label: 'Miércoles', saturation: 96 },
  { label: 'Jueves', saturation: 93 },
  { label: 'Viernes', saturation: 95 },
  { label: 'Sábado', saturation: 96 },
  { label: 'Domingo', saturation: 94 },
];

const monthData = [
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

const COLORS = [
  '#8A2BE2',
  '#9370DB',
  '#BA55D3', 
  '#DDA0DD', 
  '#EE82EE', 
  '#DA70D6', 
  '#E6E6FA',
];

// GLOSARIO COLORES
const colorLegend = [
  { color: '#8A2BE2', label: 'Saturación baja' },
  { color: '#9370DB', label: 'Saturación normal baja' },
  { color: '#BA55D3', label: 'Saturación normal' },
  { color: '#DDA0DD', label: 'Saturación normal alta' },
  { color: '#EE82EE', label: 'Saturación alta' },
];

const OxygenSaturationScreen = () => {
  const [data, setData] = useState(dayData);
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');
  const [averageSaturation, setAverageSaturation] = useState(0);

  useEffect(() => {
    const saturationValues = data.map((item) => item.saturation);
    const maxCount = Math.max(...saturationValues.map((value) => saturationValues.filter((v) => v === value).length));
    const mostRepeatedValue = saturationValues.find((value) => saturationValues.filter((v) => v === value).length === maxCount);
    setAverageSaturation(mostRepeatedValue || 0);
  }, [data]);

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
  const pieData = data.map((item, index) => ({
    value: item.saturation,
    svg: { fill: COLORS[index % COLORS.length] },
    key: item.label,
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
        <PieChart style={styles.chart} data={pieData} />
        <Text style={styles.averageText}>Promedio de saturación: {averageSaturation}%</Text>
      </View>

      {/* Descripción */}
      <Text style={styles.description}>La saturación de oxígeno (SpO2) es el porcentaje de hemoglobina en la sangre que transporta oxígeno. Es un indicador clave de la función respiratoria y se mide mediante pulsioxímetros. Los valores normales de saturación de oxígeno se encuentran entre el 95% y el 100%. Si los niveles caen por debajo de este rango, puede indicar problemas respiratorios o falta de oxígeno.
        Los niveles de saturación de oxígeno pueden clasificarse de la siguiente manera:
        - 95% - 100%: Normal, indica una función respiratoria saludable.
        - 90% - 94%: Ligeramente bajos, puede ser una señal de alerta.
        - 80% - 89%: Bajo, requiere atención médica.
        - Menos del 80%: Crítico, se necesita atención médica inmediata.

  Es importante monitorear los niveles de saturación de oxígeno, especialmente en personas con enfermedades respiratorias o cardiovasculares. Mantener una saturación adecuada es fundamental para el bienestar general y el rendimiento óptimo del cuerpo.
</Text>

   
      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>Significado de los Colores:</Text>
        {colorLegend.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColorBox, { backgroundColor: item.color }]} />
            <Text style={styles.legendLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Tabla de datos */}
      <Text style={styles.subtitle}>Datos de Saturación</Text>
      <View style={styles.tableContainer}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.label}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.label}</Text>
              <Text style={styles.tableCell}>{item.saturation}%</Text>
            </View>
          )}
        />
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  chart: {
    height: 200,
    width: 200,
  },
  averageText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
  legendContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  legendTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColorBox: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  legendLabel: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  tableContainer: {
    marginTop: 20,
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
