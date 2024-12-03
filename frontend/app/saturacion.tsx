import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import moment from 'moment';

const screenWidth = Dimensions.get('window').width;

interface OxygenSaturationData {
  label: string;
  saturation: number;
}

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

const COLORS = ['#8A2BE2', '#9370DB', '#BA55D3', '#DDA0DD', '#EE82EE', '#DA70D6', '#E6E6FA'];

const OxygenSaturationScreen = () => {
  const [data, setData] = useState(dayData);
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');
  const [averageSaturation, setAverageSaturation] = useState(0);
  const [notes, setNotes] = useState<string[]>([]);

  useEffect(() => {
    const totalSaturation = data.reduce((sum, { saturation }) => sum + saturation, 0);
    const average = totalSaturation / data.length;
    setAverageSaturation(parseFloat(average.toFixed(2)));
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

  const chartData = data.map((item, index) => ({
    name: item.label,
    saturation: item.saturation,
    color: COLORS[index % COLORS.length],
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));

  const fetchNotes = async () => {
    try {
      // Fetch real data from API
      // const response = await axios.get(`${apiUrl}/notas`);
      // setNotes(response.data);

      // Example notes for now
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

  const renderTable = () => {
    return (
      
      
      <View style={styles.table}>
        <View style={styles.tableRowHeader}>
          <Text style={styles.tableHeader}>Hora</Text>
          <Text style={styles.tableHeader}>Frecuencia</Text>
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

  const getCurrentDate = () => {
    return moment().format('dddd, D [de] MMMM [de] YYYY');
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

      <Text style={styles.title}>Saturación de Oxígeno</Text>
     
    
      <Text style={[styles.dateText, { textAlign: 'left', paddingLeft: 10 }]}>
  {getCurrentDate()}
</Text>

      <Text style={styles.normalSaturationText}>Saturación normal: {averageSaturation}%</Text>

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
          La saturación de oxígeno en sangre es el porcentaje de oxígeno en la sangre que está siendo transportado por los glóbulos rojos. Un nivel bajo de saturación puede indicar que los pulmones no están funcionando adecuadamente.
        </Text>
      </View>

      <View style={styles.notesContainer}>
        <Text style={styles.notesTitle}>Notas:</Text>
        {notes.map((note, index) => (
          <Text key={index} style={styles.noteText}>
            {note}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
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
  dateText: {
    fontSize: 16,
    marginBottom: 5,
    color: 'grey',

  },
  normalSaturationText: {
    
      fontSize: 16,
      color: '#4caf50',
  
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
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

  
  legendContainer: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  colorBox: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
    color: '#333',
  },
  infoContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
  },
  notesContainer: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteText: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
  },
});

export default OxygenSaturationScreen;
