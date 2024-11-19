// import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/Images/banner_img.jpg")} 
        style={styles.logo}
      />

      <Text style={styles.description}>
        Welcome to WiserHealth! Your journey to a healthier life starts here.
        Online health and wellness tests can give you a quick snapshot of your
        health status and help you manage it through lifestyle medicine.
      </Text>
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => navigation.navigate("InitialQuestions")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#EEF8D3", // Light greenish background
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  headline: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
    lineHeight: 40,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center", 
    color: "#333", 
    marginVertical: 20, 
    paddingHorizontal: 15, 
    backgroundColor: "#F9F9F9", 
    borderRadius: 8, 
    padding: 15, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, 
  },
  highlight: {
    color: "#000", // Highlight color for "Healthy"
    backgroundColor: "#CBEA7B", // Light background for highlight
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  getStartedButton: {
    backgroundColor: "#468671", // Button color
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "#262626",
    fontSize: 18,
    fontWeight: "600",
  },
});
