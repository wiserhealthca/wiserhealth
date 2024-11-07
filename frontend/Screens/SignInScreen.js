import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import commonStyles from "./styles";


export default function SignInScreen({ navigation , setIsSignedIn}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [errors, setErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // This function will validate both fields
  const validateForm = () => {
    let errors = {};

    // Validate email field
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid.";
    }

    // Validate password field
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    setErrors(errors);
    return errors;
  };

  // This effect runs only after the form is submitted
  useEffect(() => {
    if (isFormSubmitted) {
      validateForm();
    }
  }, [email, password]);

  const handleEmailChange = (text) => {
    setEmail(text);

    // Remove email error if email is valid
    if (errors.email && /\S+@\S+\.\S+/.test(text)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: null }));
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);

    // Remove password error if password is valid
    if (errors.password && text.length >= 6) {
      setErrors((prevErrors) => ({ ...prevErrors, password: null }));
    }
  };

  const handleSignIn = () => {
    setIsFormSubmitted(true);

    const errors = validateForm();

    // If no errors, proceed with sign-in
    if (Object.keys(errors).length === 0) {
      // console.log("Sign In:", { email, password });
      // console.log("Form submitted successfully!");
      setIsSignedIn(true);
      navigation.navigate("InitialEvaluationScreen");
    } else {
      console.log("Form has errors!", errors);
    }
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.heading}>Welcome Back!</Text>
      <Text style={commonStyles.heading}>Sign In</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="Email"
        onChangeText={handleEmailChange}
        value={email}
        keyboardType="email-address"
      />

      {/* Display email error only if it exists */}
      {isFormSubmitted && errors.email && (
        <Text style={commonStyles.error}>{errors.email}</Text>
      )}

      <View style={commonStyles.passwordContainer}>
        <TextInput
          style={commonStyles.inputPassword}
          placeholder="Password"
          onChangeText={handlePasswordChange}
          value={password}
          secureTextEntry={showPassword}
        />
        <TouchableOpacity
          style={commonStyles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Image
            source={
              showPassword
                ? require("../assets/Images/eye.png")
                : require("../assets/Images/view.png")
            }
            style={commonStyles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Display password error only if it exists */}
      {isFormSubmitted && errors.password && (
        <Text style={commonStyles.error}>{errors.password}</Text>
      )}

      {/* Minimalistic Sign In Button */}
      <TouchableOpacity
        style={commonStyles.signInButton}
        onPress={handleSignIn}
      >
        <Text style={commonStyles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>
      {/* forgot password */}
      <Text
        style={commonStyles.linkText}
        onPress={() => navigation.navigate("ForgotPasswordScreen")}
      >
        Forgot Password?
      </Text>
      <View style={commonStyles.footer}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUpScreen")}
          style={commonStyles.signupButton}
        >
          <Text style={commonStyles.signInButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
