import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width } = Dimensions.get("window");

const UserScreen = () => {
  const options = [
    { id: "1", title: "Profile Settings", icon: "person" },
    { id: "2", title: "Account Management", icon: "account-circle" },
    { id: "3", title: "Notifications", icon: "notifications" },
    { id: "4", title: "Privacy Settings", icon: "lock" },
    { id: "5", title: "Help & Support", icon: "help" },
    { id: "6", title: "Log Out", icon: "logout" },
  ];

  const renderOption = ({ item }) => (
    <TouchableOpacity style={styles.option} onPress={() => handleOptionPress(item.title)}>
      <Icon name={item.icon} size={30} color="#4F4F4F" />
      <Text style={styles.optionText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const handleOptionPress = (title) => {
    // Implement navigation or actions based on option title
    console.log(`${title} pressed`);
  };

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }} 
          style={styles.profileImage}
        />

        <Text style={styles.welcomeText}>Welcome, John Doe!</Text>
      </View>

      <FlatList
        data={options}
        renderItem={renderOption}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.optionsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333333",
  },
  optionsContainer: {
    padding: 16,
    justifyContent: "center",
  },
  option: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    margin: 8,
    width: (width - 64) / 2, // Responsive layout for two columns
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  icon: {
    marginBottom: 8,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4F4F4F",
    textAlign: "center",
  },
});

export default UserScreen;
