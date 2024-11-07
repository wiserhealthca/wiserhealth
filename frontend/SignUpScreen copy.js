import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

export default function SignUpScreen({ navigation }) {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true); // State for toggling password visibility

  const handleSubmit = async () => {
    const userData = {
      username,
      email,
      phoneNumber,
      password,
    };

    if (!username || !password) {
      console.log("Both fields are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5050/register",
        userData
      );
      console.log("Response from server:", response.data);
      alert(response.data.message);
      navigation.navigate("InitialEvaluationScreen");
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUserName}
        value={username}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        keyboardType="phone-pad"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={showPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Image
            source={
              showPassword
                ? require("./assets/Images/eye.png")
                : require("./assets/Images/view.png")
            }
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Confirm Password"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry={showPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Image
            source={
              showPassword
                ? require("./assets/Images/eye.png")
                : require("./assets/Images/view.png")
            }
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Minimalistic Sign Up Button */}
      <TouchableOpacity style={styles.signupButton} onPress={handleSubmit}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.signInText}> Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#4A4A4A",
  },
  input: {
    height: 50,
    borderColor: "#DCDCDC",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#F7F7F7",
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#DCDCDC",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#F7F7F7",
  },
  inputPassword: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  signupButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  signInText: {
    backgroundColor: "#2196F3",
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
