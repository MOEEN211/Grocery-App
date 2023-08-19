import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
// Make sure the import path is correct
import { useNavigation } from "@react-navigation/native";

import { addAddress } from "../../reduxtoolkit/AddressSlice";

const Address = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [pincode, setPincode] = useState("");

  const handleSaveAddress = () => {
    const newAddress = {
      email,
      buildingName,
      pincode,
    };
    dispatch(addAddress(newAddress));
    navigation.goBack(); // Assuming navigation prop is passed from a navigator
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.goBackButton}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Address</Text>

      <View style={styles.inputContainer}>
        <Ionicons
          name="mail"
          size={24}
          color="black"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Enter email address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons
          name="business"
          size={24}
          color="black"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Enter building name"
          value={buildingName}
          onChangeText={setBuildingName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons
          name="location"
          size={24}
          color="black"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Enter pincode"
          keyboardType="numeric"
          value={pincode}
          onChangeText={setPincode}
        />
      </View>

      <Button title="Save" onPress={handleSaveAddress} />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
  },
  goBackButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
  },
};

export default Address;
