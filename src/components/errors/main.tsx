import { Text, View } from "react-native";

export const MainError = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, color: "#ff0000" }}>An error occurred</Text>
      <Text style={{ fontSize: 16, color: "#888" }}>
        Please try again later.
      </Text>
    </View>
  );
};
