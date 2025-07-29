import { CartProvider } from "@/cart/context/cart-context";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Router } from "./router";

export default function App() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <View style={styles.container}>
          <Router />
        </View>
      </CartProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
