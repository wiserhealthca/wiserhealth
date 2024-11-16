import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Picker,
} from "react-native";
import commonStyles from "./Styles/styles.js";

const BasicUserInfo = ({ navigation }) => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [waist, setWaist] = useState("");

  const handleNext = () => {
    const heightInMeters = height / 3.281; // Convert feet to meters
    const bmi = weight / (heightInMeters * heightInMeters);

    // Pass BMI to the next screen
    navigation.navigate("BMIDisplay", { bmi });
  };

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

      <TouchableOpacity style={commonStyles.modernButton} onPress={handleNext}>
        <Text style={commonStyles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default BasicUserInfo;
