import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons"; // Import the Feather icon library
import { useNavigation } from "@react-navigation/native";
import MyAdress from "./Screens/My";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    // Fetch user information from AsyncStorage
    const fetchUserInfo = async () => {
      const storedName = await AsyncStorage.getItem("name");

      setName(storedName || "");
      setEmail(storedEmail || "");
      setPhone(storedPhone || "");
    };

    fetchUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
        <Feather
          name="settings"
          size={24}
          color="black"
          style={styles.settingsIcon}
        />
      </View>
      <View style={styles.content}>
        <Image
          source={require("../assets/images/1.png")}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{name}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("My")}
          >
            <Text style={styles.buttonText}>My Address</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>My Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Other</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  settingsIcon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  profileName: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonsContainer: {
    marginTop: 70,
    width: "100%",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Profile;
