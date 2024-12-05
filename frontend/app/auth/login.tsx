import { useState } from "react";
import { useSession } from "../../ctx";
import { router } from "expo-router";
import {
  TextInput,
  View,
  Alert,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React from "react";
import SVGcurva from "../components/SVGcurva";
import axios from "axios";
import API_URL from "@/apiConfig";

export default function Login() {
  const { signIn } = useSession();
  const [username, setUsername] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const sanitizedPhone = phoneNumber.trim();

    if (sanitizedPhone.length !== 10 || !/^\d+$/.test(sanitizedPhone)) {
      if (Platform.OS === "web") {
        alert("Por favor ingresa un número válido de 10 dígitos.");
      } else {
        Alert.alert(
          "Error",
          "Por favor ingresa un número válido de 10 dígitos."
        );
      }
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}auth/login`, {
        phoneNumber: sanitizedPhone,
      });

      if (response.data.message) {
        //const { username, userLastName } = response.data.user;

        //signIn(username, userLastName, sanitizedPhone);

        router.push("/auth/validation");
      } else {
        if (Platform.OS === "web") {
          alert("Error: " + response.data.message);
        } else {
          Alert.alert("Error", response.data.message);
        }
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data?.message;

        if (Platform.OS === "web") {
          alert("Error: " + errorMessage);
        } else {
          Alert.alert("Error", errorMessage);
        }
      } else {
        if (Platform.OS === "web") {
          alert("Error: No se pudo conectar con el servidor.");
        } else {
          Alert.alert("Error", "No se pudo conectar con el servidor.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <SVGcurva />
        <Text style={styles.login}>Iniciar sesión</Text>
        <Text style={styles.leyenda}>
          Introduce tu número de teléfono con el que te has registrado y te
          enviaremos un código para iniciar sesión.
        </Text>
        <Text style={styles.subtittle}> Número telefónico*</Text>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "80%",
          }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={80}
        >
          <TextInput
            placeholder=""
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            style={{
              borderWidth: 1,
              padding: 10,
              marginBottom: 20,
              width: "100%",
              borderColor: "#adb5bd",
              borderRadius: 8,
            }}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Cargando... " : "Ingresar"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  subtittle: {
    width: "80%",
    margin: 10,
    fontSize: 20,
  },
  container_svg: {
    position: "relative",
    width: "100%",
  },
  svg_aura: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "-25%",
  },

  container_image: {
    width: "100%",
    aspectRatio: 1,
    alignItems: "center",
    position: "relative",
    marginBottom: "-30%",
  },
  image_background: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
    marginTop: "-40%",
  },
  image: {
    position: "absolute",
    height: "55%",
    width: "70%",
  },
  login: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: "-9%",
    margin: 10,
    textAlign: "center",
  },
  leyenda: {
    fontSize: 15,
    textAlign: "center",
    margin: 10,
  },
  button: {
    backgroundColor: "#61678B",
    width: "80%",
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    width: "100%",
    textAlign: "center",
  },
});
