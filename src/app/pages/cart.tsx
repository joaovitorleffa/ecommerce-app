import { View } from "react-native";
import { CartList } from "../../features/cart/components/cart-list";

export const CartScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <CartList />
    </View>
  );
};
