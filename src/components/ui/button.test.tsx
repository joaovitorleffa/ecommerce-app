import { fireEvent, render } from "@testing-library/react-native";
import { Button } from "./button";

describe("Button", () => {
  it("should render button with correct text", () => {
    const buttonText = "Click me";
    const { getByText } = render(<Button text={buttonText} />);

    expect(getByText(buttonText)).toBeTruthy();
  });

  it("should call onPress when button is pressed", () => {
    const onPress = jest.fn();
    const buttonText = "Click me";

    const { getByText } = render(
      <Button text={buttonText} onPress={onPress} />
    );

    fireEvent.press(getByText(buttonText));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
}); 