import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  SafeAreaView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeCartItem } from "../reduxtoolkit/CartSlice2";
import { useNavigation } from "@react-navigation/native";

import StripeProvider from "./Screens/StripeProvider";
// Update the import alias to avoid naming conflict
import {
  StripeProvider as StripeProviderRN,
  useStripe,
} from "@stripe/stripe-react-native";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart2);
  const dispatch = useDispatch();
  const { presentPaymentSheet } = useStripe();
  const navigation = useNavigation();

  const handleCheckout = async () => {
    try {
      const result = await presentPaymentSheet();
      console.log("Payment Result:", result);

      navigation.navigate("Payment", {
        cartItems,
        totalPrice: calculateTotalPrice(),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleRemoveItem = (index) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from the cart?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => dispatch(removeCartItem(index)),
        },
      ]
    );
  };

  return (
    <StripeProviderRN>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Cart Items</Text>
        </View>

        {cartItems.length === 0 ? (
          <View style={styles.emptyCart}>
            <Text>No items in the cart</Text>
          </View>
        ) : (
          <FlatList
            data={cartItems}
            renderItem={({ item, index }) => (
              <View style={styles.productContainer}>
                <Image source={item.image} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text>{item.name}</Text>
                  <Text>${item.price}</Text>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveItem(index)}
                  >
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.name}
          />
        )}

        {cartItems.length > 0 && (
          <View style={styles.checkoutButtonContainer}>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </StripeProviderRN>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  checkoutButtonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  checkoutButton: {
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  checkoutButtonText: {
    color: "white",
    fontWeight: "bold",
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
  productContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
    width: 400,
    height: 100, // Corrected typo here
  },
  productImage: {
    width: 70,
    height: 80,
    marginRight: 10,
    resizeMode: "contain",
  },
  productDetails: {
    flex: 1,
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
});

export default Cart;
