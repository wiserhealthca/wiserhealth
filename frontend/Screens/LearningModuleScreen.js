import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import { ProgressBar } from "react-native-paper";

const { width } = Dimensions.get("window");

const LearningModuleScreen = () => {
  const modules = [
    {
      id: "1",
      title: "Healthy Eating",
      description: "Learn the essentials of balanced nutrition.",
      progress: 0.4,
      thumbnail: require("../assets/Images/nutri.avif"),
    },
    {
      id: "2",
      title: "Mindfulness & Stress",
      description: "Effective techniques to manage stress.",
      progress: 0.7,
      thumbnail: require("../assets/Images/nutri.avif"),
    },
    {
      id: "3",
      title: "Physical Activity",
      description: "The basics of staying active and fit.",
      progress: 0,
      thumbnail: require("../assets/Images/nutri.avif"),
    },
  ];

  const renderModule = ({ item }) => (
    <View style={styles.moduleCard}>
      <Image source={item.thumbnail} style={styles.thumbnail} />
      <View style={styles.moduleInfo}>
        <Text style={styles.moduleTitle}>{item.title}</Text>
        <Text style={styles.moduleDescription}>{item.description}</Text>
        <ProgressBar
          styleAttr="Horizontal"
          indeterminate={false}
          progress={item.progress}
          color="#4CAF50"
          style={styles.progressBar}
        />
        <Text style={styles.progressText}>{item.progress * 100}% Complete</Text>
        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>
            {item.progress > 0 ? "Continue" : "Start"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search and Filter Section */}
      <TextInput style={styles.searchInput} placeholder="Search modules..." />

      {/* Modules List */}
      <FlatList
        data={modules}
        renderItem={renderModule}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.modulesContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40, // Increased padding to prevent the search bar from being too close to the top
    paddingHorizontal: 16,
  },
  searchInput: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  modulesContainer: {
    paddingBottom: 20,
  },
  moduleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 2,
    flexDirection: "row",
  },
  thumbnail: {
    width: 100,
    height: 100,
  },
  moduleInfo: {
    flex: 1,
    padding: 16,
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  moduleDescription: {
    fontSize: 14,
    color: "#757575",
    marginVertical: 4,
  },
  progressBar: {
    height: 8,
    marginTop: 10,
    marginBottom: 4,
  },
  progressText: {
    fontSize: 12,
    color: "#4CAF50",
    marginBottom: 8,
  },
  startButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  startButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default LearningModuleScreen;
