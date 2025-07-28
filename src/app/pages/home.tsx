import { View } from "react-native";
import { ProductList } from "../../features/home/components/product-list";

export const HomeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ProductList />
    </View>
  );
};
