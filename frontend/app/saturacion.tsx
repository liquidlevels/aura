import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

interface OxygenSaturationData {
  label: string;
  saturation: number;
}

// Datos iniciales (para usar cuando no haya datos de la API)
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

// Colores para el gráfico (paleta morada)
const COLORS = ['#8A2BE2', '#9370DB', '#BA55D3', '#DDA0DD', '#EE82EE', '#DA70D6', '#E6E6FA'];

const OxygenSaturationScreen = () => {
  const [data, setData] = useState(dayData); // Datos actuales según la vista
  const [view, setView] = useState<'day' | 'week' | 'month'>('day'); // Vista seleccionada
  const [averageSaturation, setAverageSaturation] = useState(0); // Valor promedio de saturación
  const [notes, setNotes] = useState<string[]>([]); // Notas recibidas desde la API

  // URL base de la API
  // const apiUrl = 'https://mi-api.com/api';

  useEffect(() => {
    const totalSaturation = data.reduce((sum, { saturation }) => sum + saturation, 0);
    const average = totalSaturation / data.length;
    setAverageSaturation(parseFloat(average.toFixed(2))); // Convierte a número
  }, [data]);

  // Cambiar los datos según la vista (día, semana, mes)
  const handleChangeView = (newView: 'day' | 'week' | 'month') => {
    setView(newView);
    if (newView === 'day') {
      setData(dayData); // Usamos los datos del día
    } else if (newView === 'week') {
      setData(weekData); // Usamos los datos de la semana
    } else if (newView === 'month') {
      setData(monthData); // Usamos los datos del mes
    }
  };

  // Preparar los datos para el gráfico de pastel
  const chartData = data.map((item, index) => ({
    name: item.label,
    saturation: item.saturation,
    color: COLORS[index % COLORS.length],
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));

  // Función para obtener las notas de la API 
  const fetchNotes = async () => {
    try {
      //  notas desde la API
      // const response = await axios.get(`${apiUrl}/notas`);
      // setNotes(response.data); // Asumimos que la API devuelve una lista de notas guardadas

      // Notas de ejemplo
      const exampleNotes = [
        'Recuerda revisar los niveles de saturación antes de dormir.',
        'Verifica la calidad del aire en tu zona.',
        'Si los niveles bajan por debajo del 90%, consulta a un médico.',
      ];
      setNotes(exampleNotes); 
    } catch (error) {
      console.error('Error al obtener las notas:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Función para renderizar la tabla de datos
  const renderTable = () => {
    return (
      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Fecha</Text>
          <Text style={styles.tableHeader}>Saturación (%)</Text>
        </View>
        {data.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.label}</Text>
            <Text style={styles.tableCell}>{item.saturation}</Text>
            <Text style={styles.tableCell}>
              {item.saturation >= 95 ? 'Normal' : 'Bajo'}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  // Función para mostrar la fecha actual en formato "día/mes/año"
  const getCurrentDate = () => {
    const currentDate = new Date();
    return `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
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
      
      <Text style={styles.title}>Saturación de Oxígeno</Text>       
       <Text style={styles.dateText}>Fecha: {getCurrentDate()}</Text>
        <Text style={styles.normalSaturationText}>Saturación normal: {averageSaturation}%</Text>

      

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

      </View>

      {/* Tabla de datos */}
      {renderTable()}

      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>Leyenda de Colores</Text>
        <View style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: '#8A2BE2' }]} />
          <Text style={styles.legendText}>Niveles óptimos (95% o más)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: '#9370DB' }]} />
          <Text style={styles.legendText}>Niveles moderados (90%-94%)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: '#DDA0DD' }]} />
          <Text style={styles.legendText}>Niveles críticos (menos del 90%)</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>¿Qué es la saturación de oxígeno?</Text>
        <Text style={styles.infoText}>
          La saturación de oxígeno en sangre es el porcentaje de oxígeno en la sangre que está siendo transportado por los glóbulos rojos.
        </Text>
      </View>

      {/* Mostrar las notas obtenidas */}
      <View style={styles.notesContainer}>
        <Text style={styles.notesTitle}>Notas</Text>
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <Text key={index} style={styles.note}>
              {note}
            </Text>
          ))
        ) : (
          <Text style={styles.note}>No se encontraron notas.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    paddingLeft:10,

    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 20,
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
  activeViewButton: {
    backgroundColor: '##61678B',
  },
  viewButtonText: {
    fontSize: 14,
    color: '#fff',
  },
  chartContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  normalSaturationText: {
    paddingLeft:10,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  dateText: {
    paddingLeft:10,
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  tableContainer: {
    marginBottom: 20,
    textAlign:"center",
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
  legendContainer: {
    marginBottom: 20,
  },
  legendTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  colorBox: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoText: {
    fontSize: 14,
    marginTop: 5,
  },
  notesContainer: {
    marginBottom: 20,
  },
  notesTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  note: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default OxygenSaturationScreen;
