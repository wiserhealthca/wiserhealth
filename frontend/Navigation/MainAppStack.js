// import React, { useState } from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from '../Screens/HomeScreen';
// import UserScreen from '../Screens/UserScreen';
// import MenuScreen from '../Screens/MenuScreen';
// import LearningModuleScreen from "../Screens/LearningModuleScreen";
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import InitialEvaluationScreen from '../Screens/InitialEvaluationScreen';
// import NutritionDashboard from '../Screens/NutritionDashboard';
 
// const Tab = createBottomTabNavigator();
// const HomeStack = createStackNavigator();
// const MainAppStack = () => {
//   const [isShortcutOpen, setIsShortcutOpen] = useState(false);

//   const toggleShortcut = () => {
//     setIsShortcutOpen(!isShortcutOpen);
//   };
//   const HomeStackScreen = () => (
//     <HomeStack.Navigator>
//       {/* <HomeStack.Screen name="MainHome" component={InitialEvaluationScreen} /> */}
//       <HomeStack.Screen name="NutritionDashboardScreen" component={NutritionDashboard} />
//       {/* <HomeStack.Screen name="InitialEvaluation" component={InitialEvaluationScreen} /> */}
//       {/* Add more screens here as needed */}

//     </HomeStack.Navigator>
//   );
  
//   return (
//     <>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ color, size }) => {
//             let iconName;

//             if (route.name === 'Home') {
//               iconName = 'home';
//             } else if (route.name === 'User') {
//               iconName = 'person';
//             } else if (route.name === 'Learning') {
//               iconName = 'school';
//             } else if (route.name === 'Menu') {
//               iconName = 'menu';
//             }

//             return <MaterialIcons name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: 'green',
//           tabBarInactiveTintColor: 'gray',
//         })}
//       >

//         <Tab.Screen name="Home" component={HomeStackScreen} />
//         {/* <Tab.Screen name="Home" component={InitialEvaluationScreen} /> */}
//         <Tab.Screen name="Learning" component={LearningModuleScreen} />
//         <Tab.Screen
//           name="Placeholder"
//           component={View} 
//           options={{
//             tabBarLabel: '',
//             tabBarIcon: () => null, 
//           }}
//           listeners={{
//             tabPress: (e) => {
//               e.preventDefault(); 
//               toggleShortcut();
//             },
//           }}
//         />
//         <Tab.Screen name="User" component={UserScreen} />
//         <Tab.Screen name="Menu" component={MenuScreen} />
//       </Tab.Navigator>

//       {/* Floating Action Button */}
//       <View style={styles.floatingButtonContainer}>
//         {isShortcutOpen && (
//           <View style={styles.shortcutContainer}>
            

//             <TouchableOpacity style={styles.shortcutButton} onPress={() => console.log('Shortcut 1')}>
//               <MaterialIcons name="fastfood" size={24} color="black" />
//               <Text style={styles.shortcutText}>Recipes</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.shortcutButton} onPress={() => console.log('Shortcut 2')}>
//               <MaterialIcons name="local-cafe" size={24} color="black" />
//               <Text style={styles.shortcutText}>Water Intake</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.shortcutButton} onPress={() => console.log('Shortcut 3')}>
//               <MaterialIcons name="local-dining" size={24} color="black" />
//               <Text style={styles.shortcutText}>Meals</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//         <TouchableOpacity
//           style={styles.floatingButton}
//           onPress={toggleShortcut}
//         >
//           <MaterialIcons
//             name={isShortcutOpen ? 'close' : 'add'}
//             size={24}
//             color="white"
//           />
//         </TouchableOpacity>
//       </View>
//     </>
//   );
// };

// export default MainAppStack;


// MainAppStack.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeStackScreen from './HomeStackScreen';
import LearningModuleScreen from '../Screens/LearningModuleScreen';
import UserScreen from '../Screens/UserScreen';
import MenuScreen from '../Screens/MenuScreen';
import {StyleSheet} from "react-native";

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
    })}
  >
    <Tab.Screen name="Home" component={HomeStackScreen} />
    <Tab.Screen name="Learning" component={LearningModuleScreen} />
    <Tab.Screen name="User" component={UserScreen} />
    <Tab.Screen name="Menu" component={MenuScreen} />
  </Tab.Navigator>
);

export default MainAppStack;

const styles = StyleSheet.create({
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    backgroundColor: 'green',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  shortcutContainer: {
    position: 'absolute',
    bottom: 70,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  shortcutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '100%',
  },
  shortcutText: {
    marginLeft: 10,
    fontSize: 18,
    color: 'black',
    width:300
  },
});
