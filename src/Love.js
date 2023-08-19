import React from "react";
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromWishlist,
  addToWishlist,
} from "../reduxtoolkit/WishlistSlice";
import { addCartItem, addToCart } from "../reduxtoolkit/CartSlice2";

import { useNavigation } from "@react-navigation/native";

const Love = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (productName) => {
    dispatch(removeFromWishlist({ name: productName }));
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item)); // Dispatch the addToCart action with the item
    // Navigate to the Cart screen
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Wishlist Items</Text>
      </View>
      <FlatList
        data={wishlist}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={item.image} style={styles.productImage} />
            <Text>{item.name}</Text>
            <Text>${item.price}</Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveFromWishlist(item.name)}
            >
              <Text style={styles.removeButtonText}>Remove from Wishlist</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => handleAddToCart(item)}
            >
              <Text style={styles.cartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10, // Add padding to the container
  },
  productContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  productImage: {
    width: 70,
    height: 80,
    marginRight: 10,
    resizeMode: "contain",
  },
  removeButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Love;
