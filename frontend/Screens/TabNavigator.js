// Navigation/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import LearningModuleScreen from './LearningModuleScreen';
import UserScreen from './UserScreen';
import CartScreen from './CartScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Define MaterialIcons icon based on the screen name
          if (route.name === 'Home') {
            iconName = 'home'; 
          } else if (route.name === 'Learning') {
            iconName = 'menu-book'; 
          } else if (route.name === 'User') {
            iconName = 'person'; 
          } else if (route.name === 'Cart') {
            iconName = 'shopping-cart'; 
          }

          // Use MaterialIcons for tab icons
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato', 
        tabBarInactiveTintColor: 'gray', 
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="Learning" component={LearningModuleScreen} />
      <Tab.Screen name="User" component={UserScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
}
