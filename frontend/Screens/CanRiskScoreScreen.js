import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import commonStyles from "./styles";

const CanRiskScoreScreen = ({ route, navigation }) => {
  const { CanRisktotalScore = 0, answersWithScores = {} } = route.params || {};

  const scoring = {
    lowRisk: { range: [0, 20], message: "Low risk" },
    moderateRisk: { range: [21, 32], message: "Moderate risk" },
    highRisk: { range: [33, 100], message: "High risk" }
  };

  let riskMessage = 'Not available';
  if (CanRisktotalScore <= 20) {
    riskMessage = scoring.lowRisk.message;
  } else if (CanRisktotalScore <= 32) {
    riskMessage = scoring.moderateRisk.message;
  } else if (CanRisktotalScore > 32) {
    riskMessage = scoring.highRisk.message;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={commonStyles.container}>
          <View style={commonStyles.scoreCard}>
            <Text style={commonStyles.scoreTitle}>Your Total Score:</Text>
            <Text style={commonStyles.score}>{CanRisktotalScore}</Text>
          </View>
          <View style={commonStyles.scoreCard}>
            <Text style={commonStyles.scoreTitle}>Your Risk Level:</Text>
            <Text style={commonStyles.score}>{riskMessage}</Text>
          </View>
          <TouchableOpacity style={commonStyles.retakeButton} onPress={() => navigation.navigate('CanRiskQuiz')}>
            <Text style={commonStyles.retakeButtonText}>Retake Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={commonStyles.retakeButton} onPress={() => navigation.navigate('CanRiskModuleTwo')}>
            <Text style={commonStyles.retakeButtonText}>Take Module2 Quiz</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CanRiskScoreScreen;
