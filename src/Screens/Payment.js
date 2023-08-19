import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useStripe, CardField } from "@stripe/stripe-react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

const Payment = ({ route }) => {
  const selectedAddress = useSelector((state) => state.address);
  const { cartItems, totalPrice } = route.params;
  const { initPaymentSheet, confirmPaymentSheetPayment } = useStripe();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.address);

  useEffect(() => {
    async function initializePaymentSheet() {
      try {
        await initPaymentSheet({
          paymentIntentClientSecret:
            "pk_test_51NeuSOJB1CqgCZC31h73UBbeZBCSmUn5xO1nMuKCQf1kinXbF1wXpI6spnfxi6W1DrxqxiRK9WOsOsoSYA7QYaMq00imwujCTG",
        });
      } catch (error) {
        console.error("Error initializing payment sheet:", error);
      }
    }
    initializePaymentSheet();
  }, []);

  const handleConfirmPayment = async () => {
    setPaymentLoading(true);

    try {
      const { error } = await confirmPaymentSheetPayment();
      if (error) {
        console.error("Payment failed:", error);
      } else {
        console.log("Payment successful!");
        navigation.navigate("PaymentSuccess"); // Replace with your success screen name
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
    }

    setPaymentLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Payment Summary</Text>
      </View>

      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text>{item.name}</Text>
              <Text>${item.price}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.name}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalAmount}>
          {totalPrice !== undefined ? `$${totalPrice.toFixed(2)}` : ""}
        </Text>
      </View>

      <View style={styles.selectedAddressContainer}>
        <Text style={styles.selectedAddressText}>Selected Address:</Text>
        <View style={styles.dataContainer}>
          <FlatList
            data={addresses}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.addressItem}>
                <Text style={styles.centeredText}>
                  Email: <Text style={styles.boldText}>{item.email}</Text>
                </Text>
                <Text style={styles.centeredText}>
                  Building Name:{" "}
                  <Text style={styles.boldText}>{item.buildingName}</Text>
                </Text>
                <Text style={styles.centeredText}>
                  Pincode: <Text style={styles.boldText}>{item.pincode}</Text>
                </Text>
              </View>
            )}
          />
        </View>
      </View>

      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        style={{ width: "100%", height: 50, marginTop: 20 }}
      />

      <TouchableOpacity
        style={styles.payButton}
        onPress={() => navigation.navigate("PaymentSuccess")}
        disabled={paymentLoading}
      >
        <Text style={styles.payButtonText}>
          {paymentLoading ? "Processing..." : "Pay Now"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  selectedAddressContainer: {
    marginTop: 20,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  dataContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#f0f0f0",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
  },
  addressItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  centeredText: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
  selectedAddressText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "black",
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
  totalContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  payButton: {
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  payButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Payment;
