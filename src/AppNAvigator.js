import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "./Screens/Splash";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import Home from "./Screens/Home";
import My from "./Screens/My";
import Adress from "./Screens/Adress";
import Payment from "./Screens/Payment";
import PaymentSuccess from "./Screens/PaymentSuccess";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Splash"
          component={Splash}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Signup"
          component={Signup}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="My"
          component={My}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Adress"
          component={Adress}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Payment"
          component={Payment}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="PaymentSuccess"
          component={PaymentSuccess}
        />

        {/* Add more screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
