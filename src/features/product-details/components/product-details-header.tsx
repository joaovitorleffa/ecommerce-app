import { StyleSheet, Text, View } from "react-native";
import { Product } from "../../home/types/product";

interface ProductDetailsHeaderProps {
  product: Product;
}

export const ProductDetailsHeader = ({
  product,
}: ProductDetailsHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.name}>{product.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  category: {
    fontSize: 14,
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});
