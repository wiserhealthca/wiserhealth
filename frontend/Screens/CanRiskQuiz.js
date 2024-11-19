import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView, Animated } from "react-native";
import commonStyles from "./styles";
import questionsData from "./questionsData.json";

const CanRiskQuiz = ({ route, navigation }) => {
  const [currentCategoryIndexTwo, setcurrentCategoryIndexTwo] = useState(3);
  const [currentSubcategoryIndex, setCurrentSubcategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [progress, setProgress] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const animatedProgress = useRef(new Animated.Value(0)).current;
  const { editMode, questionIndex, answers } = route.params || {};
  const [answersWithScores, setAnswersWithScores] = useState({});

  // Get the current category, subcategory, and question
  const currentCategory = questionsData[currentCategoryIndexTwo] || {};
  const currentSubcategory = currentCategory.categories
    ? currentCategory.categories[currentSubcategoryIndex]
    : {};
  const currentQuestion = currentSubcategory?.questions?.[currentQuestionIndex];

  // Calculate total number of questions in the current category
  const calculateTotalQuestionsInCurrentCategory = () => {
    if (!currentCategory || !currentCategory.categories) return 0;

    return currentCategory.categories.reduce((total, subcategory) => {
      if (subcategory?.questions && Array.isArray(subcategory.questions)) {
        return total + subcategory.questions.length;
      }
      return total;
    }, 0);
  };

  // Calculate answered questions
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
    // Calculate total questions and answered questions
    const totalQuestionsInCategory = calculateTotalQuestionsInCurrentCategory();
    const answeredQuestions = calculateAnsweredQuestions();

    // Calculate progress based on answered questions
    const newProgress = (answeredQuestions / totalQuestionsInCategory) * 100;
    setProgress(newProgress);

    // Animate progress bar
    Animated.timing(animatedProgress, {
      toValue: newProgress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [selectedOptions, currentCategoryIndexTwo]);

  const handleOptionSelect = (option) => {
    // Update selected options and the total score
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

    // Update total score based on selected option score
    const optionScore = option.score || 0;
    setTotalScore((prevScore) => prevScore + optionScore);
  };

  const handleNextQuestion = () => {
    const currentCategory = questionsData[currentCategoryIndexTwo];
    const currentSubcategory = currentCategory?.categories?.[currentSubcategoryIndex] || {};
    const totalQuestionsInSubcategory = currentSubcategory.questions?.length || 0;
  
    // Check if the current category's last question has been answered
    if (currentQuestionIndex < totalQuestionsInSubcategory - 1) {
      // Move to the next question within the same subcategory
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (currentSubcategoryIndex < currentCategory.categories?.length - 1) {
        // Move to the next subcategory
        setCurrentSubcategoryIndex(currentSubcategoryIndex + 1);
        setCurrentQuestionIndex(0);  // Reset question index for new subcategory
      } else if (currentCategoryIndexTwo < questionsData.length - 1) {
        // Move to the next category
        setcurrentCategoryIndexTwo(currentCategoryIndexTwo + 1);
        setCurrentSubcategoryIndex(0);  // Reset subcategory index
        setCurrentQuestionIndex(0);     // Reset question index for new category
      } else {
        // If no more questions, navigate to the result screen
        navigation.navigate('CanRiskScoreScreen', { CanRisktotalScore: totalScore, answersWithScores });
      }
    }
  };  

  // Get the total number of questions in the current category
  const totalQuestionsInCategory = calculateTotalQuestionsInCurrentCategory();
  const answeredQuestions = calculateAnsweredQuestions();

  return (
    <ScrollView contentContainerStyle={commonStyles.container}>
      <Text style={commonStyles.heading}>{currentCategory.category || "Category"}</Text>
      <Text style={commonStyles.subText}>
        {currentSubcategory.categoryType || "Category Type"}
      </Text>

      {/* Progress Bar */}
      <Text style={commonStyles.progressText}>
        {totalQuestionsInCategory === 0
          ? "No questions available in this category"
          : `${answeredQuestions} of ${totalQuestionsInCategory} answered (${Math.round(progress)}%)`}
      </Text>

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
