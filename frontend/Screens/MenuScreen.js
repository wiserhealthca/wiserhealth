import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const MenuScreen = () => {
  const navigation = useNavigation();

  const menuOptions = [
    { id: "1", title: "Dashboard", icon: "dashboard" },
    { id: "2", title: "Daily Tracking", icon: "fitness-center"},
    { id: "3", title: "Goal Setting", icon: "flag"},
    { id: "4", title: "Progress & Insights", icon: "show-chart" },
    { id: "5", title: "Evaluation", icon: "assessment" , route: "ProfileSettings"},
    { id: "6", title: "Notifications", icon: "notifications" , route: "ProfileSettings"},
    { id: "7", title: "Profile Settings", icon: "person", route: "ProfileSettings" },
    // { id: "8", title: "Help & Support", icon: "help" },
    // { id: "9", title: "Log Out", icon: "logout" },
  ];

  const handleOptionPress = (option) => {
    if (option.route) {
      navigation.navigate(option.route);
    } else {
      console.log(`Selected: ${option.title}`);
    }
  };

  const renderOption = ({ item }) => (
    <TouchableOpacity style={styles.option} onPress={() => handleOptionPress(item)}>
      <Icon name={item.icon} size={36} color="#000" style={styles.icon} />
      <Text style={styles.optionText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Menu</Text>
      <FlatList
        data={menuOptions}
        renderItem={renderOption}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  icon: {
    marginRight: 20,
  },
  optionText: {
    fontSize: 18,
    color: "#333",
  },
});

export default MenuScreen;
