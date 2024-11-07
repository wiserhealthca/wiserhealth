import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/Images/banner_img.jpg")} // Update the path to your image
        style={styles.image}
      />
   
      <Text style={styles.description}>
        Welcome to WiserHealth! Your journey to a healthier life starts here.
        Online health and wellness tests can give you a quick snapshot of your
        health status and help you manage it through lifestyle medicine.
      </Text>
      <TouchableOpacity
        style={styles.modernButton}
        onPress={() => navigation.navigate("InitialEvaluation")}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%", 
    height: 200, 
    borderRadius: 10, 
    marginBottom: 20, 
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
  modernButton: {
    backgroundColor: "#6200EE", 
    borderRadius: 30, 
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: "center",
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5, // For Android shadow
  },
  buttonText: {
    color: "#fff", // White text color
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase", // Uppercase text for modern feel
    letterSpacing: 1.5, // Slightly spaced letters for readability
  },
});
