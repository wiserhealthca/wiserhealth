import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
// import commonStyles from "./Styles/styles.js";
import questionsData from "./questionsData.json";
import { useFocusEffect } from '@react-navigation/native';

const InitialQuestions = ({ route, navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedUnit, setSelectedUnit] = useState("cm"); // Default unit for height
  const [showDatePicker, setShowDatePicker] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setCurrentQuestionIndex(0);
    }, [])
  );

  if (!Array.isArray(questionsData) || questionsData.length === 0) {
    return <Text style={styles.errorText}>No categories available</Text>;
  }

  const firstCategoryData = questionsData[0];
  if (!firstCategoryData || !Array.isArray(firstCategoryData.categories) || firstCategoryData.categories.length === 0) {
    return <Text style={styles.errorText}>No categories available</Text>;
  }

  const currentCategory = firstCategoryData.categories[0];
  const questions = currentCategory.questions || [];
  if (questions.length === 0) {
    return <Text style={styles.errorText}>No questions available in this category</Text>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleInputChange = (text, id) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: text,
    }));
  };

  const handleOptionSelect = (id, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: option,
    }));
  };

  const handleUnitSelect = (unit) => {
    setSelectedUnit(unit);
  };

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS !== "web") {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestion.id]: selectedDate.toLocaleDateString(),
      }));
    }
  };

  const handleWebDateChange = (event) => {
    const selectedDate = event.target.value;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion.id]: selectedDate,
    }));
  };

  const handleNextQuestion = () => {
    if (!answers[currentQuestion.id]) {
      alert("Please answer the question before proceeding.");
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigation.navigate("ReviewInitialInfo", { answers });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.heading}>{firstCategoryData.category}</Text> */}
      {/* <Text style={styles.subHeading}>{firstCategoryData.subheading}</Text> */}
      
      {currentQuestion ? (
        <>
          <Text style={styles.question}>{currentQuestion.text}</Text>
          
          {currentQuestion.text === "When is your birthday?" ? (
            <>
              {Platform.OS === "web" ? (
                <TextInput
                  style={styles.dateInput}
                  type="date"
                  value={answers[currentQuestion.id] || ""}
                  onChange={handleWebDateChange}
                />
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text style={styles.dateText}>
                      {answers[currentQuestion.id] || "Select Date"}
                    </Text>
                  </TouchableOpacity>
                  
                  {showDatePicker && (
                    <DateTimePicker
                      value={new Date()}
                      mode="date"
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      onChange={handleDateChange}
                    />
                  )}
                </>
              )}
            </>
          ) : currentQuestion.type === "dropdown" ? (
            currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  answers[currentQuestion.id] === option && styles.selectedOption,
                ]}
                onPress={() => handleOptionSelect(currentQuestion.id, option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))
          ) : currentQuestion.text === "Your height" ? (
            <View style={styles.inputWithUnits}>
              <TextInput
                style={styles.input}
                placeholder={currentQuestion.placeholder}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange(text, currentQuestion.id)}
                value={answers[currentQuestion.id] || ""}
              />
              <View style={styles.unitContainer}>
                {currentQuestion.unitOptions.map((unit) => (
                  <TouchableOpacity
                    key={unit}
                    style={[
                      styles.unitOption,
                      selectedUnit === unit && styles.selectedUnit,
                    ]}
                    onPress={() => handleUnitSelect(unit)}
                  >
                    <Text style={styles.unitText}>{unit}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            <TextInput
              style={styles.input}
              placeholder={currentQuestion.placeholder}
              keyboardType={currentQuestion.type === "number" ? "numeric" : "default"}
              onChangeText={(text) => handleInputChange(text, currentQuestion.id)}
              value={answers[currentQuestion.id] || ""}
            />
          )}

          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNextQuestion}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>No questions available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subHeading: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    color: "#333",
    marginBottom: 12,
  },
  dateButton: {
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
  },
  dateInput: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
  },
  inputWithUnits: {
    flexDirection: "row",
    alignItems: "center",
  },
  unitContainer: {
    flexDirection: "row",
    marginLeft: 10,
  },
  unitOption: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 5,
  },
  selectedUnit: {
    backgroundColor: "#4caf50",
  },
  unitText: {
    color: "#fff",
  },
  optionButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    marginBottom: 8,
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#4caf50",
  },
  nextButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#008CBA",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default InitialQuestions;
