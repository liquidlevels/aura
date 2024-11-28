import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

const NotificationsPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notificaciones con RAFC</Text>
    </View>
  );
};

export default NotificationsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#000",
  },
});
