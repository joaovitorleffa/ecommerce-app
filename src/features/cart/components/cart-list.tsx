import { Button } from "@/ui/button";
import { useCallback } from "react";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCart } from "../context/cart-context";
import { CartItem as CartItemType } from "../types/cart";
import { CartEmpty } from "./cart-empty";
import { CartItem } from "./cart-item";

export const CartList = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const renderItem: ListRenderItem<CartItemType> = useCallback(
    ({ item }) => {
      return (
        <CartItem
          item={item}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
        />
      );
    },
    [updateQuantity, removeFromCart]
  );

  const handleCheckout = useCallback(() => {
    // TODO: Implement checkout functionality
    console.log("Checkout pressed");
  }, []);

  const handleClearCart = useCallback(() => {
    clearCart();
  }, [clearCart]);

  if (cart.items.length === 0) {
    return <CartEmpty />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart.items}
        renderItem={renderItem}
        keyExtractor={(item) => item.product.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Items:</Text>
          <Text style={styles.summaryValue}>{cart.totalItems}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Price:</Text>
          <Text style={styles.summaryValue}>${cart.totalPrice.toFixed(2)}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearCart}
          >
            <Text style={styles.clearButtonText}>Clear Cart</Text>
          </TouchableOpacity>
          <Button
            text="Checkout"
            onPress={handleCheckout}
            style={styles.checkoutButton}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  listContainer: {
    paddingVertical: 8,
  },
  summaryContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#333",
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  clearButton: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
  },
  clearButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "bold",
  },
  checkoutButton: {
    flex: 2,
    backgroundColor: "#007AFF",
  },
});
