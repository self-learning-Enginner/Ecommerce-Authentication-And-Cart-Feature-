import { Stack } from "expo-router";

const ProductLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[slug]"
        options={() => ({
          headerShown: true,
        })}
      />
    </Stack>
  );
};

export default ProductLayout;
