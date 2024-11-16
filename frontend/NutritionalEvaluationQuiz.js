import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import commonStyles from "./Styles/styles.js";
import questionsData from "./questionsData.json";

const NutritionalEvaluationQuiz = ({ route, navigation }) => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentSubcategoryIndex, setCurrentSubcategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [progress, setProgress] = useState(0);
  const animatedProgress = useRef(new Animated.Value(0)).current;

  const { editMode, questionIndex, answers } = route.params || {};

  const getTotalQuestions = () => {
    let total = 0;
    questionsData.forEach((category) => {
      category.categories.forEach((subcategory) => {
        total += subcategory.questions.length;
      });
    });
    return total;
  };

  const getAnsweredQuestions = () => {
    let answered = 0;
    for (let i = 0; i < currentCategoryIndex; i++) {
      questionsData[i].categories.forEach((subcategory) => {
        answered += subcategory.questions.length;
      });
    }
    for (let j = 0; j < currentSubcategoryIndex; j++) {
      answered +=
        questionsData[currentCategoryIndex].categories[j].questions.length;
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
    const totalQuestions = getTotalQuestions();
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
    // Reset states if reset is true
    if (route.params?.reset) {
      setCurrentCategoryIndex(0);
      setCurrentSubcategoryIndex(0);
      setCurrentQuestionIndex(0);
      setSelectedOptions({});
      setProgress(0);
      animatedProgress.setValue(0); // Reset animated progress
    }
  }, [route.params]);

  // Handle moving to the next question or category
  const handleNextQuestion = () => {
    const currentCategory = questionsData[currentCategoryIndex];
    const currentSubcategory =
      currentCategory.categories[currentSubcategoryIndex];
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
        // navigation.navigate("BasicUserInfo", { selectedOptions });
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

  const totalQuestions = getTotalQuestions();
  const answeredQuestions = getAnsweredQuestions();

  return (
    <ScrollView contentContainerStyle={commonStyles.container}>
      <Text style={commonStyles.heading}>{category || "Category"}</Text>
      <Text style={commonStyles.subHeading}>{subheading || "Subheading"}</Text>
      <Text style={commonStyles.subText}>
        {categoryType || "Category Type"}
      </Text>

      {/* Progress Bar with Percentage and Question Count */}
      <Text style={commonStyles.progressText}>
        {Math.round(progress)}% - Question {answeredQuestions} of{" "}
        {totalQuestions}
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
              backgroundColor: "#4caf50", // Ensure this is the color of your progress bar
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

export default NutritionalEvaluationQuiz;
