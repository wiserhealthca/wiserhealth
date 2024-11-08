import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/Images/banner_img.jpg")} // Update the path to your image
        style={styles.image}
      />
      {/* App description */}
      <Text style={styles.description}>
        Welcome to WiserHealth! Your journey to a healthier life starts here.
        Online health and wellness tests can give you a quick snapshot of your
        health status and help you manage it through lifestyle medicine.
      </Text>
      <TouchableOpacity
        style={styles.modernButton}
        onPress={() => navigation.navigate("SignUpScreen")}
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
    width: "100%", // Full width of the screen
    height: 200, // Fixed height for the image
    borderRadius: 10, // Rounded corners for the image
    marginBottom: 20, // Space between image and text,
  },
  description: {
    fontSize: 16,
    lineHeight: 24, // Increased line height for better readability
    textAlign: "center", // Center-aligning the text
    color: "#333", // Darker text color for better contrast
    marginVertical: 20, // Margin for spacing above and below
    paddingHorizontal: 15, // Horizontal padding for better layout on small screens
    backgroundColor: "#F9F9F9", // Light background color
    borderRadius: 8, // Rounded corners
    padding: 15, // Padding inside the text container
    shadowColor: "#000", // Shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Elevation for Android
  },
  modernButton: {
    backgroundColor: "#6200EE", // Primary color
    borderRadius: 30, // Rounded corners for a modern look
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: "center",
    shadowColor: "#000", // Shadow for depth
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
