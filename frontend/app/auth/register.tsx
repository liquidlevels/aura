import { useState } from "react";
import { router } from "expo-router";
import {
  TextInput,
  View,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { sendVerificationCode } from "../../utils/sendVerificationCode";
import { useSession } from "@/ctx";
import { fakeRegisterApi } from "@/utils/fakeRegisterApi";
import * as React from "react";
import { CheckBox } from "react-native-elements";
import axios from "axios";
import API_URL from "@/apiConfig";
import Svg, { Path, SvgAst } from "react-native-svg";
import SVGcurva from "../components/SVGcurva";
import { Keyboard } from "react-native";

const { width } = Dimensions.get("window");

export default function Register() {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const { signIn } = useSession();

  const handleRegister = async () => {
    const cleanedUsername = username.trim().replace(/\s+/g, " ");
    const cleanedLastName = userLastName.trim().replace(/\s+/g, " ");

    if (!cleanedUsername && !cleanedLastName) {
      if (Platform.OS === "web") {
        alert("Nombre o apellido vacíos, asegurese de llenar los campos.");
      } else {
        Alert.alert(
          "Error",
          "Nombre o apellido vacíos, asegurese de llenar los campos."
        );
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
    }
    if (!isChecked) {
      if (Platform.OS === "web") {
        alert("Aceptar los términos y condiciones.");
      } else {
        Alert.alert("Error", "Aceptar los términos y condiciones.");
      }
    }

    try {
      /*
      await fakeRegisterApi({
        phoneNumber,
        username: cleanedUsername,
        userLastName,
      }); // API para registrar al usuario (temporal)*/
      const response = await axios.post(`${API_URL}auth/register`, {
        username: cleanedUsername,
        userLastName: cleanedLastName,
        phoneNumber,
      });

      if (response.status === 200 || response.status === 201) {
        if (Platform.OS === "web") {
          alert("Usuario registrado correctamente");
        } else {
          Alert.alert("Exito", "Usuario registrado correctamente");
        }
        router.push("/auth/validation");
      } else {
        throw new Error("Registro fallido.");
      }

      //await signIn(cleanedUsername, userLastName);
      //router.push("/auth/validation");
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
    <ScrollView>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          //justifyContent: "center",
          //alignItems: "center",
          //width: "100%",
        }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.container}>
          <SVGcurva />
          <Text style={styles.tittle}>Registrate</Text>
          <View style={{ flexDirection: "row", width: "80%" }}>
            <View style={styles.text_container_uno}>
              <Text style={styles.nombre}>Nombre *</Text>
              <TextInput
                placeholder=""
                value={username}
                onChangeText={setUsername}
                style={{
                  borderWidth: 1,
                  padding: 10,
                  marginBottom: 15,
                  width: "100%",
                  borderRadius: 8,
                  borderColor: "#adb5bd",
                }}
              />
            </View>
            <View style={styles.container_dos}>
              <Text style={styles.apellido}>Apellido *</Text>
              <TextInput
                placeholder=""
                value={userLastName}
                onChangeText={setUserLastName}
                style={{
                  borderWidth: 1,
                  padding: 10,
                  marginBottom: 15,
                  width: "100%",
                  borderRadius: 8,
                  borderColor: "#adb5bd",
                }}
              />
            </View>
          </View>

          <Text style={styles.tittle_container}>Número de teléfono*</Text>
          <TextInput
            placeholder=""
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="numeric"
            style={{
              borderWidth: 1,
              padding: 10,
              marginBottom: 5,
              width: "80%",
              borderRadius: 8,
              borderColor: "#adb5bd",
            }}
          />
          <View style={styles.container_check}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setIsChecked(!isChecked)}
            >
              {isChecked && <Text style={styles.checkmark}>✔</Text>}
              <Text style={styles.leyenda_terminos}>
                He leído y acepto los términos y condiciones
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button_register}
            onPress={handleRegister}
          >
            <Text style={styles.text_button}>Registrar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  svg: {
    width: "150%",
    position: "absolute",
    bottom: 0,
  },
  container_svg: { position: "relative", width: "100%" },
  container_image: {
    width: "100%",
    aspectRatio: 1,
    alignItems: "center",
    position: "relative",
    marginBottom: "-30%",
  },
  svg_aura: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "-25%",
  },
  text_container_uno: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "50%",
    marginRight: "4%",
  },
  container_dos: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "50%",
  },
  contenedor_image: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: 300,
  },
  image_background: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  image: {
    position: "absolute",
    height: "55%",
    width: "70%",
    marginTop: -150,
  },

  tittle: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: "-11%",
    margin: 10,
    textAlign: "center",
  },
  nombre: {
    width: "100%",
    fontSize: 20,
  },
  apellido: {
    width: "100%",
    fontSize: 20,
  },
  tittle_container: {
    margin: 10,
    width: "80%",
    borderColor: "grey",
    fontSize: 20,
  },
  container_check: {
    flex: 1,
    flexDirection: "row",
    marginTop: "1%",
    width: "80%",
    marginVertical: "2%",
  },
  checkbox: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: "flex-start",
    marginRight: 10,
    flexDirection: "column",
  },
  checkmark: {
    fontWeight: "bold",
    fontSize: 14,
  },
  leyenda_terminos: {
    //flex: 1,
    //backgroundColor: "red",
    fontSize: 12,
    height: "150%",
    //flexDirection: "column",
    //justifyContent: "flex-end",
    //alignItems: "flex-end",
    width: "2300%",
    marginLeft: 20,
  },

  button_register: {
    backgroundColor: "#61678B",
    width: "80%",
    marginTop: "3%",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 10,
  },
  text_button: {
    color: "white",
    fontSize: 20,
    width: "100%",
    textAlign: "center",
  },
});
