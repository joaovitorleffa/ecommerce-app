import { StyleSheet, Text, View } from "react-native";
import { Product } from "../../home/types/product";

interface ProductSpecificationsProps {
  specifications: Product["specifications"];
}

export const ProductSpecifications = ({
  specifications,
}: ProductSpecificationsProps) => {
  const specEntries = Object.entries(specifications);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Specifications</Text>
      <View style={styles.specsList}>
        {specEntries.map(([key, value]) => (
          <View key={key} style={styles.specItem}>
            <Text style={styles.specKey}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Text>
            <Text style={styles.specValue}>{value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  specsList: {
    gap: 8,
  },
  specItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  specKey: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  specValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
});
