import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';
import { Slider } from 'react-native-elements';

const screenWidth = Dimensions.get('window').width;

interface FrequencyData {
  label: string;
  frequency: number;
}
const [zoomLevel, setZoomLevel] = useState(1);  // Initialize zoomLevel properly

const handleZoomIn = () => {
  setZoomLevel(prevZoom => {
    const newZoom = Math.min(prevZoom + 0.5, 2);  // Ensure it doesn't exceed the maximum value
    return Math.round(newZoom * 100) / 100; // Round to 2 decimal places
  });
};

const handleZoomOut = () => {
  setZoomLevel(prevZoom => {
    const newZoom = Math.max(prevZoom - 0.5, 1);  // Ensure it doesn't go below 1
    return Math.round(newZoom * 100) / 100; // Round to 2 decimal places
  });
};

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
  const [range, setRange] = useState(3); // Rango visible de puntos
  const [zoomLevel, setZoomLevel] = useState(1); // Controla el zoom de la gráfica

  useEffect(() => {
    const totalFrequency = data.reduce((sum, { frequency }) => sum + frequency, 0);
    const average = totalFrequency / data.length;
    setAverageFrequency(parseFloat(average.toFixed(2)));

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

  const handleZoomIn = () => {
    if (zoomLevel < 2) {
      setZoomLevel(zoomLevel + 0.5); // Aumenta el zoom
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 1) {
      setZoomLevel(zoomLevel - 0.5); // Disminuye el zoom
    }
  };

  const isNormalFrequency = (frequency: number) => {
    return frequency >= 60 && frequency <= 100;
  };

  const chartData = {
    labels: data.slice(0, range).map(item => item.label),
    datasets: [
      {
        data: data.slice(0, range).map(item => item.frequency),
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(128, 0, 128, ${opacity})`,
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.viewControls}>
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
      <Text style={styles.title}>Frecuencia cardiaca</Text>
      
      <Text style={[styles.date, { textAlign: 'left', paddingLeft: 10 }]}>{date}</Text>
      
      <Text style={[styles.normalFrequency, { textAlign: 'left', paddingLeft: 10 }]}>
        {isNormalFrequency(averageFrequency) ? 'Frecuencia Normal' : 'Frecuencia Anormal'}
      </Text>
      <Text style={[styles.subHeader, { textAlign: 'left', paddingLeft: 10 }]}>
        Promedio de frecuencia: {averageFrequency} bpm
      </Text>
      

      <ScrollView horizontal={true} style={styles.chartContainer}>
      <LineChart
    data={chartData}
    width={screenWidth * zoomLevel - 40} // Ajusta el tamaño de la gráfica según el zoom
    height={220}
    chartConfig={{
      backgroundColor: '#FFFFFF',
      backgroundGradientFrom: '#FFFFFF', 
      backgroundGradientTo: '#FFFFFF', 
      color: (opacity = 1) => `rgba(63, 81, 181, ${opacity})`, // Color de las líneas
      strokeWidth: 3,
      propsForDots: {
        r: '6', 
        strokeWidth: '2',
        stroke: '#3949AB', // Color del borde de los puntos
      },
    }}
    //bezier // Hace las líneas más suaves
    style={{
      ...styles.chart,
      backgroundColor: '#FFFFFF', 
    }}
  />

      </ScrollView>
         {/* Control deslizante */}

        <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Desliza para hahcer zoom {range}</Text>
        <Slider
          style={styles.slider}
          minimumValue={3}
          maximumValue={data.length}
          step={1}
          value={range}
          onValueChange={(value) => setRange(value)}
          minimumTrackTintColor="#3949AB"
          maximumTrackTintColor="#D3D3D3"
          thumbTintColor="#3949AB"
        />
      
      </View>

      <View style={styles.rangeControls}>
        <TouchableOpacity style={styles.rangeButton} onPress={() => setRange(Math.max(range - 1, 3))}>
          <Text style={styles.rangeButtonText}>Ver Menos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rangeButton} onPress={() => setRange(Math.min(range + 1, data.length))}>
          <Text style={styles.rangeButtonText}>Ver Más</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.notesTitle}>Tabla de Frecuencia Cardiaca</Text>
      <View style={styles.table}>
        <View style={styles.tableRowHeader}>
          <Text style={styles.tableHeader}>Hora</Text>
          <Text style={styles.tableHeader}>Frecuencia</Text>
        </View>
        {data.slice(0, range).map((item, index) => (
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
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  viewControls: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  viewButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "#61678B",
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 5,
  },
  activeViewButton: {
    backgroundColor: '#829EFF',
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    textAlign: 'left',
    marginTop: 20,
    fontWeight: 'bold',
  },
  chartContainer: {
    marginBottom: 20,
  },
  chart: {
    marginBottom: 20,
  },
  zoomControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  zoomButton: {
    width: 100, 
    height: 60, 
    padding: 10,
    backgroundColor: '#829EFF',
    borderRadius: 8, 
    marginHorizontal: 10,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  zoomButtonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  rangeControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rangeButton: {
    width: 100, // Igual al zoomButton
    height: 60, // Igual al zoomButton
    backgroundColor: '#829EFF',
    borderRadius: 8, // Igual al zoomButton
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10, // Espaciado consistente
  },
  rangeButtonText: {
    color: 'white',
    fontSize: 18, // Igual al zoomButtonText
    textAlign: 'center',
  },
  table: {
    marginBottom: 20,
  },
  tableRowHeader: {
    flexDirection: 'row',
    backgroundColor: '#61678B',
    padding: 10,
  },
  tableHeader: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginTop: 20,
  },
  notesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  noNotes: {
    fontSize: 16,
    color: '#888',
  },
  normalFrequency: {
    fontSize: 16,
    color: '#4caf50',
  },
  date: {
    fontSize: 16,
    marginBottom: 5,
    color: "grey",
  },
  subHeader: {
    fontSize: 18,
    marginTop: 10,
  },
  sliderContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  slider: {
    width: '80%',
    height: 40,
  },
  sliderLabel: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

export default FrequencyScreen;
