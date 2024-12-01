import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';

const screenWidth = Dimensions.get('window').width;

interface FrequencyData {
  label: string;
  frequency: number;
}

const dayData: FrequencyData[] = [
  { label: '00:00', frequency: 75 },
  { label: '06:00', frequency: 80 },
  { label: '12:00', frequency: 85 },
  { label: '18:00', frequency: 78 },
  { label: '24:00', frequency: 76 },
];

const weekData: FrequencyData[] = [
  { label: 'Lunes', frequency: 80 },
  { label: 'Martes', frequency: 85 },
  { label: 'Miércoles', frequency: 82 },
  { label: 'Jueves', frequency: 79 },
  { label: 'Viernes', frequency: 84 },
  { label: 'Sábado', frequency: 86 },
  { label: 'Domingo', frequency: 81 },
];

const monthData: FrequencyData[] = [
  { label: 'Enero', frequency: 78 },
  { label: 'Febrero', frequency: 80 },
  { label: 'Marzo', frequency: 82 },
  { label: 'Abril', frequency: 77 },
  { label: 'Mayo', frequency: 81 },
  { label: 'Junio', frequency: 83 },
  { label: 'Julio', frequency: 79 },
  { label: 'Agosto', frequency: 80 },
  { label: 'Septiembre', frequency: 76 },
  { label: 'Octubre', frequency: 79 },
  { label: 'Noviembre', frequency: 80 },
  { label: 'Diciembre', frequency: 78 },
];

const FrequencyScreen = () => {
  const [data, setData] = useState(dayData);
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');
  const [averageFrequency, setAverageFrequency] = useState(0);
  const [date, setDate] = useState(moment().format('dddd, D [de] MMMM [de] YYYY'));

  useEffect(() => {
    const totalFrequency = data.reduce((sum, { frequency }) => sum + frequency, 0);
    const average = totalFrequency / data.length;
    setAverageFrequency(parseFloat(average.toFixed(2)));

    // Actualiza la fecha al cambiar la vista
    setDate(moment().format('dddd, D [de] MMMM [de] YYYY'));
  }, [data]);

  const handleChangeView = (newView: 'day' | 'week' | 'month') => {
    setView(newView);
    if (newView === 'day') {
      setData(dayData);
    } else if (newView === 'week') {
      setData(weekData);
    } else if (newView === 'month') {
      setData(monthData);
    }
  };

  const isNormalFrequency = (frequency: number) => {
    // Rango de frecuencia normal: entre 60-100 bpm
    return frequency >= 60 && frequency <= 100;
  };

  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        data: data.map(item => item.frequency),
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(128, 0, 128, ${opacity})`, // Color morado
      },
    ],
  };

  return (
   
      <ScrollView style={styles.container}><
        View style={styles.viewControls}>
          <TouchableOpacity
            style={[styles.viewButton, view === 'day' && styles.activeViewButton]}
            onPress={() => handleChangeView('day')}
          >
            <Text style={styles.viewButtonText}>Por Día</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewButton, view === 'week' && styles.activeViewButton]}
            onPress={() => handleChangeView('week')}
          >
            <Text style={styles.viewButtonText}>Por Semana</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewButton, view === 'month' && styles.activeViewButton]}
            onPress={() => handleChangeView('month')}
          >
            <Text style={styles.viewButtonText}>Por Mes</Text>
          </TouchableOpacity>
        </View>
        
 
      <Text style={[styles.normalFrequency, { textAlign: 'left', paddingLeft: 10 }]}>
        {isNormalFrequency(averageFrequency) ? 'Frecuencia Normal' : 'Frecuencia Anormal'}
      </Text>
      
      <Text style={[styles.date, { textAlign: 'left', paddingLeft: 10 }]}>{date}</Text>
      
      <Text style={[styles.subHeader, { textAlign: 'left', paddingLeft: 10 }]}>
        Promedio de frecuencia: {averageFrequency} bpm
      </Text>

      <LineChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#f5f5f5',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#f5f5f5',
          color: (opacity = 1) => `rgba(128, 0, 128, ${opacity})`, // Color morado
          labelColor: (opacity = 1) => `rgba(128, 0, 128, ${opacity})`, // Etiquetas moradas
          strokeWidth: 2,
          barPercentage: 0.5,
        }}
        style={styles.chart}
      />

      <Text style={styles.notesTitle}>Tabla de Frecuencia Cardiaca</Text>
      <View style={styles.table}>
        {data.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.label}</Text>
            <Text style={styles.tableCell}>{item.frequency} bpm</Text>
          </View>
        ))}
      </View>

      <Text style={styles.description}>
        Las frecuencias cardiacas normales varían entre 60 y 100 latidos por minuto (bpm) en reposo para la mayoría de los adultos.
        Valores fuera de este rango pueden indicar problemas cardíacos o un estado de salud fuera de lo normal.
      </Text>

      <Text style={styles.notesTitle}>Notas Recientes:</Text>
      <Text style={styles.noNotes}>No hay notas para mostrar.</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  subHeader: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color:"grey",
  },
  normalFrequency: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: 'center',
    marginBottom: 20,
  },
  
  viewControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  viewButton: {
   
      margin: 10,
      backgroundColor: '#61678B',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
    
  },

  chart: {
    marginVertical: 10,
  },
  table: {
    marginBottom: 20,
  },
  viewButtonText: {
    fontSize: 14,
    color: '#fff',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 5,
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  activeViewButton: {
    backgroundColor: '#8A2BE2',
  },
  noNotes: {
    fontSize: 16,
    color: 'gray',
  },
});

export default FrequencyScreen;
