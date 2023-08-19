import React from "react";
import { View, Text, StyleSheet } from "react-native"; // Added Text import
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Cart from "../Cart";
import Main from "../Main";
import Profile from "../Profile";
import Search from "../Search";
import Love from "../Love";
import addedItems from "../Main";
function HomeScreen() {
  return (
    <View style={styles.screenContainer}>
      <Main />
    </View>
  );
}

function SearchScreen() {
  return (
    <View style={styles.screenContainer}>
      <Search />
    </View>
  );
}

function CartScreen() {
  return (
    <View style={styles.screenContainer}>
      <Cart />
    </View>
  );
}

function LoveScreen() {
  return (
    <View style={styles.screenContainer}>
      <Love />
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.screenContainer}>
      <Profile />
    </View>
  );
}

const Tab = createBottomTabNavigator();

const Home = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator tabBarOptions={{ showLabel: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home"
              size={24}
              color={focused ? "#007bff" : "#333333"}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="search"
              size={24}
              color={focused ? "#007bff" : "#333333"}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon
                name="shopping-cart"
                size={24}
                color={focused ? "#007bff" : "#333333"}
              />
              {/* You can't directly access 'addedItems' here */}
            </View>
          ),
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="Love"
        component={LoveScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="heart"
              size={24}
              color={focused ? "#007bff" : "#333333"}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="user"
              size={24}
              color={focused ? "#007bff" : "#333333"}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
