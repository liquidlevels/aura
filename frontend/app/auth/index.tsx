import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import React from "react";

const { width } = Dimensions.get("window");

export default function AuthHome() {
  return (
    <View style={styles.container}>
      <View style={styles.image_container}>
        <Image
          source={require("../../assets/images/aura.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.button_container}>
        <TouchableOpacity
          style={styles.button_register}
          onPress={() => router.push("/auth/login")}
        >
          <Text style={styles.button_text}>Iniciar sesión </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button_register}
          onPress={() => router.push("/auth/register")}
        >
          <Text style={styles.button_text}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#DEDEEA",
    //paddingVertical: 20,
  },
  image_container: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: "90%",
    aspectRatio: 1,
  },
  button_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: "30%",
  },
  button_register: {
    flex: 1,
    backgroundColor: "#61678B",
    width: "30%",
    marginHorizontal: 8,
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 10,
  },
  button_text: {
    color: "white",
    width: "100%",
    textAlign: "center",
  },
});
