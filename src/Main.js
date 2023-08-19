import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "./redux/Action/Actions";
import Data from "../src/Data";
import Customheader from "./Customheader";
import { addCartItem } from "../reduxtoolkit/CartSlice2";
import {
  addToWishlist,
  removeFromWishlist,
} from "../reduxtoolkit/WishlistSlice";
import Search from "../src/Search";

const Home = ({ isDarkMode }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("T Shirt");

  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);

  const addItem = (item) => {
    dispatch(addCartItem(item));
  };

  useEffect(() => {
    let tempCategory = Data.map((item) => item.category);
    setCategoryList(tempCategory);
  }, []);

  const isProductInWishlist = (productName) =>
    wishlist.some((item) => item.name === productName);

  const toggleWishlist = (productName) => {
    if (isProductInWishlist(productName)) {
      dispatch(removeFromWishlist({ name: productName }));
    } else {
      const item = getItemByName(productName);
      dispatch(addToWishlist(item));
    }
  };

  const getItemByName = (productName) =>
    Data.find((categoryData) =>
      categoryData.data.some((item) => item.name === productName)
    ).data.find((item) => item.name === productName);

  const renderItem = ({ item }) => {
    const items = Data.find((data) => data.category === item).data;
    return (
      <FlatList
        data={items}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer}>
            <TouchableOpacity
              style={[
                styles.loveButton,
                isProductInWishlist(item.name) && styles.likedButton,
              ]}
              onPress={() => toggleWishlist(item.name)}
            >
              <Icon
                name={isProductInWishlist(item.name) ? "heart" : "heart-o"}
                size={24}
                color={isProductInWishlist(item.name) ? "red" : "white"}
              />
            </TouchableOpacity>
            <Image source={item.image} style={styles.itemImage} />
            <Text style={[styles.itemName, isDarkMode && styles.darkText]}>
              {item.name}
            </Text>
            <Text style={[styles.itemPrice, isDarkMode && styles.darkText]}>
              $ {item.price}
            </Text>
            <TouchableOpacity
              style={[styles.addToCartButton, isDarkMode && styles.darkButton]}
              onPress={() => {
                addItem(item);
              }}
            >
              <Text
                style={[
                  styles.addToCartButtonText,
                  isDarkMode && styles.darkText,
                ]}
              >
                Add to Cart
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />
    );
  };
  return (
    <SafeAreaView
      style={[styles.container, isDarkMode && styles.darkContainer]}
    >
      <Customheader title="GroceryApp" isDarkMode={isDarkMode} />
      <ScrollView>
        <View>
          <Image
            source={require("../src/images/funjpeg.jpeg")}
            style={[styles.yasir, isDarkMode && styles.darkImage]}
          />
        </View>
        {/* <Search
          products={Data.flatMap((categoryData) => categoryData.data)}
          addItemToCart={addItem}
        />
        <Search products={Data.flatMap((categoryData) => categoryData.data)} addItemToCart={addItem} /> */}

        {/* <Search
          products={Data.flatMap((categoryData) => categoryData.data)} // Pass the products prop correctly
          addItemToCart={addItem} // Make sure this is defined and functional
        /> */}

        <View style={styles.categoryContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScrollContainer}
          >
            {categoryList.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryButton,
                  currentCategory === category && styles.selectedCategory,
                ]}
                onPress={() => setCurrentCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    isDarkMode && styles.darkText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.itemListContainer}>
          {renderItem({ item: currentCategory })}
        </View>

        {Data.map((categoryData) => (
          <View key={categoryData.category}>
            <Text style={[styles.categoryTitle, isDarkMode && styles.darkText]}>
              {categoryData.category}
            </Text>
            <FlatList
              data={categoryData.data}
              horizontal
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.itemContainer}>
                  <TouchableOpacity
                    style={[
                      styles.loveButton,
                      isProductInWishlist(item.name) && styles.likedButton,
                    ]}
                    onPress={() => toggleWishlist(item.name)}
                  >
                    <Icon
                      name={
                        isProductInWishlist(item.name) ? "heart" : "heart-o"
                      }
                      size={24}
                      color={isProductInWishlist(item.name) ? "red" : "white"}
                    />
                  </TouchableOpacity>
                  <Image source={item.image} style={styles.itemImage} />
                  <Text
                    style={[styles.itemName, isDarkMode && styles.darkText]}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={[styles.itemPrice, isDarkMode && styles.darkText]}
                  >
                    $ {item.price}
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.addToCartButton,
                      isDarkMode && styles.darkButton,
                    ]}
                    onPress={() => {
                      addItem(item); // Use the addItem from the outer Home component
                    }}
                  >
                    <Text
                      style={[
                        styles.addToCartButtonText,
                        isDarkMode && styles.darkText,
                      ]}
                    >
                      Add to Cart
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.name}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 33,
  },
  darkContainer: {
    backgroundColor: "black",
  },
  yasir: {
    width: "94%",
    height: 200,
    padding: 10,
    borderWidth: 1,
    borderRadius: 28,
    alignSelf: "center",
    marginTop: 10,
    marginLeft: 20,
  },
  darkImage: {
    borderColor: "white",
  },
  loveButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  likedButton: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 5,
  },
  categoryContainer: {
    marginBottom: 30,
    marginTop: 14,
  },
  categoryScrollContainer: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#e0e0e0",
  },
  selectedCategory: {
    backgroundColor: "#ccc", // Change the color as needed
  },
  categoryButtonText: {
    fontWeight: "bold",
  },
  darkText: {
    color: "white",
  },
  itemListContainer: {
    marginTop: 10,
  },
  itemContainer: {
    marginRight: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    height: 200,
    marginTop: 10,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  itemImage: {
    width: "100%",
    height: 100,
    borderRadius: 5,
  },
  itemName: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "left",
  },
  addToCartButton: {
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    PadindRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
    width: 100,
  },
  darkButton: {
    borderColor: "white",
  },
  addToCartButtonText: {},
  categoryTitle: {
    marginTop: 20,
    marginLeft: 20,
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Home;
