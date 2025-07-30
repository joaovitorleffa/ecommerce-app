import { AlertTriangle } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

export const MainError = () => {
  return (
    <View testID="main-error" style={styles.container}>
      <View style={styles.iconContainer}>
        <AlertTriangle size={64} color="#ff6b6b" />
      </View>
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.subtitle}>Please try again later</Text>
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
