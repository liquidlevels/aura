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
} from "react-native";
import React from "react";

export default function Validation() {
  const { signIn } = useSession(); // para completar la sesión
  const [code, setCode] = useState("");

  const handleValidation = () => {
    //const { signIn } = useSession();
    if (code === "123456") {
      // simula un codigo de verificación correcto
      Alert.alert("Éxito", "Verificación completada.");
      router.replace("/"); // redirige al flujo principal
    } else {
      Alert.alert("Error", "Código incorrecto.");
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
      <Text style={styles.tittle}>Verificacion de la cuenta</Text>
      <Text style={styles.subtittle}>
        El código ha sido enviado, introduzca el código para verificar su cuenta
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
        <Text style={styles.text_button}>Validar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tittle: {
    fontSize: 17,
    fontWeight: "bold",
    fontFamily: "roboto",
    flexDirection: "row",
    textAlign: "center",
    marginTop: -250,
  },
  subtittle: {
    textAlign: "center",
    margin: 10,
  },
  text: {
    width: "80%",
    margin: "3%",
  },
  button: {
    backgroundColor: "#61678B",
    width: "80%",
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 10,
  },
  text_button: {
    color: "white",
  },
});