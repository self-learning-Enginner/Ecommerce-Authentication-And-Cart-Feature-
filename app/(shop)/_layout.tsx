import { useAuth } from "@/provider/authprovider";
import { FontAwesome } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TabsLayout = () => {
  function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
  }) {
    return <FontAwesome size={24} {...props} style={{ color: "#10c834" }} />;
  }

  const { mounting, session } = useAuth();

  if (mounting) {
    return <ActivityIndicator />;
  }
  if (!session) {
    return <Redirect href="/authRegister" />;
  }

  return (
    <>
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "",
            tabBarInactiveTintColor: "",
            tabBarLabelStyle: { fontSize: 16 },
            tabBarStyle: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              height: 60,
            },
            headerShown: true,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "shop",
              headerShown: false,
              tabBarIcon(props) {
                return <TabBarIcon {...props} name="shopping-cart" />;
              },
            }}
          />
          <Tabs.Screen
            name="orders"
            options={{
              title: "orders",
              headerShown: true,
              tabBarIcon(props) {
                return <TabBarIcon {...props} name="book" />;
              },
            }}
          />
        </Tabs>
      </SafeAreaView>
    </>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
