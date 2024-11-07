import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import commonStyles from "./styles";
import questionsData from "./questionsData.json"; // Import your questions data

const ReviewAnswersScreen = ({ route, navigation }) => {
  const { selectedOptions = {} } = route.params || {};

  // Log selected options for debugging
  console.log("Received Selected Options:", selectedOptions);

  if (!questionsData || !questionsData.length) {
    return (
      <View style={commonStyles.container}>
        <Text style={commonStyles.heading}>No Questions Found</Text>
        <TouchableOpacity
          style={commonStyles.modernButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={commonStyles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={commonStyles.container}>
      <Text style={commonStyles.heading}>Review Your Answers</Text>

      {questionsData.categories?.map((category, categoryIndex) => (
        <View key={categoryIndex} style={commonStyles.categoryContainer}>
          <Text style={commonStyles.categoryTitle}>
            {category.categoryType}
          </Text>

          {category.questions?.map((question, questionIndex) => {
            // Fetch the user's answer if available
            const userAnswer =
              selectedOptions[categoryIndex] &&
              selectedOptions[categoryIndex][0] &&
              selectedOptions[categoryIndex][0][questionIndex];

            return (
              <View key={questionIndex} style={commonStyles.questionContainer}>
                <Text style={commonStyles.questionText}>{question.text}</Text>
                <Text style={commonStyles.answerText}>
                  {userAnswer ? `Your answer: ${userAnswer}` : "Not answered"}
                </Text>
              </View>
            );
          })}
        </View>
      ))}

      <TouchableOpacity
        style={commonStyles.modernButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={commonStyles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ReviewAnswersScreen;
