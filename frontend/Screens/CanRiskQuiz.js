import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView, Animated } from "react-native";
import commonStyles from "./styles";
import questionsData from "./questionsData.json";

const CanRiskQuiz = ({ route, navigation }) => {
  const [currentCategoryIndexTwo, setcurrentCategoryIndexTwo] = useState(2);
  const [currentSubcategoryIndex, setCurrentSubcategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [progress, setProgress] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const animatedProgress = useRef(new Animated.Value(0)).current;

  const { editMode, questionIndex, answers } = route.params || {};

  const calculateTotalQuestions = (data) => {
    if (!data || !Array.isArray(data)) return 0;

    return data.reduce((total, category) => {
      if (category?.categories && Array.isArray(category.categories)) {
        return total + category.categories.reduce((subTotal, subcategory) => {
          if (subcategory?.questions && Array.isArray(subcategory.questions)) {
            return subTotal + subcategory.questions.length;
          }
          return subTotal;
        }, 0);
      }
      return total;
    }, 0);
  };

  const calculateAnsweredQuestions = () => {
    let answered = 0;
    Object.values(selectedOptions).forEach((category) => {
      Object.values(category).forEach((subcategory) => {
        answered += Object.keys(subcategory).length;
      });
    });
    return answered;
  };

  useEffect(() => {
    const totalQuestions = calculateTotalQuestions(questionsData);

    if (totalQuestions === 0) {
      setProgress(0); // Set progress to 0% if no questions exist
      return;
    }

    const answeredQuestions = calculateAnsweredQuestions();
    const newProgress = (answeredQuestions / totalQuestions) * 100;
    setProgress(newProgress);

    Animated.timing(animatedProgress, {
      toValue: newProgress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [selectedOptions, questionsData]);

  const handleOptionSelect = (option) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [currentCategoryIndexTwo]: {
        ...prevOptions[currentCategoryIndexTwo],
        [currentSubcategoryIndex]: {
          ...prevOptions[currentCategoryIndexTwo]?.[currentSubcategoryIndex],
          [currentQuestionIndex]: option.answer,
        },
      },
    }));

    const optionScore = option.score || 0;
    setTotalScore((prevScore) => prevScore + optionScore);
  };

  const handleNextQuestion = () => {
    const currentCategory = questionsData[currentCategoryIndexTwo];
    const currentSubcategory = currentCategory?.categories?.[currentSubcategoryIndex] || {};
    const totalQuestionsInSubcategory = currentSubcategory.questions?.length || 0;

    if (currentQuestionIndex < totalQuestionsInSubcategory - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (currentSubcategoryIndex < currentCategory.categories?.length - 1) {
        setCurrentSubcategoryIndex(currentSubcategoryIndex + 1);
        setCurrentQuestionIndex(0);
      } else if (currentCategoryIndexTwo < questionsData.length - 1) {
        setcurrentCategoryIndexTwo(currentCategoryIndexTwo + 1);
        setCurrentSubcategoryIndex(0);
        setCurrentQuestionIndex(0);
      } else {
        navigation.navigate("CanRiskScoreScreen", { answersWithScores: selectedOptions, totalScore });
      }
    }
  };

  const currentCategory = questionsData[currentCategoryIndexTwo] || {};
  const currentSubcategory = currentCategory.categories
    ? currentCategory.categories[currentSubcategoryIndex]
    : {};
  const currentQuestion = currentSubcategory?.questions?.[currentQuestionIndex];

  const totalQuestions = calculateTotalQuestions(questionsData);
  const answeredQuestions = calculateAnsweredQuestions();

  return (
    <ScrollView contentContainerStyle={commonStyles.container}>
      <Text style={commonStyles.heading}>{currentCategory.category || "Category"}</Text>
      {/* <Text style={commonStyles.subHeading}>{currentSubcategory.subheading || "Subheading"}</Text> */}
      <Text style={commonStyles.subText}>
        {currentSubcategory.categoryType || "Category Type"}
      </Text>

      {/* Progress Bar */}
      <Text style={commonStyles.progressText}>
        {totalQuestions === 0
          ? "No questions available"
          : `${Math.round(progress)}% - Question ${answeredQuestions + 1} of ${totalQuestions}`}
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
          {currentQuestion.options &&
            currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  commonStyles.optionButton,
                  selectedOptions[currentCategoryIndexTwo]?.[currentSubcategoryIndex]?.[currentQuestionIndex] === option.answer &&
                    commonStyles.selectedOption,
                ]}
                onPress={() => handleOptionSelect(option)}
              >
                <Text style={commonStyles.optionText}>{option.answer}</Text>
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

export default CanRiskQuiz;
