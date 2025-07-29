import { useRoute } from "@react-navigation/native";
import { useCallback } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { MainError } from "../../../components/errors/main";
import { Button } from "../../../components/ui/button";
import { Spinner } from "../../../components/ui/spinner";
import { RouteProp } from "../../../types/navigation";
import { useCart } from "../../cart/context/cart-context";
import { useProduct } from "../api/get-product";
import { ProductDetailsHeader } from "./product-details-header";
import { ProductReviews } from "./product-reviews";
import { ProductSpecifications } from "./product-specifications";

export const ProductDetails = () => {
  const route = useRoute<RouteProp<"ProductDetails">>();
  const { productId } = route.params;
  const { data: product, isLoading, isError } = useProduct(productId);
  const { addToCart } = useCart();

  const onPressAddToCart = useCallback(() => {
    if (product) {
      addToCart(product);
      Alert.alert("Success", "Product added to cart!");
    }
  }, [product, addToCart]);

  const onPressBuyNow = useCallback(() => {
    if (product) {
      addToCart(product);
      Alert.alert("Success", "Redirecting to checkout...");
    }
  }, [product, addToCart]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !product) {
    return <MainError />;
  }

  return (
    <ScrollView style={styles.container}>
      <ProductDetailsHeader product={product} />

      <Image source={{ uri: product.imageUrl }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.infoSection}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.stockInfo}>
            <Text style={styles.stockText}>
              Stock: {product.stock} available
            </Text>
            <Text style={styles.ratingText}>Rating: {product.rating}/5 ⭐</Text>
          </View>
        </View>

        <ProductSpecifications specifications={product.specifications} />
        <ProductReviews reviews={product.reviews} />
      </View>

      <View style={styles.actions}>
        <Button text="Add to Cart" onPress={onPressAddToCart} />
        <Button text="Buy Now" onPress={onPressBuyNow} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 16,
  },
  image: {
    width: "100%",
    height: 300,
    // borderRadius: 12,
    marginBottom: 16,
  },
  infoSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  price: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
    marginBottom: 16,
  },
  stockInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stockText: {
    fontSize: 14,
    color: "#666",
  },
  ratingText: {
    fontSize: 14,
    color: "#666",
  },
  actions: {
    padding: 16,
    gap: 12,
  },
});
