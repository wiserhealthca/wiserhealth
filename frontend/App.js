import HomeScreen from "./HomeScreen";
import SplashScreen from "./SplashScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "./SignUpScreen";
import SignInScreen from "./SignInScreen";
import "react-native-gesture-handler";
import InitialEvaluationScreen from "./InitialEvaluationScreen";
import NutritionDashboard from "./NutritionDashboard";
import SleepDashboard from "./SleepDashboard";
import StressDashboard from "./StressDashboard";
import LifestyleHistoryDashboard from "./LifestyleHistoryDashboard";
import RiskySubstanceDashboard from "./RiskySubstanceDashboard";
import PhysicalActivityDashboard from "./PhysicalActivityDashboard";
import NutritionalEvaluationQuiz from "./NutritionalEvaluationQuiz";
import ResultsScreen from "./ResultsScreen";
import Types2Diabetes from "./Types2Diabetes";
import BasicUserInfo from "./BasicUserInfo";
import BMIDisplay from "./BMIDisplay";
import ReviewAnswersScreen from "./ReviewAnswersScreen";
import { DrawerNavigationStack } from "./DrawerNavigationStack";
import ForgotPasswordScreen from "./ForgotPasswordScreen";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen
          name="DrawerNavigationStack"
          component={DrawerNavigationStack}
        />
        <Stack.Screen
          name="InitialEvaluationScreen"
          component={InitialEvaluationScreen}
        />
        <Stack.Screen
          name="NutritionDashboard"
          component={NutritionDashboard}
        />
        <Stack.Screen name="SleepDashboard" component={SleepDashboard} />
        <Stack.Screen name="StressDashboard" component={StressDashboard} />
        <Stack.Screen
          name="LifestyleHistoryDashboard"
          component={LifestyleHistoryDashboard}
        />
        <Stack.Screen
          name="RiskySubstanceDashboard"
          component={RiskySubstanceDashboard}
        />
        <Stack.Screen name="Types2Diabetes" component={Types2Diabetes} />
        <Stack.Screen
          name="PhysicalActivityDashboard"
          component={PhysicalActivityDashboard}
        />
        <Stack.Screen
          name="NutritionalEvaluationQuiz"
          component={NutritionalEvaluationQuiz}
        />
        <Stack.Screen name="BasicUserInfo" component={BasicUserInfo} />
        <Stack.Screen name="ResultsScreen" component={ResultsScreen} />
        <Stack.Screen name="BMIDisplay" component={BMIDisplay} />
        <Stack.Screen
          name="ReviewAnswersScreen"
          component={ReviewAnswersScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
