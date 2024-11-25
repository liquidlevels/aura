import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';  // Para gráfico de pastel

interface OxygenSaturationData {
  hour: number;
  saturation: number;
}

interface Note {
  id: number;
  text: string;
}

const OxygenSaturationScreen = () => {
  const [oxygenSaturationData, setOxygenSaturationData] = useState<OxygenSaturationData[]>([
    { hour: 0, saturation: 95 },
    { hour: 1, saturation: 92 },
    { hour: 2, saturation: 95 },
    { hour: 3, saturation: 91 },
    { hour: 4, saturation: 93 },
    { hour: 5, saturation: 95 },
    { hour: 6, saturation: 92 },
    { hour: 7, saturation: 94 },
    { hour: 8, saturation: 95 },
    { hour: 9, saturation: 91 },
    { hour: 10, saturation: 93 },
    { hour: 11, saturation: 95 },
    { hour: 12, saturation: 92 },
    { hour: 13, saturation: 94 },
    { hour: 14, saturation: 95 },
    { hour: 15, saturation: 91 },
    { hour: 16, saturation: 93 },
    { hour: 17, saturation: 95 },
    { hour: 18, saturation: 92 },
    { hour: 19, saturation: 94 },
    { hour: 20, saturation: 95 },
    { hour: 21, saturation: 91 },
    { hour: 22, saturation: 93 },
    { hour: 23, saturation: 95 },
  ]);

  const [notes, setNotes] = useState<Note[]>([
    { id: 1, text: 'Nota 1' },
    { id: 2, text: 'Nota 2' },
  ]);

  // Usamos useMemo para evitar recalcular el promedio en cada render
  const averageSaturation = useMemo(() => {
    const saturationValues = oxygenSaturationData.map(data => data.saturation);
    return Math.round(saturationValues.reduce((a, b) => a + b, 0) / saturationValues.length);
  }, [oxygenSaturationData]);

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <PieChart
          style={{ height: 200 }}
          valueAccessor={({ item }) => item.value}
          data={[
            { key: 1, value: averageSaturation, svg: { fill: '#8884d8' } },
            { key: 2, value: 100 - averageSaturation, svg: { fill: '#ccc' } },
          ]}
          innerRadius="50%"
          outerRadius="80%"
        />
      </View>
      <Text style={styles.text}>Saturación de oxígeno promedio: {averageSaturation}%</Text>
      <Text style={styles.text}>La saturación normal de oxígeno en una persona es entre 95% y 100%.</Text>
      
      {/* Lista de saturación de oxígeno por hora */}
      <FlatList
        data={oxygenSaturationData}
        keyExtractor={(item) => item.hour.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.hour}:00</Text>
            <Text style={styles.cell}>{item.saturation}%</Text>
          </View>
        )}
      />

      {/* Lista de notas */}
      <Text style={styles.heading}>Notas</Text>
      <FlatList
        data={notes}
        keyExtractor={(note) => note.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.note}>
            <Text>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  note: {
    marginTop: 10,
  },
});

export default OxygenSaturationScreen;
