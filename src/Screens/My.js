import React from "react";
import { View, Text, TouchableOpacity, FlatList, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { deleteAddress } from "../../reduxtoolkit/AddressSlice";

const My = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.address);

  const handleRemoveAddress = (index) => {
    dispatch(deleteAddress(index));
  };

  const handleProceedToPayment = (selectedAddress) => {
    navigation.navigate("Payment", {
      cartItems: [], // Add your cart items here
      totalPrice: 0, // Add the total price here
      selectedAddress,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{`< Go Back`}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Address</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Adress")}>
          <Text style={styles.addButton}>Add Address</Text>
        </TouchableOpacity>
      </View>

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
              <Button
                title="Proceed to Payment"
                onPress={() => handleProceedToPayment(item)}
              />
              <Button
                title="Remove"
                onPress={() => handleRemoveAddress(index)}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#f0f0f0",
  },
  backButton: {
    fontSize: 16,
    color: "blue",
    paddingHorizontal: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addButton: {
    fontSize: 16,
    color: "blue",
    borderRadius: 2,
    paddingHorizontal: 12,
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
};

export default My;
export const MyAddressContext = React.createContext();
