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
} from "react-native";
import { sendVerificationCode } from "../../utils/sendVerificationCode";
import { useSession } from "@/ctx";
import { fakeRegisterApi } from "@/utils/fakeRegisterApi";
import React from "react";
import { CheckBox } from "react-native-elements";
import { Platform } from "react-native";

const { width } = Dimensions.get("window");

export default function Register() {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const { signIn } = useSession();

  const handleRegister = async () => {
    //console.log(sendVerificationCode);
    if (!phoneNumber || !username || !userLastName) {
      Alert.alert("Error", "Los campos no pueden estar vacíos");
      return;
    }

    try {
      // Simula el registro y la creacion del usuario
      await fakeRegisterApi({ phoneNumber, username, userLastName }); // API para registrar al usuario(temporal)

      // Autentica al usuario despues de registrarlo
      signIn(username, userLastName);

      // Navega a la validacion
      router.push("/auth/validation");
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  return (
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        <View style={styles.container_svg}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            style={{ width: "150%" }}
          >
            <path
              fill="#DEDEEA"
              fillOpacity="1"
              d="M0,128L80,149.3C160,171,320,213,480,192C640,171,800,85,960,58.7C1120,32,1280,64,1360,80L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            ></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="500"
            zoomAndPan="magnify"
            viewBox="0 0 375 374.999991"
            height="500"
            preserveAspectRatio="xMidYMid meet"
            version="1.0"
            style={styles.svg_aura}
          >
            <defs>
              <g />
              <clipPath id="c7049e0733">
                <path
                  d="M 142 135 L 236.664062 135 L 236.664062 241.984375 L 142 241.984375 Z M 142 135 "
                  clip-rule="nonzero"
                />
              </clipPath>
            </defs>
            <g clip-path="url(#c7049e0733)">
              <path
                fill="#8dc242"
                d="M 229.289062 141.722656 C 225.078125 137.707031 219.429688 135.46875 213.613281 135.488281 C 207.605469 135.511719 201.960938 137.863281 197.710938 142.113281 L 189.605469 150.214844 L 181.707031 142.316406 C 172.90625 133.515625 158.574219 133.238281 149.6875 141.957031 C 140.710938 150.757812 140.65625 165.21875 149.527344 174.085938 L 192.4375 217 C 197.335938 221.898438 197.566406 229.871094 192.761719 234.859375 C 187.851562 239.96875 179.691406 240.027344 174.703125 235.039062 L 164.074219 224.410156 C 163.625 223.960938 163.578125 223.25 163.964844 222.746094 C 165.535156 220.679688 166.402344 218.058594 166.207031 215.230469 C 165.828125 209.648438 161.261719 205.160156 155.675781 204.871094 C 149.203125 204.535156 143.839844 209.742188 143.925781 216.160156 C 144.003906 222.105469 148.851562 227.011719 154.792969 227.160156 C 156.707031 227.207031 158.519531 226.769531 160.113281 225.960938 C 160.597656 225.714844 161.183594 225.820312 161.566406 226.203125 L 172.546875 237.1875 C 175.605469 240.246094 179.625 241.773438 183.640625 241.773438 C 187.65625 241.773438 191.675781 240.242188 194.734375 237.1875 C 200.847656 231.070312 200.847656 221.117188 194.734375 215 L 151.675781 171.9375 C 144.046875 164.308594 144.046875 151.894531 151.675781 144.261719 C 159.308594 136.632812 171.726562 136.632812 179.351562 144.261719 L 188.492188 153.402344 C 188.800781 153.710938 189.203125 153.851562 189.605469 153.84375 C 190.011719 153.851562 190.414062 153.710938 190.722656 153.402344 L 199.679688 144.445312 C 203.394531 140.730469 208.410156 138.542969 213.660156 138.53125 C 218.90625 138.519531 223.835938 140.558594 227.539062 144.261719 C 231.242188 147.96875 233.28125 152.890625 233.273438 158.132812 C 233.265625 163.386719 231.074219 168.40625 227.359375 172.125 L 224.464844 175.019531 C 224.226562 175.257812 223.902344 175.390625 223.5625 175.390625 L 214.933594 175.390625 C 214.453125 175.390625 214.015625 175.121094 213.800781 174.691406 L 209.632812 166.355469 C 209.167969 165.417969 207.835938 165.417969 207.367188 166.355469 L 200.203125 180.671875 C 199.738281 181.605469 198.40625 181.605469 197.941406 180.671875 L 195.492188 175.777344 C 195.027344 174.839844 193.695312 174.839844 193.230469 175.777344 L 190.78125 180.667969 C 190.316406 181.601562 188.984375 181.601562 188.519531 180.667969 L 181.359375 166.347656 C 180.894531 165.414062 179.558594 165.414062 179.09375 166.347656 L 174.925781 174.6875 C 174.710938 175.113281 174.273438 175.386719 173.792969 175.386719 L 166.15625 175.386719 C 165.320312 175.386719 164.597656 176.027344 164.574219 176.859375 C 164.546875 177.722656 165.234375 178.425781 166.09375 178.425781 L 175.671875 178.425781 C 176.152344 178.425781 176.59375 178.152344 176.804688 177.726562 L 179.09375 173.144531 C 179.558594 172.210938 180.894531 172.210938 181.359375 173.144531 L 188.519531 187.464844 C 188.984375 188.398438 190.316406 188.398438 190.78125 187.464844 L 193.230469 182.570312 C 193.695312 181.636719 195.027344 181.636719 195.492188 182.570312 L 197.941406 187.464844 C 198.40625 188.402344 199.738281 188.402344 200.203125 187.464844 L 207.363281 173.148438 C 207.828125 172.214844 209.160156 172.210938 209.628906 173.148438 L 211.917969 177.726562 C 212.136719 178.15625 212.574219 178.425781 213.050781 178.425781 L 224.71875 178.425781 C 224.8125 178.425781 224.902344 178.417969 224.992188 178.402344 C 224.996094 178.402344 225.003906 178.398438 225.011719 178.398438 C 225.097656 178.382812 225.1875 178.355469 225.269531 178.324219 C 225.277344 178.320312 225.285156 178.320312 225.292969 178.316406 C 225.378906 178.28125 225.457031 178.238281 225.535156 178.1875 C 225.542969 178.183594 225.550781 178.183594 225.558594 178.175781 C 225.636719 178.121094 225.714844 178.058594 225.785156 177.992188 C 225.789062 177.988281 225.789062 177.988281 225.789062 177.988281 L 229.46875 174.308594 C 233.820312 169.957031 236.359375 164.066406 236.3125 157.910156 C 236.261719 151.757812 233.765625 145.988281 229.289062 141.722656 Z M 146.964844 216.007812 C 146.964844 211.535156 150.609375 207.894531 155.082031 207.894531 C 159.554688 207.894531 163.195312 211.535156 163.195312 216.007812 C 163.195312 220.484375 159.554688 224.125 155.082031 224.125 C 150.609375 224.125 146.964844 220.484375 146.964844 216.007812 Z M 146.964844 216.007812 "
                fill-opacity="1"
                fill-rule="nonzero"
              />
            </g>
            <g fill="#8dc242" fill-opacity="1">
              <g transform="translate(197.918005, 207.329663)">
                <g>
                  <path d="M 2.375 0 L 0.109375 0 L 4.15625 -11.46875 L 6.53125 -11.46875 L 10.5625 0 L 8.296875 0 L 7.515625 -2.359375 L 3.140625 -2.359375 Z M 5.34375 -9.109375 L 3.765625 -4.25 L 6.921875 -4.25 Z M 5.34375 -9.109375 " />
                </g>
              </g>
            </g>
            <g fill="#8dc242" fill-opacity="1">
              <g transform="translate(210.118653, 207.329663)">
                <g>
                  <path d="M 5.53125 0.203125 C 4.4375 0.203125 3.546875 0.0195312 2.859375 -0.34375 C 2.179688 -0.707031 1.6875 -1.21875 1.375 -1.875 C 1.0625 -2.539062 0.90625 -3.300781 0.90625 -4.15625 L 0.90625 -11.46875 L 3.078125 -11.46875 L 3.078125 -4.15625 C 3.078125 -3.6875 3.148438 -3.265625 3.296875 -2.890625 C 3.453125 -2.523438 3.707031 -2.238281 4.0625 -2.03125 C 4.425781 -1.832031 4.914062 -1.734375 5.53125 -1.734375 C 6.15625 -1.734375 6.644531 -1.832031 7 -2.03125 C 7.351562 -2.238281 7.601562 -2.523438 7.75 -2.890625 C 7.90625 -3.265625 7.984375 -3.6875 7.984375 -4.15625 L 7.984375 -11.46875 L 10.15625 -11.46875 L 10.15625 -4.15625 C 10.15625 -3.300781 10 -2.539062 9.6875 -1.875 C 9.375 -1.21875 8.875 -0.707031 8.1875 -0.34375 C 7.507812 0.0195312 6.625 0.203125 5.53125 0.203125 Z M 5.53125 0.203125 " />
                </g>
              </g>
            </g>
            <g fill="#8dc242" fill-opacity="1">
              <g transform="translate(222.724972, 207.329663)">
                <g>
                  <path d="M 7.796875 -4.96875 L 9.859375 0 L 7.5625 0 L 5.734375 -4.578125 L 3.1875 -4.578125 L 3.1875 0 L 1.015625 0 L 1.015625 -11.46875 L 5.96875 -11.46875 C 6.6875 -11.46875 7.316406 -11.347656 7.859375 -11.109375 C 8.410156 -10.878906 8.835938 -10.515625 9.140625 -10.015625 C 9.453125 -9.523438 9.609375 -8.882812 9.609375 -8.09375 C 9.609375 -7.332031 9.445312 -6.6875 9.125 -6.15625 C 8.800781 -5.625 8.359375 -5.226562 7.796875 -4.96875 Z M 5.671875 -9.53125 L 3.1875 -9.53125 L 3.1875 -6.484375 L 5.671875 -6.484375 C 6.242188 -6.484375 6.679688 -6.613281 6.984375 -6.875 C 7.296875 -7.132812 7.453125 -7.515625 7.453125 -8.015625 C 7.453125 -8.503906 7.296875 -8.878906 6.984375 -9.140625 C 6.679688 -9.398438 6.242188 -9.53125 5.671875 -9.53125 Z M 5.671875 -9.53125 " />
                </g>
              </g>
            </g>
            <g fill="#8dc242" fill-opacity="1">
              <g transform="translate(234.610091, 207.329663)">
                <g>
                  <path d="M 2.375 0 L 0.109375 0 L 4.15625 -11.46875 L 6.53125 -11.46875 L 10.5625 0 L 8.296875 0 L 7.515625 -2.359375 L 3.140625 -2.359375 Z M 5.34375 -9.109375 L 3.765625 -4.25 L 6.921875 -4.25 Z M 5.34375 -9.109375 " />
                </g>
              </g>
            </g>
          </svg>
        </View>
      ) : (
        <View style={styles.container_image}>
          <Image
            style={styles.image_background}
            source={require("../../assets/images/Vector.png")}
          />
          <Image
            source={require("../../assets/images/aura.png")}
            style={styles.image}
          />
        </View>
      )}
      <Text style={styles.title}>Registrate</Text>
      <View style={{ flexDirection: "row", width: "80%" }}>
        <View style={styles.text_container_one}>
          <Text style={styles.name}>Nombre *</Text>
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
        <View style={styles.container_two}>
          <Text style={styles.lastname}>Apellido *</Text>
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

      <Text style={styles.title_container}>Número de teléfono*</Text>
      <TextInput
        placeholder=""
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
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
          <View style={styles.checkboxContainer}>
            {isChecked && <Text style={styles.checkmark}>✔</Text>}
          </View>
          <Text style={styles.terms_conditions}>
            He leido y acepto los terminos y condiciones
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button_register} onPress={handleRegister}>
        <Text style={styles.text_button}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
  text_container_one: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "48%",
    marginRight: "4%",
  },
  container_two: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "48%",
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

  title: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: "-11%",
    margin: 10,
    textAlign: "center",
  },
  name: {
    width: "100%",
    fontSize: 20,
  },
  lastname: {
    width: "100%",
    fontSize: 20,
  },
  title_container: {
    margin: 10,
    width: "80%",
    borderColor: "grey",
    fontSize: 20,
  },
  container_check: {
    marginVertical: 20,
    width: "80%",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: "center",
    marginRight: 10,
    flexDirection: "column",
    justifyContent: "center",
  },
  checkmark: {
    fontWeight: "bold",
    fontSize: 14,
  },
  terms_conditions: {
    backgroundColor: "red",
    fontSize: 12,
  },

  button_register: {
    backgroundColor: "#61678B",
    width: "80%",
    marginTop: "-1%",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 4,
  },
  text_button: {
    color: "white",
    fontSize: 20,
    width: "100%",
    textAlign: "center",
  },
});
