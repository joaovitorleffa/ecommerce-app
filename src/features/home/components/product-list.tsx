import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { FlatList, ListRenderItem } from "react-native";
import { MainError } from "../../../components/errors/main";
import { Spinner } from "../../../components/ui/spinner";
import type { NavigationProp } from "../../../types/navigation";
import { useProducts } from "../api/get-products";
import { Product } from "../types/product";
import { ProductCard } from "./product-card";

interface ProductListProps {
  onAddToCart: (product: Product) => void;
}

export const ProductList = ({ onAddToCart }: ProductListProps) => {
  const { data, isLoading, isError } = useProducts();

  const navigation = useNavigation<NavigationProp>();

  const onPressProduct = useCallback(
    (product: Product) => {
      navigation.navigate("ProductDetails", { productId: product.id });
    },
    [navigation]
  );

  const renderItem: ListRenderItem<Product> = useCallback(
    ({ item }) => {
      return (
        <ProductCard
          item={item}
          onPressProduct={onPressProduct}
          onPressAddToCart={onAddToCart}
        />
      );
    },
    [onAddToCart, onPressProduct]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <MainError />;
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      numColumns={2}
      contentContainerStyle={{
        gap: 4,
        paddingTop: 16,
        paddingHorizontal: 16,
      }}
      columnWrapperStyle={{ gap: 4 }}
    />
  );
};
