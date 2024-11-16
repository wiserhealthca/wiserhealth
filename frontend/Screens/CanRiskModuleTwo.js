import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView, Animated } from "react-native";
import commonStyles from "./styles";
import questionsData from "./questionsData.json";

const CanRiskModuleTwo = ({ route, navigation }) => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(2);
  const [currentSubcategoryIndex, setCurrentSubcategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [progress, setProgress] = useState(0);
  const animatedProgress = useRef(new Animated.Value(0)).current;
  const { editMode, questionIndex, answers } = route.params || {};

  // Function to get the total number of questions in the current category only
  const getTotalQuestionsInCurrentCategory = () => {
    let total = 0;
    const currentCategory = questionsData[currentCategoryIndex];
    if (currentCategory && currentCategory.categories) {
      total = currentCategory.categories.reduce(
        (sum, subcategory) => sum + subcategory.questions.length,
        0
      );
    }
    return total;
  };

  // Function to get the number of questions answered in the current category
  const getAnsweredQuestions = () => {
    let answered = 0;
    for (let j = 0; j < currentSubcategoryIndex; j++) {
      answered += questionsData[currentCategoryIndex].categories[j].questions.length;
    }
    answered += currentQuestionIndex;
    return answered;
  };

  // Handle Edit Mode: Jump to specific question and load previous answers
  useEffect(() => {
    if (editMode && answers) {
      setSelectedOptions(answers); // Preload existing answers
      setCurrentQuestionIndex(
        questionIndex % questionsData[0].categories[0].questions.length
      ); // Move to the right question
      setCurrentSubcategoryIndex(
        Math.floor(
          questionIndex / questionsData[0].categories[0].questions.length
        )
      );
    }
  }, [editMode, answers, questionIndex]);

  // Update progress when current question changes
  useEffect(() => {
    const totalQuestions = getTotalQuestionsInCurrentCategory();
    const answeredQuestions = getAnsweredQuestions();
    const newProgress = (answeredQuestions / totalQuestions) * 100;
    setProgress(newProgress);

    Animated.timing(animatedProgress, {
      toValue: newProgress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [currentCategoryIndex, currentSubcategoryIndex, currentQuestionIndex]);

  // Handle selecting an option
  const handleOptionSelect = (option) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [currentCategoryIndex]: {
        ...prevOptions[currentCategoryIndex],
        [currentSubcategoryIndex]: {
          ...prevOptions[currentCategoryIndex]?.[currentSubcategoryIndex],
          [currentQuestionIndex]: option,
        },
      },
    }));
  };

  useEffect(() => {
    if (route.params?.reset) {
      setCurrentCategoryIndex(0);
      setCurrentSubcategoryIndex(0);
      setCurrentQuestionIndex(0);
      setSelectedOptions({});
      setProgress(0);
      animatedProgress.setValue(0);
    }
  }, [route.params]);

  const handleNextQuestion = () => {
    const currentCategory = questionsData[currentCategoryIndex];
    const currentSubcategory = currentCategory.categories[currentSubcategoryIndex];
    const totalQuestions = currentSubcategory.questions.length;

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (currentSubcategoryIndex < currentCategory.categories.length - 1) {
        setCurrentSubcategoryIndex(currentSubcategoryIndex + 1);
        setCurrentQuestionIndex(0);
      } else if (currentCategoryIndex < questionsData.length - 1) {
        setCurrentCategoryIndex(currentCategoryIndex + 1);
        setCurrentSubcategoryIndex(0);
        setCurrentQuestionIndex(0);
      } else {
        navigation.navigate("ResultsScreen", { selectedOptions });
        console.log("Selected Options:", selectedOptions);
      }
    }
  };

  const currentCategory = questionsData[currentCategoryIndex] || {};
  const currentSubcategory = currentCategory.categories
    ? currentCategory.categories[currentSubcategoryIndex] || {}
    : {};
  const { category, subheading } = currentCategory;
  const { categoryType, questions = [] } = currentSubcategory;
  const currentQuestion = questions[currentQuestionIndex];

  const totalQuestions = getTotalQuestionsInCurrentCategory();
  const answeredQuestions = getAnsweredQuestions();

  return (
    <ScrollView contentContainerStyle={commonStyles.container}>
      <Text style={commonStyles.heading}>{category || "Category"}</Text>
      <Text style={commonStyles.subHeading}>{subheading || "Subheading"}</Text>
      <Text style={commonStyles.subText}>{categoryType || "Category Type"}</Text>

      {/* Progress Bar with Percentage and Question Count */}
      <Text style={commonStyles.progressText}>
        {Math.round(progress)}% - Question {answeredQuestions + 1} of {totalQuestions}
      </Text>
      <View style={commonStyles.progressBarContainer}>
        <Animated.View
          style={[
            commonStyles.progressBar,
            {
              width: animatedProgress.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
              backgroundColor: "#4caf50",
            },
          ]}
        />
      </View>

      {currentQuestion ? (
        <>
          <Text style={commonStyles.question}>{currentQuestion.text}</Text>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                commonStyles.optionButton,
                selectedOptions[currentCategoryIndex]?.[
                  currentSubcategoryIndex
                ]?.[currentQuestionIndex] === option &&
                  commonStyles.selectedOption,
              ]}
              onPress={() => handleOptionSelect(option)}
            >
              <Text style={commonStyles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}

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

export default CanRiskModuleTwo;
