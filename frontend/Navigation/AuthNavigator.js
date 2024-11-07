// AuthStackNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../Screens/SplashScreen.js";
import SignUpScreen from "../Screens/SignUpScreen.js";
import SignInScreen from "../Screens/SignInScreen.js";
import InitialEvaluationScreen from "../Screens/InitialEvaluationScreen.js";
import ProfileSettings from "../Screens/ProfileSettings.js";

const Stack = createStackNavigator();

const AuthNavigator = ({ setIsSignedIn }) => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="SignInScreen"
        children={() => <SignInScreen setIsSignedIn={setIsSignedIn} />} 
        options={{ headerShown: false }}
      />
      <Stack.Screen name="InitialEvaluationScreen" component={InitialEvaluationScreen} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
