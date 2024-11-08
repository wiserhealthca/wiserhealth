// HomeStackScreen.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InitialEvaluationScreen from '../Screens/InitialEvaluationScreen';
import NutritionDashboard from '../Screens/NutritionDashboard';
import Types2Diabetes from '../Screens/Types2Diabetes';
import NutritionalEvaluationQuiz from '../Screens/NutritionalEvaluationQuiz';
import InitialQuestions from "../Screens/InitialQuestions";
import BMIDisplay from '../Screens/BMIDisplay';
import ReviewInitialInfo from "../Screens/ReviewInitialInfo";
import CanRiskQuiz from "../Screens/CanRiskQuiz";
import ResultsScreen from "../Screens/ResultsScreen";
import CanRiskScoreScreen from "../Screens/CanRiskScoreScreen";
import HomeScreen from '../Screens/HomeScreen';


const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator initialRouteName="HomeScreen">
     <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    <HomeStack.Screen name="InitialEvaluation" component={InitialEvaluationScreen} />
    <HomeStack.Screen name="NutritionDashboard" component={NutritionDashboard} />
    <HomeStack.Screen name="NutritionalEvaluationQuiz" component={NutritionalEvaluationQuiz} />
    <HomeStack.Screen name="Types2Diabetes" component={Types2Diabetes} />
    <HomeStack.Screen name="InitialQuestions" component={InitialQuestions} />
    <HomeStack.Screen name="ReviewInitialInfo" component={ReviewInitialInfo} />
    <HomeStack.Screen name="BMIDisplay" component={BMIDisplay} />
    <HomeStack.Screen name="CanRiskQuiz" component={CanRiskQuiz} />
     <HomeStack.Screen name="ResultsScreen" component={ResultsScreen} />
     <HomeStack.Screen name="CanRiskScoreScreen" component={CanRiskScoreScreen} />
    {/* Add more screens here if needed */}
  </HomeStack.Navigator>
);

export default HomeStackScreen;
