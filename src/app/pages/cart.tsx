import { CartList } from "@/cart/components/cart-list";
import { View } from "react-native";

export const CartScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <CartList />
    </View>
  );
};
