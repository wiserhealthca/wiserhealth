import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/Images/banner_img.jpg")} // Update the path to your image
        style={styles.image}
      />
      {/* App description */}
      <Text style={styles.description}>
        Welcome to WiserHealth! Your journey to a healthier life starts
        here.Online Health and wellness tests can give you a quick snapshot of
        your health status and help you manage it by lifestyle Medicine.
      </Text>
      <Button
        title="Next"
        onPress={() => navigation.navigate("SignUp")}
      ></Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    textAlign: "center",
  },
});
