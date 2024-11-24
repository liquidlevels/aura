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
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function Login() {
  const { signIn } = useSession();
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (username.trim() === "") {
      Alert.alert("Error", "Por favor ingresa un nombre de usuario válido.");
      return;
    }
    signIn(username);
    router.push("/auth/validation");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={styles.contenedor_image}>
        <Image
          style={styles.image_background}
          source={require("../../assets/images/Vector.png")}
        />
        <Image
          source={require("../../assets/images/aura.png")}
          style={styles.image}
        />
      </View>

      <Text style={styles.inicio_sesion}>Iniciar sesion</Text>
      <Text style={styles.leyenda}>
        Introduce tu numero de telefono con el que te haz registrado y te
        enviaremos un codigo para iniciar sesion.
      </Text>
      <Text style={styles.subtitle}> Numero telefonico*</Text>
      <TextInput
        placeholder="*"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, padding: 10, marginBottom: 20, width: "80%" }}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    width: "80%",
    margin: 10,
  },
  contenedor_image: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: "20%",
  },
  image_background: {
    width: "100%",
    marginTop: -270,
  },
  image: {
    position: "absolute",
    height: "55%",
    width: "70%",
    marginTop: -150,
  },
  inicio_sesion: {
    fontFamily: "roboto",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: -150,
    margin: 10,
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
  },
});
