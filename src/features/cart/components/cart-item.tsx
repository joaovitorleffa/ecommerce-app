import { Minus, Plus, Trash } from "lucide-react-native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { CartItem as CartItemType } from "../types/cart";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export const CartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) => {
  const { product, quantity } = item;

  const handleIncreaseQuantity = () => {
    onUpdateQuantity(product.id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    onUpdateQuantity(product.id, quantity - 1);
  };

  const handleRemove = () => {
    onRemove(product.id);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>

        <View style={styles.quantityContainer}>
          <Pressable
            style={styles.quantityButton}
            onPress={handleDecreaseQuantity}
          >
            <Minus size={16} />
          </Pressable>

          <Text style={styles.quantity}>{quantity}</Text>

          <Pressable
            style={styles.quantityButton}
            onPress={handleIncreaseQuantity}
          >
            <Plus size={16} />
          </Pressable>
        </View>

        <Text style={styles.totalPrice}>
          Total: ${(product.price * quantity).toFixed(2)}
        </Text>
      </View>

      <Pressable style={styles.removeButton} onPress={handleRemove}>
        <Trash color="#fff" size={18} strokeWidth={2} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  price: {
    fontSize: 14,
    color: "#666",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "600",
    minWidth: 20,
    textAlign: "center",
  },
  totalPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
    marginTop: 4,
  },
  removeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  removeButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
