import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import { PRODUCTS } from "@/assets/products";
import useCartStore from "../store/cart-store";

const ProductDetails = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const toast = useToast();

  const product = PRODUCTS.find((product) => product.slug === slug);

  if (!product) {
    return <Redirect href="/+not-found" />;
  }

  const { addItem, decreament, increament, items } = useCartStore();

  const cartitem = items.find((item) => item.id === product.id);

  const intitialQuantity = cartitem ? cartitem.quantity : 1;

  const [Quantity, setQuantity] = useState(intitialQuantity);

  const totalPrice = (product.price * Quantity).toFixed(2);

  const increamenatQuantity = () => {
    if (Quantity < product.maxQuantity) {
      setQuantity((prev) => prev + 1);
      increament(product.id);
    } else {
      toast.show("Cannot More Than Maximun Quantity", {
        type: "warning",
        placement: "bottom",
      });
    }
  };

  const decreamenatQuantity = () => {
    if (Quantity > 1) {
      setQuantity((prev) => prev - 1);
      decreament(product.id);
    }
  };

  const addCart = () => {
    addItem({
      quantity: Quantity,
      id: product.id,
      title: product.title,
      image: product.heroImage,
      price: product.price,
    });
    toast.show("Added to cart", {
      type: "success",
      placement: "top",
      duration: 1500,
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.title }} />

      <Image source={product.heroImage} style={styles.heroImage} />

      <View style={{ padding: 16, flex: 1 }}>
        <Text style={styles.title}>Title : {product.title}</Text>

        <Text style={styles.slug}>Slug : {product.slug}</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            Unit Price : {product.price.toFixed(2)}
          </Text>

          <Text style={styles.price}>Total Price : ${totalPrice}</Text>
        </View>

        <FlatList
          data={product.imagesUrl}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={item} style={styles.image} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imagesContainer}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={decreamenatQuantity}
            disabled={Quantity <= 1}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{Quantity}</Text>

          <TouchableOpacity
            onPress={increamenatQuantity}
            disabled={Quantity >= product.maxQuantity}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={addCart}
            style={[
              styles.addToCartButton,
              { opacity: Quantity === 0 ? 0.5 : 1 },
            ]}
          >
            <Text style={styles.addToCartText}>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heroImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  slug: {
    fontSize: 18,
    color: "#555",
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  price: {
    fontWeight: "bold",
    color: "#000",
  },

  imagesContainer: {
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 8,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007bff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  quantityButtonText: {
    fontSize: 24,
    color: "#fff",
  },
  quantity: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorMessage: {
    fontSize: 18,
    color: "#f00",
    textAlign: "center",
    marginTop: 20,
  },
});
