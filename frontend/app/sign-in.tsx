import { useState } from "react";
import { useSession } from "./ctx";
import { router } from "expo-router";
import { Button, TextInput, View, Alert } from "react-native";

export default function Signin() {
  const { signIn } = useSession();
  const [username, setUsername] = useState("");

  const handleSignIn = () => {
    if (username.trim() === "") {
      Alert.alert("Error", "Por favor ingresa un nombre de usuario válido.");
      return;
    }
    signIn(username);
    router.replace("/");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        placeholder="username"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, padding: 10, marginBottom: 20, width: "80%" }}
      />
      <Button title="Sign in" onPress={handleSignIn} />
    </View>
  );
}
