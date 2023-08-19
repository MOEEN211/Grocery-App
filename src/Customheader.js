import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const CustomHeader = ({ title }) => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    // Handle any other actions when mode is toggled
  };

  // Define styles based on isDarkMode
  const containerStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    width: "100%",
    backgroundColor: isDarkMode ? "black" : "white",
    borderBottomWidth: 2,
    borderBottomColor: "green",
  };

  const titleStyle = {
    fontSize: 18,
    fontWeight: "bold",
    color: isDarkMode ? "white" : "black",
    alignSelf: "flex-start",
  };

  const modeTextStyle = {
    fontSize: 16,
    color: isDarkMode ? "#00aa00" : "#007700",
  };

  return (
    <View style={containerStyle}>
      <View style={styles.headerLeft}>
        <Text style={titleStyle}>{title}</Text>
      </View>
      <TouchableOpacity style={styles.modeButton} onPress={toggleMode}>
        <Text style={modeTextStyle}>Mode</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerLeft: {
    flex: 1,
  },
  modeButton: {
    padding: 8,
  },
});

export default CustomHeader;
