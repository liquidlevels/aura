import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import axios from "axios";
import API_URL from "@/apiConfig";



type UserInfo = {
  phone: string;
  id: number;
  lastname: string;
  name: string;
  kinship: string;
};

export default function InfoUsuarioScreen() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    phone: "",
    id: 0,
    lastname: "",
    name: "",
    kinship: "",
  });

  // Fetch user information from the database
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${API_URL}/keepers/6461463420`); //reemplazar con sesion
        setUserInfo(response.data);
      } catch (error) {
        Alert.alert("Error", "Failed to load user information");
        console.error(error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Nombre:</Text>
        <Text style={styles.editableText}>{userInfo.name}</Text>
        <Text style={styles.infoText}>Apellido(s):</Text>
        <Text style={styles.editableText}>{userInfo.lastname}</Text>
        <Text style={styles.infoText}>Número de teléfono:</Text>
        <Text style={styles.editableText}>{userInfo.phone}</Text>
        <Text style={styles.infoText}>Parentesco:</Text>
        <Text style={styles.editableText}>{userInfo.kinship}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
    width: "100%",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    backgroundColor: "white",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  editableText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
