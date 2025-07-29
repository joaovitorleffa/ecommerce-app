import { StyleSheet, Text, View } from "react-native";
import { Product } from "../../home/types/product";

interface ProductReviewsProps {
  reviews: Product["reviews"];
}

export const ProductReviews = ({ reviews }: ProductReviewsProps) => {
  if (reviews.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Reviews</Text>
        <Text style={styles.noReviews}>No reviews yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Reviews ({reviews.length})</Text>
      <View style={styles.reviewsList}>
        {reviews.map((review, index) => (
          <View key={index} style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <Text style={styles.userName}>{review.user}</Text>
              <Text style={styles.rating}>{"⭐".repeat(review.rating)}</Text>
            </View>
            <Text style={styles.comment}>{review.comment}</Text>
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
  noReviews: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  reviewsList: {
    gap: 12,
  },
  reviewItem: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  userName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  rating: {
    fontSize: 12,
    color: "#FFD700",
  },
  comment: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});
