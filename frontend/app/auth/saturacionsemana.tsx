// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList } from 'react-native';
// import { PieChart } from 'react-native-svg-charts'; // Importa PieChart de react-native-svg-charts

// interface OxygenSaturationData {
//   day: string;
//   saturation: number;
// }

// interface Note {
//   id: number;
//   text: string;
// }

// const oxygenSaturationData: OxygenSaturationData[] = [
//   { day: 'Lunes', saturation: 95 },
//   { day: 'Martes', saturation: 92 },
//   { day: 'Miércoles', saturation: 96 },
//   { day: 'Jueves', saturation: 94 },
//   { day: 'Viernes', saturation: 93 },
//   { day: 'Sábado', saturation: 97 },
//   { day: 'Domingo', saturation: 95 },
// ];

// const notes: Note[] = [
//   { id: 1, text: 'Nota 1' },
//   { id: 2, text: 'Nota 2' },
// ];

// const OxygenSaturationScreen = () => {
//   const [data, setData] = useState(oxygenSaturationData);
//   const [averageSaturation, setAverageSaturation] = useState(0);

//   useEffect(() => {
//     const saturationValues = data.map((item) => item.saturation);
//     const maxCount = Math.max(...saturationValues.map((value) => saturationValues.filter((v) => v === value).length));
//     const mostRepeatedValue = saturationValues.find((value) => saturationValues.filter((v) => v === value).length === maxCount);
//     setAverageSaturation(mostRepeatedValue || 0);
//   }, [data]);

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#DC143C', '#8B9467', '#6495ED'];

//   // Prepara los datos para el gráfico de pastel
//   const pieData = data.map((item, index) => ({
//     value: item.saturation,
//     svg: { fill: COLORS[index % COLORS.length] },
//     key: item.day,
//   }));

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Saturación de Oxígeno</Text>
//       <View style={styles.chartContainer}>
//         <PieChart style={styles.chart} data={pieData} />
//         <Text style={styles.averageText}>Promedio de saturación: {averageSaturation}%</Text>
//       </View>
//       <Text style={styles.description}>La saturación normal de oxígeno en una persona es entre 95% y 100%.</Text>
//       <FlatList
//         data={data}
//         keyExtractor={(item) => item.day}
//         renderItem={({ item }) => (
//           <View style={styles.tableRow}>
//             <Text style={styles.tableCell}>{item.day}</Text>
//             <Text style={styles.tableCell}>{item.saturation}%</Text>
//           </View>
//         )}
//       />
//       <Text style={styles.subtitle}>Notas</Text>
//       <FlatList
//         data={notes}
//         keyExtractor={(note) => note.id.toString()}
//         renderItem={({ item }) => (
//           <Text style={styles.note}>{item.text}</Text>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     marginTop: 30,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   chartContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   chart: {
//     height: 200,
//     width: 200,
//   },
//   averageText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   description: {
//     fontSize: 16,
//     marginVertical: 10,
//   },
//   tableRow: {
//     flexDirection: 'row',
//     paddingVertical: 8,
//   },
//   tableCell: {
//     flex: 1,
//     textAlign: 'center',
//     padding: 8,
//     borderWidth: 1,
//   },
//   subtitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 20,
//   },
//   note: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
// });

// export default OxygenSaturationScreen;
