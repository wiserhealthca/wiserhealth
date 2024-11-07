import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import commonStyles from "./styles"; 
// Import images for each BMI category
import UnderweightImage from '../assets/Images/underweight.png';
import NormalImage from '../assets/Images/normal.png';
import OverweightImage from '../assets/Images/overweight.png';
import ObeseImage from '../assets/Images/obese.png';

const BMIDisplay = ({ route, navigation }) => {
  const { answers } = route.params;

  const weight = parseFloat(answers[3]);
  const height = parseFloat(answers[4]) / 100;
  const bmi = calculateBMI(weight, height);
  const bmiCategory = getBMICategory(bmi);

  // Dynamically choose the correct image based on BMI category
  const categoryImage = getCategoryImage(bmiCategory);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Your Health Report</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>BMI Details</Text>
          <Text style={styles.bmiText}>
            Your BMI: <Text style={styles.bmiValue}>{bmi !== null ? bmi : 'N/A'}</Text>
          </Text>
          <Text style={styles.categoryText}>
            Category: <Text style={styles.categoryValue}>{bmiCategory}</Text>
          </Text>
          <Image
            source={categoryImage} // Dynamically select the image
            style={styles.categoryImage}
            resizeMode="contain"
          />
           <Text style={styles.adviceText}>{getAdvice(bmiCategory)}</Text>
        </View>

       
        <TouchableOpacity
          style={commonStyles.modernButton} 
          onPress={() => {
           
            navigation.navigate("InitialEvaluation");
          }}

        >
          <Text style={commonStyles.buttonText}>Go to EValuation Screen </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Utility function to calculate BMI
const calculateBMI = (weight, height) => {
  if (!weight || !height) return null;
  return (weight / (height * height)).toFixed(1);
};

// Function to determine BMI category
const getBMICategory = (bmi) => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi >= 18.5 && bmi < 24.9) return 'Normal';
  if (bmi >= 25 && bmi < 29.9) return 'Overweight';
  if (bmi >= 30) return 'Obese';
  return 'Unknown';
};

// Function to get the appropriate image based on BMI category
const getCategoryImage = (bmiCategory) => {
  switch (bmiCategory) {
    case 'Underweight':
      return UnderweightImage;
    case 'Normal':
      return NormalImage;
    case 'Overweight':
      return OverweightImage;
    case 'Obese':
      return ObeseImage;
    default:
      return NormalImage; // Default image if category is unknown
  }
};

// Function to provide health advice based on BMI category
const getAdvice = (bmiCategory) => {
  switch (bmiCategory) {
    case 'Underweight':
      return 'Consider a balanced diet and consult a healthcare professional to achieve a healthy weight.';
    case 'Normal':
      return 'Great job! Keep maintaining your healthy lifestyle.';
    case 'Overweight':
      return 'Consider a balanced diet and regular exercise to reach a healthier weight range.';
    case 'Obese':
      return 'Consult a healthcare professional for personalized advice on achieving a healthier weight.';
    default:
      return 'Please consult a healthcare professional for personalized advice.';
  }
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  container: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 10,
  },
  card: {
    width: '100%',
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  bmiText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
  },
  bmiValue: {
    color: '#e91e63',
    fontWeight: 'bold',
  },
  categoryText: {
    fontSize: 18,
    color: '#555',
    // marginBottom: 15,
  },
  categoryValue: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  categoryImage: {
    // width: 150,
    // height: 150,
    width: 300,
    height: 250,
    // marginTop: 10,
    // borderRadius: 75,
    // borderRadius:50,
    // borderWidth: 3,
    // borderColor: '#007BFF',
  },
  adviceText: {
    fontSize: 16,
    marginTop: 20,
    color: '#555',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 22,
  },
});

export default BMIDisplay;
