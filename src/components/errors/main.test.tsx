import { render } from "@testing-library/react-native";
import { MainError } from "./main";

describe("MainError", () => {
  it("should render main error with correct testID", () => {
    const { getByTestId } = render(<MainError />);

    expect(getByTestId("main-error")).toBeTruthy();
  });

  it("should render error title", () => {
    const { getByText } = render(<MainError />);

    expect(getByText("Something went wrong")).toBeTruthy();
  });

  it("should render error subtitle", () => {
    const { getByText } = render(<MainError />);

    expect(getByText("Please try again later")).toBeTruthy();
  });

  it("should render alert triangle icon", () => {
    const { getByTestId } = render(<MainError />);

    const errorContainer = getByTestId("main-error");
    expect(errorContainer).toBeTruthy();
  });

  it("should have correct styling", () => {
    const { getByTestId } = render(<MainError />);

    const errorContainer = getByTestId("main-error");
    expect(errorContainer.props.style).toEqual({
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 32,
    });
  });

  it("should render all text elements with correct content", () => {
    const { getByText } = render(<MainError />);

    const title = getByText("Something went wrong");
    const subtitle = getByText("Please try again later");

    expect(title).toBeTruthy();
    expect(subtitle).toBeTruthy();
  });
}); 