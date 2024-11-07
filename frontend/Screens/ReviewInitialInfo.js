import React, {useEffect, useState} from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const ReviewInitialInfo = ({ route, navigation }) => {
  const { answers } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const InfoItem = ({ label, value, icon }) => (
    <View style={styles.infoItem}>
      <MaterialIcons name={icon} size={24} color="#007BFF" />
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Your Information</Text>

      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>Your Information</Text>
        <View style={styles.infoGrid}>
          <InfoItem label="Gender" value={answers[1]} icon="person" />
          <InfoItem label="Age" value={`${answers[2]} years`} icon="calendar-today" />
          <InfoItem label="Weight" value={`${answers[3]} kg`} icon="fitness-center" />
          <InfoItem label="Height" value={`${answers[4]} cm`} icon="height" />
          <InfoItem label="Waist" value={`${answers[5]} cm`} icon="checkroom" />
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => navigation.navigate("BMIDisplay", { answers })}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.editButton} // Updated to use local styles.editButton
          onPress={() => {
            setCurrentQuestionIndex(0);
            navigation.navigate("InitialQuestions" , {reset : true});
          }}

        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#ffffff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoCard: {
    width: '100%',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007BFF',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  infoItem: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '48%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#e8f0fe',
    borderColor: '#007BFF',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoLabel: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  editButton: {
    backgroundColor: "#ff9800",
    padding: 15,
    borderRadius: 10,
    flex: 1,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
  },
});

export default ReviewInitialInfo;
