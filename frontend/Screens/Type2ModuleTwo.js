import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

// Static import for JSON data
import typesQues from "./TypesQues.json";

export default function Type2ModuleTwo() {
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    // Simulating fetch since data is statically imported
    const getQuestions = async () => {
      setQuestions(typesQues);
    };
    getQuestions();
  }, []);

  if (!questions) {
    return (
      <View>
        <Text>Loading questions...</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Diagnosed Conditions
        </Text>
        <FlatList
          data={questions.health_conditions.diagnosed_conditions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text>- {item.condition}</Text>
          )}
        />

        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>
          Meal Preferences: Meat
        </Text>
        <FlatList
          data={questions.meal_preferences.meat}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text>- {item}</Text>
          )}
        />
      </View>
    </TouchableOpacity>
  );
}
