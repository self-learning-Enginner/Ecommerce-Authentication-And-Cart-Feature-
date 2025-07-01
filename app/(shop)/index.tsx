import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { PRODUCTS } from "@/assets/products";

import ListHeader from "../Components/list-header";
import ProductListItem from "../Components/product-list-item";
import Auth from "../auth";
import AuthRegister from "../authRegister";

const Home = () => {
  return (
    <View>
      <FlatList
        data={PRODUCTS}
        renderItem={({ item }) => <ProductListItem product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={<ListHeader />}
        contentContainerStyle={styles.flastListContent}
        columnWrapperStyle={styles.flatListColumn}
        style={{ paddingHorizontal: 10, paddingVertical: 5 }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  flastListContent: {
    paddingBottom: 20,
  },
  flatListColumn: {
    justifyContent: "space-between",
  },
});
