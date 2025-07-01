import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

import { Product } from "@/assets/types/product";
import { Link } from "expo-router";

const ProductListItem = ({ product }: { product: Product }) => {
  return (
    <Link asChild href={`/products/${product.slug}`}>
      <Pressable style={styles.item}>
        <View style={styles.itemImageContainer}>
          <Image source={product.heroImage} style={styles.itemsImage} />
        </View>
        <View style={styles.itemImageContainer}>
          <Text style={styles.itemtitle}>{product.title}</Text>
          <Text style={styles.itemPrice}>{product.price.toFixed(2)}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  item: {
    width: "48%",
    backgroundColor: "white",
    marginVertical: 8,
    borderRadius: 20,
    overflow: "hidden",
  },
  itemImageContainer: {
    borderRadius: 10,
    alignItems: "center",
    gap: 10,
    backgroundColor: "#d9f7d6",
    width: "100%",
    height: 70,
  },
  itemsImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  itemTextContainer: {
    padding: 8,
    alignItems: "flex-start",
    gap: 4,
  },
  itemtitle: {
    fontSize: 14,
    color: "#888",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
