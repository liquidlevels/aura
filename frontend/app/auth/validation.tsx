import { useState } from "react";
import { useSession } from "../../ctx";
import { router } from "expo-router";
import {
  Button,
  TextInput,
  View,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import React from "react";
import axios from "axios";
import API_URL from "@/apiConfig";
import { AxiosError } from "axios";

const { height } = Dimensions.get("window");

export default function Validation() {
  const { signIn } = useSession(); // para completar la sesion
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleValidation = async () => {
    if (code.trim().length !== 6 || !/^\d+$/.test(code)) {
      if (Platform.OS === "web") {
        alert("Por favor ingresa un código válido de 6 dígitos.");
      } else {
        Alert.alert(
          "Error",
          "Por favor ingresa un código válido de 6 dígitos."
        );
      }
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}auth/validate`, {
        code: code.trim(),
      });

      if (response.status === 200 || response.status === 201) {
        if (Platform.OS === "web") {
          alert("Verificación completada.");
        } else {
          Alert.alert("Éxito", "Verificación completada.");
        }
        const { username, userLastName, phoneNumber } = response.data.user; //establecer datos del usuario en el contexto
        signIn(username, userLastName, phoneNumber);

        router.replace("/"); //pantalla de inicio
      } else {
        throw new Error(
          response.data.message ||
            `Error inesperado. Código de estado: ${response.status}`
        );
      }
    } catch (err) {
      const error = err as any;
      const errorMessage = error.response?.data?.message;

      if (Platform.OS === "web") {
        alert(`Error: ${errorMessage}`);
      } else {
        Alert.alert("Error", errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#DEDEEA",
      }}
    >
      <Text style={styles.title}>Verificación de la cuenta.</Text>
      <Text style={styles.subtitle}>
        El código ha sido enviado, introduzca el código para verificar su
        cuenta.
      </Text>
      <Text style={styles.text}>Ingresar código*</Text>
      <TextInput
        placeholder="6 dígitos"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
          width: "80%",
          backgroundColor: "white",
          borderColor: "white",
          borderRadius: 8,
          color: "#adb5bd",
        }}
      />

      <TouchableOpacity style={styles.button} onPress={handleValidation}>
        <Text style={styles.text_button}>
          {loading ? "Validando..." : "Validar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "bold",
    flexDirection: "row",
    textAlign: "center",
    marginTop: height * -0.15,
  },
  subtitle: {
    textAlign: "center",
    margin: 10,
    fontSize: 20,
    marginTop: "3%",
  },
  text: {
    width: "80%",
    margin: "3%",
    fontSize: 20,
  },
  button: {
    backgroundColor: "#61678B",
    width: "80%",
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: "10%",
  },
  text_button: {
    color: "white",
    fontSize: 20,
    width: "100%",
    textAlign: "center",
  },
});
