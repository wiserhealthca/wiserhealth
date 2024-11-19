
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './Screens/SignInScreen'; 
import SplashScreen from './Navigation/SplashScreen';
import SignUpScreen from './Screens/SignUpScreen'
import HomeStackScreen from './Navigation/HomeStackScreen';
import MainAppStack from "./Navigation/MainAppStack";

const Stack = createStackNavigator();

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>

      {isSignedIn ? (
          <Stack.Screen
            name="MainAppStack"
            component={MainAppStack} 
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="SignInScreen">
              {props => <SignInScreen {...props} setIsSignedIn={setIsSignedIn} />}
            </Stack.Screen>
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
