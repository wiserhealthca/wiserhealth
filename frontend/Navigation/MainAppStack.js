import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeStackScreen from './HomeStackScreen';
import LearningModuleScreen from '../Screens/LearningModuleScreen';
import UserScreen from '../Screens/UserScreen';
import MenuScreen from '../Screens/MenuScreen';

const Tab = createBottomTabNavigator();

const MainAppStack = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'User') {
          iconName = 'person';
        } else if (route.name === 'Learning') {
          iconName = 'school';
        } else if (route.name === 'Menu') {
          iconName = 'menu';
        }

        return <MaterialIcons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'green',
      tabBarInactiveTintColor: 'gray',
      headerTitleAlign: 'center',
      headerStyle: { height: 80 },
    })}
  >
    <Tab.Screen name="Home" component={HomeStackScreen} />
    <Tab.Screen name="Learning" component={LearningModuleScreen} />
    <Tab.Screen name="User" component={UserScreen} />
    <Tab.Screen name="Menu" component={MenuScreen} />
  </Tab.Navigator>
);

export default MainAppStack;


