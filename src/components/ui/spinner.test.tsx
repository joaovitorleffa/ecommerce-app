import { render } from "@testing-library/react-native";
import { Spinner } from "./spinner";

describe("Spinner", () => {
  it("should render spinner with correct testID", () => {
    const { getByTestId } = render(<Spinner />);

    expect(getByTestId("spinner")).toBeTruthy();
  });

  it("should render activity indicator", () => {
    const { getByTestId } = render(<Spinner />);

    const spinner = getByTestId("spinner");
    expect(spinner).toBeTruthy();
  });
}); 