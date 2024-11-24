import { useState } from "react";
import { useSession } from "../../ctx";
import { router } from "expo-router";
import { Button, TextInput, View, Alert } from "react-native";

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
