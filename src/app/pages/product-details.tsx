import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { View } from "react-native";
import { CartIcon } from "../../components/ui/cart-icon";
import { ProductDetails } from "../../features/product-details/components/product-details";
import type { NavigationProp } from "../../types/navigation";

export const ProductDetailScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CartIcon onPress={() => navigation.navigate("Cart")} />
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <ProductDetails />
    </View>
  );
};
