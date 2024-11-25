import { useState } from "react";
import { useSession } from "../../ctx";
import { router } from "expo-router";
import { Button, TextInput, View, Alert, Platform } from "react-native";

export default function Validation() {
  const { signIn } = useSession(); // para completar la sesion
  const [code, setCode] = useState("");

  const handleValidation = async () => {
    if (code === "123456") {
      try {
        if (Platform.OS === "web") {
          alert("Verificación completada.");
        } else {
          Alert.alert("Éxito", "Verificación completada.");
        }

        router.replace("/");
      } catch (error) {
        if (Platform.OS === "web") {
          alert("Error en la verificación.");
        } else {
          Alert.alert("Error", "Hubo un problema al autenticar.");
        }
      }
    } else {
      if (Platform.OS === "web") {
        alert("Código incorrecto.");
      } else {
        Alert.alert("Error", "Código incorrecto.");
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        placeholder="Ingresa el código de verificación"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        style={{ borderWidth: 1, padding: 10, marginBottom: 20, width: "80%" }}
      />
      <Button title="Validar" onPress={handleValidation} />
    </View>
  );
}
