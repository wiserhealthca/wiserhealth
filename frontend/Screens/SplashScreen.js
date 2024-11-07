import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Make sure to install this package

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("SignInScreen");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigation]); // Added dependency for useEffect

  return (
    <LinearGradient
      colors={["#A8E6CF", "#DCE775"]} // Light green gradient colors
      style={styles.container}
    >
      <Text style={styles.heading}>WiserHealth</Text>

      <Image
        source={require("../assets/Images/wiser_logo.jpg")}
        style={styles.logo}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 30, // Increased font size for emphasis
    fontWeight: "bold",
    color: "#2E7D32", // Dark green text for contrast
    marginBottom: 20,
    textShadowColor: "rgba(0, 0, 0, 0.3)", // Subtle shadow for text
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  logo: {
    width: 150, // Adjust width based on the logo size
    height: 150, // Adjust height based on the logo size
    borderRadius: 75, // Make the logo circular
    marginBottom: 20,
    shadowColor: "#000", // Shadow for logo
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5, // For Android shadow
  },
});
