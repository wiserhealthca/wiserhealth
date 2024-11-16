import React, { useState } from "react";
import { Text, View, TouchableOpacity, Alert, ScrollView } from "react-native";
import commonStyles from "./Styles/styles.js";
import questionsData from "./questionsData.json";

export default function BMIDisplay() {
  // State to store the score
  const [score, setScore] = useState(null);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [waist, setWaist] = useState("");

  // Function to handle the calculation when the button is pressed
  const handleNext = () => {
    // Perform your calculation logic here
    const heightInMeters = height / 3.281; // Convert feet to meters
    const bmi = weight / (heightInMeters * heightInMeters);

    // const calculatedScore = calculateScore();

    // Set the score in the state
    setScore(bmi);

    return (
      <ScrollView contentContainerStyle={commonStyles.container}>
        <Text style={commonStyles.heading}>Enter Basic Info</Text>

        <Text>Age</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="Add text"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />

        <Text>Gender</Text>
        <Picker
          selectedValue={gender}
          style={commonStyles.picker}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>

        <Text>Height (feet)</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="Add no."
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />

        <Text>Current Weight (kg)</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="Add no."
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />

        <Text>Waist Circumference (in)</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="Add no."
          keyboardType="numeric"
          value={waist}
          onChangeText={setWaist}
        />
        {/* Display the current score */}
        {score !== null && (
          <Text style={commonStyles.scoreText}>Your Score: {score}</Text>
        )}

        {/* Button to trigger calculation */}
        <TouchableOpacity style={commonStyles.button} onPress={handleNext}>
          <Text style={commonStyles.buttonText}>Calculate</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };
}
