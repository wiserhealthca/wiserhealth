import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const InitialEvaluationScreen = ({ navigation }) => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleSelection = (componentName, dashboard) => {
    setSelectedComponent(componentName);
    // Navigate to the respective dashboard after selection
    navigation.navigate(dashboard);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Initial Evaluation</Text>

      {/* Nutrition Button with Image */}
      <TouchableOpacity
        style={[
          styles.componentContainer,
          selectedComponent === "Nutrition" ? styles.selected : null,
        ]}
        onPress={() => handleSelection("Nutrition", "NutritionDashboard")}
      >
        <Image
          style={styles.image}
          source={require("./assets/Images/nutri.avif")}
        />
        <Text style={styles.buttonText}>Nutrition</Text>
      </TouchableOpacity>

      {/* Sleep Management Button with Image */}
      <TouchableOpacity
        style={[
          styles.componentContainer,
          selectedComponent === "SleepDashboard" ? styles.selected : null,
        ]}
        onPress={() => handleSelection("Sleep", "SleepDashboard")}
      >
        <Image
          style={styles.image}
          source={require("./assets/Images/nutri.avif")}
        />
        <Text style={styles.buttonText}>Sleep Management</Text>
      </TouchableOpacity>

      {/* Stress Management Button with Image */}
      <TouchableOpacity
        style={[
          styles.componentContainer,
          selectedComponent === "Stress" ? styles.selected : null,
        ]}
        onPress={() => handleSelection("Stress", "StressDashboard")}
      >
        <Image
          style={styles.image}
          source={require("./assets/Images/nutri.avif")}
        />
        <Text style={styles.buttonText}>Stress Management</Text>
      </TouchableOpacity>

      {/* Risky Substance Avoidance Button with Image */}
      <TouchableOpacity
        style={[
          styles.componentContainer,
          selectedComponent === "RiskySubstance" ? styles.selected : null,
        ]}
        onPress={() =>
          handleSelection("RiskySubstance", "RiskySubstanceDashboard")
        }
      >
        <Image
          style={styles.image}
          source={require("./assets/Images/nutri.avif")}
        />
        <Text style={styles.buttonText}>Risky Substance Avoidance</Text>
      </TouchableOpacity>

      {/* Lifestyle History Button with Image */}
      <TouchableOpacity
        style={[
          styles.componentContainer,
          selectedComponent === "LifestyleHistory" ? styles.selected : null,
        ]}
        onPress={() =>
          handleSelection("LifestyleHistory", "LifestyleHistoryDashboard")
        }
      >
        <Image
          style={styles.image}
          source={require("./assets/Images/nutri.avif")}
        />
        <Text style={styles.buttonText}>Lifestyle History</Text>
      </TouchableOpacity>

      {/* Physical Activity Button with Image */}
      <TouchableOpacity
        style={[
          styles.componentContainer,
          selectedComponent === "PhysicalActivity" ? styles.selected : null,
        ]}
        onPress={() =>
          handleSelection("PhysicalActivity", "PhysicalActivityDashboard")
        }
      >
        <Image
          style={styles.image}
          source={require("./assets/Images/nutri.avif")}
        />
        <Text style={styles.buttonText}>Physical Activity</Text>
      </TouchableOpacity>
      {/* Type 2 Diabetes */}
      <TouchableOpacity
        style={[
          styles.componentContainer,
          selectedComponent === "Types2Diabetes" ? styles.selected : null,
        ]}
        onPress={() => handleSelection("Types2Diabetes", "Types2Diabetes")}
      >
        <Image
          style={styles.image}
          source={require("./assets/Images/nutri.avif")}
        />
        <Text style={styles.buttonText}>Types2 Diabetes </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  componentContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 2,
  },
  selected: {
    backgroundColor: "#add8e6", // Light blue color to indicate selection
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default InitialEvaluationScreen;
