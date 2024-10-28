// styles.js
import { StyleSheet } from "react-native";

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 16,
    textAlign: "center",
    margin: 10,
  },
  subText: {
    fontSize: 14,
    textAlign: "center",
    color: "#7D7D7D",
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  optionButton: {
    borderWidth: 1,
    borderColor: "#C4C4C4",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#D3EAF7",
    borderColor: "#007BFF",
    fontWeight: "bold",
  },
  optionText: {
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 20,
    marginBottom: 12,
  },
  modernButton: {
    backgroundColor: "#6200EE", // Primary color
    borderRadius: 30, // Rounded corners for a modern look
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: "center",
    shadowColor: "#000", // Shadow for depth
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5, // For Android shadow
    margin: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  progressBarContainer: {
    height: 12,
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 6,
    overflow: "hidden",
    marginVertical: 15,
  },
  progressBar: {
    height: "100%",
    borderRadius: 6,
  },
  progressText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  // sign in styles

  input: {
    height: 50,
    borderColor: "#DCDCDC",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#F7F7F7",
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#DCDCDC",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#F7F7F7",
  },
  inputPassword: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  signInButton: {
    backgroundColor: "#24a0ed",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  signupButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    fontWeight: 600,
    border: "3px solid #4CAF50",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  // social media container styles
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  socialButton: {
    padding: 10,
  },
  // bmi and userinfo container styles

  input: {
    height: 50,
    borderColor: "#DCDCDC",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#F7F7F7",
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  bmiResult: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  linkText: {
    color: "#24a0ed",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
    textDecorationStyle: "underline",
  },
  //review answers

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3f51b5",
    marginBottom: 10,
  },
  cardContent: {
    paddingLeft: 10,
    marginVertical: 5,
  },
  questionText: {
    fontSize: 16,
    color: "#333",
  },
  answerText: {
    fontSize: 16,
    color: "#388e3c",
  },
});

export default commonStyles;
