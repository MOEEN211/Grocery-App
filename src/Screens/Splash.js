import { View, Image, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserData = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("email");

        if (
          storedEmail &&
          storedEmail !== "" &&
          storedEmail !== null &&
          storedEmail !== undefined
        ) {
          setTimeout(() => {
            setIsLoading(false);
            navigation.navigate("Home");
          }, 3000);
        } else {
          setTimeout(() => {
            setIsLoading(false);
            navigation.navigate("Login");
          }, 3000);
        }
      } catch (error) {
        console.error("Error reading data from AsyncStorage:", error);
        setTimeout(() => {
          setIsLoading(false);
          navigation.navigate("Login");
        }, 3000);
      }
    };

    checkUserData();
  }, []); // Empty dependency array to run the effect only once

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      {isLoading ? <ActivityIndicator size="large" color="#000" /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
});

export default Splash;
