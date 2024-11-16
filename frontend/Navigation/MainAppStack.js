// MainAppStack.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeStackScreen from './HomeStackScreen';
import LearningModuleScreen from '../Screens/LearningModuleScreen';
import UserScreen from '../Screens/UserScreen';
import MenuScreen from '../Screens/MenuScreen';
import {StyleSheet} from "react-native";
import { View, Image, Text } from 'react-native';

const Tab = createBottomTabNavigator();
// const CustomHeader = () => (
//   <View style={styles.headerContainer}>
//     <Image
//       source={require('../assets/Images/wiser_logo.jpg')}
//       style={styles.logo}
//     />
//   </View>
// );
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
      // headerTitle: () => <CustomHeader/>,
       headerTitleAlign: 'center',
       headerStyle: {height: 80},
    })}
  >
    <Tab.Screen name="Home" component={HomeStackScreen}  />
    <Tab.Screen name="Learning" component={LearningModuleScreen}  />
    <Tab.Screen name="User" component={UserScreen}  />
    <Tab.Screen name="Menu" component={MenuScreen} />
  </Tab.Navigator>
);

export default MainAppStack;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10, // Space between logo and title
  },
  
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
