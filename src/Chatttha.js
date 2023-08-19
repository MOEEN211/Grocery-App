import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Chattha = ({ products, addItemToCart }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (item) => {
    addItemToCart(item);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="gray" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer}>
            {/* Render your product details here */}
            <Text style={styles.itemName}>{item.name}</Text>
            <TouchableOpacity onPress={() => addToCart(item)}>
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Background color
    width: 400,
    height: 300,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 5,
    fontSize: 16, // Adjust font size
  },
  itemContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#f0f0f0", // Background color
  },
  itemName: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  addToCartButtonText: {
    color: "#007AFF", // Text color
    marginTop: 5,
    fontSize: 16, // Adjust font size
  },
});

export default Chattha;
