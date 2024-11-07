import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import commonStyles from './styles';

const CanRiskScoreScreen = ({ route, navigation }) => {
  const { totalScore, answersWithScores } = route.params || {};

  // Scoring messages based on the total score
  const scoring = {
    lowRisk: {
      range: [0, 20],
      message: "Your risk of having pre-diabetes or type 2 diabetes is fairly low, though it always pays to maintain a healthy lifestyle."
    },
    moderateRisk: {
      range: [21, 32],
      message: "Your risk of having pre-diabetes or type 2 diabetes is moderate. You may wish to consult with a healthcare practitioner about your risk."
    },
    highRisk: {
      range: [33, 100],
      message: "Your risk of having pre-diabetes or type 2 diabetes is high. You may wish to consult with a healthcare practitioner to discuss getting your blood sugar tested."
    }
  };

  // Determine which risk category the score falls into
  let riskCategory = '';
  let riskMessage = '';

  if (totalScore >= scoring.lowRisk.range[0] && totalScore <= scoring.lowRisk.range[1]) {
    riskCategory = 'lowRisk';
    riskMessage = scoring.lowRisk.message;
  } else if (totalScore >= scoring.moderateRisk.range[0] && totalScore <= scoring.moderateRisk.range[1]) {
    riskCategory = 'moderateRisk';
    riskMessage = scoring.moderateRisk.message;
  } else if (totalScore >= scoring.highRisk.range[0] && totalScore <= scoring.highRisk.range[1]) {
    riskCategory = 'highRisk';
    riskMessage = scoring.highRisk.message;
  }

  // Helper function to format the answer summary
  const formatAnswersSummary = (answers) => {
    const summary = [];
    Object.keys(answers).forEach((categoryIndex) => {
      const categoryAnswers = answers[categoryIndex];
      Object.keys(categoryAnswers).forEach((subcategoryIndex) => {
        const subcategoryAnswers = categoryAnswers[subcategoryIndex];
        Object.keys(subcategoryAnswers).forEach((questionIndex) => {
          summary.push({
            category: `Category ${Number(categoryIndex) + 1}`,
            subcategory: `Subcategory ${Number(subcategoryIndex) + 1}`,
            question: `Question ${Number(questionIndex) + 1}`,
            answer: subcategoryAnswers[questionIndex],
          });
        });
      });
    });
    return summary;
  };

  const answersSummary = formatAnswersSummary(answersWithScores);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={commonStyles.container}>
          {/* Display total score */}
          <View style={[commonStyles.scoreCard, { backgroundColor: '#ffffff', marginBottom: 20, borderRadius: 10, padding: 15 }]}>
            <Text style={[commonStyles.scoreTitle, { fontSize: 24, fontWeight: '600' }]}>Your Total Score:</Text>
            <Text style={[commonStyles.score, { fontSize: 28, fontWeight: 'bold', color: '#4CAF50' }]}>
              {totalScore} / 100
            </Text>
          </View>

          {/* Display risk message */}
          <View style={[commonStyles.scoreCard, { backgroundColor: '#ffffff', marginBottom: 20, borderRadius: 10, padding: 15 }]}>
            <Text style={[commonStyles.scoreTitle, { fontSize: 18, fontWeight: '500' }]}>Your Risk Level:</Text>
            <Text style={[commonStyles.score, { fontSize: 16, fontWeight: '400', color: '#FF5722' }]}>
              {riskMessage}
            </Text>
          </View>

          {/* Answer Summary - Commented as per request */}
          {/* <View style={commonStyles.answerSummaryContainer}>
            <Text style={commonStyles.sectionTitle}>Answer Summary:</Text>
            {answersSummary.map((answer, index) => (
              <View key={index} style={commonStyles.answerItem}>
                <Text style={commonStyles.answerText}>
                  {answer.category} - {answer.subcategory} - {answer.question}: {answer.answer}
                </Text>
              </View>
            ))}
          </View> */}

          {/* Retake Quiz Button */}
          <TouchableOpacity 
            style={[commonStyles.retakeButton, { backgroundColor: '#2196F3', paddingVertical: 12, borderRadius: 8 }]} 
            onPress={() => navigation.navigate('CanRiskQuiz')}
          >
            <Text style={[commonStyles.retakeButtonText, { color: '#ffffff', fontSize: 16, fontWeight: '600' }]}>
              Retake Quiz
            </Text>
          </TouchableOpacity>

          {/* Home Button */}
          <TouchableOpacity 
            style={[commonStyles.homeButton, { backgroundColor: '#607D8B', paddingVertical: 12, borderRadius: 8, marginTop: 20 }]} 
            onPress={() => navigation.navigate('InitialEvaluation')}
          >
            <Text style={[commonStyles.homeButtonText, { color: '#ffffff', fontSize: 16, fontWeight: '600' }]}>
              Home
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CanRiskScoreScreen;
