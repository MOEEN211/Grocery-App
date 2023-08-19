import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    setIsLoading(true);
    setNameError("");
    setEmailError("");
    setPhoneError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setGeneralError("");

    if (!name) {
      setNameError("Name is required");
    }
    if (!email) {
      setEmailError("Email is required");
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid email format");
    }
    if (!phone) {
      setPhoneError("Phone number is required");
    }
    if (!password) {
      setPasswordError("Password is required");
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    }

    if (
      name &&
      email &&
      isValidEmail(email) &&
      phone &&
      password &&
      confirmPassword &&
      password === confirmPassword
    ) {
      try {
        await AsyncStorage.setItem("name", name);
        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("phone", phone);
        await AsyncStorage.setItem("password", password);

        await new Promise((resolve) => setTimeout(resolve, 3000));

        navigation.navigate("Login");
      } catch (error) {
        console.error("Error storing user information:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setGeneralError("Please fill in all fields correctly");
      setIsLoading(false);
    }
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <View style={styles.container}>
      <Image source={require("../images/logo.png")} style={styles.logo} />
      <Text style={styles.loginText}>Signup</Text>

      <View style={styles.inputContainer}>
        <View style={styles.inputField}>
          <MaterialIcons name="person" size={24} color="#000" />
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

        <View style={styles.inputField}>
          <MaterialIcons name="email" size={24} color="#000" />
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <View style={styles.inputField}>
          <MaterialIcons name="phone" size={24} color="#000" />
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />
        </View>
        {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

        <View style={styles.inputField}>
          <MaterialIcons name="lock" size={24} color="#000" />
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}

        <View style={styles.inputField}>
          <MaterialIcons name="lock" size={24} color="#000" />
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>
        {confirmPasswordError ? (
          <Text style={styles.errorText}>{confirmPasswordError}</Text>
        ) : null}

        {generalError ? (
          <Text style={styles.errorText}>{generalError}</Text>
        ) : null}

        <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.loginButtonText}>Signup</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.newAccountText}
          onPress={() => navigation.navigate("Login")}
        >
          <Text>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: "center",
    marginTop: 100,
  },
  loginText: {
    marginTop: 50,
    alignSelf: "center",
    fontWeight: "600",
    fontSize: 24,
    color: "#000",
  },
  inputContainer: {
    marginTop: 30,
    width: "85%",
  },
  inputField: {
    borderWidth: 0.5,
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  loginButton: {
    backgroundColor: "#000",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  newAccountText: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
});

export default Signup;
