import { useState } from "react";
import { router } from "expo-router";
import { Button, TextInput, View, Alert } from "react-native";
import { sendVerificationCode } from "../../utils/sendVerificationCode";
import { useSession } from "@/ctx";
import { fakeRegisterApi } from "@/utils/fakeRegisterApi";

export default function Register() {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { signIn } = useSession();

  const handleRegister = async () => {
    //console.log(sendVerificationCode);
    if (!phoneNumber || !username) {
      Alert.alert("Error", "Los campos no pueden estar vacíos");
      return;
    }

    try {
      // Simula el registro y la creacion del usuario
      await fakeRegisterApi({ phoneNumber, username }); // API para registrar al usuario(temporal)

      // Autentica al usuario despues de registrarlo
      signIn(username);

      // Navega a la validacion
      router.push("/auth/validation");
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, padding: 10, marginBottom: 20, width: "80%" }}
      />
      <TextInput
        placeholder="Número de teléfono"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={{ borderWidth: 1, padding: 10, marginBottom: 20, width: "80%" }}
      />
      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
}
