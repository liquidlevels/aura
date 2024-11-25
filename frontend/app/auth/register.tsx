import { useState } from "react";
import { router } from "expo-router";
import { Button, TextInput, View, Alert, Platform } from "react-native";
import { sendVerificationCode } from "../../utils/sendVerificationCode";
import { useSession } from "@/ctx";
import { fakeRegisterApi } from "@/utils/fakeRegisterApi";

export default function Register() {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { signIn } = useSession();

  const handleRegister = async () => {
    const cleanedUsername = username.trim().replace(/\s+/g, " ");

    if (!cleanedUsername) {
      if (Platform.OS === "web") {
        alert("El nombre de usuario no puede estar vacío.");
      } else {
        Alert.alert("Error", "El nombre de usuario no puede estar vacío.");
      }
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      if (Platform.OS === "web") {
        alert("El número de teléfono debe ser un número válido de 10 dígitos.");
      } else {
        Alert.alert(
          "Error",
          "El número de teléfono debe ser un número válido de 10 dígitos."
        );
      }
      return;
    }

    try {
      await fakeRegisterApi({ phoneNumber, username: cleanedUsername }); // API para registrar al usuario (temporal)

      await signIn(cleanedUsername);

      router.push("/auth/validation");
    } catch (error) {
      console.error("Error en el registro:", error);
      if (Platform.OS === "web") {
        alert("Hubo un problema al registrarte. Por favor, intenta de nuevo.");
      } else {
        Alert.alert(
          "Error",
          "Hubo un problema al registrarte. Por favor, intenta de nuevo."
        );
      }
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
        maxLength={10}
        style={{ borderWidth: 1, padding: 10, marginBottom: 20, width: "80%" }}
      />
      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
}
