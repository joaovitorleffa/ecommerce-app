import { useCart } from "@/cart/context/cart-context";
import { ShoppingBag } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface CartIconProps {
  onPress: () => void;
}

export const CartIcon = ({ onPress }: CartIconProps) => {
  const { cart } = useCart();

  return (
    <Pressable testID="cart-icon-button" style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <ShoppingBag />
        {cart.totalItems > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {cart.totalItems > 99 ? "99+" : cart.totalItems}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  iconContainer: {
    position: "relative",
  },
  icon: {
    fontSize: 24,
  },
  badge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
