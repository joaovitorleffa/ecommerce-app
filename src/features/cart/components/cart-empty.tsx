import { ShoppingBag } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

export const CartEmpty = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <ShoppingBag size={64} color="#ccc" />
      </View>
      <Text style={styles.title}>Your cart is empty</Text>
      <Text style={styles.subtitle}>Add some products to get started!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
