import { router, Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const CategoriesLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[slug]"
        options={({ navigation }) => ({
          headerShown: true,
        })}
      />
    </Stack>
  );
};

export default CategoriesLayout;
