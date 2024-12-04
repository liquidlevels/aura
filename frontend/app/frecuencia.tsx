import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';
import Slider from '@react-native-community/slider';
import { Button, Icon } from 'react-native-elements';

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
  const [range, setRange] = useState(3); // Rango visible de puntos
  const [zoomLevel, setZoomLevel] = useState(1); // Valor inicial del zoom
  const maxZoom = 5; // Nivel máximo de zoom
  const minZoom = 1; // Nivel mínimo de zoom
  const [isSliderVisible, setIsSliderVisible] = useState(false);

  // Función para manejar el zoom
  const handleZoomChange = (value) => {
    setZoomLevel(value);
  };
  const toggleSliderVisibility = () => {
    setIsSliderVisible(!isSliderVisible); // Usar la función setIsSliderVisible
  };
  
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
          style={{
            ...styles.chart,
            backgroundColor: '#FFFFFF', 
          }}
        />
      </ScrollView>
      
      <View style={{ padding: 20 }}>
        {/* Botón para mostrar/ocultoar el slider */}
        <TouchableOpacity  style = {styles.toogleButton}onPress={toggleSliderVisibility}>
        <Icon name="help-outline" size={30}color='purple'/>
        </TouchableOpacity>{/* Slider que aparece/oculta según el estado */}
        {isSliderVisible && (
          <View style={{ marginTop: 20 }}>
            <Text style={styles.zoomLabel}>Desliza para hacer zoom</Text>
            <Slider
              style={styles.slider}
              minimumValue={minZoom}
              maximumValue={maxZoom}
              step={0.1}
              value={zoomLevel}
              onValueChange={handleZoomChange}
              minimumTrackTintColor="#3949AB"
              maximumTrackTintColor="#D3D3D3"
              thumbTintColor="#3949AB"
            />
          </View>
        )}
        
        {/* Controles de rango */}
        <View style={styles.rangeControls}>
          <TouchableOpacity style={styles.rangeButton} onPress={() => setRange(Math.max(range - 1, 3))}>
            <Text style={styles.rangeButtonText}>Ver Menos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rangeButton} onPress={() => setRange(Math.min(range + 1, data.length))}>
            <Text style={styles.rangeButtonText}>Ver Más</Text>
          </TouchableOpacity>
        </View>
      </View>
  
      {/* Tabla de frecuencia cardiaca */}
      <Text style={styles.notesTitle}>Tabla de Frecuencia Cardiaca</Text>
      <View style={styles.tableContainer}>
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
  
      {/* Descripción sobre la frecuencia cardiaca */}
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

  // Titulo
  title: {
    fontSize: 24,
    textAlign: 'left',
    marginTop: 20,
    fontWeight: 'bold',
    color: '#333',
  },

  // Contenedor de la gráfica
  chartContainer: {
    marginBottom: 20,
  },
  chart: {
    marginBottom: 20,
  },

  // Controles de vista
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

  // Controles de zoom y rango
  zoomControls: {
    marginVertical: 30,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6.27,
    elevation: 10,
  },

  zoomLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3949AB',
    marginBottom: 10,
  },

  // Estilos del Slider
  sliderContainer: {
    marginVertical: 20,
    alignItems: 'center',
    width: '100%',
    
  },
  slider: {
    width: '90%',
    height: 40,
    borderRadius: 20,
 
    overflow: 'hidden',
  },
  sliderTrack: {
    height: 5,
    
    borderRadius: 5,
  },
  sliderThumb: {
    width: 30,
    height: 30,
    
    borderRadius: 15,
  },

  // Botones de ver más y ver menos
  rangeControls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    marginTop: 20,
  },
  rangeButton: {
    width: 120,
    height: 50,
    backgroundColor: '#61678B',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6.27,
    elevation: 10,
  },
  rangeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Tabla
  table: {
    marginBottom: 20,
  },
  tableRowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    
    backgroundColor: '#61678B',
    paddingVertical: 5,
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingVertical: 5,
  },
  tableCell: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },

  
  // Descripción y notas
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
  },  toggleButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    elevation: 5, // Da una sombra para que se vea más visible
  },

// Contenedor de la tabla
tableContainer: {
  marginVertical: 20,
  backgroundColor: '#fff',
  borderRadius: 5,
  padding: 10,
  elevation: 3,
  },
});

export default FrequencyScreen;
