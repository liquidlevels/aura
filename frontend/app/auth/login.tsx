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
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import React from "react";
import SVGcurva from "../components/SVGcurva";

export default function Login() {
  const { signIn } = useSession();
  const [username, setUsername] = useState("");
  const [userLastName, setUserLastName] = useState("");

  const handleLogin = () => {
    const sanitizedUsername = username.trim();

    if (sanitizedUsername.length !== 10 || !/^\d+$/.test(sanitizedUsername)) {
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

    signIn(username, userLastName);
    if (username.trim() === "" && userLastName.trim() === "") {
      Alert.alert("Error", "Por favor ingresa un nombre de usuario válido.");
      return;
    }
    signIn(username, userLastName);
    router.push("/auth/validation");
  };

  return (
    <View style={styles.container}>
      <SVGcurva />
      <Text style={styles.login}>Iniciar sesión</Text>
      <Text style={styles.leyenda}>
        Introduce tu número de teléfono con el que te haz registrado y te
        enviaremos un código para iniciar sesión.
      </Text>
      <Text style={styles.subtittle}> Número telefónico*</Text>
      <TextInput
        placeholder=""
        value={username}
        onChangeText={setUsername}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
          width: "80%",
          borderColor: "#adb5bd",
          borderRadius: 8,
        }}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
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
