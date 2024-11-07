// Navigation/AppNavigator.js
import React, {useState} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from '../Screens/TabNavigator';
import InitialEvaluationScreen from '../Screens/InitialEvaluationScreen';
import AuthNavigator from './AuthNavigator';
import MainAppStack from './MainAppStack';

const RootStack = createStackNavigator();

export default function AppNavigator() {
  const [isSignedIn, setIsSignedIn] = useState(false); 

  return (
    <NavigationContainer>
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        <RootStack.Screen name="Main" component={MainAppStack} />
      ) : (
        <RootStack.Screen name="Auth">
        {() => <AuthNavigator setIsSignedIn={setIsSignedIn} />} 
      </RootStack.Screen>
      )}
    </RootStack.Navigator>
  </NavigationContainer>
  );
}
