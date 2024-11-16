// Your main app file, e.g., App.js or Navigation.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './Screens/SignInScreen'; // Adjust your path as necessary
import MainAppStack from './Navigation/MainAppStack'; // Your main tab navigator
import InitialEvaluationScreen from './Screens/InitialEvaluationScreen';
import NutritionDashboard from "./Screens/NutritionDashboard";
import SplashScreen from './Navigation/SplashScreen';
import SignUpScreen from './Screens/SignUpScreen';
const Stack = createStackNavigator();

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <Stack.Screen 
            name="Main App" 
            component={MainAppStack} 
            options={{ headerShown: false, headerTitle: null}} 
          />
        ) : (
          <>
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false, header: false}} />
          <Stack.Screen 
            name="SignInScreen" 
            options={{ headerShown: false }} 
          >
            {props => <SignInScreen {...props} setIsSignedIn={setIsSignedIn} />}
          </Stack.Screen>
          <Stack.Screen name="SignUpScreen" component={SignUpScreen}/>
          </>
        )}
      </Stack.Navigator>
      
    </NavigationContainer>
  );
};

export default App;