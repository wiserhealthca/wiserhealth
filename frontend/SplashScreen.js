import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    //navigate to HomeScreen after 5 sec
    const timer = setTimeout(() => {
      navigation.replace("Home");
    }, 5000);
    return () => clearTimeout(timer);
  });
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>WiserHealth</Text>

      {/* display the app logo here */}
      <Image
        source={require("./assets/Images/wiser_logo.jpg")}
        style={styles.logo}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24, // Adjust the font size as needed
    fontWeight: "bold", // Make the text bold
    marginBottom: 20,
  },
  logo: {
    width: 150, // Adjust width based on the logo size
    height: 150, // Adjust height based on the logo size
    marginBottom: 20,
  },
});
