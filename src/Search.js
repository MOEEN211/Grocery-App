import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Data from "./Data"; // Import your data source here
import Chattha from "./Chatttha";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [], // Initialize an empty array to store cart items
    };
  }

  addItemToCart = (item) => {
    // Create a copy of the current cart items and add the selected item
    const updatedCartItems = [...this.state.cartItems, item];

    // Update the cart items in the state
    this.setState({ cartItems: updatedCartItems });
  };

  render() {
    const products = Data.flatMap((categoryData) => categoryData.data);

    return (
      <View style={styles.screenContainer}>
        <Chattha products={products} addItemToCart={this.addItemToCart} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
});

export default Search;
