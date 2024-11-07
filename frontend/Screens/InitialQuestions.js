import React, { useState , useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet } from "react-native";
import commonStyles from "./styles"; 
import questionsData from "./questionsData.json";
import { useFocusEffect } from '@react-navigation/native';


const InitialQuestions = ({ route, navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});


  // Reset the index when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      setCurrentQuestionIndex(0); 
    }, [])
  );

  // useEffect (() => {
  //   if(route.params?.reset){
  //   setCurrentQuestionIndex[0]
  //   }
  //   }, [route.params] )
  // Validation and category checks (same as before)
  if (!Array.isArray(questionsData) || questionsData.length === 0) {
    return <Text style={commonStyles.errorText}>No categories available</Text>;
  }

  const firstCategoryData = questionsData[1];
  if (!firstCategoryData || !Array.isArray(firstCategoryData.categories) || firstCategoryData.categories.length === 0) {
    return <Text style={commonStyles.errorText}>No categories available</Text>;
  }

  const currentCategory = firstCategoryData.categories[0];
  const questions = currentCategory.questions || [];
  if (questions.length === 0) {
    return <Text style={commonStyles.errorText}>No questions available in this category</Text>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  // Handle input changes and option selection
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

  // Handle moving to the next question
  const handleNextQuestion = () => {
    // Validation logic for each question type (dropdown or text input)
    if (!answers[currentQuestion.id]) {
      alert("Please answer the question before proceeding.");
      return; // Prevent moving to the next question if empty
    }

    // Move to the next question if valid
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // After last question, navigate to Review Info
      navigation.navigate("ReviewInitialInfo", { answers });
    }
  };

  return (
    <ScrollView contentContainerStyle={commonStyles.container}>
      <Text style={commonStyles.heading}>{firstCategoryData.category}</Text>
      <Text style={commonStyles.subHeading}>{firstCategoryData.subheading}</Text>
      
      {currentQuestion ? (
        <>
          <Text style={commonStyles.question}>{currentQuestion.question || currentQuestion.text}</Text>
          
          {currentQuestion.type === "dropdown" ? (
            currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  commonStyles.optionButton,
                  answers[currentQuestion.id] === option && commonStyles.selectedOption,
                ]}
                onPress={() => handleOptionSelect(currentQuestion.id, option)}
              >
                <Text style={commonStyles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <TextInput
              style={commonStyles.input}
              placeholder={currentQuestion.placeholder}
              keyboardType={currentQuestion.type === "number" ? "numeric" : "default"}
              onChangeText={(text) => handleInputChange(text, currentQuestion.id)}
              value={answers[currentQuestion.id] || ''}
            />
          )}

          <TouchableOpacity
            style={commonStyles.modernButton}
            onPress={handleNextQuestion}
          >
            <Text style={commonStyles.buttonText}>Next</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>No questions available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Optional styles for modern appearance
  input: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  optionButton: {
    backgroundColor: "#e0e0e0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#4caf50", // Selected option highlighted in green
  },
  question: {
    fontSize: 18,
    marginBottom: 12,
  },
  modernButton: {
    backgroundColor: "#008CBA",
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: 18,
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default InitialQuestions;
