import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import commonStyles from "./styles"; // Import your common styles
import questionsData from "./questionsData.json"; // Import your questions data

const ResultsScreen = ({ route, navigation }) => {
  const selectedOptions = route?.params?.selectedOptions || {};

  const scoringMap = {
    "Yes, frequently": 3,
    Sometimes: 2,
    "Rarely or never": 1,
  };

  // Function to calculate total number of questions
  const getTotalQuestions = () => {
    let total = 0;
    questionsData.forEach((category) => {
      category.categories.forEach((subcategory) => {
        total += subcategory.questions.length;
      });
    });
    return total;
  };

  const calculateTotalScore = () => {
    let totalScore = 0;
    for (const categoryIndex in selectedOptions) {
      for (const subcategoryIndex in selectedOptions[categoryIndex]) {
        for (const questionIndex in selectedOptions[categoryIndex][
          subcategoryIndex
        ]) {
          const answer =
            selectedOptions[categoryIndex][subcategoryIndex][questionIndex];
          totalScore += scoringMap[answer] || 0;
        }
      }
    }
    return totalScore;
  };

  const totalScore = calculateTotalScore();
  const totalQuestions = getTotalQuestions();
  const scorePercentage = (totalScore / (3 * totalQuestions)) * 100;

  if (totalScore === 0) {
    return (
      <View style={commonStyles.container}>
        <Text style={commonStyles.heading}>No answers recorded</Text>
        <Text style={commonStyles.subheading}>
          It seems you didn't answer any questions.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("NutritionalEvaluationQuiz")}
        >
          <Text style={commonStyles.buttonText}>Go Back to Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={commonStyles.container}>
      <Text style={commonStyles.scoreText}>Your Score: {totalScore} / 100</Text>
      <Text style={commonStyles.scoreText}>
        Percentage: {Math.round(scorePercentage)}%
      </Text>
      <TouchableOpacity
        style={commonStyles.modernButton}
        onPress={() =>
          navigation.navigate("ReviewAnswersScreen", { selectedOptions })
        }
      >
        <Text style={commonStyles.buttonText}>Review Your Answers</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={commonStyles.modernButton}
        onPress={() =>
          navigation.navigate("NutritionalEvaluationQuiz", { reset: true })
        }
      >
        <Text style={commonStyles.buttonText}>Retake Quiz</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={commonStyles.modernButton}
        onPress={() => navigation.navigate("InitialEvaluationScreen")}
      >
        <Text style={commonStyles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={commonStyles.modernButton}
        onPress={() => navigation.navigate("BMIDisplay")}
      >
        <Text style={commonStyles.buttonText}>Calculate your BMI</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ResultsScreen;
