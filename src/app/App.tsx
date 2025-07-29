import { StyleSheet, View } from "react-native";
import { CartProvider } from "../features/cart/context/cart-context";
import { Router } from "./router";

export default function App() {
  return (
    <CartProvider>
      <View style={styles.container}>
        <Router />
      </View>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
