import { useCart } from "@/cart/context/cart-context";
import { ProductList } from "@/home/components/product-list";
import type { NavigationProp } from "@/types/navigation";
import { CartIcon } from "@/ui/cart-icon";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { View } from "react-native";

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { addToCart } = useCart();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CartIcon onPress={() => navigation.navigate("Cart")} />
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <ProductList onAddToCart={addToCart} />
    </View>
  );
};
