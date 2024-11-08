import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import commonStyles from "./styles";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");

  const handlePasswordReset = () => {
    if (email) {
      // Placeholder for actual password reset logic
      // Here you could send a password reset request to your backend or Firebase
      Alert.alert(
        "Password Reset",
        `A password reset link has been sent to ${email}`
      );
      setEmail(""); // Clear email field after submission
    } else {
      Alert.alert("Error", "Please enter a valid email address.");
    }
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.heading}>Forgot Password</Text>
      <Text style={commonStyles.subHeading}>
        Please enter your email address to reset your password.
      </Text>

      {/* Email Input Field */}
      <TextInput
        style={commonStyles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity
        style={commonStyles.modernButton}
        onPress={handlePasswordReset}
      >
        <Text style={commonStyles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      {/* Back to Login */}
      <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
        <Text style={commonStyles.linkText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}
