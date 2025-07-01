import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Link, Redirect } from "expo-router";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { CATEGORIES } from "@/assets/categories";
import useCartStore from "../store/cart-store";
import { supabase } from "@/lib/supabase";
import { Toast } from "react-native-toast-notifications";

const ListHeader = () => {
  // logout Funtion
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("error", error);
    }
    Toast.show("Sign Out SuccesFully", {
      type: "success",
      placement: "top",
      duration: 1500,
    });
    <Redirect href="/auth" />;
  };

  const { getItemCount } = useCartStore();
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTop}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: "https://avatar.iran.liara.run/public/40" }}
              style={styles.avatarImage}
            />
            <Text style={styles.avatarText}>Hello Sourav Bhattacharyya</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Link asChild href="/cart" style={styles.cartContainer}>
            <Pressable>
              {({ pressed }) => (
                <View>
                  <AntDesign
                    name="shoppingcart"
                    size={25}
                    color="black"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{getItemCount()}</Text>
                  </View>
                </View>
              )}
            </Pressable>
          </Link>
          <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
            <FontAwesome name="sign-out" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.heroContainer}>
        <Image
          style={styles.heroImage}
          source={require("../../assets/images/hero.png")}
        />
      </View>

      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={CATEGORIES}
          renderItem={(item) => (
            <Link asChild href={`/categories/${item.item.slug}`}>
              <Pressable style={styles.category}>
                <Image
                  source={{ uri: item.item.imageUrl }}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryText}>{item.item.name}</Text>
              </Pressable>
            </Link>
          )}
          keyExtractor={(item) => item.name}
          horizontal
          showsHorizontalScrollIndicator={false}
        ></FlatList>
      </View>
    </View>
  );
};

export default ListHeader;

const styles = StyleSheet.create({
  headerContainer: {
    gap: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cartContainer: {
    padding: 10,
  },
  signOutButton: {
    padding: 10,
  },
  heroContainer: {
    width: "100%",
    height: 200,
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  categoriesContainer: {},
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  category: {
    width: 100,
    alignItems: "center",
    marginBottom: 16,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  categoryText: {
    fontWeight: "bold",
  },
  badgeContainer: {
    position: "absolute",
    top: -5,
    right: 10,
    backgroundColor: "#1BC464",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
