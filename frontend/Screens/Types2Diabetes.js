
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";


import commonStyles from "./styles";

export default function Types2Diabetes({ navigation }) {

  return (
    <ImageBackground
      source={require("../assets/Images/canrisk-logo.png")} // Use your background image
      style={styles.background}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Welcome to Type 2 Dashboard</Text>
        <Text style={styles.subtitle}>
          Your journey to better health starts here.Diabetes Risk Evaluation Assesment starts here!
        </Text>

        <TouchableOpacity

          style={commonStyles.modernButton}
          onPress={() => navigation.navigate("CanRiskQuiz")}
        >
          <Text style={commonStyles.buttonText}>Start Quiz</Text>

        </TouchableOpacity>

        {/* Decorative Element: Circular Accent */}
        {/* <View style={styles.circleAccent} /> */}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    maxWidth: 400,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#4CAF50", // Border color to match the theme
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#2E7D32",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 40,
  },
<<<<<<< HEAD
  modernButton: {
    backgroundColor: "#4CAF50", // Bright green color
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#2E7D32", // Darker green border
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  circleAccent: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(76, 175, 80, 0.5)", // Light green accent color
    position: "absolute",
    bottom: -50, // Position it below the card
    left: "50%",
    marginLeft: -50, // Center the circle
    opacity: 0.5, // Slightly transparent
  },
=======
 
>>>>>>> backup-feature-branch
});
