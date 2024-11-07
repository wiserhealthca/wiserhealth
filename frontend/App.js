// Your main app file, e.g., App.js or Navigation.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './Screens/SignInScreen'; // Adjust your path as necessary
import MainAppStack from './Navigation/MainAppStack'; // Your main tab navigator
import InitialEvaluationScreen from './Screens/InitialEvaluationScreen';
import NutritionDashboard from "./Screens/NutritionDashboard";

const Stack = createStackNavigator();

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <Stack.Screen 
            name="Main" 
            component={MainAppStack} 
            options={{ headerShown: false }} 
          />
        ) : (
          <Stack.Screen 
            name="SignIn" 
            options={{ headerShown: false }} 
          >
            {props => <SignInScreen {...props} setIsSignedIn={setIsSignedIn} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
      
    </NavigationContainer>
  );
};

export default App;
