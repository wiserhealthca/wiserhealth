import React, { useState, useEffect } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import commonStyles from "./styles";

export default function SignUpScreen({ navigation }) {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true); // State for toggling password visibility
  const [errors, setErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Validate function to check all fields
  const validateForm = () => {
    let validationErrors = {};

    if (!username) {
      validationErrors.username = "Username is required.";
    }

    if (!email) {
      validationErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Email is invalid.";
    }

    if (!phoneNumber) {
      validationErrors.phoneNumber = "Phone number is required.";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      validationErrors.phoneNumber = "Phone number must be 10 digits.";
    }

    if (!password) {
      validationErrors.password = "Password is required.";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters.";
    }

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(validationErrors);
    return validationErrors;
  };

  // Update validations when the form is submitted
  useEffect(() => {
    if (isFormSubmitted) {
      validateForm();
    }
  }, [username, email, phoneNumber, password, confirmPassword]);

  // Clear errors on valid input dynamically
  const handleUsernameChange = (text) => {
    setUserName(text);
    if (errors.username && text) {
      setErrors((prevErrors) => ({ ...prevErrors, username: null }));
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (errors.email && /\S+@\S+\.\S+/.test(text)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: null }));
    }
  };

  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
    if (errors.phoneNumber && /^\d{10}$/.test(text)) {
      setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: null }));
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (errors.password && text.length >= 6) {
      setErrors((prevErrors) => ({ ...prevErrors, password: null }));
    }
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    if (errors.confirmPassword && text === password) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: null }));
    }
  };

  const handleSubmit = async () => {
    setIsFormSubmitted(true);

    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      const userData = {
        username,
        email,
        phoneNumber,
        password,
      };

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
    } else {
      console.log("Form has errors!", errors);
    }
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.heading}>Sign Up</Text>

      <TextInput
        style={commonStyles.input}
        placeholder="Username"
        onChangeText={handleUsernameChange}
        value={username}
      />
      {isFormSubmitted && errors.username && (
        <Text style={commonStyles.error}>{errors.username}</Text>
      )}

      <TextInput
        style={commonStyles.input}
        placeholder="Email"
        onChangeText={handleEmailChange}
        value={email}
        keyboardType="email-address"
      />
      {isFormSubmitted && errors.email && (
        <Text style={commonStyles.error}>{errors.email}</Text>
      )}

      <TextInput
        style={commonStyles.input}
        placeholder="Phone Number"
        onChangeText={handlePhoneNumberChange}
        value={phoneNumber}
        keyboardType="phone-pad"
      />
      {isFormSubmitted && errors.phoneNumber && (
        <Text style={commonStyles.error}>{errors.phoneNumber}</Text>
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
      {isFormSubmitted && errors.password && (
        <Text style={commonStyles.error}>{errors.password}</Text>
      )}

      <View style={commonStyles.passwordContainer}>
        <TextInput
          style={commonStyles.inputPassword}
          placeholder="Confirm Password"
          onChangeText={handleConfirmPasswordChange}
          value={confirmPassword}
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
      {isFormSubmitted && errors.confirmPassword && (
        <Text style={commonStyles.error}>{errors.confirmPassword}</Text>
      )}
      {/* add socialmedia button */}

      <View style={commonStyles.socialButtonsContainer}>
        <TouchableOpacity style={commonStyles.socialButton}>
          <Image
            source={require("../assets/Images/facebook_icon.png")}
            style={commonStyles.icon}
          />
          {/* <Text style={styles.socialButtonText}>Sign up with Facebook</Text> */}
        </TouchableOpacity>

        <TouchableOpacity style={commonStyles.socialButton}>
          <Image
            source={require("../assets/Images/google_icon.png")}
            style={commonStyles.icon}
          />
          {/* <Text style={styles.socialButtonText}>Sign up with Google</Text> */}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={commonStyles.signupButton}
        onPress={handleSubmit}
      >
        <Text style={commonStyles.signInButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={commonStyles.footer}>
        <Text>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignIn")}
          style={commonStyles.signInButton}
        >
          <Text style={commonStyles.signInButtonText}> Sign In </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
