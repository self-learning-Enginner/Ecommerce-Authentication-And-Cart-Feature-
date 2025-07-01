import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { CATEGORIES } from "@/assets/categories";
import { PRODUCTS } from "@/assets/products";
import ProductListItem from "../Components/product-list-item";

const Categorie = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const category = CATEGORIES.find((categorie) => categorie.slug === slug);

  if (!category) return <Redirect href="/+not-found" />;

  const products = PRODUCTS.filter((product) => product.category.slug === slug);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: category.name }} />
      <Image source={{ uri: category.imageUrl }} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{category.name}</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productList}
      ></FlatList>
    </View>
  );
};

export default Categorie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  categoryImage: {
    height: 200,
    resizeMode: "cover",
    borderRadius: 18,
    marginBottom: 16,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  productList: {},
  productRow: {
    justifyContent: "space-between",
  },
  productContainer: {
    flex: 1,
    margin: 8,
  },
  productImage: {
    width: 100,
    height: 150,
    resizeMode: "cover",
    borderRadius: 8,
  },
  producttitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
});
