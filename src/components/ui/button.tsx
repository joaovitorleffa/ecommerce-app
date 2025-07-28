import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableHighlightProps,
} from "react-native";

interface ButtonProps extends TouchableHighlightProps {
  text: string;
}

export const Button = ({ text, ...rest }: ButtonProps) => {
  return (
    <TouchableHighlight
      {...rest}
      style={styles.button}
      underlayColor={"#6200ee"}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#6200ee",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    width: "100%",
    height: 48,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
