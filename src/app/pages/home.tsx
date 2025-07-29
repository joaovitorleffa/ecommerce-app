import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { View } from "react-native";
import { CartIcon } from "../../components/ui/cart-icon";
import { useCart } from "../../features/cart/context/cart-context";
import { ProductList } from "../../features/home/components/product-list";
import type { NavigationProp } from "../../types/navigation";

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
