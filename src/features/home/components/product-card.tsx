import { Button } from "@/ui/button";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Product } from "../types/product";

interface ProductCardProps {
  item: Product;
  onPressProduct: (product: Product) => void;
  onPressAddToCart: (product: Product) => void;
}

export const ProductCard = ({
  item,
  onPressAddToCart,
  onPressProduct,
}: ProductCardProps) => {
  return (
    <Pressable style={styles.container} onPress={() => onPressProduct(item)}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.footer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>

      <Button text="Add to Cart" onPress={() => onPressAddToCart(item)} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flex: 0.5,
    padding: 8,
    gap: 8,
  },
  footer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    color: "#888",
    marginTop: 4,
  },
});
