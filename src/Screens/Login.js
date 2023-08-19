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

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true); // Start the loading indicator

    // Fetch stored email and password from AsyncStorage
    const storedEmail = await AsyncStorage.getItem("email");
    const storedPassword = await AsyncStorage.getItem("password");

    // Simulate a delay for 3 seconds (3000 milliseconds)
    setTimeout(() => {
      setIsLoading(false); // Stop the loading indicator

      // Check if email and password match stored values
      if (email === storedEmail && password === storedPassword) {
        setError(""); // Clear any previous error message

        // Navigate to the home screen
        navigation.navigate("Home");
      } else {
        setError("Invalid email or password");
      }
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Image source={require("../images/logo.png")} style={styles.logo} />
      <Text style={styles.loginText}>Login</Text>

      <View style={styles.inputContainer}>
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

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.newAccountText}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text>Create New Account</Text>
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

  errorText: {
    color: "red",
    marginBottom: 10,
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
  newAccountText: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
});

export default Login;
