import { FlatList } from "react-native";
import { MainError } from "../../../components/errors/main";
import { Spinner } from "../../../components/ui/spinner";
import { useProducts } from "../api/get-products";
import { ProductCard } from "./product-card";

export const ProductList = () => {
  const { data, isLoading, isError } = useProducts();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <MainError />;
  }

  return (
    <FlatList
      data={data}
      renderItem={ProductCard}
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
